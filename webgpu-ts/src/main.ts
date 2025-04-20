const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

async function initWebGPU() {
  if (!navigator.gpu) throw new Error("WebGPU is not supported!");

  const adapter = await navigator.gpu.requestAdapter();

  if (!adapter) throw new Error("Failed to get GPU adapter!");

  const device = await adapter.requestDevice();
  const context = canvas.getContext("webgpu") as GPUCanvasContext;

  const swapChainFormat = "bgra8unorm";
  context.configure({
    device,
    format: swapChainFormat,
    alphaMode: "opaque",
  });

  return { device, context, swapChainFormat };
}

const vertexShaderCode = `
@vertex
fn main(@location(0) position : vec4<f32>) -> @builtin(position) vec4<f32> {
    return position;
}
`;

const fragmentShaderCode = `
@fragment
fn main() -> @location(0) vec4<f32> {
    return vec4<f32>(0.3, 0.7, 0.9, 1.0);
}
`;

async function setupPipeline(
  device: GPUDevice,
  swapChainFormat: GPUTextureFormat
) {
  const shaderModule = {
    vertex: device.createShaderModule({ code: vertexShaderCode }),
    fragment: device.createShaderModule({ code: fragmentShaderCode }),
  };

  const pipeline = device.createRenderPipeline({
    layout: "auto",
    vertex: {
      module: shaderModule.vertex,
      entryPoint: "main",
      buffers: [
        {
          arrayStride: 3 * Float32Array.BYTES_PER_ELEMENT,
          attributes: [
            {
              shaderLocation: 0,
              offset: 0,
              format: "float32x3",
            },
          ],
        },
      ],
    },
    fragment: {
      module: shaderModule.fragment,
      entryPoint: "main",
      targets: [{ format: swapChainFormat }],
    },
    primitive: {
      topology: "triangle-list",
    },
  });

  const vertices = new Float32Array([
    0.0, 0.5, 0.0, -0.5, -0.5, 0.0, 0.5, -0.5, 0.0,
  ]);

  const vertexBuffer = device.createBuffer({
    size: vertices.byteLength,
    usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
  });
  device.queue.writeBuffer(vertexBuffer, 0, vertices);

  return { pipeline, vertexBuffer };
}

async function render(
  device: GPUDevice,
  context: GPUCanvasContext,
  pipeline: GPURenderPipeline,
  vertexBuffer: GPUBuffer
) {
  const commandEncoder = device.createCommandEncoder();
  const textureView = context.getCurrentTexture().createView();
  const renderPassDescriptor: GPURenderPassDescriptor = {
    colorAttachments: [
      {
        view: textureView,
        clearValue: { r: 0, g: 0, b: 0, a: 1 },
        loadOp: "clear",
        storeOp: "store",
      },
    ],
  };

  const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);
  passEncoder.setPipeline(pipeline);
  passEncoder.setVertexBuffer(0, vertexBuffer);
  passEncoder.draw(3, 1, 0, 0);
  passEncoder.end();

  device.queue.submit([commandEncoder.finish()]);

  requestAnimationFrame(() => render(device, context, pipeline, vertexBuffer));
}

async function main() {
  const { device, context } = await initWebGPU();
  const { pipeline, vertexBuffer } = await setupPipeline(device, "bgra8unorm");
  render(device, context, pipeline, vertexBuffer);
}

main().catch(console.error);

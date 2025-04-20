/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ (() => {

eval("\nconst canvas = document.createElement(\"canvas\");\ndocument.body.appendChild(canvas);\ncanvas.width = window.innerWidth;\ncanvas.height = window.innerHeight;\nasync function initWebGPU() {\n    if (!navigator.gpu)\n        throw new Error(\"WebGPU is not supported!\");\n    const adapter = await navigator.gpu.requestAdapter();\n    if (!adapter)\n        throw new Error(\"Failed to get GPU adapter!\");\n    const device = await adapter.requestDevice();\n    const context = canvas.getContext(\"webgpu\");\n    const swapChainFormat = \"bgra8unorm\";\n    context.configure({\n        device,\n        format: swapChainFormat,\n        alphaMode: \"opaque\",\n    });\n    return { device, context, swapChainFormat };\n}\nconst vertexShaderCode = `\r\n@vertex\r\nfn main(@location(0) position : vec4<f32>) -> @builtin(position) vec4<f32> {\r\n    return position;\r\n}\r\n`;\nconst fragmentShaderCode = `\r\n@fragment\r\nfn main() -> @location(0) vec4<f32> {\r\n    return vec4<f32>(0.3, 0.7, 0.9, 1.0);\r\n}\r\n`;\nasync function setupPipeline(device, swapChainFormat) {\n    const shaderModule = {\n        vertex: device.createShaderModule({ code: vertexShaderCode }),\n        fragment: device.createShaderModule({ code: fragmentShaderCode }),\n    };\n    const pipeline = device.createRenderPipeline({\n        layout: \"auto\",\n        vertex: {\n            module: shaderModule.vertex,\n            entryPoint: \"main\",\n            buffers: [\n                {\n                    arrayStride: 3 * Float32Array.BYTES_PER_ELEMENT,\n                    attributes: [\n                        {\n                            shaderLocation: 0,\n                            offset: 0,\n                            format: \"float32x3\",\n                        },\n                    ],\n                },\n            ],\n        },\n        fragment: {\n            module: shaderModule.fragment,\n            entryPoint: \"main\",\n            targets: [{ format: swapChainFormat }],\n        },\n        primitive: {\n            topology: \"triangle-list\",\n        },\n    });\n    const vertices = new Float32Array([\n        0.0, 0.5, 0.0, -0.5, -0.5, 0.0, 0.5, -0.5, 0.0,\n    ]);\n    const vertexBuffer = device.createBuffer({\n        size: vertices.byteLength,\n        usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,\n    });\n    device.queue.writeBuffer(vertexBuffer, 0, vertices);\n    return { pipeline, vertexBuffer };\n}\nasync function render(device, context, pipeline, vertexBuffer) {\n    const commandEncoder = device.createCommandEncoder();\n    const textureView = context.getCurrentTexture().createView();\n    const renderPassDescriptor = {\n        colorAttachments: [\n            {\n                view: textureView,\n                clearValue: { r: 0, g: 0, b: 0, a: 1 },\n                loadOp: \"clear\",\n                storeOp: \"store\",\n            },\n        ],\n    };\n    const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);\n    passEncoder.setPipeline(pipeline);\n    passEncoder.setVertexBuffer(0, vertexBuffer);\n    passEncoder.draw(3, 1, 0, 0);\n    passEncoder.end();\n    device.queue.submit([commandEncoder.finish()]);\n    requestAnimationFrame(() => render(device, context, pipeline, vertexBuffer));\n}\nasync function main() {\n    const { device, context } = await initWebGPU();\n    const { pipeline, vertexBuffer } = await setupPipeline(device, \"bgra8unorm\");\n    render(device, context, pipeline, vertexBuffer);\n}\nmain().catch(console.error);\n\n\n//# sourceURL=webpack://webgpu-ts/./src/main.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/main.ts"]();
/******/ 	
/******/ })()
;
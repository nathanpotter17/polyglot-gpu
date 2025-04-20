# GPU Implementations in Rust, C++, and Typescript.

# WebGPU - C++

For C++, I found [this guide](https://eliemichel.github.io/LearnWebGPU/index.html) to be the most helpful + up to date.

Using a pre-made distro of WebGPU Dawn [that has web support for `emcmake` built in](https://eliemichel.github.io/LearnWebGPU/appendices/building-for-the-web.html).

See the README [here](./webgpu/WebGPU-distribution-dawn-6536/README.md).

## Getting Started

- [Installing WebGPU](https://eliemichel.github.io/LearnWebGPU/getting-started/hello-webgpu.html#installing-webgpu)

## Choosing a Backend

I chose **Option B: Dawn** – more mature, well supported, Emscripten-friendly.

### Option A: The Lightness of `wgpu-native`

- Written in Rust
- Difficult to build from scratch
- Distribution includes precompiled libraries

### Option B: The Comfort of Dawn

- Written in C++
- Better error messages
- Can be built from source
- Easier to debug with full stack traces

### Option C: The Flexibility of Both

- Include only a couple of CMake files
- Dynamically fetch either `wgpu-native` or Dawn depending on a configuration option

## Examples & Extras

- [Hello Triangle](https://github.com/eliemichel/LearnWebGPU-Code/tree/step030)
- [Use SDL instead of GLFW](https://eliemichel.github.io/LearnWebGPU/appendices/using-sdl.html)
- [Getting Started with WebGPU Compute Shaders](https://eliemichel.github.io/LearnWebGPU/basic-compute/compute-pipeline.html)

# WebGPU - Typescript

For TypeScript, see `webgpu-ts` for the example using npm as the build tool. I would recommend getting started with Google's step-by-step [guide](https://codelabs.developers.google.com/your-first-webgpu-app#0), considering Google is responsible for Dawn, which was compiled to the WebGPU TS API using Emscripten.

## Examples & Reference

- [Google Teaches WebGPU in TS](https://codelabs.developers.google.com/your-first-webgpu-app#0)
- [All types for WebGPU](https://gpuweb.github.io/types/)
  - [Third Party Typesafe WebGPU](https://github.com/software-mansion/TypeGPU)
- [WASI-GFX](https://www.youtube.com/watch?v=HBJ1-S65bbM)

# WGPU + Rust + Wasm Bindgen

To see an example using a development pattern that puts native executables first, using Rust - see `wasm-wgpu` for the example using Cargo as the build tool. This example uses wgpu, winit, wasm-pack, `target_arch` macro, etc. to effectively use wgpu as a rendering backend on the web and on standard operating systems, such as Windows.

Note: winit 0.29 and 0.30 crates are very different. These examples rely on the LTS, 0.29.15.

## Examples & Reference

- [wgpu window](https://sotrh.github.io/learn-wgpu/beginner/tutorial1-window/#boring-i-know)
- [wgpu winit 0.30+](https://github.com/sotrh/learn-wgpu/issues/549)
- [building a rendering surface](https://sotrh.github.io/learn-wgpu/beginner/tutorial2-surface#first-some-housekeeping-state)

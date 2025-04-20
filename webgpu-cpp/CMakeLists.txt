cmake_minimum_required(VERSION 3.0...3.25)
project(
    NativeEngine # name of the project, which will also be the name of the visual studio solution if you use it
    VERSION 0.1.0 # any version number
    LANGUAGES CXX C # programming languages used by the project
)

add_executable(App src/main.cpp)

set_target_properties(App PROPERTIES
    CXX_STANDARD 17
    CXX_STANDARD_REQUIRED ON
    CXX_EXTENSIONS OFF
    COMPILE_WARNING_AS_ERROR ON
)

# Include webgpu directory, to define the 'webgpu' target
# 
add_subdirectory(webgpu/WebGPU-distribution-dawn-6536)


# Add the 'webgpu' target as a dependency of our App
target_link_libraries(App PRIVATE webgpu)

if (MSVC)
    target_compile_options(App PRIVATE /W4)
else()
    target_compile_options(App PRIVATE -Wall -Wextra -pedantic)
endif()

# The application's binary must find wgpu.dll or libwgpu.so at runtime,
# so we automatically copy it (it's called WGPU_RUNTIME_LIB in general)
# next to the binary. Because we're using Dawn, there are no precompiled binaries to copy

# target_copy_webgpu_binaries(App)
#!/bin/bash
# This script is used to build C++ engine for webgpu.

confirm() {
    local message="$1"
    while true; do
        echo -n "Proceed with $message? [Y/n]: "
        read -r confirm
        case "$confirm" in
            [Yy]) return 0 ;;  # Proceed
            [Nn]) echo "Cancelled."; exit 0 ;;  # Exit
            *) echo "Invalid input. Please enter y or n." ;;
        esac
    done
}

confirm "starting build"

cmake . -B build -DWEBGPU_BACKEND=DAWN

cmake --build build

confirm "running new build"

./build/Debug/App.exe
# Projects

## Secure Lightweight Storage Engine

C · Filesystem · Cryptography · Unix Kernel · Feb. 2026 - Present

- Built upon a lightweight block filesystem optimized for minimalist, high-performance embedded systems.
- Implemented block-level Full Disk Encryption (FDE) to secure the filesystem blocks against physical extraction.
- Integrated a crypto verification chain using Merkle trees to check immutable system image integrity during runtime.

## Hardware Security Abstraction Layer

C · C++ · PKCS#11 · OpenSSL · Mar. 2025 - Feb. 2026

- Architected a plug-and-play cryptographic abstraction layer for multi-SoC platforms by implementing standardized PKCS#11 interfaces for heterogeneous Hardware Security Devices.
- Developed an OpenSSL Provider wrapping PKCS#11 interfaces, enabling uniform Crypto and Key APIs that work across different Hardware Security Modules.
- Built a conditional compilation pipeline to target-compile the same codebase across different hardware platforms.

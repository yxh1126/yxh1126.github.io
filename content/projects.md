# Projects

## Security Features for L4 Autonomous Trucks

PKI · Device Identity · HSM
Inceptio Technology, CA · Aug. 2026 - Present

- Developing security features for the L4 autonomous truck platform.
- Designed and developed the platform software architecture supporting multi-OEM certificate enrollment and verification.
- Developed Nvidia ThorX/ThorU device identity authentication based on public/private key pairs.
- Adapted the HSM hardware crypto API on ThorX/ThorU, covering encryption/decryption and certificate-related functionality.
- Supporting GitLab repository and Artifactory administration and management.

## Secure Lightweight Storage Engine

C · Filesystem · Cryptography · Unix Kernel
Inceptio Technology, CA · Feb. 2026 - May 2026

- Built upon a lightweight block filesystem optimized for minimalist, high-performance embedded systems.
- Implemented block-level Full Disk Encryption (FDE) to secure the filesystem blocks against physical extraction.
- Integrated a crypto verification chain using Merkle trees to check immutable system image integrity during runtime.

## Hardware Security Abstraction Layer

C · C++ · PKCS#11 · OpenSSL
Inceptio Technology, CA · Mar. 2026 - Aug. 2026

- Architected a plug-and-play cryptographic abstraction layer for multi-SoC platforms by implementing standardized PKCS#11 interfaces for heterogeneous Hardware Security Devices.
- Developed an OpenSSL Provider wrapping PKCS#11 interfaces, enabling uniform Crypto and Key APIs that work across different Hardware Security Modules.
- Built a conditional compilation pipeline to target-compile the same codebase across different hardware platforms.

## Security Features for Lite Autonomous Driving Platform

HSM · Secure Boot · eFuse
Inceptio Technology, CA · Mar. 2025 - Jan. 2026

- Developed security features for the lite autonomous driving platform (J6).
- Verified the J6 HSM API and Crypto Accelerator API based on BSP functions.
- Implemented the onboard security API: built the HSM abstraction layer for the J6 HSM and delivered EoL crypto tools for the J6 platform.
- Delivered J6 secure boot: updated Inceptio's public and private keys, auto-generated the J6 eFuse binary, integrated signing tools into the build pipeline, and supported regression testing for eFuse enablement and secure boot build script updates.
- Implemented an HSM abstraction layer for a virtual HSM, providing full HSM functionality on any platform — making crypto API bring-up easy for new platforms.
- Supported passing the cybersecurity regulation: prepared documentation and developed the Java version of certificate API.

## General Firmware Support for AI SoC

U-Boot · OTA · kDump
Inceptio Technology, CA · Feb. 2024 - Dec. 2024

- Delivered general firmware support for the J5 AI SoC, covering boot, OTA, diagnostics, and build infrastructure.
- Delivered a U-Boot feature to support J5 A/B side switch from the U-Boot console.
- Delivered OTA and Triage support scripts for J5 and LX2160: OTA image filtering, J5 system status, LX2160/J5 security status, and J5 CAN status.
- Enabled J5 OTA 2nd stage support with OTA package signature verification.
- Optimized the J5 repository: aligned branch names to avoid pipeline failures, removed unused repos, added kDump support tools, refreshed outdated information, and provided Docker environments for the J5 build and vDSP build.
- Delivered a minimal initramfs for J5/LX2160 to support kDump.

## Secure Boot for Multi-SoC ADCU

Secure Boot · eFuse Provisioning · Cloud Signing Tools
Inceptio Technology, CA · Jan. 2023 - Nov. 2023

- Delivered Secure Boot for the multi-SoC Autonomous Driving Control Unit (Infineon Aurix, NXP LX2160, Horizon Robotics J5).
- Built a firmware signing and private key management cloud service shared across the Aurix, LX2160, and J5 platforms.
- Developed multi-language, multi-platform Secure Boot signing client tools running on both Linux and Windows.
- Updated and upgraded the Secure Image build chain, moving LX2160 and J5 from local signing to cloud signing.
- Provided offline flashing images that enable Secure Boot, including LX2160 and J5 Fuse Provisioning.
- Designed the automated flow and tools for enabling Secure Boot in the production-line environment (mainly the LX2160 Secure Boot enablement flow).

## Linux Device Driver Integration

Linux Driver · SJA1110 · SJA1105
Inceptio Technology, CA · May 2023 - Aug. 2023

- Integrated and updated Linux device drivers for multiple Ethernet switch chips (SJA1110, SJA1105) on the multi-SoC ADCU.
- Updated the SJA1110 kernel driver, exposing SJA1110 register read/write interfaces to the LX2160 Linux userspace.
- Integrated the SJA1105 kernel driver into the J5 Linux environment, exposing SJA1105 register read/write interfaces to userspace.
- Developed register read/write APIs and tools for each environment, following the SJA1110/1105 interface access rules.
- Integrated the SJA1105 firmware generation script to automatically build firmware images and load them at driver runtime.

## Crypto API & End-of-Line Crypto Tools for ADCU

TPM · HSM · TrustZone · PKCS#11
Inceptio Technology, CA · Nov. 2021 - Nov. 2022

- Developed two generations of Crypto APIs and end-of-line crypto tools for the Autonomous Driving Control Unit.
- Gen 1: built a TPM-based Crypto API on top of the Microsoft TSS.CPP library.
- Built a cloud service for license generation and license encryption, with cryptographic algorithms compatible with both TPM and HSM.
- Delivered production-line encryption tools and production-line license tools supporting both TPM and HSM security modules.
- Gen 2: brought up the TrustZone-based HSM security module, integrating TrustOS, Trust App, and the HSM PKCS#11 library.
- Gen 2: built an HSM-based Crypto API on top of the HSM PKCS#11 library.
- Designed the Gen 1/2 Crypto API layering to decouple the secure-chip communication layer from the Crypto API/Tool application layer.

## Cybersecurity for Vehicle Camera ECU

SHE · AES-CMAC · Secure Boot
Magna Electronics, MI · Nov. 2019 - Sep. 2020

- Implemented the in-vehicle symmetric key management protocol defined by the SHE specification.
- Implemented the intrusion detection applied to the ECU in-vehicle network and recorded the intrusion behavior.
- Implemented the AES-CMAC based ECU secure boot to protect the data in flash from unauthorized modification.
- Implemented the secure reprogramming protocol applied on both ECU and reprogramming tools.

## Cybersecurity for Hybrid Vehicle Power Inverter

AUTOSAR · HSM · Cryptography
Delphi Technologies, MI · Feb. 2019 - Nov. 2019

- Led the Cybersecurity SW in the project, analyzed customer requirements, and inquired solutions in the market.
- Led and hosted cybersecurity trainings that introduced the basics of cryptography and authentication to the team.
- Worked with the HSM, testing and integrating the Vector crypto software stacks to the current AUTOSAR.

## Hybrid Vehicle Power Inverter Software

PWM · NXP eMIOS · CAN
Delphi Technologies, MI · Feb. 2018 - Feb. 2019

- Designed and developed the hardware abstraction layer software for PWM control.
- Implemented the PWM API on the NXP eMIOS module through object-oriented design.
- Implemented the testability software that exchanges data between ECU and PC through CAN.
- Developed Python tools to generate the memory report and integrated the script into the CMake build.

## EMS Software Development

EMS · Dynamic Skip Fire · ETAS INCA
Delphi Automotive, MI · Jun. 2016 - Feb. 2018

- Developed and maintained existing EMS software components based on customer requirements.
- Integrated object code into the Delphi EMS for Dynamic Skip Fire; designed and implemented the software interface.
- Supported all phases of the SW development including requirements, design, development, review, and testing.
- Worked on a variety of tools including ETAS INCA, Lauterbach, CM Synergy, Plastic SCM, QAC.

## Continuous Authentication using Multimodal Integration

OpenCV · C++ · Java RMI
Rochester Institute of Technology, NY · Aug. 2014 - Sep. 2015

- Designed an authentication system for Windows via Facial Recognition and Motion Detection.
- Implemented the Face Recognition and Motion Detection using OpenCV library in C++.
- Optimized performance by parallelizing the face recognition process on a computing cloud using Java RMI.

## Embedded Hardware Projects

RFID · MSP430 · FPGA
Beihang University, Beijing, China · Aug. 2010 - May 2013

- Designed an active RFID tag with Allegro PCB Designer for an indoor location system.
- Implemented the spread spectrum communication protocol on the TI MSP430 MCU for the RFID tag.
- Implemented the Non-Coherent Summation Bias Filter on a Xilinx FPGA in Verilog for a GPS chip.

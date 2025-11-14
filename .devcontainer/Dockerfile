FROM mcr.microsoft.com/devcontainers/typescript-node:1-22-bookworm

# Install additional tools
RUN sudo apt update && sudo apt install -y \
    postgresql-client \
    && sudo rm -rf /var/lib/apt/lists/*

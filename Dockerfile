# Use a small Linux base with git + bash
FROM alpine:3.20

# Install required packages
RUN apk add --no-cache \
    bash \
    git \
    grep \
    coreutils \
    findutils \
    util-linux \
    awk

# Set working directory
WORKDIR /app

# Default command (can be overridden in Harness Run step)
CMD ["/bin/bash"]

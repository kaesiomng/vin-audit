#!/bin/bash

# Build script for Digital Ocean App Platform deployment
# This script runs the production build

# Install dependencies
npm ci

# Build the application for static export
npm run build

# The exported files will be in the 'out' directory
echo "Build completed. Static files are in the 'out' directory."
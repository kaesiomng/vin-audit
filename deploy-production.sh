#!/bin/bash

# VIN AUDIT - Digital Ocean Production Deployment Script
# This script deploys the VIN AUDIT application to Digital Ocean

echo "🚀 Starting VIN AUDIT deployment to Digital Ocean..."

# Server configuration
SERVER="root@143.198.4.48"
APP_DIR="/var/www/vinaudit"

# Build the application locally
echo "📦 Building application..."
npm run build

# Transfer files to server
echo "📤 Transferring files to server..."
rsync -avz --delete --exclude 'node_modules' --exclude '.git' --exclude '.next' . $SERVER:$APP_DIR/

# Install dependencies and restart on server
echo "🔧 Installing dependencies and restarting application..."
ssh $SERVER << 'ENDSSH'
cd /var/www/vinaudit
npm ci --only=production
pm2 restart ecosystem.config.js
pm2 save
ENDSSH

echo "✅ Deployment completed successfully!"
echo "🌐 Application is running at: https://vinaudit.co"
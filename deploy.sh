#!/bin/bash

# VIN AUDIT - Digital Ocean Deployment Script
# Run this script on your Digital Ocean droplet

echo "🚀 Starting VIN AUDIT deployment..."

# Update system
echo "📦 Updating system packages..."
apt update && apt upgrade -y

# Install Node.js 18
echo "📦 Installing Node.js 18..."
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt-get install -y nodejs

# Install required packages
echo "📦 Installing required packages..."
npm install -g pm2
apt install nginx git ufw -y

# Setup firewall
echo "🔒 Configuring firewall..."
ufw --force enable
ufw allow ssh
ufw allow http
ufw allow https

# Create application directory
echo "📁 Creating application directory..."
mkdir -p /var/www/vinaudit
cd /var/www/vinaudit

# Clone repository (you'll need to replace this with your actual repo)
echo "📥 Cloning repository..."
# git clone https://github.com/yourusername/vin-audit.git .

echo "⚠️  Please upload your VIN AUDIT files to /var/www/vinaudit"
echo "    You can use SCP, SFTP, or git clone"

# Install dependencies (run after uploading files)
echo "📦 Installing Node.js dependencies..."
npm install

# Create production environment file
echo "⚙️  Creating production environment file..."
cat > .env.production << 'EOF'
# Production environment variables
NEXT_PUBLIC_APP_URL=https://vinaudit.co
NODE_ENV=production

# API Configuration
NEXT_PUBLIC_API_BASE_URL=http://198.199.90.224
NEXT_PUBLIC_API_KEY=f6e5e1c1-8b61-416f-98b7-e690ab80b169

# Stripe Configuration (LIVE KEYS)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_51SGZt073ghMnIRN5ZJ6246XXIk4fWrjuTc1qFQBi8RysOtz7Kqpeg363zqjtP3RHf4a7q3yGv88Bfd7FNDjhmrPs00iAy2XfrG
STRIPE_SECRET_KEY=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
STRIPE_WEBHOOK_SECRET=whsec_Fy6TLzaYiyF8ORj4FoJQOEtaAy1CFtDl

# GoDaddy SMTP Settings
GODADDY_EMAIL_USER=reports@vinaudit.co
GODADDY_EMAIL_PASS=Austral2025.
EOF

# Build the application
echo "🔨 Building application..."
npm run build

# Create PM2 configuration
echo "⚙️  Creating PM2 configuration..."
cat > ecosystem.config.js << 'EOF'
module.exports = {
  apps: [{
    name: 'vinaudit',
    script: 'npm',
    args: 'start',
    cwd: '/var/www/vinaudit',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
};
EOF

# Start application with PM2
echo "🚀 Starting application with PM2..."
pm2 start ecosystem.config.js
pm2 save
pm2 startup

# Create Nginx configuration
echo "⚙️  Configuring Nginx..."
cat > /etc/nginx/sites-available/vinaudit.co << 'EOF'
server {
    listen 80;
    server_name vinaudit.co www.vinaudit.co;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
}
EOF

# Enable the site
ln -s /etc/nginx/sites-available/vinaudit.co /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Test and restart Nginx
nginx -t
systemctl restart nginx

# Install Certbot for SSL
echo "🔒 Installing SSL certificate..."
apt install certbot python3-certbot-nginx -y

echo "✅ Deployment script completed!"
echo ""
echo "🎯 Next steps:"
echo "1. Upload your VIN AUDIT files to /var/www/vinaudit"
echo "2. Run: npm install && npm run build"
echo "3. Run: pm2 restart vinaudit"
echo "4. Run: certbot --nginx -d vinaudit.co -d www.vinaudit.co"
echo "5. Point your domain vinaudit.co to this server's IP"
echo ""
echo "📊 Check status:"
echo "- pm2 status"
echo "- pm2 logs vinaudit"
echo "- systemctl status nginx"
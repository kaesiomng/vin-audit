#!/bin/bash

# VIN AUDIT - Quick Server Setup Script
# Run this ON YOUR DIGITAL OCEAN SERVER after uploading files

echo "🚀 Setting up VIN AUDIT server..."

# Update system
apt update && apt upgrade -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt-get install -y nodejs

# Install PM2 and other tools
npm install -g pm2
apt install nginx git ufw -y

# Setup firewall
ufw --force enable
ufw allow ssh
ufw allow http
ufw allow https

# Go to application directory
cd /var/www/vinaudit

# Install dependencies
npm install

# Build application
npm run build

# Start with PM2
pm2 start npm --name "vinaudit" -- start
pm2 save
pm2 startup

# Configure Nginx
cat > /etc/nginx/sites-available/vinaudit.co << 'EOF'
server {
    listen 80;
    server_name vinaudit.co www.vinaudit.co 162.243.184.47;

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
}
EOF

# Enable site
ln -s /etc/nginx/sites-available/vinaudit.co /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl restart nginx

# Install SSL tools
apt install certbot python3-certbot-nginx -y

echo "✅ Setup complete!"
echo "🌐 Your site should be accessible at:"
echo "   http://162.243.184.47"
echo "   http://vinaudit.co (after DNS setup)"
echo ""
echo "📋 Next steps:"
echo "1. Point vinaudit.co DNS to 162.243.184.47"
echo "2. Run: certbot --nginx -d vinaudit.co -d www.vinaudit.co"
echo ""
echo "📊 Check status with:"
echo "   pm2 status"
echo "   pm2 logs vinaudit"
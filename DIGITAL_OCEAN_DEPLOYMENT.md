# Digital Ocean Deployment Guide for VIN AUDIT

## Prerequisites

- Digital Ocean account
- Domain name (vinaudit.co) pointed to your droplet
- SSH access to your droplet
- Git repository with your code

## Step 1: Create Digital Ocean Droplet

### Recommended Specifications:
- **OS**: Ubuntu 22.04 LTS
- **Size**: 2 GB RAM / 1 vCPU (Basic plan - $18/month)
- **Storage**: 50 GB SSD
- **Datacenter**: Choose closest to your target audience

### Create Droplet:
1. Log into Digital Ocean
2. Click "Create" → "Droplets"
3. Choose Ubuntu 22.04 LTS
4. Select $18/month plan (sufficient for Next.js app)
5. Add your SSH key
6. Choose hostname: `vinaudit-production`
7. Click "Create Droplet"

## Step 2: Initial Server Setup

### Connect to Your Droplet:
```bash
ssh root@your_droplet_ip
```

### Update System:
```bash
apt update && apt upgrade -y
```

### Install Required Software:
```bash
# Install Node.js 18 (LTS)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt-get install -y nodejs

# Install PM2 (Process Manager)
npm install -g pm2

# Install Nginx (Web Server)
apt install nginx -y

# Install Git
apt install git -y

# Install UFW (Firewall)
ufw enable
ufw allow ssh
ufw allow http
ufw allow https
```

## Step 3: Clone and Setup Your Project

### Create Application Directory:
```bash
mkdir -p /var/www/vinaudit
cd /var/www/vinaudit
```

### Clone Your Repository:
```bash
# Replace with your actual repository URL
git clone https://github.com/yourusername/vin-audit.git .

# Or upload your files via SCP/SFTP
```

### Install Dependencies:
```bash
npm install
```

### Create Production Environment File:
```bash
nano .env.production
```

Add your production environment variables:
```env
# Production environment variables
NEXT_PUBLIC_APP_URL=https://vinaudit.co
NODE_ENV=production

# API Configuration
NEXT_PUBLIC_API_BASE_URL=http://198.199.90.224
NEXT_PUBLIC_API_KEY=f6e5e1c1-8b61-416f-98b7-e690ab80b169

# Stripe Configuration (LIVE KEYS)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_51SGZt073ghMnIRN5ZJ6246XXIk4fWrjuTc1qFQBi8RysOtz7Kqpeg363zqjtP3RHf4a7q3yGv88Bfd7FNDjhmrPs00iAy2XfrG
STRIPE_SECRET_KEY=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
STRIPE_WEBHOOK_SECRET=whsec_your_production_webhook_secret

# GoDaddy SMTP Settings
GODADDY_EMAIL_USER=reports@vinaudit.co
GODADDY_EMAIL_PASS=Austral2025.
```

### Build the Application:
```bash
npm run build
```

## Step 4: Setup PM2 Process Manager

### Create PM2 Configuration:
```bash
nano ecosystem.config.js
```

Add this configuration:
```javascript
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
```

### Start Application with PM2:
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### Verify Application is Running:
```bash
pm2 status
pm2 logs vinaudit
```

## Step 5: Configure Nginx Reverse Proxy

### Create Nginx Configuration:
```bash
nano /etc/nginx/sites-available/vinaudit.co
```

Add this configuration:
```nginx
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
```

### Enable the Site:
```bash
ln -s /etc/nginx/sites-available/vinaudit.co /etc/nginx/sites-enabled/
rm /etc/nginx/sites-enabled/default
nginx -t
systemctl restart nginx
```

## Step 6: Setup SSL Certificate (HTTPS)

### Install Certbot:
```bash
apt install certbot python3-certbot-nginx -y
```

### Get SSL Certificate:
```bash
certbot --nginx -d vinaudit.co -d www.vinaudit.co
```

### Verify SSL Renewal:
```bash
certbot renew --dry-run
```

## Step 7: Setup Domain DNS

In your domain registrar (or Digital Ocean DNS):

### A Records:
```
@ (root domain) → your_droplet_ip
www → your_droplet_ip
```

### Optional CNAME:
```
reports → vinaudit.co (for reports@vinaudit.co email)
```

## Step 8: Production Checklist

### Security:
```bash
# Create non-root user
adduser vinaudit
usermod -aG sudo vinaudit
usermod -aG www-data vinaudit

# Change file ownership
chown -R vinaudit:www-data /var/www/vinaudit
chmod -R 755 /var/www/vinaudit

# Secure SSH
nano /etc/ssh/sshd_config
# Set: PermitRootLogin no
# Set: PasswordAuthentication no
systemctl restart ssh
```

### Monitoring:
```bash
# Install htop for monitoring
apt install htop -y

# Setup log rotation
nano /etc/logrotate.d/vinaudit
```

### Backup Strategy:
```bash
# Create backup script
nano /root/backup.sh
```

Add:
```bash
#!/bin/bash
cd /var/www/vinaudit
tar -czf /backup/vinaudit-$(date +%Y%m%d).tar.gz .
# Keep only last 7 days
find /backup -name "vinaudit-*.tar.gz" -mtime +7 -delete
```

## Step 9: Deployment Commands

### Update Application:
```bash
cd /var/www/vinaudit
git pull origin main
npm install
npm run build
pm2 restart vinaudit
```

### Monitor Application:
```bash
pm2 status
pm2 logs vinaudit
pm2 monit
```

### Check System Resources:
```bash
htop
df -h
free -m
```

## Step 10: Troubleshooting

### Common Issues:

#### App Won't Start:
```bash
pm2 logs vinaudit
# Check for missing environment variables or port conflicts
```

#### Nginx Issues:
```bash
nginx -t
systemctl status nginx
tail -f /var/log/nginx/error.log
```

#### SSL Certificate Issues:
```bash
certbot certificates
certbot renew
```

#### Memory Issues:
```bash
# Increase swap space
fallocate -l 2G /swapfile
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile
echo '/swapfile none swap sw 0 0' >> /etc/fstab
```

## Step 11: Performance Optimization

### Enable Nginx Caching:
```bash
nano /etc/nginx/sites-available/vinaudit.co
```

Add inside server block:
```nginx
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
    proxy_pass http://localhost:3000;
}
```

### Setup Database (if needed):
```bash
# If you need PostgreSQL
apt install postgresql postgresql-contrib -y
sudo -u postgres createuser --interactive
sudo -u postgres createdb vinaudit
```

## Cost Estimation

- **Digital Ocean Droplet**: $18/month (2GB RAM)
- **Domain**: $10-15/year
- **Email**: $5-10/month (GoDaddy Professional Email)
- **Total**: ~$25-30/month

## Monitoring and Maintenance

### Weekly Tasks:
- Check `pm2 status`
- Monitor disk space: `df -h`
- Check logs: `pm2 logs`
- Update system: `apt update && apt upgrade`

### Monthly Tasks:
- Review backup files
- Check SSL certificate expiry
- Monitor server performance
- Review access logs

Your VIN AUDIT website will be live at https://vinaudit.co with professional email delivery and secure payment processing!
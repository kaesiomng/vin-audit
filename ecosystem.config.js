module.exports = {
  apps: [{
    name: 'vinaudit',
    script: 'npm',
    args: 'start',
    cwd: '/var/www/vinaudit',
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
      NEXT_PUBLIC_API_BASE_URL: 'http://198.199.90.224',
      NEXT_PUBLIC_API_KEY: 'f6e5e1c1-8b61-416f-98b7-e690ab80b169',
      NEXT_PUBLIC_APP_URL: 'https://vinaudit.co',
      NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: 'pk_live_51SGZt073ghMnIRN5ZJ6246XXIk4fWrjuTc1qFQBi8RysOtz7Kqpeg363zqjtP3RHf4a7q3yGv88Bfd7FNDjhmrPs00iAy2XfrG',
      STRIPE_SECRET_KEY: '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',
      STRIPE_WEBHOOK_SECRET: 'whsec_Fy6TLzaYiyF8ORj4FoJQOEtaAy1CFtDl',
      GODADDY_EMAIL_USER: 'reports@vinaudit.co',
      GODADDY_EMAIL_PASS: 'Austral2025.'
    },
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    error_file: '/var/log/pm2/vinaudit-error.log',
    out_file: '/var/log/pm2/vinaudit-out.log',
    log_file: '/var/log/pm2/vinaudit.log'
  }]
};
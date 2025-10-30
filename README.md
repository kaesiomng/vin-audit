# VIN AUDIT - Production Ready# VIN AUDIT Website



A modern vehicle history report service built with Next.js 16, optimized for Digital Ocean production deployment.A modern, responsive landing page for VIN AUDIT - a vehicle history report service offering instant Carfax and AutoCheck reports.



## 🚀 Production Features## Features



- **Live Domain**: https://vinaudit.co- **Modern Design**: Built with Next.js 16, React 18, and TailwindCSS

- **SSL Certificate**: Let's Encrypt HTTPS encryption- **Mobile-First**: Responsive design optimized for all devices

- **VIN Lookup**: Real-time vehicle information via external API- **Fast Performance**: Static site generation for optimal loading speeds

- **Report Generation**: Carfax and AutoCheck report availability- **SEO Optimized**: Includes meta tags, structured data, and semantic HTML

- **Email Reports**: Automated report delivery via GoDaddy email- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation

- **Payment Processing**: Stripe integration for secure transactions- **TypeScript**: Full type safety for better development experience



## 🛠 Technology Stack## Technology Stack



- **Framework**: Next.js 16.0.1 with App Router- **Framework**: Next.js 16 with App Router

- **Language**: TypeScript- **Language**: TypeScript

- **Styling**: TailwindCSS- **Styling**: TailwindCSS

- **Runtime**: Node.js 20+- **Build**: Static site generation for deployment

- **Process Manager**: PM2- **Icons**: Inline SVG components for reliability

- **Web Server**: Nginx reverse proxy

- **SSL**: Let's Encrypt certificates## Getting Started



## 🚀 Digital Ocean Production Setup### Prerequisites



### Server Configuration- Node.js 18+

- npm or yarn

- **Server**: Ubuntu 25.04 on Digital Ocean

- **IP**: 143.198.4.48### Installation

- **Domain**: vinaudit.co (with SSL)

- **PM2**: Process management1. Clone the repository:

- **Nginx**: Reverse proxy with SSL termination

```bash

### Environment Variablesgit clone <your-repo-url>

cd vin-audit-website

Production environment is configured in `ecosystem.config.js`:```



```javascript1. Install dependencies:

NEXT_PUBLIC_API_BASE_URL: 'http://198.199.90.224'

NEXT_PUBLIC_API_KEY: '[API_KEY]'```bash

NEXT_PUBLIC_APP_URL: 'https://vinaudit.co'npm install

STRIPE_SECRET_KEY: '[LIVE_KEY]'```

GODADDY_EMAIL_USER: 'reports@vinaudit.co'

```1. Run the development server:



## 📦 Deployment```bash

npm run dev

### Quick Deploy```



```bash1. Open [http://localhost:3000](http://localhost:3000) in your browser.

./deploy-production.sh

```### Available Scripts



### Manual Deployment- `npm run dev` - Start development server

- `npm run build` - Build for production

1. Build locally:- `npm run start` - Start production server

```bash- `npm run lint` - Run ESLint

npm run build

```## Deployment



2. Upload to server:### Digital Ocean App Platform

```bash

rsync -avz --delete --exclude 'node_modules' . root@143.198.4.48:/var/www/vinaudit/This project is configured for deployment on Digital Ocean App Platform:

```

1. **Static Site Deployment** (Recommended):

3. Restart on server:   - Connect your GitHub repository

```bash   - Use the included `.do/app.yaml` configuration

ssh root@143.198.4.48 "cd /var/www/vinaudit && npm ci --only=production && pm2 restart ecosystem.config.js"   - Enable static site deployment

```   - Build command: `npm run build`

   - Output directory: `out`

## 🔧 Development

2. **Node.js App Deployment**:

### Local Setup   - Use the service configuration in `.do/app.yaml`

   - Run command: `npm start`

```bash

npm install### Other Platforms

npm run dev

```The project can also be deployed to:



Open http://localhost:3000- Vercel

- Netlify

### Available Scripts- AWS Amplify

- Any static hosting service

- `npm run dev` - Development server

- `npm run build` - Production build## Project Structure

- `npm run start` - Production server

- `npm run lint` - Code linting```text

src/

## 📂 Project Structure├── app/

│   ├── globals.css     # Global styles

```│   ├── layout.tsx      # Root layout

src/app/│   └── page.tsx        # Main landing page

├── page.tsx              # Landing page with VIN checker├── components/         # (Future components)

├── about/page.tsx        # About page└── lib/               # (Future utilities)

├── contact/page.tsx      # Contact page```

├── faq/page.tsx          # FAQ page

├── success/page.tsx      # Payment success## Customization

├── terms-privacy/page.tsx # Legal pages

└── api/### Brand Colors

    ├── vehicle/info/     # VIN lookup API

    ├── carfax/check/     # Carfax report check- Navy: #003366

    ├── autocheck/check/  # AutoCheck report check- Accent: #0099FF

    ├── checkout-session/ # Stripe checkout- Background: #FFFFFF

    └── send-report-email/# Email delivery- Gray: #F2F4F8

```

### Key Components

## 🌐 Live Features

- Hero section with VIN input form

- **VIN Validation**: Real-time VIN format checking- Pricing comparison (Carfax vs AutoCheck)

- **Vehicle Info**: Make, model, year, engine details- Trust badges and testimonials

- **Report Availability**: Carfax and AutoCheck report status- FAQ section

- **Secure Payments**: Stripe live payment processing- Contact footer

- **Email Delivery**: Automated report email delivery

- **Mobile Optimized**: Responsive design for all devices## Environment Variables



## 🔒 SecurityCreate `.env.local` for development:



- HTTPS enforced with Let's Encrypt```env

- Environment variables securedNEXT_PUBLIC_APP_URL=http://localhost:3000

- API keys protectedNODE_ENV=development

- Payment data encrypted via Stripe```



## 📧 ContactFor production, set:



- **Website**: https://vinaudit.co```env

- **Email**: reports@vinaudit.coNEXT_PUBLIC_APP_URL=https://yourdomain.com

NODE_ENV=production

---```



**Status**: Production Ready ✅## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is proprietary and confidential.

## Support

For technical support or questions, contact the development team.

---

**Note**: This is a landing page template. You'll need to integrate with actual payment processing and VIN lookup services for full functionality.

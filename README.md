# VIN AUDIT Website

A modern, responsive landing page for VIN AUDIT - a vehicle history report service offering instant Carfax and AutoCheck reports.

## Features

- **Modern Design**: Built with Next.js 16, React 18, and TailwindCSS
- **Mobile-First**: Responsive design optimized for all devices
- **Fast Performance**: Static site generation for optimal loading speeds
- **SEO Optimized**: Includes meta tags, structured data, and semantic HTML
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation
- **TypeScript**: Full type safety for better development experience

## Technology Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Build**: Static site generation for deployment
- **Icons**: Inline SVG components for reliability

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd vin-audit-website
```

1. Install dependencies:

```bash
npm install
```

1. Run the development server:

```bash
npm run dev
```

1. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Deployment

### Digital Ocean App Platform

This project is configured for deployment on Digital Ocean App Platform:

1. **Static Site Deployment** (Recommended):
   - Connect your GitHub repository
   - Use the included `.do/app.yaml` configuration
   - Enable static site deployment
   - Build command: `npm run build`
   - Output directory: `out`

2. **Node.js App Deployment**:
   - Use the service configuration in `.do/app.yaml`
   - Run command: `npm start`

### Other Platforms

The project can also be deployed to:

- Vercel
- Netlify
- AWS Amplify
- Any static hosting service

## Project Structure

```text
src/
├── app/
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Main landing page
├── components/         # (Future components)
└── lib/               # (Future utilities)
```

## Customization

### Brand Colors

- Navy: #003366
- Accent: #0099FF
- Background: #FFFFFF
- Gray: #F2F4F8

### Key Components

- Hero section with VIN input form
- Pricing comparison (Carfax vs AutoCheck)
- Trust badges and testimonials
- FAQ section
- Contact footer

## Environment Variables

Create `.env.local` for development:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

For production, set:

```env
NEXT_PUBLIC_APP_URL=https://yourdomain.com
NODE_ENV=production
```

## Contributing

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

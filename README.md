# Ophiuschus AI - Digital Transformation Solutions

Complete digital transformation solutions including website development, automation, AI voice agents, and ad management.

## 🚀 Quick Start

### Development
```bash
npm install
npm run dev
```

### Build for Production
```bash
npm run build
npm run preview
```

## 🌐 Deployment to Vercel

This project is optimized for Vercel deployment with proper chunk loading and SPA routing.

### Automatic Deployment
1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect the Vite configuration
3. Build command: `npm run build`
4. Output directory: `dist`

### Manual Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

## 🔧 Configuration Files

### Vite Configuration (`vite.config.ts`)
- Optimized chunk splitting for better caching
- Vendor chunk separation (React, Framer Motion)
- Production-optimized build settings
- Proper asset handling

### Vercel Configuration (`vercel.json`)
- SPA routing support
- Asset caching headers
- Security headers
- Build optimization

## 🐛 Troubleshooting Chunk Loading Issues

### Common Issues & Solutions

1. **Chunk Loading Failed Error**
   - Ensure `base: '/'` is set in `vite.config.ts`
   - Check that `vercel.json` has proper SPA routing
   - Verify build output directory is `dist`

2. **Assets Not Loading**
   - Check asset paths in `index.html`
   - Ensure proper chunk naming in build output
   - Verify Vercel deployment settings

3. **Build Failures**
   - Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
   - Check Node.js version compatibility (>=16.0.0)
   - Verify all dependencies are properly installed

### Build Verification
```bash
# Clean build
rm -rf dist
npm run build

# Check build output
ls -la dist/
ls -la dist/assets/js/
```

## 📁 Project Structure
```
src/
├── components/     # React components
├── assets/        # Static assets
├── utils/         # Utility functions
├── App.tsx        # Main application component
├── main.tsx       # Application entry point
└── index.css      # Global styles
```

## 🛠️ Technologies

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite 4
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Deployment**: Vercel

## 🔒 Security Features

- Content Security Policy headers
- XSS Protection
- Frame options
- Content type sniffing protection

## 📱 Performance Optimizations

- Code splitting and lazy loading
- Vendor chunk separation
- Asset optimization
- Critical CSS inlining
- Image preloading

## 🚨 Important Notes

- Entry point is `src/main.tsx` (not `index.tsx`)
- Build output directory is `dist/`
- Ensure proper base path configuration for production
- Test build locally before deploying

## 📞 Support

For deployment issues or questions, check:
1. Vercel deployment logs
2. Build output in `dist/` directory
3. Browser console for chunk loading errors
4. Network tab for failed asset requests

---

Built with ❤️ by Ophiuschus AI

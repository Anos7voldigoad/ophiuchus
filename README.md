# Ophiuschus AI Landing Page

A modern, responsive landing page built with React, TypeScript, and Framer Motion.

## Features

- ✨ **Splash Screen**: Beautiful animated splash screen with fallback content
- 🎨 **Modern UI**: Built with Tailwind CSS for consistent design
- 🚀 **Performance**: Optimized with Vite and code splitting
- 📱 **Responsive**: Mobile-first design approach
- 🛡️ **Error Handling**: Comprehensive error boundaries and fallbacks
- ⚡ **Fast Loading**: Optimized assets and lazy loading

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Build Tool**: Vite
- **Package Manager**: npm

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm 9+

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd my-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── sections/       # Page sections (Hero, Services, etc.)
│   ├── ui/            # Basic UI components (Buttons, Badge, etc.)
│   └── SplashScreen.tsx # Animated splash screen
├── assets/            # Static assets (images, icons)
├── App.tsx           # Main application component
└── index.tsx         # Application entry point
```

## Key Components

### SplashScreen
- Animated entrance with image loading
- Fallback content if image fails to load
- Automatic transition after 3 seconds
- Session-based display logic

### ErrorBoundary
- Catches and handles React errors gracefully
- Provides user-friendly error messages
- Reload functionality for recovery

### LoadingSpinner
- Reusable loading component
- Multiple size variants
- Customizable colors

## Performance Optimizations

- **Code Splitting**: Vendor and framer-motion chunks
- **Lazy Loading**: Suspense boundaries for better UX
- **Image Optimization**: Proper image loading with error handling
- **Bundle Optimization**: Terser minification and source map control

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Troubleshooting

### Splash Screen Not Showing
- Clear browser session storage
- Check browser console for errors
- Ensure all dependencies are installed

### Build Issues
- Clear `node_modules` and reinstall
- Check TypeScript configuration
- Verify Vite configuration

### Performance Issues
- Check bundle analyzer output
- Optimize image sizes
- Review component re-renders

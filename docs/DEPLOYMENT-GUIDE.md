# 🚀 Deployment Guide

## Pre-Deployment Checklist

### ✅ Code Quality
- [ ] All TypeScript errors resolved
- [ ] ESLint warnings addressed
- [ ] Build process completes successfully
- [ ] All tests passing
- [ ] Performance optimizations applied

### ✅ Assets & Resources
- [ ] Images optimized for web
- [ ] Audio files compressed
- [ ] Fonts properly loaded
- [ ] Favicon and manifest configured
- [ ] SEO metadata complete

### ✅ Functionality Testing
- [ ] Desktop layout tested (1920x1080, 1366x768)
- [ ] Mobile layout tested (iPhone, Android)
- [ ] Tablet layout tested (iPad)
- [ ] Touch interactions verified
- [ ] Audio feedback working
- [ ] Theme switching functional
- [ ] Error boundaries tested

### ✅ Performance
- [ ] Lighthouse score > 90
- [ ] Core Web Vitals optimized
- [ ] Bundle size analyzed
- [ ] Lazy loading implemented
- [ ] Image optimization verified

## Build Commands

### Development
\`\`\`bash
npm run dev          # Start development server
npm run lint         # Run ESLint
npm run type-check   # TypeScript checking
\`\`\`

### Production
\`\`\`bash
npm run build        # Create production build
npm run start        # Start production server
npm run analyze      # Analyze bundle size
\`\`\`

## Environment Variables

### Required Variables
\`\`\`env
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://greanworld.com
\`\`\`

### Optional Variables
\`\`\`env
NEXT_PUBLIC_ANALYTICS_ID=your-analytics-id
NEXT_PUBLIC_SENTRY_DSN=your-sentry-dsn
\`\`\`

## Deployment Platforms

### Vercel (Recommended)
1. Connect GitHub repository
2. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`
3. Set environment variables
4. Deploy

### Netlify
1. Connect repository
2. Build settings:
   - Build command: `npm run build && npm run export`
   - Publish directory: `out`
3. Configure redirects in `netlify.toml`

### Self-Hosted
1. Build application: `npm run build`
2. Copy `.next` folder to server
3. Install dependencies: `npm install --production`
4. Start with PM2: `pm2 start npm --name "greanworld" -- start`

## Performance Monitoring

### Metrics to Track
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Cumulative Layout Shift (CLS)
- First Input Delay (FID)
- Time to Interactive (TTI)

### Monitoring Tools
- Google Analytics
- Vercel Analytics
- Sentry for error tracking
- Lighthouse CI for automated testing

## Security Considerations

### Headers
\`\`\`javascript
// next.config.js
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  }
]
\`\`\`

### Content Security Policy
\`\`\`javascript
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: blob:;
  font-src 'self';
  connect-src 'self';
`
\`\`\`

## Post-Deployment

### Verification Steps
1. [ ] Site loads correctly
2. [ ] All pages accessible
3. [ ] Mobile responsiveness working
4. [ ] Contact information displays
5. [ ] QR code scannable
6. [ ] Audio feedback functional
7. [ ] Theme switching works
8. [ ] Performance metrics acceptable

### Monitoring Setup
1. Configure uptime monitoring
2. Set up error alerting
3. Monitor performance metrics
4. Track user analytics
5. Monitor Core Web Vitals

## Rollback Plan

### Quick Rollback
1. Revert to previous deployment
2. Verify functionality
3. Investigate issues
4. Apply fixes
5. Redeploy

### Emergency Contacts
- Technical Lead: [contact info]
- DevOps Team: [contact info]
- Project Manager: [contact info]

## Maintenance

### Regular Tasks
- [ ] Update dependencies monthly
- [ ] Review performance metrics weekly
- [ ] Check error logs daily
- [ ] Backup configuration files
- [ ] Update documentation as needed

### Security Updates
- Monitor for security advisories
- Apply critical updates immediately
- Test updates in staging first
- Document all changes

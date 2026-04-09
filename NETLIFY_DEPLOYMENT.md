# Viral Games Hub - Netlify Deployment Guide

## 🚀 Quick Deploy to Netlify

### Option 1: Git-based Deployment (Recommended)
1. Push your code to GitHub/GitLab
2. Connect your repository to Netlify
3. Netlify will automatically detect and use the `netlify.toml` configuration

### Option 2: Manual Deploy
1. Run `npm run build` locally
2. Drag and drop the `dist` folder to Netlify's deploy area

## ⚙️ Netlify Configuration

The app is pre-configured with:
- **Build Command**: `npm run build`
- **Publish Directory**: `dist`
- **SPA Redirects**: All routes redirect to `index.html`
- **Node Version**: 18

## 🌐 Environment Variables (Optional)

If you add server-side features later, you can configure environment variables in Netlify's dashboard.

## 📱 Post-Deployment Checklist

- [ ] Test all pages and navigation
- [ ] Verify mobile responsiveness
- [ ] Check that all images load properly
- [ ] Test the AI scanner functionality
- [ ] Verify social sharing works
- [ ] Check that ads load (if applicable)

## 🔧 Troubleshooting

**Common Issues:**
- **404 on refresh**: Fixed with SPA redirects
- **Slow loading**: Enable Netlify's asset optimization
- **Missing assets**: Ensure all files are in the `dist` folder

**Performance Tips:**
- Enable Netlify's form handling if you add contact forms
- Use Netlify's CDN for global distribution
- Consider Netlify Functions for any backend APIs

---

🎉 **Your app is ready for deployment!**
# Deployment Guide

## Quick Start

The website is 100% static HTML/CSS/JS and can be deployed anywhere.

## Testing Locally

### Method 1: Direct Browser Open
1. Navigate to the project folder
2. Double-click `index.html`
3. Website opens in your default browser

### Method 2: Local Server (Recommended)
```bash
# Using Python
python -m http.server 8000

# Using Node.js (if http-server is installed)
npx http-server -p 8000

# Using PHP
php -S localhost:8000
```

Then open: `http://localhost:8000`

## Deploy to Netlify

### Option A: Drag & Drop
1. Go to [netlify.com](https://netlify.com)
2. Sign up/login
3. Drag the entire folder onto the dashboard
4. Done! You'll get a URL like: `https://yoursite.netlify.app`

### Option B: CLI
```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

## Deploy to Vercel

```bash
npm install -g vercel
vercel login
vercel --prod
```

Or use the Vercel dashboard and import the folder.

## Deploy to GitHub Pages

1. Create a new repository on GitHub
2. Push your code:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/blueprxnt.git
git push -u origin main
```

3. Go to repository Settings → Pages
4. Select "main" branch
5. Save and wait for deployment
6. Site will be live at: `https://yourusername.github.io/blueprxnt`

## Deploy to AWS S3

1. Create an S3 bucket
2. Enable static website hosting
3. Upload all files maintaining folder structure
4. Set bucket policy for public access:
```json
{
  "Version": "2012-10-17",
  "Statement": [{
    "Sid": "PublicReadGetObject",
    "Effect": "Allow",
    "Principal": "*",
    "Action": "s3:GetObject",
    "Resource": "arn:aws:s3:::your-bucket-name/*"
  }]
}
```

## Deploy to Traditional Web Host (cPanel, etc.)

1. Connect via FTP/SFTP or use File Manager
2. Navigate to `public_html` or `www` directory
3. Upload all files and folders
4. Ensure folder structure is maintained:
   ```
   public_html/
   ├── index.html
   ├── css/
   │   └── styles.css
   └── js/
       └── script.js
   ```
5. Access via your domain

## Deploy to Cloudflare Pages

1. Go to [pages.cloudflare.com](https://pages.cloudflare.com)
2. Connect your GitHub repository
3. Configure build settings:
   - Build command: (leave empty)
   - Build output directory: `/`
4. Deploy

## Performance Optimization (Post-Deployment)

### Enable Gzip Compression
Most hosts enable this automatically. If not, add to `.htaccess`:
```apache
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css text/javascript application/javascript
</IfModule>
```

### Add Caching Headers
```apache
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType text/html "access plus 1 hour"
</IfModule>
```

### CDN Integration
- CloudFlare (free tier available)
- AWS CloudFront
- Google Cloud CDN

### SSL Certificate
Most modern hosts provide free SSL via Let's Encrypt. Always enable HTTPS.

## Custom Domain Setup

1. Purchase domain from registrar (Namecheap, GoDaddy, etc.)
2. Update DNS settings:
   - For Netlify/Vercel: Add their nameservers
   - For traditional hosting: Point A record to server IP
3. Wait for DNS propagation (up to 48 hours)
4. Enable SSL certificate

## Post-Deployment Checklist

- [ ] Test on mobile devices
- [ ] Test on different browsers
- [ ] Verify all links work
- [ ] Check navigation menu
- [ ] Test smooth scrolling
- [ ] Verify mobile menu toggle
- [ ] Check animations/interactions
- [ ] Test form submissions (if added)
- [ ] Verify SSL/HTTPS
- [ ] Test page load speed
- [ ] Check console for errors
- [ ] Validate HTML/CSS

## Monitoring

### Google Analytics (Optional)
Add before `</head>` in index.html:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Uptime Monitoring
- UptimeRobot (free)
- Pingdom
- StatusCake

## Troubleshooting

### Styles not loading
- Check file paths are correct
- Verify folder structure maintained
- Clear browser cache

### JavaScript not working
- Check browser console for errors
- Verify script.js path is correct
- Ensure file was uploaded

### Mobile menu not working
- Verify JavaScript loaded correctly
- Check for console errors
- Test on different devices

## Need Help?

- Check browser console for errors (F12)
- Verify all files uploaded correctly
- Test locally first before deploying
- Ensure folder structure matches exactly

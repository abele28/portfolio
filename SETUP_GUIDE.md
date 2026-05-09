# Ellie's Portfolio - Setup & Deployment Guide

## Project Structure

```
your-project/
├── app/
│   ├── page.tsx           (main page - renders your portfolio)
│   ├── layout.tsx         (root layout with metadata)
│   ├── globals.css        (global styles & Tailwind imports)
│   └── portfolio.jsx      (main portfolio component)
├── public/                (static assets - images, favicons, etc.)
├── package.json
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
└── .gitignore
```

## Step 1: Local Setup

### Prerequisites
- Node.js 18+ installed
- Git installed
- Your domain already purchased (you mentioned you have one)

### Installation

1. **Create a new Next.js project:**
   ```bash
   npx create-next-app@latest portfolio --typescript --tailwind --app
   cd portfolio
   ```

2. **Copy the files I've provided into your project:**
   - Replace `app/page.tsx` with the `page.tsx` file I created
   - Replace `app/layout.tsx` with the `layout.tsx` file
   - Create `app/globals.css` and copy the content
   - Create `app/portfolio.jsx` and copy the component code
   - Replace `package.json` with the one provided
   - Replace `tailwind.config.js` and `postcss.config.js`
   - Copy `next.config.js`

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Run locally:**
   ```bash
   npm run dev
   ```
   Visit `http://localhost:3000` to see your portfolio

## Step 2: Customize Before Deploying

### Essential Changes:

1. **Update contact links in the portfolio component:**
   - Find the email link: `href="mailto:hello@example.com"`
   - Replace with your actual email
   - Update LinkedIn and GitHub URLs

2. **Update project descriptions:**
   The projects array contains your project data. Customize:
   - `title`: Project name
   - `subtitle`: Where/context
   - `description`: What you did (keep it specific and impact-focused)
   - `impact`: The outcome or achievement
   - `tags`: Technologies used
   - `color`: Gradient colors (from-color to-color using Tailwind)
   - `icon`: Emoji representing the project

3. **Update skills section:**
   The `skills` object contains your skill categories. Update to match your actual expertise.

4. **Add images (optional but recommended):**
   - Create a `public/` folder in your project root
   - Add project images, your headshot, or logos
   - You can update the component to display images alongside projects

5. **Update metadata:**
   In `layout.tsx`, update:
   ```typescript
   export const metadata: Metadata = {
     title: 'Your Name - Your Title',
     description: 'Your elevator pitch',
   };
   ```

## Step 3: Deploy to Vercel

### Option A: Using Vercel Dashboard (Easiest)

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio commit"
   git remote add origin https://github.com/yourusername/portfolio.git
   git push -u origin main
   ```

2. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Click "Deploy"
   - Vercel will automatically build and deploy

### Option B: Using Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```
   Follow the prompts and Vercel will guide you through setup.

## Step 4: Connect Your Custom Domain

1. **In Vercel Dashboard:**
   - Go to your project settings → Domains
   - Click "Add Domain"
   - Enter your domain name (e.g., `yourname.com`)

2. **Update DNS settings with your domain registrar:**
   - Vercel will show you the DNS records to add
   - This depends on where you bought the domain
   - Common registrars: Namecheap, GoDaddy, Google Domains
   - Add the DNS records Vercel provides

3. **Verify:**
   - Wait 5-30 minutes for DNS to propagate
   - Your portfolio will be live at your custom domain

## Step 5: Ongoing Updates

Since this is a Git + Vercel setup, updates are simple:

1. **Make changes locally:**
   ```bash
   # Edit files
   git add .
   git commit -m "Update project descriptions"
   git push
   ```

2. **Vercel automatically redeploys:**
   - Every push to main triggers a new deployment
   - Takes ~30-60 seconds
   - You'll see deployment status in Vercel dashboard

## Performance & SEO

Your portfolio includes:
- ✅ Meta tags for social sharing (Open Graph)
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Fast load times (Next.js optimization)
- ✅ Clean, semantic HTML
- ✅ Accessibility-friendly markup

## Design Details

The aesthetic is intentionally:
- **Dark theme with orange accents** - Modern tech aesthetic matching aerospace vibes
- **Asymmetric layouts** - Not cookie-cutter, breaks expectations
- **Smooth animations** - Scroll indicators, hover states, gradient reveals
- **Strong typography** - Bold headers, readable body text
- **Purposeful whitespace** - Breathing room, not cramped

## Customization Ideas

If you want to go deeper:

1. **Add project images:**
   - Upload to `public/projects/`
   - Import in component: `<img src="/projects/rover.jpg" />`

2. **Add a blog:**
   - Create `app/blog/` route
   - Use MDX for blog posts

3. **Add contact form:**
   - Use Vercel's serverless functions
   - Or integrate with Formspree or Typeform

4. **Dark/Light toggle:**
   - Add next-themes package
   - Toggle between themes with localStorage

5. **Animation library:**
   - Install Framer Motion: `npm install framer-motion`
   - More sophisticated scroll animations

## Troubleshooting

**Build fails:**
```bash
npm install    # Ensure all deps installed
npm run build  # Test build locally
```

**Styling looks wrong:**
- Clear `.next` folder: `rm -rf .next`
- Rebuild: `npm run build`

**Domain not working:**
- Check DNS propagation: [whatsmydns.net](https://whatsmydns.net)
- May take up to 48 hours (usually faster)

---

You now have a production-grade portfolio that will impress hiring managers. The code is clean, the design is distinctive, and it's built on modern tech (Next.js + Tailwind) that shows you can ship real applications.

Good luck with your internship applications. This portfolio + your NASA L'SPACE experience + CSWA cert is a strong package.

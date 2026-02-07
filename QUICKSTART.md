# Quick Start Guide

Get your Gatsby site up and running in minutes!

## Prerequisites

- Node.js 18.0.0 or higher
- npm (comes with Node.js)

## Installation Steps

### 1. Install Dependencies

```bash
npm install
```

This will install all required packages including:
- Gatsby
- React
- TypeScript
- Tailwind CSS
- Image processing plugins

### 2. Start Development Server

```bash
npm run dev
```

Your site will be available at:
- **Local:** http://localhost:8000
- **GraphQL Playground:** http://localhost:8000/___graphql

### 3. Make Your First Edit

Open `src/pages/index.tsx` and modify the Hero component to see changes in real-time with hot reloading.

## Project Structure

```
src/
├── components/     # Reusable React components
│   ├── Layout.tsx  # Main layout wrapper
│   ├── Header.tsx  # Navigation header
│   ├── Footer.tsx  # Site footer
│   ├── Hero.tsx    # Hero section
│   └── Features.tsx # Features section
├── hooks/          # Custom hooks for GraphQL queries
│   └── useSiteMetadata.ts
├── pages/          # Page components (auto-routed)
│   ├── index.tsx   # Homepage (/)
│   ├── about.tsx   # About page (/about)
│   ├── contact.tsx # Contact page (/contact)
│   └── 404.tsx     # 404 error page
├── templates/      # Templates for programmatic pages
│   └── BlogPost.tsx # Example blog post template
├── styles/         # Global styles
│   └── global.css  # Tailwind directives
├── types/          # TypeScript type definitions
│   └── index.ts
└── images/         # Image assets
```

## Common Tasks

### Create a New Page

1. Create a new file in `src/pages/`:

```tsx
// src/pages/services.tsx
import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { Layout } from "@/components/Layout";

function ServicesPage(props: PageProps) {
  return (
    <Layout>
      <h1>Our Services</h1>
    </Layout>
  );
}

export default ServicesPage;

export const Head: HeadFC = () => <title>Services</title>;
```

2. The page is automatically available at `/services`

### Create a New Component

1. Create a new file in `src/components/`:

```tsx
// src/components/Button.tsx
import * as React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export function Button({ children, onClick }: ButtonProps) {
  return (
    <button onClick={onClick} className="btn-primary">
      {children}
    </button>
  );
}
```

2. Import and use it in your pages or components:

```tsx
import { Button } from "@/components/Button";

<Button onClick={() => console.log("Clicked!")}>
  Click Me
</Button>
```

### Query Data with GraphQL

1. Open GraphQL Playground at http://localhost:8000/___graphql
2. Write and test your query
3. Use it in your component:

```tsx
import { useStaticQuery, graphql } from "gatsby";

function MyComponent() {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);
  
  return <div>{data.site.siteMetadata.title}</div>;
}
```

### Style with Tailwind

Use Tailwind utility classes:

```tsx
<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
  <h1 className="text-4xl font-bold text-primary-600 mb-4">
    Hello World
  </h1>
  <p className="text-lg text-gray-600">
    Welcome to Tailwind CSS
  </p>
</div>
```

## Build for Production

```bash
npm run build
```

This creates an optimized production build in the `public/` directory.

### Preview Production Build

```bash
npm run serve
```

Your production site will be available at http://localhost:9000

## Next Steps

1. **Customize Site Metadata:** Edit `gatsby-config.ts`
2. **Add an Icon:** Create `src/images/icon.png` (512x512) and uncomment the icon line in `gatsby-config.ts`
3. **Update Styling:** Modify `tailwind.config.js` to customize colors, fonts, etc.
4. **Add More Pages:** Create new files in `src/pages/`
5. **Deploy:** Choose a hosting platform (Gatsby Cloud, Netlify, Vercel)

## Troubleshooting

### Port Already in Use

If port 8000 is already in use:

```bash
npm run dev -- -p 3000
```

### Clear Cache

If you encounter issues:

```bash
npm run clean
npm install
npm run dev
```

### TypeScript Errors

Run type checking:

```bash
npm run type-check
```

## Learn More

- [Gatsby Documentation](https://www.gatsbyjs.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Documentation](https://react.dev)

## Need Help?

- Check the main [README.md](./README.md) for more details
- Visit [Gatsby's GitHub Discussions](https://github.com/gatsbyjs/gatsby/discussions)
- Join the [Gatsby Discord](https://gatsby.dev/discord)





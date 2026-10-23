This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Adding your own photos and videos

Drop files into these folders inside `public/`. No code changes are needed.

| Folder | What it does |
| --- | --- |
| `public/menu/` | Menu photos. A file named after an item replaces that item's photo (`meat-pies.jpg`, `Banana Bread.webp`, `custom-cake-2.jpg`). Any other file becomes its own menu card, named after the file (`04_chin-chin.jpg` becomes "Chin Chin"). |
| `public/gallery/` | Gallery photos. They fill the gallery page (first 12), the home hero carousel and the photo band above the footer. Until you add some, the menu photos and then the placeholder images are used. |
| `public/creators/` | Creator spotlight videos (`mp4`, `webm`, `m4v`, `mov`, vertical works best). An optional image with the same name (`ada-okafor.jpg`) is the thumbnail. Add a name, handle, link and quote in `app/creators.ts`. |

The folder names live at the top of `app/media.ts` if you want different ones.

import fs from "node:fs";
import path from "node:path";
import { CREATOR_DETAILS, type CreatorDetails } from "./creators";
import { CATEGORIES, MENU, type MenuItem } from "./menu-data";

/* ------------------------------------------------------------------
   Photos and videos you add yourself. Drop files into these folders
   inside /public and the site picks them up, no code changes needed.

     public/menu      menu photos. A file named after an item replaces that
                      item's photo (meat-pies.jpg, "Banana Bread.webp"...).
                      Any other file becomes its own card, named after the file.
     public/gallery   gallery photos. They also feed the hero and the photo
                      band above the footer.
     public/creators  creator spotlight videos (plus an optional poster).

   Reads are synchronous and happen while the page is prerendered, so
   they are part of the static output.
   ------------------------------------------------------------------ */
export const MENU_DIR = "menu";
export const GALLERY_DIR = "gallery";
export const CREATORS_DIR = "creators";
/** How many photos the gallery page shows before "see more on Instagram". */
export const GALLERY_PAGE_LIMIT = 12;

const IMAGE = /\.(jpe?g|png|webp|avif|gif)$/i;
const VIDEO = /\.(mp4|webm|m4v|mov)$/i;

type Found = { file: string; src: string; base: string };

function list(dir: string, ext: RegExp): Found[] {
  try {
    return fs
      .readdirSync(path.join(process.cwd(), "public", dir), { withFileTypes: true })
      .filter((entry) => entry.isFile() && !entry.name.startsWith(".") && ext.test(entry.name))
      .map((entry) => ({
        file: entry.name,
        src: `/${dir}/${encodeURIComponent(entry.name)}`,
        base: entry.name.replace(/\.[^.]+$/, ""),
      }))
      .sort((a, b) => a.file.localeCompare(b.file, undefined, { numeric: true, sensitivity: "base" }));
  } catch {
    return [];
  }
}

/** "Meat Pies 2" and "meat-pie" both become "meatpie", so names match loosely. */
function key(value: string) {
  return value
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(Boolean)
    .map((word) => word.replace(/s$/, ""))
    .join("")
    .replace(/\d+$/, "");
}

function matches(fileKey: string, itemKeys: string[]) {
  return itemKeys.some(
    (itemKey) =>
      fileKey === itemKey ||
      (fileKey.length >= 3 && (itemKey.includes(fileKey) || fileKey.includes(itemKey))),
  );
}

/** "04-banana_bread" becomes "Banana Bread". Names that already have capitals are kept. */
function label(base: string) {
  const words = base
    .replace(/^\d+[-_.\s]+/, "")
    .replace(/[-_]+/g, " ")
    .trim();
  if (/[A-Z]/.test(words)) return words;
  return words.replace(/\b[a-z]/g, (letter) => letter.toUpperCase());
}

/* ---------- menu ---------- */

/** The menu, with photos from /public/menu swapped in where a file name matches. */
export function getMenu(): MenuItem[] {
  const photos = list(MENU_DIR, IMAGE);
  const used = new Set<string>();

  const items = MENU.map((item) => {
    const itemKeys = [key(item.id), key(item.name)];
    const hits = photos.filter((photo) => !used.has(photo.file) && matches(key(photo.base), itemKeys));
    hits.forEach((photo) => used.add(photo.file));
    /* An exact name beats a loose match. */
    const best = hits.find((photo) => itemKeys.includes(key(photo.base))) ?? hits[0];
    return best ? { ...item, img: best.src } : item;
  });

  const extras: MenuItem[] = photos
    .filter((photo) => !used.has(photo.file))
    .map((photo) => ({
      id: `photo-${key(photo.base) || photo.file}`,
      name: label(photo.base),
      group: "More from the oven",
      blurb: "",
      img: photo.src,
      alt: `${label(photo.base)} from La Crave`,
    }));

  return [...items, ...extras];
}

/** The home page category cards, using a menu photo when one has been added. */
export function getCategories() {
  const menu = getMenu();
  return CATEGORIES.map((category) => {
    const photo = menu.find((item) => item.id === category.itemId)?.img;
    return photo?.startsWith(`/${MENU_DIR}/`) ? { ...category, img: photo } : category;
  });
}

/* ---------- gallery ---------- */

export type GalleryImage = { src: string; alt: string };

/** Shown until real photos are added, so the carousels are never empty. */
const PLACEHOLDER_GALLERY = [
  "/images/hero-storefront.jpg",
  "/images/about-cafe.jpg",
  "/images/parallax-baker.jpg",
  "/images/cat-cakes.jpg",
  "/images/cat-meat-pies.jpg",
  "/images/item-pastry-box.jpg",
  "/images/item-brownies.jpg",
  "/images/cat-breads.jpg",
];

/** Gallery photos, falling back to the menu photos and then to the placeholders. */
export function getGallery(): GalleryImage[] {
  const own = list(GALLERY_DIR, IMAGE);
  const source = own.length ? own : list(MENU_DIR, IMAGE);
  const srcs = source.length ? source.map((photo) => photo.src) : PLACEHOLDER_GALLERY;
  return srcs.map((src, index) => ({ src, alt: `La Crave bakery photo ${index + 1}` }));
}

/* ---------- creators ---------- */

export type Creator = CreatorDetails & {
  id: string;
  name: string;
  /** Undefined for the "coming soon" placeholder cards. */
  video?: string;
  poster?: string;
};

export function getCreators(): Creator[] {
  const videos = list(CREATORS_DIR, VIDEO);
  if (!videos.length) {
    return [1, 2, 3].map((n) => ({ id: `soon-${n}`, name: "" }));
  }
  const posters = list(CREATORS_DIR, IMAGE);
  return videos.map((video) => {
    const details = CREATOR_DETAILS[video.base] ?? {};
    const poster = posters.find((image) => key(image.base) === key(video.base));
    return {
      id: video.file,
      name: details.name ?? label(video.base),
      ...details,
      video: video.src,
      poster: poster?.src,
    };
  });
}

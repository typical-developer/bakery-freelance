export type MenuItem = {
  id: string;
  name: string;
  group: string;
  blurb: string;
  /** Naira, formatted. Leave undefined to show "Message for price". */
  price?: string;
  img: string;
  alt: string;
};

export const MENU: MenuItem[] = [
  {
    id: "meat-pies",
    name: "Meat Pies",
    group: "Savoury",
    blurb: "Golden, flaky and generously filled. The one everybody orders by the tray.",
    img: "/images/cat-meat-pies.jpg",
    alt: "A tray of golden La Crave meat pies",
  },
  {
    id: "pastry-box",
    name: "Pastry Box",
    group: "Savoury",
    blurb: "An assorted box of our flaky bakes, packed with care and ready to share.",
    price: "7,500",
    img: "/images/item-pastry-box.jpg",
    alt: "A box of assorted La Crave pastries",
  },
  {
    id: "custom-cake",
    name: "Custom Cake",
    group: "Cakes",
    blurb: "Birthdays, weddings and everything in between, built around your moment.",
    price: "25,000",
    img: "/images/item-cake.jpg",
    alt: "A custom La Crave celebration cake",
  },
  {
    id: "banana-bread",
    name: "Banana Bread",
    group: "Loaves and squares",
    blurb: "A comforting, soft loaf that is dangerously easy to finish in one sitting.",
    img: "/images/cat-breads.jpg",
    alt: "Banana bread fresh out of the oven",
  },
  {
    id: "brownies",
    name: "Brownies",
    group: "Loaves and squares",
    blurb: "Rich, fudgy squares that melt in your mouth.",
    price: "5,000",
    img: "/images/item-brownies.jpg",
    alt: "A box of fudgy La Crave brownies",
  },
];

export const FEATURED_IDS = ["pastry-box", "custom-cake", "brownies"];

export const CATEGORIES = [
  {
    title: "Meat pies",
    body: "Golden, flaky and generously filled. The one everybody orders by the tray.",
    img: "/images/cat-meat-pies.jpg",
    alt: "A tray of golden La Crave meat pies",
  },
  {
    title: "Custom cakes",
    body: "Birthdays, weddings and everything in between, built around your moment.",
    img: "/images/cat-cakes.jpg",
    alt: "A custom celebration cake by La Crave",
  },
  {
    title: "Banana bread and brownies",
    body: "Comforting loaves and rich, fudgy squares that melt in your mouth.",
    img: "/images/cat-breads.jpg",
    alt: "Banana bread and brownies fresh out of the oven",
  },
];

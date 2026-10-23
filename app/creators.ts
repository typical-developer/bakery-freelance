/** Optional details for the content-creator spotlight.
 *
 *  Drop vertical videos in /public/creators (mp4, webm, m4v or mov). Each
 *  file becomes a card. The key below is the file name without its extension,
 *  so "ada-okafor.mp4" is described by "ada-okafor". Everything is optional:
 *  with no entry the name is made from the file name.
 *
 *  A poster image with the same name (ada-okafor.jpg) is used as the
 *  thumbnail while the video loads. */
export type CreatorDetails = {
  name?: string;
  /** e.g. "@adaeats" */
  handle?: string;
  /** Link for the handle, usually their Instagram or TikTok. */
  href?: string;
  /** One short line, shown under the video. */
  quote?: string;
};

export const CREATOR_DETAILS: Record<string, CreatorDetails> = {
  // "ada-okafor": {
  //   name: "Ada Okafor",
  //   handle: "@adaeats",
  //   href: "https://www.instagram.com/adaeats/",
  //   quote: "The meat pies are gone before I finish filming.",
  // },
};

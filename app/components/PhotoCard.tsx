import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  img: string;
  alt: string;
  sizes: string;
  href?: string;
  external?: boolean;
  tag?: string;
  cursorTag?: string;
  flip?: boolean;
  reveal?: boolean;
  priority?: boolean;
  children?: ReactNode;
};

/** The one card used across the site: paper stack, tape, photo, then content. */
export default function PhotoCard({
  img,
  alt,
  sizes,
  href,
  external,
  tag,
  cursorTag,
  flip,
  reveal = true,
  priority,
  children,
}: Props) {
  const className = `photo-card${flip ? " photo-card--alt" : ""}`;
  const motion = {
    ...(reveal ? { "data-reveal": "" } : {}),
    ...(cursorTag ? { "data-cursor-tag": "" } : {}),
  };
  const content = (
    <>
      <span className="washi" aria-hidden="true" />
      <div className="photo-card-inner">
        <div className="photo-card-media">
          <Image src={img} alt={alt} fill sizes={sizes} priority={priority} />
          {tag ? <span className="tag">{tag}</span> : null}
        </div>
        {children}
      </div>
      {cursorTag ? (
        <span className="cursor-tag" aria-hidden="true">
          {cursorTag}
        </span>
      ) : null}
    </>
  );

  if (!href) {
    return (
      <div className={className} {...motion}>
        {content}
      </div>
    );
  }
  if (external) {
    return (
      <a className={className} href={href} target="_blank" rel="noreferrer" {...motion}>
        {content}
      </a>
    );
  }
  return (
    <Link className={className} href={href} {...motion}>
      {content}
    </Link>
  );
}

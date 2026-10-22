import Image from "next/image";
import { LOGO } from "../site";

/** The real La Crave logo, kept at its true 1571 x 636 proportions. Size it
    with CSS height (or width); the aspect ratio follows. */
export default function Logo({
  className,
  sizes,
  priority,
}: {
  className?: string;
  sizes: string;
  priority?: boolean;
}) {
  return (
    <Image
      className={className}
      src={LOGO.src}
      width={LOGO.width}
      height={LOGO.height}
      sizes={sizes}
      alt="La Crave"
      priority={priority}
    />
  );
}

import type { ReactNode } from "react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa6";
import { INSTAGRAM, WHATSAPP } from "../site";

/** A button that opens WhatsApp or Instagram, with the real brand logo and
    the network's own colour (WhatsApp green, Instagram gradient). */
export default function SocialButton({
  network,
  children,
  className,
  tabIndex,
}: {
  network: "whatsapp" | "instagram";
  children: ReactNode;
  className?: string;
  tabIndex?: number;
}) {
  const Icon = network === "whatsapp" ? FaWhatsapp : FaInstagram;
  return (
    <a
      href={network === "whatsapp" ? WHATSAPP : INSTAGRAM}
      target="_blank"
      rel="noreferrer"
      className={`btn btn--${network}${className ? ` ${className}` : ""}`}
      tabIndex={tabIndex}
    >
      <Icon className="btn-icon" aria-hidden="true" />
      {children}
    </a>
  );
}

import Link from "next/link";
import { FaInstagram, FaWhatsapp } from "react-icons/fa6";
import Logo from "./Logo";
import { INSTAGRAM, WHATSAPP } from "../site";

export default function Footer() {
  return (
    <footer className="section--footer">
      <div className="container">
        <div className="footer-top">
          <Logo className="footer-logo" sizes="(min-width: 640px) 22rem, 80vw" />
          <p className="lead">Baked fresh in Port Harcourt. Same-day delivery, every day.</p>
          <ul className="footer-links">
            <li>
              <Link href="/menu">Menu</Link>
            </li>
            <li>
              <Link href="/gallery">Gallery</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <a href={WHATSAPP} target="_blank" rel="noreferrer">
                <FaWhatsapp className="link-icon" aria-hidden="true" />
                Order on WhatsApp
              </a>
            </li>
            <li>
              <a href={INSTAGRAM} target="_blank" rel="noreferrer">
                <FaInstagram className="link-icon" aria-hidden="true" />
                @lacravebakery
              </a>
            </li>
          </ul>
        </div>
        <div className="footer-base">
          <span>© 2026 La Crave Bakery</span>
          <span>Port Harcourt, Nigeria</span>
        </div>
      </div>
    </footer>
  );
}

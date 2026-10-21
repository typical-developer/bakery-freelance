import Link from "next/link";
import Wordmark from "./Wordmark";
import { INSTAGRAM, WHATSAPP } from "../site";

export default function Footer() {
  return (
    <footer className="section--footer">
      <div className="container">
        <div className="footer-top">
          <Wordmark className="footer-logo" />
          <p className="lead">Baked fresh in Port Harcourt. Same-day delivery, every day.</p>
          <ul className="footer-links">
            <li>
              <Link href="/menu">Menu</Link>
            </li>
            <li>
              <Link href="/#about">About</Link>
            </li>
            <li>
              <a href={WHATSAPP} target="_blank" rel="noreferrer">
                Order on WhatsApp
              </a>
            </li>
            <li>
              <a href={INSTAGRAM} target="_blank" rel="noreferrer">
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

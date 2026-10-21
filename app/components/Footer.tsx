import Wordmark from "./Wordmark";
import { INSTAGRAM, WHATSAPP } from "../site";

export default function Footer() {
  return (
    <footer className="section footer-bg">
      <div className="default-container">
        <div className="footer-logo-wrapper">
          <Wordmark className="footer-logo" />
        </div>
        <div className="space-2xl" />
        <div className="footer-links-wrapper">
          <div className="body-sm">
            Order on{" "}
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noreferrer"
              className="footer-link"
            >
              WhatsApp
            </a>
          </div>
          <div className="body-sm">
            Follow{" "}
            <a
              href={INSTAGRAM}
              target="_blank"
              rel="noreferrer"
              className="footer-link"
            >
              @lacravebakery
            </a>
          </div>
          <div className="body-sm">Same-day delivery in PH</div>
        </div>
      </div>
    </footer>
  );
}

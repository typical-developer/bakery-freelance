import Arrow from "./Arrow";
import { INSTAGRAM } from "../site";

/** "See more" under the menu and the gallery. It hands people to Instagram,
    where the full, always-current set of photos lives. */
export default function SeeMore({ label = "see more on instagram" }: { label?: string }) {
  return (
    <div className="actions" style={{ justifyContent: "center" }} data-fade>
      <a href={INSTAGRAM} target="_blank" rel="noreferrer" className="btn">
        {label}
        <Arrow />
      </a>
    </div>
  );
}

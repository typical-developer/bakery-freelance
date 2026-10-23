import CreatorVideo from "./CreatorVideo";
import PhotoCard from "./PhotoCard";
import { getCreators } from "../media";

/** Content-creator spotlight. Videos come from /public/creators (see
    app/creators.ts). Until some are added, "coming soon" cards hold the place. */
export default function CreatorSpotlight() {
  const creators = getCreators();
  return (
    <section className="section section--torn section--mint" id="creators">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow" data-fade>
            Creator spotlight
          </span>
          <h2 className="display-2" data-split>
            the creators craving la crave
          </h2>
          <p className="lead" data-fade>
            Content creators share their favourite La Crave moments. Press play,
            then place an order of your own.
          </p>
        </div>
        <div className="section-gap" />
        <div className="creator-row">
          {creators.map((creator, index) => (
            <PhotoCard
              key={creator.id}
              flip={index % 2 === 1}
              media={
                creator.video ? (
                  <CreatorVideo src={creator.video} poster={creator.poster} label={creator.name} />
                ) : (
                  <div className="creator-soon">
                    <span className="creator-play" aria-hidden="true">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </span>
                    <span>Video coming soon</span>
                  </div>
                )
              }
            >
              {creator.video ? (
                <div className="photo-card-body">
                  <div className="photo-card-row">
                    <h3 className="title-3">{creator.name}</h3>
                    {creator.handle ? (
                      creator.href ? (
                        <a href={creator.href} target="_blank" rel="noreferrer" className="creator-handle">
                          {creator.handle}
                        </a>
                      ) : (
                        <span className="creator-handle">{creator.handle}</span>
                      )
                    ) : null}
                  </div>
                  {creator.quote ? <p className="small">{creator.quote}</p> : null}
                </div>
              ) : null}
            </PhotoCard>
          ))}
        </div>
      </div>
    </section>
  );
}

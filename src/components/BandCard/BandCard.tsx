import React from 'react';
import './BandCard.css';

type BandCardProps = {
  name: string;
  festivals: string[];
};

function BandCard({
  name,
  festivals,
}: BandCardProps): React.ReactElement<BandCardProps> | null {
  // Render nothing if band name is missing
  if (typeof name !== 'string' || name.length === 0) return null;

  return (
    <div className="BandCard">
      <h3 id="band-heading" className="BandCard-name">
        {name}
      </h3>
      {festivals && festivals.length > 0 ? (
        <ul
          aria-label="festivals"
          aria-labelledby="band-heading"
          className="BandCard-festivals"
        >
          {festivals.sort().map((festival: string) => (
            <li key={festival}>{festival}</li>
          ))}
        </ul>
      ) : (
        <p className="BandCard-festivals-placeholder">No festivals found</p>
      )}
    </div>
  );
}

export default BandCard;

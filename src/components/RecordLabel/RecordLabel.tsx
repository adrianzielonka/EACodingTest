import React from 'react';
import './RecordLabel.css';

import BandCard from '../BandCard/BandCard';

interface IBand {
  name: string;
  festivals: string[];
}

type RecordLabelProps = {
  name: string;
  bands: IBand[];
};

function RecordLabel({
  name,
  bands,
}: RecordLabelProps): React.ReactElement<RecordLabelProps> {
  return (
    <section className="RecordLabel">
      <h2 className="RecordLabel-name">{name}</h2>
      <div
        aria-label={`List of bands signed to ${name}`}
        className="RecordLabel-bands"
      >
        {bands.sort().map((band) => (
          <BandCard
            key={band.name}
            name={band.name}
            festivals={band.festivals}
          />
        ))}
      </div>
    </section>
  );
}

export default RecordLabel;

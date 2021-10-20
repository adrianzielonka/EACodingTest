import React, { useEffect, useState } from 'react';

import getFestivals from '../../data/getFestivals';
import RecordLabel from '../RecordLabel/RecordLabel';

import type { IRecordLabel } from '../../types';

type RecordLabelsProps = {};

function RecordLabels(): React.ReactElement<RecordLabelsProps> {
  const [loading, setLoading] = useState<boolean>(true);
  const [recordLabels, setRecordLabels] = useState<IRecordLabel[]>([]);

  useEffect(() => {
    async function getData() {
      const data = await getFestivals();
      setRecordLabels(data);
      setLoading(false);
    }

    getData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Record Labels</h1>
      {recordLabels.length > 0 ? (
        recordLabels.map((recordLabel: IRecordLabel) => (
          <RecordLabel key={recordLabel.name} {...recordLabel} />
        ))
      ) : (
        <div>No record labels to display</div>
      )}
    </div>
  );
}

export default RecordLabels;

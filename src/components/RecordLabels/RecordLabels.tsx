import React, { useEffect, useState } from 'react';

import getFestivals from '../../data/getFestivals';
import RecordLabel from '../RecordLabel/RecordLabel';

import type { IRecordLabel, IResponse } from '../../types';

type RecordLabelsProps = {};

function RecordLabels(): React.ReactElement<RecordLabelsProps> {
  const [loading, setLoading] = useState<boolean>(true);
  const [response, setResponse] = useState<IResponse<IRecordLabel>>({
    data: [],
    status: null,
  });

  useEffect(() => {
    async function getData() {
      const response = await getFestivals();
      setResponse(response);
      setLoading(false);
    }

    getData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (response.status !== 'Success') {
    return <div>{response.status}</div>;
  }

  const recordLabels: IRecordLabel[] = response.data;

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

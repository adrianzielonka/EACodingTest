import React from 'react';
import './App.css';

import RecordLabels from './components/RecordLabels/RecordLabels';

type AppProps = {};

function App(): React.ReactElement<AppProps> {
  return (
    <div className="App">
      <RecordLabels />
    </div>
  );
}

export default App;

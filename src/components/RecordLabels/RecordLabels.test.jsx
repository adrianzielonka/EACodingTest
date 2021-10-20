import { act } from 'react-dom/test-utils';
import { render } from '@testing-library/react';

import RecordLabels from './RecordLabels';

describe('Testing RecordLabels component', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  test('should call API endpoint and render a record label', async () => {
    const festivals = [
      {
        name: 'Tomorrowland',
        bands: [
          {
            name: 'David Guetta',
            recordLabel: 'Jack Back Records',
          },
          {
            name: 'Nicky Romero',
            recordLabel: "Spinnin' Records",
          },
          {
            name: 'EDX',
            recordLabel: "Spinnin' Records",
          },
        ],
      },
    ];

    jest.mock('../../data/getFestivals', () => [
      {
        name: 'Jack Back Records',
        bands: [
          {
            name: 'David Guetta',
            festivals: ['Tomorrowland'],
          },
        ],
      },
      {
        name: "Spinnin' Records",
        bands: [
          {
            name: 'EDX',
            festivals: ['Tomorrowland'],
          },
          {
            name: 'Nicky Romero',
            festivals: ['Tomorrowland'],
          },
        ],
      },
    ]);

    await act(async () => {
      render(<RecordLabels />, container);
    });

    expect(container.querySelector('h1')).toHaveTextContent('Record Labels');
  });
});

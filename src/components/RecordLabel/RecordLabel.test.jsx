import { render } from '@testing-library/react';
import RecordLabel from './RecordLabel';

describe('Testing RecordLabel component', () => {
  test('should render a record label and lexicographic list of 2 bands', () => {
    const { getByLabelText, getByRole } = render(
      <RecordLabel
        name="Epic Records"
        bands={[
          {
            name: 'Timmy Trumpet',
            festivals: ['Sterosonic', 'Tomorrowland', 'EDC Las Vegas'],
          },
          {
            name: 'David Guetta',
            festivals: ['Ultra Music Festival', 'Tomorrowland'],
          },
        ]}
      />
    );

    const heading = getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent('Epic Records');

    const bands = getByLabelText(/List of bands signed to/i);
    expect(bands.children).toHaveLength(2);

    // Add expect to check order of bands rendered
  });

  test('should render a record label and but show 1 band only', () => {
    const { getByLabelText, getByRole } = render(
      <RecordLabel
        name="Epic Records"
        bands={[
          {
            name: '',
            festivals: ['Sterosonic', 'Tomorrowland', 'EDC Las Vegas'],
          },
          {
            name: 'David Guetta',
            festivals: ['Ultra Music Festival', 'Tomorrowland'],
          },
        ]}
      />
    );

    const heading = getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent('Epic Records');

    const bands = getByLabelText(/List of bands signed to/i);
    expect(bands.children).toHaveLength(1);
  });
});

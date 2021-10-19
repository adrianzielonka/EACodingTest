import { render, within } from '@testing-library/react';
import BandCard from './BandCard';

describe('Test BandCard component', () => {
  test('should render a band name and lexicographic list of festivals', () => {
    const { getByRole } = render(
      <BandCard
        name="David Guetta"
        festivals={[
          'Tomorrowland',
          'Ultra Music Festival',
          'Stereosonic',
          'EDC Las Vegas',
        ]}
      />
    );

    const heading = getByRole('heading', { level: 3 });
    expect(heading).toHaveTextContent('David Guetta');

    const list = getByRole('list', { name: /David Guetta/i });
    const { getAllByRole } = within(list);

    const items = getAllByRole('listitem');
    expect(items.length).toBe(4);

    const festivals = items.map((item) => item.textContent);
    expect(festivals).toEqual([
      'EDC Las Vegas',
      'Stereosonic',
      'Tomorrowland',
      'Ultra Music Festival',
    ]);
  });

  test('should render a band name and placeholder for an empty festivals list', () => {
    const { getByRole, getByText } = render(
      <BandCard name="David Guetta" festivals={[]} />
    );

    const heading = getByRole('heading', { level: 3 });
    expect(heading).toHaveTextContent('David Guetta');

    const placeholderText = getByText(/No festivals found/i);
    expect(placeholderText).toBeInTheDocument();
  });

  test('should not render due to an empty band name', () => {
    const { container } = render(
      <BandCard
        name=""
        festivals={['EDC Las Vegas', 'Tomorrowland', 'Stereosonic']}
      />
    );

    expect(container.firstChild).toBeNull();
  });
});

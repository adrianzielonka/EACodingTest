import getFestivals from './getFestivals';

describe('Test getFestivals function', () => {
  test('should reorganise and sort the data', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve([
            {
              name: 'Twisted Tour',
              bands: [
                {
                  name: 'Summon',
                  recordLabel: 'Outerscope',
                },
                {
                  name: 'Auditones',
                  recordLabel: 'Marner Sis. Recording',
                },
                {
                  name: 'Squint-281',
                },
              ],
            },
          ]),
      })
    );

    const data = await getFestivals();

    expect(data).toEqual([
      {
        name: '<Uncategorised/Missing record labels>',
        bands: [
          {
            name: 'Squint-281',
            festivals: ['Twisted Tour'],
          },
        ],
      },
      {
        name: 'Marner Sis. Recording',
        bands: [
          {
            name: 'Auditones',
            festivals: ['Twisted Tour'],
          },
        ],
      },
      {
        name: 'Outerscope',
        bands: [
          {
            name: 'Summon',
            festivals: ['Twisted Tour'],
          },
        ],
      },
    ]);

    global.fetch.mockRestore();
  });

  test('should return an empty array when input is empty', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(''),
      })
    );

    const data = await getFestivals();

    expect(data).toEqual([]);

    global.fetch.mockRestore();
  });
});

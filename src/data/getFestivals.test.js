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
        ok: true,
        status: 200,
      })
    );

    const data = await getFestivals();

    expect(data).toEqual({
      status: 'Success',
      data: [
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
      ],
    });

    global.fetch.mockRestore();
  });

  test('should reorganise and sort data with a missing $.name', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve([
            {
              bands: [
                {
                  name: 'Critter Girls',
                  recordLabel: 'ACR',
                },
                {
                  name: 'Propeller',
                  recordLabel: 'Pacific Records',
                },
              ],
            },
          ]),
        ok: true,
        status: 200,
      })
    );

    const data = await getFestivals();

    expect(data).toEqual({
      status: 'Success',
      data: [
        { name: 'ACR', bands: [{ name: 'Critter Girls', festivals: [] }] },
        {
          name: 'Pacific Records',
          bands: [{ name: 'Propeller', festivals: [] }],
        },
      ],
    });

    global.fetch.mockRestore();
  });

  test('should reorganise and sort data with a missing $.bands[].name/recordLabel', async () => {
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
                {
                  recordLabel: 'Marner Sis. Recording',
                },
              ],
            },
          ]),
        ok: true,
        status: 200,
      })
    );

    const data = await getFestivals();

    expect(data).toEqual({
      status: 'Success',
      data: [
        {
          name: '<Uncategorised/Missing record labels>',
          bands: [{ name: 'Squint-281', festivals: ['Twisted Tour'] }],
        },
        {
          name: 'Marner Sis. Recording',
          bands: [{ name: 'Auditones', festivals: ['Twisted Tour'] }],
        },
        {
          name: 'Outerscope',
          bands: [{ name: 'Summon', festivals: ['Twisted Tour'] }],
        },
      ],
    });

    global.fetch.mockRestore();
  });

  test('should reorganise and sort data with an empty $.bands[].name/recordLabel', async () => {
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
                  recordLabel: '',
                },
                {
                  name: '',
                  recordLabel: 'Marner Sis. Recording',
                },
              ],
            },
          ]),
        ok: true,
        status: 200,
      })
    );

    const data = await getFestivals();

    expect(data).toEqual({
      status: 'Success',
      data: [
        {
          name: '<Uncategorised/Missing record labels>',
          bands: [{ name: 'Squint-281', festivals: ['Twisted Tour'] }],
        },
        {
          name: 'Marner Sis. Recording',
          bands: [{ name: 'Auditones', festivals: ['Twisted Tour'] }],
        },
        {
          name: 'Outerscope',
          bands: [{ name: 'Summon', festivals: ['Twisted Tour'] }],
        },
      ],
    });

    global.fetch.mockRestore();
  });

  test('should return an empty array when input is empty', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(''),
        ok: true,
        status: 200,
      })
    );

    const data = await getFestivals();

    expect(data).toEqual({ status: 'No record labels returned', data: [] });

    global.fetch.mockRestore();
  });

  test('should return an empty array when $.bands are of invalid types', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve([
            {
              name: 'Twisted Tour',
              bands: null,
            },
            {
              name: 'Twisted Tour',
              bands: [null],
            },
          ]),
        ok: true,
        status: 200,
      })
    );

    const data = await getFestivals();

    expect(data).toEqual({ status: 'Success', data: [] });

    global.fetch.mockRestore();
  });
});

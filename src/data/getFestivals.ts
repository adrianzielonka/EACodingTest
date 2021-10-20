import type {
  IEAMusicFestival,
  IEABand,
  IRecordLabel,
  IResponse,
} from '../types';

type TRecordLabelName = string;
type TBandName = string;
type TFestivalName = string;

async function getFestivals(): Promise<IResponse<IRecordLabel>> {
  try {
    const recordLabelsMap: Map<
      TRecordLabelName,
      Map<TBandName, TFestivalName[]>
    > = new Map<TRecordLabelName, Map<TBandName, TFestivalName[]>>();

    const response: Response = await fetch('codingtest/api/v1/festivals');

    if (response.status === 429) {
      return {
        data: [],
        status: 'Too many requests! Try again shortly.',
      };
    }

    if (!response.ok || response.status !== 200) {
      return {
        data: [],
        status: 'An unexpected error occured! Try again shortly.',
      };
    }

    const festivals: IEAMusicFestival = await response.json();

    // Checks if parsed response is an array
    if (Array.isArray(festivals)) {
      // Valid data processing
      festivals.forEach((festival: IEAMusicFestival) => {
        if (Array.isArray(festival.bands)) {
          festival.bands.forEach((band: IEABand) => {
            if (band && typeof band.name === 'string') {
              let recordLabelName: string =
                band.recordLabel || '<Uncategorised/Missing record labels>';

              // Checks for a valid band name
              if (band.name.length > 0) {
                const bandName: TBandName = band.name;

                // Check if 'recordLabelName' doesn't already exist
                if (!recordLabelsMap.has(recordLabelName)) {
                  recordLabelsMap.set(
                    recordLabelName,
                    new Map<TBandName, TFestivalName[]>()
                  );
                }

                // Check if 'bandName' doesn't already exist
                if (!recordLabelsMap.get(recordLabelName)?.has(bandName)) {
                  recordLabelsMap.get(recordLabelName)?.set(bandName, []);
                }

                if (festival.name && festival.name.length > 0) {
                  // Push 'festival.name' to recordLabels > bandName collection
                  recordLabelsMap
                    .get(recordLabelName)
                    ?.get(bandName)
                    ?.push(festival.name);
                }
              }
            }
          });
        }
      });

      const recordLabelNames: string[] = Array.from<TRecordLabelName>(
        recordLabelsMap.keys()
      ).sort();

      const data: IRecordLabel[] = recordLabelNames.map(
        (recordLabelName: TRecordLabelName) => {
          const bandNames: string[] = Array.from<TBandName>(
            recordLabelsMap.get(recordLabelName)?.keys() ?? []
          ).sort();

          const bands = bandNames.map((bandName: TBandName) => ({
            name: bandName,
            festivals:
              recordLabelsMap.get(recordLabelName)?.get(bandName)?.sort() ?? [],
          }));

          return {
            name: recordLabelName,
            bands,
          };
        }
      );

      return {
        data,
        status: 'Success',
      };
    } else {
      return {
        data: [],
        status: 'No record labels returned',
      };
    }
  } catch (err) {
    console.log(err);
  }

  return {
    data: [],
    status: 'Failed to parse received data! Try again shortly.',
  };
}

export default getFestivals;

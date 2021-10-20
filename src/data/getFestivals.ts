import type { IEAMusicFestival, IEABand, IRecordLabel } from '../types';

type TRecordLabelName = string;
type TBandName = string;
type TFestivalName = string;

async function getFestivals(): Promise<IRecordLabel[]> {
  try {
    const recordLabelsMap: Map<
      TRecordLabelName,
      Map<TBandName, TFestivalName[]>
    > = new Map<TRecordLabelName, Map<TBandName, TFestivalName[]>>();

    const response: Response = await fetch('codingtest/api/v1/festivals');

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

      return recordLabelNames.map((recordLabelName: TRecordLabelName) => {
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
      });
    }
  } catch (err) {
    console.log(err);
  }

  return [];
}

export default getFestivals;

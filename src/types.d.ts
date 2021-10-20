export interface IEABand {
  name: string;
  recordLabel: string;
}

export interface IEAMusicFestival {
  name: string;
  bands: IEABand[];
}

export interface IBand {
  name: string;
  festivals: string[];
}

export interface IRecordLabel {
  name: string;
  bands: IBand[];
}

export interface IResponse<TData> {
  data: TData[];
  status: string | null;
}

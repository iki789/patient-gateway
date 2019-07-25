export interface ISample{
  id: number;
  patientId: number;
  sampleType: TSample;
  date: "2016-02-12 07:34:26";
  quality: "low" | "medium" | "high";
}

type TSample = "TUMOUR" | "CIRCULATING_DNA" | "BLOOD_NORMAL";
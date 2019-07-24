export interface IVariant{
  id: number;
  sampleId: number;
  reference_base: string;
  alternativeBase: string;
  geneName: string;
  position: number;
  mutationType: string;
  alleleFrequency: number
}
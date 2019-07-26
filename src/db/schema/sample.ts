export interface ISample {
	id: number;
	patientId: number;
	sampleType: string;
	date: string;
	quality: string; // 'low' | 'medium' | 'high';
}

// type TSample = "TUMOUR" | "CIRCULATING_DNA" | "BLOOD_NORMAL";

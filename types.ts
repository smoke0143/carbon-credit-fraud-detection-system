
export interface CarbonProject {
  id: string;
  projectName: string;
  projectType: 'Forestry' | 'Solar' | 'Wind' | 'Methane' | 'Hydro';
  region: string;
  claimedReduction: number; // in tons of CO2
  creditsIssued: number;
  durationMonths: number;
}

export interface AnalysisResult extends CarbonProject {
  reductionRate: number; // reduction per month
  groupMean: number;
  groupStdDev: number;
  zScore: number;
  riskScore: number; // 0 to 1
  isAnomaly: boolean;
}

export enum AppTab {
  DATASET = 'dataset',
  ANALYSIS = 'analysis',
  REPORT = 'report',
  METHODOLOGY = 'methodology'
}

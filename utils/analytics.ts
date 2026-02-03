
import { CarbonProject, AnalysisResult } from '../types';

export const analyzeDataset = (data: CarbonProject[]): AnalysisResult[] => {
  // 1. Preprocessing: Calculate rates
  const baseResults: Partial<AnalysisResult>[] = data.map(p => ({
    ...p,
    reductionRate: p.claimedReduction / p.durationMonths
  }));

  // 2. Grouping by Type and Region for Peer Comparison
  const groups: Record<string, number[]> = {};
  baseResults.forEach(r => {
    const key = `${r.projectType}`; // Simple grouping by type for this demo
    if (!groups[key]) groups[key] = [];
    groups[key].push(r.reductionRate!);
  });

  // Calculate stats for each group
  const groupStats: Record<string, { mean: number, std: number }> = {};
  Object.keys(groups).forEach(key => {
    const rates = groups[key];
    const mean = rates.reduce((a, b) => a + b, 0) / rates.length;
    const std = Math.sqrt(rates.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b, 0) / rates.length);
    groupStats[key] = { mean, std: std || 1 }; // prevent div by 0
  });

  // 3. Risk Scoring & Anomaly Detection
  return baseResults.map(r => {
    const stats = groupStats[r.projectType!];
    const zScore = (r.reductionRate! - stats.mean) / stats.std;
    
    // Risk score normalized 0 to 1 based on sigmoid of Z-score
    // Projects with Z > 2 are significantly higher than peers
    const riskScore = 1 / (1 + Math.exp(-1 * (zScore - 1.5))); 
    const isAnomaly = zScore > 2;

    return {
      ...r,
      groupMean: stats.mean,
      groupStdDev: stats.std,
      zScore,
      riskScore,
      isAnomaly
    } as AnalysisResult;
  });
};

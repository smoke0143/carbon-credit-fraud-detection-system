
import { CarbonProject } from '../types';

export const generateMockData = (count: number = 40): CarbonProject[] => {
  const types: CarbonProject['projectType'][] = ['Forestry', 'Solar', 'Wind', 'Methane', 'Hydro'];
  const regions = ['Amazon Basin', 'Southeast Asia', 'Sub-Saharan Africa', 'Eastern Europe', 'Northern Europe'];
  
  return Array.from({ length: count }).map((_, i) => {
    const type = types[Math.floor(Math.random() * types.length)];
    const region = regions[Math.floor(Math.random() * regions.length)];
    const durationMonths = Math.floor(Math.random() * 48) + 12; // 1 to 5 years
    
    // Normal reduction ranges based on type
    const baseReduction = {
      'Forestry': 5000,
      'Solar': 2000,
      'Wind': 3000,
      'Methane': 8000,
      'Hydro': 4000
    }[type];

    // Introduce some intentional anomalies
    const isAnomaly = Math.random() < 0.15;
    const multiplier = isAnomaly ? (Math.random() * 3 + 2) : (Math.random() * 0.8 + 0.6);
    const claimedReduction = baseReduction * (durationMonths / 12) * multiplier;
    
    return {
      id: `PRJ-${1000 + i}`,
      projectName: `${type} Project ${i + 1}`,
      projectType: type,
      region,
      claimedReduction: Math.round(claimedReduction),
      creditsIssued: Math.round(claimedReduction * 0.95), // usually slightly less
      durationMonths
    };
  });
};

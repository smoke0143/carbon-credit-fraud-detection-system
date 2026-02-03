
import React, { useState, useEffect, useMemo } from 'react';
import Layout from './components/Layout';
import DatasetView from './components/DatasetView';
import AnalysisView from './components/AnalysisView';
import ReportView from './components/ReportView';
import MethodologyView from './components/MethodologyView';
import { AppTab, CarbonProject, AnalysisResult } from './types';
import { generateMockData } from './utils/sampleData';
import { analyzeDataset } from './utils/analytics';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.DATASET);
  const [data, setData] = useState<CarbonProject[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize data once on mount
  useEffect(() => {
    const mock = generateMockData(50);
    setData(mock);
    setIsLoaded(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Memoize analysis results to prevent re-calc on every render
  const analysisResults = useMemo(() => {
    if (!isLoaded || data.length === 0) return [];
    return analyzeDataset(data);
  }, [data, isLoaded]);

  const renderContent = () => {
    if (!isLoaded) return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600" /></div>;

    switch (activeTab) {
      case AppTab.DATASET:
        return <DatasetView data={data} />;
      case AppTab.ANALYSIS:
        return <AnalysisView results={analysisResults} />;
      case AppTab.REPORT:
        return <ReportView results={analysisResults} />;
      case AppTab.METHODOLOGY:
        return <MethodologyView />;
      default:
        return <DatasetView data={data} />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      <div className="animate-in fade-in duration-700">
        {renderContent()}
      </div>
    </Layout>
  );
};

export default App;

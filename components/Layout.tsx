
import React from 'react';
import { Shield, Database, BarChart3, AlertTriangle, BookOpen, Menu, X } from 'lucide-react';
import { AppTab } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: AppTab.DATASET, label: 'Dataset', icon: Database },
    { id: AppTab.ANALYSIS, label: 'Risk Analysis', icon: BarChart3 },
    { id: AppTab.REPORT, label: 'Suspicious Claims', icon: AlertTriangle },
    { id: AppTab.METHODOLOGY, label: 'Methodology', icon: BookOpen },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-emerald-900 text-white transform transition-transform duration-200 ease-in-out md:relative md:translate-x-0 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-10">
            <div className="bg-emerald-500 p-2 rounded-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold tracking-tight">EcoGuard</h1>
          </div>
          
          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                    activeTab === item.id 
                      ? 'bg-emerald-800 text-white shadow-lg' 
                      : 'text-emerald-100 hover:bg-emerald-800/50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="bg-emerald-800/50 rounded-2xl p-4 text-xs text-emerald-200">
            <p className="font-semibold mb-1">Data Science Assistant</p>
            <p>V1.2 | Carbon Credit Risk Scoring System</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b flex items-center justify-between px-6 md:px-10 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 -ml-2 text-slate-500 md:hidden"
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
            <h2 className="text-lg font-semibold text-slate-700 capitalize">
              {activeTab.replace('-', ' ')}
            </h2>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-sm font-medium">Guest Analyst</span>
              <span className="text-xs text-slate-400">Project Workspace</span>
            </div>
            <img 
              src="https://picsum.photos/seed/analyst/40/40" 
              className="w-10 h-10 rounded-full border-2 border-emerald-500" 
              alt="Avatar" 
            />
          </div>
        </header>

        <div className="p-6 md:p-10">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;

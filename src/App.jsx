import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  Legend, 
  LineChart, 
  Line 
} from 'recharts';
import { 
  FileText, 
  IndianRupee, 
  Award, 
  TrendingUp, 
  CheckCircle2, 
  AlertTriangle, 
  Download, 
  ShieldCheck, 
  Building, 
  Truck, 
  Calendar, 
  ArrowRight, 
  Check,
  Percent,
  Clock,
  Briefcase,
  Scale,
  DollarSign
} from 'lucide-react';

// Color Palette Definition
const COLORS = {
  bg: '#0A0A0A',
  card: '#1A1A1A',
  border: '#2E303A',
  accent: '#00FF41',
  text: '#FFFFFF',
  red: '#EF4444',
  amber: '#FBBF24',
  green: '#10B981',
};

const PIE_COLORS = [
  '#00FF41', // Bright Green
  '#10B981', // Emerald
  '#059669', // Darker Emerald
  '#047857', // Forest Green
  '#065F46', // Deep Forest
  '#022C22', // Very Dark Green
];

export default function App() {
  const [activeTab, setActiveTab] = useState('summary');

  // Tab Definitions
  const tabs = [
    { id: 'summary', label: 'Executive Summary', icon: FileText },
    { id: 'cost', label: 'Unit Cost Breakdown', icon: IndianRupee },
    { id: 'supplier', label: 'Supplier References', icon: Award },
    { id: 'breakeven', label: 'Breakeven Analysis', icon: TrendingUp },
    { id: 'verdict', label: 'Feasibility Verdict', icon: CheckCircle2 },
  ];

  // Data Definitions
  const costComponents = [
    { name: 'Raw Material Cost (ex-factory Russia)', pyramid: 180, sphere: 155, chunk: 85, sticker: 18 },
    { name: 'Export Packaging (per unit)', pyramid: 22, sphere: 18, chunk: 12, sticker: 4 },
    { name: 'Russia Export Documentation', pyramid: 8, sphere: 8, chunk: 8, sticker: 2 },
    { name: 'Sea Freight (St. Petersburg → Mumbai)', pyramid: 45, sphere: 38, chunk: 22, sticker: 6 },
    { name: 'Marine Insurance (1.5% CIF)', pyramid: 4, sphere: 3, chunk: 2, sticker: 0.50 },
    { name: 'India Customs Duty (10% CIF)', pyramid: 26, sphere: 22, chunk: 13, sticker: 3 },
    { name: 'GST on Import (18%)', pyramid: 47, sphere: 40, chunk: 23, sticker: 5 },
    { name: 'Inland Freight (Mumbai port → warehouse)', pyramid: 12, sphere: 10, chunk: 7, sticker: 2 },
    { name: 'Quality Control (per unit allocation)', pyramid: 8, sphere: 8, chunk: 6, sticker: 2 },
    { name: 'Retail Packaging + Certificate', pyramid: 18, sphere: 18, chunk: 15, sticker: 5 },
    { name: 'Warehousing (per unit per month)', pyramid: 6, sphere: 6, chunk: 5, sticker: 1 },
  ];

  const totalLandedCosts = {
    pyramid: 376,
    sphere: 326,
    chunk: 198,
    sticker: 48.50,
  };

  const pricingModel = [
    { product: 'Pyramid 200g', landed: 376, retail: 999, margin: 623, marginPercent: '62.4%' },
    { product: 'Sphere 150g', landed: 326, retail: 849, margin: 523, marginPercent: '61.6%' },
    { product: 'Raw Chunk 60g', landed: 198, retail: 499, margin: 301, marginPercent: '60.3%' },
    { product: 'Phone Sticker', landed: 48.50, retail: 149, margin: 100.50, marginPercent: '67.4%' },
    { product: 'Home Protection Set (bundle)', landed: 850, retail: 1899, margin: 1049, marginPercent: '55.2%' },
  ];

  // Pyramid 200g Cost breakdown for Pie Chart
  const pyramidPieData = [
    { name: 'Raw Material', value: 47.9, cost: 180 },
    { name: 'Import Duties + GST', value: 19.4, cost: 73 }, // Customs Duty (26) + GST (47) = 73
    { name: 'Logistics + Freight', value: 15.2, cost: 57 }, // Sea Freight (45) + Inland (12) = 57
    { name: 'Documentation', value: 9.0, cost: 34 }, // Russian doc (8) + packaging (22) + marine ins (4) = 34
    { name: 'Packaging + Cert', value: 4.8, cost: 18 }, // Retail Packaging (18)
    { name: 'QC + Warehousing', value: 3.7, cost: 14 }, // QC (8) + Warehousing (6) = 14
  ];

  const supplierComparison = [
    { criteria: 'Price (Pyramid)', supplier1: '₹267/unit', supplier2: '₹246/unit', winner: 'RusShungite ✅' },
    { criteria: 'Price (Sphere)', supplier1: '₹230/unit', supplier2: '₹213/unit', winner: 'RusShungite ✅' },
    { criteria: 'MOQ Flexibility', supplier1: '200 units', supplier2: '500 units mixed', winner: 'Karelian ✅' },
    { criteria: 'Lead Time', supplier1: '21–28 days', supplier2: '14–21 days', winner: 'RusShungite ✅' },
    { criteria: 'Certifications', supplier1: 'Basic', supplier2: 'Full EMF + ISO', winner: 'RusShungite ✅' },
    { criteria: 'Payment Terms', supplier1: 'T/T + LC', supplier2: 'T/T only', winner: 'Karelian ✅' },
    { criteria: 'Recommendation', supplier1: 'Secondary', supplier2: 'PRIMARY ✅', winner: '—' },
  ];

  const scenarios = [
    {
      id: 1,
      badge: 'Low MOQ',
      title: 'SCENARIO 1 — LOW MOQ',
      moq: '200 units (mixed)',
      landed: '₹72,400',
      avgCost: '₹362',
      avgRetail: '₹849',
      margin: '₹487',
      revenue: '₹169,800',
      profit: '₹97,400',
      breakevenUnits: '89 units',
      breakevenPercent: '44.5% of stock',
      breakevenRevenue: '₹75,561',
      risk: 'Medium',
      riskColor: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
      badgeColor: 'bg-neutral-800 text-neutral-300 border-neutral-700',
    },
    {
      id: 2,
      badge: '⭐ Recommended',
      title: 'SCENARIO 2 — MEDIUM MOQ',
      moq: '500 units (mixed)',
      landed: '₹156,000',
      avgCost: '₹312',
      avgRetail: '₹849',
      margin: '₹537',
      revenue: '₹424,500',
      profit: '₹268,500',
      breakevenUnits: '174 units',
      breakevenPercent: '34.8% of stock',
      breakevenRevenue: '₹147,726',
      risk: 'Low',
      riskColor: 'text-[#00FF41] bg-[#00FF41]/10 border-[#00FF41]/20',
      badgeColor: 'bg-[#00FF41]/20 text-[#00FF41] border-[#00FF41]/30 border-glow-green',
      highlight: true,
    },
    {
      id: 3,
      badge: 'High Volume',
      title: 'SCENARIO 3 — HIGH MOQ',
      moq: '1000 units (mixed)',
      landed: '₹287,000',
      avgCost: '₹287',
      avgRetail: '₹849',
      margin: '₹562',
      revenue: '₹849,000',
      profit: '₹562,000',
      breakevenUnits: '306 units',
      breakevenPercent: '30.6% of stock',
      breakevenRevenue: '₹259,794',
      risk: 'Low (requires stronger distribution)',
      riskColor: 'text-[#00FF41] bg-[#00FF41]/10 border-[#00FF41]/20',
      badgeColor: 'bg-neutral-800 text-neutral-300 border-neutral-700',
    },
  ];

  const chartScenarios = [
    { name: 'Low MOQ', 'Total Cost': 72400, 'Total Revenue': 169800, 'Gross Profit': 97400 },
    { name: 'Medium MOQ', 'Total Cost': 156000, 'Total Revenue': 424500, 'Gross Profit': 268500 },
    { name: 'High MOQ', 'Total Cost': 287000, 'Total Revenue': 849000, 'Gross Profit': 562000 },
  ];

  const chartLineData = [
    { name: '200 Units', 'Breakeven % of stock': 44.5, units: 89 },
    { name: '500 Units', 'Breakeven % of stock': 34.8, units: 174 },
    { name: '1000 Units', 'Breakeven % of stock': 30.6, units: 306 },
  ];

  const supportingEvidence = [
    'Both supplier quotes confirm landed costs below ₹380/unit for premium products',
    'Gross margins of 60–67% across all products exceed the 40% minimum threshold',
    'Breakeven point achievable at under 45% of stock sold in all scenarios',
    'Indian wellness market shows strong and growing demand for EMF protection products',
    'Regulatory pathway clear — Shungite classified as mineral/gemstone, standard import procedures apply',
  ];

  const riskFactors = [
    'Currency fluctuation risk (USD/INR) — recommend forward contract for large orders',
    'Supplier reliability untested — recommend sample order before full MOQ',
    'Consumer education required — Indian market awareness of Shungite still developing',
  ];

  const recommendations = [
    { id: 1, text: 'Start with Medium MOQ (500 units) to validate Indian market demand before committing to high-volume orders' },
    { id: 2, text: 'Use RusShungite Trade Co. as primary supplier based on pricing, certifications, and lead time advantage' },
    { id: 3, text: 'Price the Home Protection Set bundle at ₹1,899 as the hero product — highest absolute margin and strongest value proposition for Indian wellness buyers' },
  ];

  const timelineSteps = [
    { action: 'Place sample order (20 units)', owner: 'Procurement', timeline: 'Week 1–2' },
    { action: 'Quality inspection on samples', owner: 'Production Research', timeline: 'Week 3' },
    { action: 'Finalise MOQ 500 order', owner: 'Procurement + Finance', timeline: 'Week 4' },
    { action: 'Arrange sea freight booking', owner: 'Logistics', timeline: 'Week 5' },
    { action: 'Customs clearance prep', owner: 'Ops', timeline: 'Week 6–7' },
    { action: 'Warehouse receipt + QC', owner: 'Ops', timeline: 'Week 8' },
  ];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col font-sans select-none antialiased">
      {/* -------------------- SCREEN VIEW -------------------- */}
      <div className="flex-1 flex flex-col print:hidden">
        
        {/* Top Glow Accent Line */}
        <div className="h-1 w-full bg-[#00FF41] text-glow-green"></div>

        {/* Global Header */}
        <header className="border-b border-neutral-900 bg-[#0E0E0E]/90 backdrop-blur sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-5 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[#00FF41] live-pulse"></span>
                <span className="text-xs uppercase tracking-widest text-[#00FF41] font-mono font-semibold">
                  Official Research Document
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-mono">
                Production Feasibility & Unit Cost Report
              </h1>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1 font-mono">
                TASK_PP04 | Shungite EMF Protection Products | GO-BRICS Business Lab
              </p>
            </div>
            
            <div className="flex flex-row items-center gap-3 self-start md:self-auto">
              <div className="text-left md:text-right border-l md:border-l-0 md:border-r border-neutral-800 pl-3 md:pl-0 pr-0 md:pr-4 font-mono">
                <div className="text-xs text-neutral-500">Document Ref</div>
                <div className="text-sm text-neutral-300 font-semibold">GOBRICS-BL-PP04-2026</div>
                <div className="text-xs text-[#00FF41]">June 2026</div>
              </div>
              
              <button 
                onClick={handlePrint}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-sm font-semibold hover:bg-neutral-800 hover:border-neutral-700 hover:text-[#00FF41] transition-all duration-300 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>PDF</span>
              </button>
            </div>
          </div>
        </header>

        {/* Navigation Tabs */}
        <nav className="border-b border-neutral-900 bg-[#0B0B0B] sticky top-[92px] sm:top-[88px] z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex space-x-1 py-3 overflow-x-auto scrollbar-none">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2.5 px-4 py-2.5 rounded-lg border text-sm font-medium whitespace-nowrap transition-all duration-300 cursor-pointer ${
                      isActive 
                        ? 'bg-neutral-900 border-[#00FF41] text-[#00FF41] shadow-[0_0_10px_rgba(0,255,65,0.1)]'
                        : 'bg-[#121212]/50 border-neutral-800/80 text-neutral-400 hover:text-white hover:border-neutral-700 hover:bg-neutral-900/50'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#00FF41]' : 'text-neutral-500'}`} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </nav>

        {/* Main Content Area */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8 sm:px-6 lg:px-8">
          
          {/* Tab 1: Executive Summary */}
          {activeTab === 'summary' && (
            <div className="space-y-8 animate-fadeIn">
              
              {/* Header Info Card */}
              <div className="bg-[#1A1A1A] border border-neutral-800 rounded-xl p-6 sm:p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#00FF41]/5 rounded-full blur-2xl pointer-events-none"></div>
                <div className="border-l-4 border-[#00FF41] pl-4 mb-6">
                  <h2 className="text-xl font-bold uppercase tracking-wider text-[#00FF41] font-mono">
                    Project Configuration
                  </h2>
                  <p className="text-sm text-neutral-400 mt-1">Primary details of the sourcing and logistics corridor</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
                  <div className="bg-neutral-900/60 p-4 rounded-lg border border-neutral-800/80">
                    <span className="text-xs font-mono text-neutral-500 block uppercase mb-1">Product Suite</span>
                    <span className="font-semibold text-white block">Shungite Type II EMF Protection Products</span>
                    <span className="text-xs text-neutral-400 mt-1 block">
                      Pyramid 200g, Sphere 150g, Raw Chunk 50-70g, Phone Sticker
                    </span>
                  </div>
                  
                  <div className="bg-neutral-900/60 p-4 rounded-lg border border-neutral-800/80">
                    <span className="text-xs font-mono text-neutral-500 block uppercase mb-1">Supply Chain Corridor</span>
                    <span className="font-semibold text-white flex items-center gap-1.5">
                      Russia (Karelia) <ArrowRight className="w-3.5 h-3.5 text-[#00FF41]" /> India (Mumbai JNPT)
                    </span>
                    <span className="text-xs text-neutral-400 mt-1 block">
                      Sea freight via St. Petersburg to JNPT Port
                    </span>
                  </div>

                  <div className="bg-neutral-900/60 p-4 rounded-lg border border-neutral-800/80">
                    <span className="text-xs font-mono text-neutral-500 block uppercase mb-1">Report Context</span>
                    <span className="font-semibold text-white block">Feasibility & Commercial Viability</span>
                    <span className="text-xs text-neutral-400 mt-1 block">
                      Prepared by: GO-BRICS Business Lab — Production Research Team
                    </span>
                  </div>
                </div>
              </div>

              {/* 4 Summary Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[#1A1A1A] border border-neutral-800 p-5 rounded-xl hover:border-neutral-700 transition-all duration-300">
                  <div className="text-neutral-500 text-xs uppercase tracking-wider font-mono mb-1">Landed Cost Per Unit (avg)</div>
                  <div className="text-3xl font-extrabold text-white">₹312</div>
                  <div className="text-xs text-[#00FF41] mt-2 flex items-center gap-1">
                    <span>At recommended MOQ 500</span>
                  </div>
                </div>

                <div className="bg-[#1A1A1A] border border-neutral-800 p-5 rounded-xl hover:border-neutral-700 transition-all duration-300">
                  <div className="text-neutral-500 text-xs uppercase tracking-wider font-mono mb-1">Recommended Retail</div>
                  <div className="text-3xl font-extrabold text-white">₹799–₹4,499</div>
                  <div className="text-xs text-neutral-400 mt-2 flex items-center gap-1">
                    <span>Starter pack to premium bundles</span>
                  </div>
                </div>

                <div className="bg-[#1A1A1A] border border-neutral-800 p-5 rounded-xl hover:border-neutral-700 transition-all duration-300">
                  <div className="text-neutral-500 text-xs uppercase tracking-wider font-mono mb-1">Gross Margin (avg)</div>
                  <div className="text-3xl font-extrabold text-white text-[#00FF41]">61.5%</div>
                  <div className="text-xs text-[#00FF41] mt-2 flex items-center gap-1">
                    <span>Exceeds target threshold of 40%</span>
                  </div>
                </div>

                <div className="bg-[#1A1A1A] border border-neutral-800 p-5 rounded-xl border-glow-green transition-all duration-300 bg-glow-green">
                  <div className="text-neutral-500 text-xs uppercase tracking-wider font-mono mb-1">Feasibility Verdict</div>
                  <div className="text-2xl font-bold text-[#00FF41] mt-1.5 flex items-center gap-1.5">
                    <span>Commercially Viable</span>
                  </div>
                  <div className="text-xs text-[#00FF41]/80 mt-2 flex items-center gap-1">
                    <span>Ready for Phase-1 Sample Order</span>
                  </div>
                </div>
              </div>

              {/* 200-Word Paragraph Card */}
              <div className="bg-[#1A1A1A] border border-neutral-800 rounded-xl p-6 sm:p-8">
                <h3 className="text-lg font-bold text-white font-mono mb-4 border-b border-neutral-800 pb-3">
                  Executive Findings & Core Statement
                </h3>
                <p className="text-neutral-300 leading-relaxed text-base">
                  This report presents a comprehensive production feasibility and unit cost 
                  analysis for Shungite-based EMF protection products sourced from Karelia, 
                  Russia for distribution in the Indian market. Based on supplier quotes obtained 
                  from two verified Karelian exporters and logistics cost estimates for sea freight 
                  via St. Petersburg to Mumbai (JNPT), the analysis confirms that Shungite products 
                  can be landed in India at a competitive cost that supports healthy retail margins 
                  across all three MOQ scenarios evaluated.
                </p>
                <p className="text-neutral-300 leading-relaxed text-base mt-4">
                  The Indian wellness and Ayurvedic market presents strong demand signals for 
                  EMF protection products, with growing consumer awareness of electromagnetic 
                  radiation risks. At the recommended MOQ of 500 units (medium scenario), the 
                  total landed cost per average unit is ₹312, supporting a retail price of ₹799 
                  for the entry-level Starter Pack — representing a gross margin of approximately 
                  61%. The high-MOQ scenario (1,000 units) reduces landed cost to ₹287 per unit, 
                  further improving margins.
                </p>
                <p className="text-neutral-300 leading-relaxed text-base mt-4">
                  Based on this analysis, the GO-BRICS Business Lab Production Research Team 
                  concludes that Shungite EMF protection products are Commercially Viable for 
                  import and distribution in India at the evaluated volume tiers.
                </p>
              </div>

            </div>
          )}

          {/* Tab 2: Unit Cost Breakdown */}
          {activeTab === 'cost' && (
            <div className="space-y-8 animate-fadeIn">
              
              {/* Cost Components Table */}
              <div className="bg-[#1A1A1A] border border-neutral-800 rounded-xl p-6 sm:p-8 overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-neutral-800 pb-4 mb-6 gap-2">
                  <div>
                    <h2 className="text-xl font-bold text-white font-mono">
                      Unit Cost Model — Per Product
                    </h2>
                    <p className="text-xs text-neutral-400 mt-1">Detailed ex-factory & logistics unit calculations based on MOQ 500</p>
                  </div>
                  <span className="text-xs font-mono text-[#00FF41] bg-[#00FF41]/10 px-3 py-1 rounded border border-[#00FF41]/20 self-start">
                    Scenario: Medium MOQ (500 units)
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="border-b border-neutral-800 text-neutral-400 font-mono text-xs uppercase">
                        <th className="py-3 px-4">Cost Component</th>
                        <th className="py-3 px-4 text-right">Pyramid 200g</th>
                        <th className="py-3 px-4 text-right">Sphere 150g</th>
                        <th className="py-3 px-4 text-right">Raw Chunk 60g</th>
                        <th className="py-3 px-4 text-right">Phone Sticker</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-900">
                      {costComponents.map((row, idx) => (
                        <tr key={idx} className="hover:bg-neutral-900/50 transition-colors">
                          <td className="py-3 px-4 text-neutral-300">{row.name}</td>
                          <td className="py-3 px-4 text-right font-mono text-white">₹{row.pyramid.toFixed(2)}</td>
                          <td className="py-3 px-4 text-right font-mono text-white">₹{row.sphere.toFixed(2)}</td>
                          <td className="py-3 px-4 text-right font-mono text-white">₹{row.chunk.toFixed(2)}</td>
                          <td className="py-3 px-4 text-right font-mono text-white">₹{row.sticker.toFixed(2)}</td>
                        </tr>
                      ))}
                      
                      {/* Highlighted Total row */}
                      <tr className="bg-[#00FF41]/10 border-y-2 border-[#00FF41] text-[#00FF41] font-bold">
                        <td className="py-4 px-4 font-mono uppercase text-sm">TOTAL LANDED COST</td>
                        <td className="py-4 px-4 text-right font-mono text-base">₹{totalLandedCosts.pyramid.toFixed(2)}</td>
                        <td className="py-4 px-4 text-right font-mono text-base">₹{totalLandedCosts.sphere.toFixed(2)}</td>
                        <td className="py-4 px-4 text-right font-mono text-base">₹{totalLandedCosts.chunk.toFixed(2)}</td>
                        <td className="py-4 px-4 text-right font-mono text-base">₹{totalLandedCosts.sticker.toFixed(2)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mt-4 text-xs text-neutral-500 font-mono italic">
                  * Costs based on MOQ 500 units (medium scenario). Source: Supplier Quote SQ-001 (Karelian Exports LLC) and SQ-002 (RusShungite Trade Co.) — see Tab 3
                </div>
              </div>

              {/* Grid for Table B & Chart C */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Section B: Recommended Pricing */}
                <div className="bg-[#1A1A1A] border border-neutral-800 rounded-xl p-6 sm:p-8 flex flex-col justify-between">
                  <div>
                    <div className="border-b border-neutral-800 pb-4 mb-6">
                      <h3 className="text-lg font-bold text-white font-mono">
                        Recommended Pricing Model
                      </h3>
                      <p className="text-xs text-neutral-400 mt-1">Indian retail market projections & margins</p>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse text-sm">
                        <thead>
                          <tr className="border-b border-neutral-800 text-neutral-400 font-mono text-xs uppercase">
                            <th className="py-2.5 px-3">Product</th>
                            <th className="py-2.5 px-3 text-right">Landed Cost</th>
                            <th className="py-2.5 px-3 text-right">RRP</th>
                            <th className="py-2.5 px-3 text-right">Margin</th>
                            <th className="py-2.5 px-3 text-right">Margin %</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-900">
                          {pricingModel.map((item, idx) => (
                            <tr key={idx} className={`hover:bg-neutral-900/50 transition-colors ${item.product.includes('bundle') ? 'bg-neutral-900/30' : ''}`}>
                              <td className={`py-3 px-3 ${item.product.includes('bundle') ? 'text-[#00FF41] font-semibold' : 'text-neutral-300'}`}>
                                {item.product}
                              </td>
                              <td className="py-3 px-3 text-right font-mono text-white">₹{item.landed.toFixed(2)}</td>
                              <td className="py-3 px-3 text-right font-mono text-[#00FF41] font-medium">₹{item.retail.toLocaleString('en-IN')}</td>
                              <td className="py-3 px-3 text-right font-mono text-white">₹{item.margin.toLocaleString('en-IN')}</td>
                              <td className="py-3 px-3 text-right font-mono text-[#00FF41] font-semibold">{item.marginPercent}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="mt-6 p-4 rounded-lg bg-neutral-900/60 border border-neutral-800/80 text-xs text-neutral-400 font-mono">
                    <span className="text-[#00FF41] font-bold block mb-1">💡 BUNDLE PROJECTION</span>
                    The <span className="text-white font-medium">Home Protection Set bundle</span> incorporates one of each unit, offering Indian consumers a comprehensive home pack while securing the highest absolute rupee margin (₹1,049) per sale.
                  </div>
                </div>

                {/* Section C: Cost Pie Chart */}
                <div className="bg-[#1A1A1A] border border-neutral-800 rounded-xl p-6 sm:p-8">
                  <div className="border-b border-neutral-800 pb-4 mb-6">
                    <h3 className="text-lg font-bold text-white font-mono">
                      Cost Components Distribution
                    </h3>
                    <p className="text-xs text-neutral-400 mt-1">Percentage breakdown for the Pyramid 200g (Total Landed Cost: ₹376)</p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="w-full sm:w-[240px] h-[240px] flex items-center justify-center">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={pyramidPieData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={90}
                            paddingAngle={2}
                            dataKey="value"
                          >
                            {pyramidPieData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                            ))}
                          </Pie>
                          <RechartsTooltip 
                            formatter={(value) => [`${value}%`, 'Percent']}
                            contentStyle={{ backgroundColor: '#111111', borderColor: '#2E303A', color: '#FFFFFF' }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="flex-1 space-y-3 w-full">
                      {pyramidPieData.map((entry, index) => (
                        <div key={index} className="flex items-center justify-between text-xs border-b border-neutral-900 pb-1.5">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: PIE_COLORS[index] }}></span>
                            <span className="text-neutral-400 font-medium">{entry.name}</span>
                          </div>
                          <div className="text-right font-mono">
                            <span className="text-white font-semibold">{entry.value}%</span>
                            <span className="text-neutral-500 text-[10px] ml-1.5">(₹{entry.cost})</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* Tab 3: Supplier References */}
          {activeTab === 'supplier' && (
            <div className="space-y-8 animate-fadeIn">
              
              <div className="border-b border-neutral-900 pb-4">
                <h2 className="text-2xl font-bold text-white font-mono">
                  Supplier Price References
                </h2>
                <p className="text-sm text-neutral-400 mt-1">
                  Unit costs verified against two independent supplier quotes obtained via Alibaba and direct email outreach — June 2026
                </p>
              </div>

              {/* 2 Supplier Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Supplier 1 */}
                <div className="bg-[#1A1A1A] border border-neutral-800 rounded-xl p-6 sm:p-8 relative overflow-hidden flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-6 border-b border-neutral-800 pb-4">
                      <div>
                        <span className="text-[10px] uppercase font-mono tracking-wider bg-neutral-800 px-2 py-0.5 rounded text-neutral-400 border border-neutral-700">
                          Supplier 01
                        </span>
                        <h3 className="text-xl font-bold text-white mt-1">Karelian Exports LLC</h3>
                        <p className="text-xs text-neutral-400 mt-0.5">Petrozavodsk, Karelia (Russia)</p>
                      </div>
                      <div className="text-right">
                        <div className="text-[#00FF41] text-sm">⭐⭐⭐⭐⭐</div>
                        <span className="text-[10px] text-neutral-500 font-mono uppercase">Gold Alibaba Supplier</span>
                      </div>
                    </div>

                    <div className="space-y-4 text-sm font-mono">
                      <div className="grid grid-cols-3 border-b border-neutral-900 pb-2">
                        <span className="text-neutral-500 text-xs">Contact</span>
                        <span className="col-span-2 text-neutral-300 text-right truncate">export@karelianminerals.ru</span>
                      </div>
                      <div className="grid grid-cols-3 border-b border-neutral-900 pb-2">
                        <span className="text-neutral-500 text-xs">Quote Ref</span>
                        <span className="col-span-2 text-neutral-300 text-right">SQ-001-2026</span>
                      </div>
                      <div className="grid grid-cols-3 border-b border-neutral-900 pb-2">
                        <span className="text-neutral-500 text-xs">MOQ Tier</span>
                        <span className="col-span-2 text-neutral-300 text-right">200 units per product</span>
                      </div>
                      <div className="grid grid-cols-3 border-b border-neutral-900 pb-2">
                        <span className="text-neutral-500 text-xs">Lead Time</span>
                        <span className="col-span-2 text-neutral-300 text-right">21–28 days</span>
                      </div>
                      <div className="grid grid-cols-3 border-b border-neutral-900 pb-2">
                        <span className="text-neutral-500 text-xs">Certifications</span>
                        <span className="col-span-2 text-neutral-300 text-right">Carbon & Authenticity Certs</span>
                      </div>
                      
                      <div className="pt-2">
                        <span className="text-xs text-neutral-500 block mb-2 uppercase">Quoted Pricing (FOB St. Petersburg)</span>
                        <div className="space-y-1.5 bg-neutral-900/60 p-3 rounded border border-neutral-800/80">
                          <div className="flex justify-between text-xs">
                            <span className="text-neutral-400">Pyramid 200g</span>
                            <span className="text-white font-semibold">USD 3.20 <span className="text-neutral-500">(~₹267)</span></span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-neutral-400">Sphere 150g</span>
                            <span className="text-white font-semibold">USD 2.75 <span className="text-neutral-500">(~₹230)</span></span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-neutral-400">Raw Chunk 60g</span>
                            <span className="text-white font-semibold">USD 1.50 <span className="text-neutral-500">(~₹125)</span></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-neutral-800">
                    <span className="text-xs text-[#00FF41] font-mono block mb-1">OFFICIAL RESEARCH NOTES</span>
                    <p className="text-xs text-neutral-400 leading-relaxed italic">
                      "Responsive to email, provided samples policy, accepts T/T and LC payment terms"
                    </p>
                  </div>
                </div>

                {/* Supplier 2 */}
                <div className="bg-[#1A1A1A] border border-neutral-800 rounded-xl p-6 sm:p-8 relative overflow-hidden flex flex-col justify-between border-glow-green bg-glow-green/10">
                  <div className="absolute top-0 right-0 bg-[#00FF41] text-black text-[9px] font-mono font-bold px-3 py-1 rounded-bl uppercase tracking-wider shadow">
                    Primary Match
                  </div>

                  <div>
                    <div className="flex justify-between items-start mb-6 border-b border-neutral-800 pb-4">
                      <div>
                        <span className="text-[10px] uppercase font-mono tracking-wider bg-[#00FF41]/20 px-2 py-0.5 rounded text-[#00FF41] border border-[#00FF41]/30">
                          Supplier 02
                        </span>
                        <h3 className="text-xl font-bold text-white mt-1">RusShungite Trade Co.</h3>
                        <p className="text-xs text-neutral-400 mt-0.5">Moscow / Karelia Sourcing (Russia)</p>
                      </div>
                      <div className="text-right mr-16">
                        <div className="text-[#00FF41] text-sm">⭐⭐⭐⭐</div>
                        <span className="text-[10px] text-neutral-500 font-mono uppercase">Verified Trade Reg</span>
                      </div>
                    </div>

                    <div className="space-y-4 text-sm font-mono">
                      <div className="grid grid-cols-3 border-b border-neutral-900 pb-2">
                        <span className="text-neutral-500 text-xs">Contact</span>
                        <span className="col-span-2 text-neutral-300 text-right truncate">sales@russhungite.com</span>
                      </div>
                      <div className="grid grid-cols-3 border-b border-neutral-900 pb-2">
                        <span className="text-neutral-500 text-xs">Quote Ref</span>
                        <span className="col-span-2 text-neutral-300 text-right">SQ-002-2026</span>
                      </div>
                      <div className="grid grid-cols-3 border-b border-neutral-900 pb-2">
                        <span className="text-neutral-500 text-xs">MOQ Tier</span>
                        <span className="col-span-2 text-[#00FF41] text-right font-medium">500 units mixed (flexible)</span>
                      </div>
                      <div className="grid grid-cols-3 border-b border-neutral-900 pb-2">
                        <span className="text-neutral-500 text-xs">Lead Time</span>
                        <span className="col-span-2 text-[#00FF41] text-right font-medium">14–21 days</span>
                      </div>
                      <div className="grid grid-cols-3 border-b border-neutral-900 pb-2">
                        <span className="text-neutral-500 text-xs">Certifications</span>
                        <span className="col-span-2 text-neutral-300 text-right">ISO 9001, Fullerene, EMF reports</span>
                      </div>
                      
                      <div className="pt-2">
                        <span className="text-xs text-neutral-500 block mb-2 uppercase">Quoted Pricing (FOB Russia)</span>
                        <div className="space-y-1.5 bg-[#00FF41]/5 p-3 rounded border border-[#00FF41]/10">
                          <div className="flex justify-between text-xs">
                            <span className="text-neutral-400">Pyramid 200g</span>
                            <span className="text-white font-semibold">USD 2.95 <span className="text-[#00FF41]">(~₹246)</span></span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-neutral-400">Sphere 150g</span>
                            <span className="text-white font-semibold">USD 2.55 <span className="text-[#00FF41]">(~₹213)</span></span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-neutral-400">Raw Chunk 60g</span>
                            <span className="text-white font-semibold">USD 1.35 <span className="text-[#00FF41]">(~₹113)</span></span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-neutral-400">Phone Sticker</span>
                            <span className="text-white font-semibold">USD 0.45 <span className="text-[#00FF41]">(~₹38)</span></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-neutral-800">
                    <span className="text-xs text-[#00FF41] font-mono block mb-1">OFFICIAL RESEARCH NOTES</span>
                    <p className="text-xs text-neutral-300 leading-relaxed italic">
                      "Lower MOQ flexibility, faster lead time, slightly lower prices — recommended primary supplier"
                    </p>
                  </div>
                </div>

              </div>

              {/* Exchange Rate Notice */}
              <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-neutral-400 font-mono">
                <DollarSign className="w-4 h-4 text-[#00FF41]" />
                <span>Exchange rate parameter used: <strong>1 USD = ₹83.50</strong> (June 2026 transaction forecasting rate).</span>
              </div>

              {/* Comparison Table */}
              <div className="bg-[#1A1A1A] border border-neutral-800 rounded-xl p-6 sm:p-8">
                <h3 className="text-lg font-bold text-white font-mono border-b border-neutral-800 pb-3 mb-6">
                  Supplier Decision Matrix
                </h3>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="border-b border-neutral-800 text-neutral-400 font-mono text-xs uppercase">
                        <th className="py-3 px-4">Evaluation Criteria</th>
                        <th className="py-3 px-4">Karelian Exports</th>
                        <th className="py-3 px-4">RusShungite Trade</th>
                        <th className="py-3 px-4 text-right">Winner</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-900">
                      {supplierComparison.map((row, idx) => {
                        const isPrimaryWinner = row.winner.includes('RusShungite');
                        const isSecondaryWinner = row.winner.includes('Karelian');
                        return (
                          <tr key={idx} className="hover:bg-neutral-900/50 transition-colors">
                            <td className="py-3.5 px-4 text-neutral-300 font-medium">{row.criteria}</td>
                            <td className={`py-3.5 px-4 font-mono ${isSecondaryWinner ? 'text-[#00FF41]' : 'text-neutral-400'}`}>{row.supplier1}</td>
                            <td className={`py-3.5 px-4 font-mono ${isPrimaryWinner ? 'text-[#00FF41]' : 'text-neutral-400'}`}>{row.supplier2}</td>
                            <td className="py-3.5 px-4 text-right font-mono font-bold text-[#00FF41]">
                              {row.winner}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* Tab 4: Breakeven Analysis */}
          {activeTab === 'breakeven' && (
            <div className="space-y-8 animate-fadeIn">
              
              <div className="border-b border-neutral-900 pb-4">
                <h2 className="text-2xl font-bold text-white font-mono">
                  Breakeven Analysis — 3 MOQ Scenarios
                </h2>
                <p className="text-sm text-neutral-400 mt-1">
                  Financial threshold comparison across Low, Medium, and High volume import configurations
                </p>
              </div>

              {/* 3 Scenario Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {scenarios.map((scen) => (
                  <div 
                    key={scen.id}
                    className={`bg-[#1A1A1A] border rounded-xl p-6 relative flex flex-col justify-between transition-all duration-300 hover:border-neutral-700 ${
                      scen.highlight 
                        ? 'border-[#00FF41] shadow-[0_0_15px_rgba(0,255,65,0.05)] border-glow-green bg-glow-green/5' 
                        : 'border-neutral-800'
                    }`}
                  >
                    <div>
                      {/* Badge header */}
                      <div className="flex justify-between items-center mb-4">
                        <span className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded border ${scen.badgeColor}`}>
                          {scen.badge}
                        </span>
                        <span className={`text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${scen.riskColor}`}>
                          Risk: {scen.risk}
                        </span>
                      </div>

                      <h3 className={`text-base font-bold font-mono mb-4 ${scen.highlight ? 'text-[#00FF41]' : 'text-white'}`}>
                        {scen.title}
                      </h3>

                      <div className="space-y-2.5 text-xs font-mono">
                        <div className="flex justify-between border-b border-neutral-900 pb-1.5">
                          <span className="text-neutral-500">Order Quantity</span>
                          <span className="text-white font-semibold">{scen.moq}</span>
                        </div>
                        <div className="flex justify-between border-b border-neutral-900 pb-1.5">
                          <span className="text-neutral-500">Total Landed Cost</span>
                          <span className="text-white font-semibold">{scen.landed}</span>
                        </div>
                        <div className="flex justify-between border-b border-neutral-900 pb-1.5">
                          <span className="text-neutral-500">Avg Unit Landed</span>
                          <span className="text-white font-semibold">{scen.avgCost}</span>
                        </div>
                        <div className="flex justify-between border-b border-neutral-900 pb-1.5">
                          <span className="text-neutral-500">Avg Retail Price</span>
                          <span className="text-[#00FF41] font-semibold">{scen.avgRetail}</span>
                        </div>
                        <div className="flex justify-between border-b border-neutral-900 pb-1.5">
                          <span className="text-neutral-500">Avg Margin Per Unit</span>
                          <span className="text-[#00FF41] font-semibold">{scen.margin}</span>
                        </div>
                        <div className="flex justify-between border-b border-neutral-900 pb-1.5">
                          <span className="text-neutral-500">Total Proj. Revenue</span>
                          <span className="text-white font-semibold">{scen.revenue}</span>
                        </div>
                        <div className="flex justify-between border-b border-neutral-900 pb-1.5">
                          <span className="text-neutral-500">Gross Profit (100% Sold)</span>
                          <span className="text-[#00FF41] font-bold">{scen.profit}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-neutral-900/80 bg-neutral-900/30 p-3 rounded border border-neutral-800/50">
                      <span className="text-[10px] text-neutral-500 block uppercase mb-1">Breakeven Point</span>
                      <div className="flex justify-between text-xs">
                        <span className="text-neutral-300 font-semibold">{scen.breakevenUnits}</span>
                        <span className="text-[#00FF41] font-bold">{scen.breakevenPercent}</span>
                      </div>
                      <div className="flex justify-between text-[10px] text-neutral-500 mt-1">
                        <span>Min. Revenue Target:</span>
                        <span>{scen.breakevenRevenue}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Charts Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Bar Chart: Scenario Comparison */}
                <div className="bg-[#1A1A1A] border border-neutral-800 rounded-xl p-6 sm:p-8">
                  <h3 className="text-base font-bold text-white font-mono border-b border-neutral-800 pb-3 mb-6">
                    Scenario Comparison — Financial Volume
                  </h3>
                  
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={chartScenarios}
                        margin={{ top: 10, right: 10, left: 10, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                        <XAxis dataKey="name" stroke="#666" tick={{ fill: '#888', fontSize: 11 }} />
                        <YAxis stroke="#666" tickFormatter={(v) => `₹${v/1000}k`} tick={{ fill: '#888', fontSize: 11 }} />
                        <RechartsTooltip 
                          formatter={(value) => [`₹${value.toLocaleString('en-IN')}`, '']}
                          contentStyle={{ backgroundColor: '#111111', borderColor: '#2E303A', color: '#FFFFFF' }}
                        />
                        <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                        <Bar dataKey="Total Cost" fill="#EF4444" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="Total Revenue" fill="#10B981" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="Gross Profit" fill="#FBBF24" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Line Chart: Breakeven Curve */}
                <div className="bg-[#1A1A1A] border border-neutral-800 rounded-xl p-6 sm:p-8">
                  <h3 className="text-base font-bold text-white font-mono border-b border-neutral-800 pb-3 mb-6">
                    Units to Sell vs Breakeven Point
                  </h3>
                  
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={chartLineData}
                        margin={{ top: 15, right: 30, left: 10, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                        <XAxis dataKey="name" stroke="#666" tick={{ fill: '#888', fontSize: 11 }} />
                        <YAxis stroke="#666" tickFormatter={(v) => `${v}%`} tick={{ fill: '#888', fontSize: 11 }} />
                        <RechartsTooltip 
                          formatter={(value, name, props) => [`${value}% of stock (${props.payload.units} units)`, 'Breakeven Point']}
                          contentStyle={{ backgroundColor: '#111111', borderColor: '#2E303A', color: '#FFFFFF' }}
                        />
                        <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                        <Line 
                          type="monotone" 
                          dataKey="Breakeven % of stock" 
                          stroke="#00FF41" 
                          strokeWidth={2}
                          activeDot={{ r: 8 }} 
                          dot={{ fill: '#00FF41', stroke: '#0A0A0A', strokeWidth: 2, r: 5 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* Tab 5: Feasibility Verdict */}
          {activeTab === 'verdict' && (
            <div className="space-y-8 animate-fadeIn">
              
              {/* Glow Verdict Banner */}
              <div className="bg-[#1A1A1A] border-2 border-[#00FF41] rounded-xl p-8 text-center relative overflow-hidden border-glow-green bg-glow-green/5">
                <div className="absolute inset-0 bg-[#00FF41]/5 blur-3xl rounded-full pointer-events-none"></div>
                <span className="text-xs uppercase tracking-widest text-[#00FF41] font-mono font-bold block mb-2">
                  Official Research Decision
                </span>
                <h2 className="text-4xl sm:text-5xl font-bold font-serif text-[#00FF41] tracking-tight text-glow-green">
                  VERDICT: ✅ COMMERCIALLY VIABLE
                </h2>
                <p className="text-neutral-400 mt-3 max-w-2xl mx-auto text-sm sm:text-base font-mono">
                  The GO-BRICS Business Lab Research Team confirms that import of Karelian Shungite products into India is highly profitable and viable.
                </p>
              </div>

              {/* Evidences & Risks Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Supporting Evidence */}
                <div className="bg-[#1A1A1A] border border-neutral-800 rounded-xl p-6 sm:p-8">
                  <h3 className="text-lg font-bold text-white font-mono border-b border-neutral-800 pb-3 mb-5 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#00FF41]" />
                    <span>Supporting Evidence</span>
                  </h3>
                  <ul className="space-y-4">
                    {supportingEvidence.map((point, index) => (
                      <li key={index} className="flex items-start gap-3 text-sm text-neutral-300">
                        <Check className="w-4 h-4 text-[#00FF41] mt-0.5 shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Risk Factors */}
                <div className="bg-[#1A1A1A] border border-neutral-800 rounded-xl p-6 sm:p-8">
                  <h3 className="text-lg font-bold text-white font-mono border-b border-neutral-800 pb-3 mb-5 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-amber-500" />
                    <span>Identified Risk Factors</span>
                  </h3>
                  <ul className="space-y-4">
                    {riskFactors.map((risk, index) => (
                      <li key={index} className="flex items-start gap-3 text-sm text-neutral-300">
                        <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                        <span>{risk}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Recommendations */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white font-mono">
                  Strategic Recommendations
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {recommendations.map((rec) => (
                    <div key={rec.id} className="bg-neutral-900 border border-neutral-800/80 p-5 rounded-xl flex gap-3 text-sm relative">
                      <span className="font-mono text-[#00FF41] font-bold text-base shrink-0">0{rec.id}.</span>
                      <p className="text-neutral-300 leading-relaxed font-mono text-xs">{rec.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Next Steps Table */}
              <div className="bg-[#1A1A1A] border border-neutral-800 rounded-xl p-6 sm:p-8">
                <h3 className="text-lg font-bold text-white font-mono border-b border-neutral-800 pb-3 mb-6">
                  Implementation Roadmap & Next Steps
                </h3>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="border-b border-neutral-800 text-neutral-400 font-mono text-xs uppercase">
                        <th className="py-3 px-4">Action Item</th>
                        <th className="py-3 px-4">Responsible Owner</th>
                        <th className="py-3 px-4 text-right">Target Timeline</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-900 font-mono text-xs">
                      {timelineSteps.map((step, idx) => (
                        <tr key={idx} className="hover:bg-neutral-900/50 transition-colors">
                          <td className="py-3 px-4 text-white font-semibold">{step.action}</td>
                          <td className="py-3 px-4 text-neutral-400">{step.owner}</td>
                          <td className="py-3 px-4 text-right text-[#00FF41] font-bold">{step.timeline}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Print Trigger Button at bottom */}
              <div className="flex justify-center pt-6">
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-3 px-8 py-4 rounded-xl bg-[#00FF41] text-black font-extrabold text-base hover:bg-white hover:text-black border border-[#00FF41] hover:border-white shadow-[0_0_15px_rgba(0,255,65,0.2)] hover:shadow-none transition-all duration-300 cursor-pointer"
                >
                  <Download className="w-5 h-5 shrink-0" />
                  <span>Download Full Report PDF</span>
                </button>
              </div>

            </div>
          )}

        </main>

        {/* Footer */}
        <footer className="border-t border-neutral-900 bg-[#070707] py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-neutral-500 font-mono">
            <div>GO-BRICS Business Lab © 2026. All rights reserved.</div>
            <div className="mt-1">CONFIDENTIAL — FOR INTERNAL GO-BRICS REVIEW ONLY</div>
          </div>
        </footer>

      </div>

      {/* -------------------- PRINT ONLY FULL REPORT VIEW -------------------- */}
      {/* This section compiles all tabs into a clean linear document designed for high-quality printing to PDF */}
      <div className="hidden print:block print-force-show p-8 bg-white text-black text-sm max-w-[800px] mx-auto font-sans leading-relaxed">
        
        {/* Document Stamp */}
        <div className="flex justify-between items-center border-b-2 border-black pb-4 mb-8">
          <div>
            <div className="text-xs font-mono font-bold tracking-wider text-neutral-700">
              GO-BRICS BUSINESS LAB | RESEARCH REPORT
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-black mt-1">
              Production Feasibility & Unit Cost Report
            </h1>
            <p className="text-xs text-neutral-600 font-mono mt-0.5">
              TASK_PP04 | Shungite EMF Protection Products
            </p>
          </div>
          <div className="text-right font-mono text-xs">
            <div><strong>Ref:</strong> GOBRICS-BL-PP04-2026</div>
            <div><strong>Date:</strong> June 2026</div>
            <div><strong>Status:</strong> CONFIDENTIAL</div>
          </div>
        </div>

        {/* SECTION 1: EXECUTIVE SUMMARY */}
        <section className="mb-10 print-page-break">
          <h2 className="text-lg font-bold border-b border-neutral-400 pb-1.5 mb-4 uppercase font-mono tracking-wider">
            1. Executive Summary
          </h2>

          <div className="grid grid-cols-2 gap-4 border border-neutral-300 rounded p-4 mb-6 bg-neutral-50">
            <div>
              <span className="text-xs text-neutral-500 block uppercase font-mono">Product Suite</span>
              <strong className="text-black text-xs">Shungite Type II EMF Protection Products</strong>
              <div className="text-xs text-neutral-600 italic">Pyramid 200g, Sphere 150g, Raw Chunk 50-70g, Phone Sticker</div>
            </div>
            <div>
              <span className="text-xs text-neutral-500 block uppercase font-mono">Origin / Destination Corridor</span>
              <strong className="text-black text-xs">Russia (Karelia) to India (Mumbai JNPT)</strong>
              <div className="text-xs text-neutral-600">Sea freight logistics routing via St. Petersburg</div>
            </div>
            <div className="mt-2">
              <span className="text-xs text-neutral-500 block uppercase font-mono">Average Landed Cost</span>
              <strong className="text-black text-xs">₹312 / unit (weighted avg at MOQ 500)</strong>
            </div>
            <div className="mt-2">
              <span className="text-xs text-neutral-500 block uppercase font-mono">Feasibility Verdict</span>
              <strong className="text-emerald-700 text-xs uppercase font-mono">✅ Commercially Viable</strong>
            </div>
          </div>

          <div className="space-y-4 text-xs text-neutral-800 text-justify">
            <p>
              This report presents a comprehensive production feasibility and unit cost 
              analysis for Shungite-based EMF protection products sourced from Karelia, 
              Russia for distribution in the Indian market. Based on supplier quotes obtained 
              from two verified Karelian exporters and logistics cost estimates for sea freight 
              via St. Petersburg to Mumbai (JNPT), the analysis confirms that Shungite products 
              can be landed in India at a competitive cost that supports healthy retail margins 
              across all three MOQ scenarios evaluated.
            </p>
            <p>
              The Indian wellness and Ayurvedic market presents strong demand signals for 
              EMF protection products, with growing consumer awareness of electromagnetic 
              radiation risks. At the recommended MOQ of 500 units (medium scenario), the 
              total landed cost per average unit is ₹312, supporting a retail price of ₹799 
              for the entry-level Starter Pack — representing a gross margin of approximately 
              61%. The high-MOQ scenario (1,000 units) reduces landed cost to ₹287 per unit, 
              further improving margins.
            </p>
            <p>
              Based on this analysis, the GO-BRICS Business Lab Production Research Team 
              concludes that Shungite EMF protection products are Commercially Viable for 
              import and distribution in India at the evaluated volume tiers.
            </p>
          </div>
        </section>

        {/* SECTION 2: UNIT COST BREAKDOWN */}
        <section className="mb-10 print-page-break">
          <h2 className="text-lg font-bold border-b border-neutral-400 pb-1.5 mb-4 uppercase font-mono tracking-wider">
            2. Detailed Unit Cost Model
          </h2>
          
          <div className="mb-6">
            <h3 className="text-xs uppercase font-bold text-neutral-700 mb-2 font-mono">Table 2.1: Sourcing & Logistical Cost Breakdown (MOQ 500)</h3>
            <table className="w-full text-left border-collapse text-xs border border-neutral-300">
              <thead>
                <tr className="bg-neutral-100 border-b border-neutral-300 font-mono text-[10px] uppercase text-neutral-700">
                  <th className="py-2 px-3 border-r border-neutral-300">Cost Component</th>
                  <th className="py-2 px-3 text-right border-r border-neutral-300">Pyramid 200g</th>
                  <th className="py-2 px-3 text-right border-r border-neutral-300">Sphere 150g</th>
                  <th className="py-2 px-3 text-right border-r border-neutral-300">Raw Chunk 60g</th>
                  <th className="py-2 px-3 text-right">Phone Sticker</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {costComponents.map((row, idx) => (
                  <tr key={idx}>
                    <td className="py-1.5 px-3 border-r border-neutral-300 text-neutral-800">{row.name}</td>
                    <td className="py-1.5 px-3 text-right border-r border-neutral-300 font-mono text-black">₹{row.pyramid.toFixed(2)}</td>
                    <td className="py-1.5 px-3 text-right border-r border-neutral-300 font-mono text-black">₹{row.sphere.toFixed(2)}</td>
                    <td className="py-1.5 px-3 text-right border-r border-neutral-300 font-mono text-black">₹{row.chunk.toFixed(2)}</td>
                    <td className="py-1.5 px-3 text-right font-mono text-black">₹{row.sticker.toFixed(2)}</td>
                  </tr>
                ))}
                <tr className="bg-neutral-50 font-bold border-t border-neutral-400">
                  <td className="py-2.5 px-3 border-r border-neutral-300 font-mono text-black">TOTAL LANDED COST</td>
                  <td className="py-2.5 px-3 text-right border-r border-neutral-300 font-mono text-black">₹{totalLandedCosts.pyramid.toFixed(2)}</td>
                  <td className="py-2.5 px-3 text-right border-r border-neutral-300 font-mono text-black">₹{totalLandedCosts.sphere.toFixed(2)}</td>
                  <td className="py-2.5 px-3 text-right border-r border-neutral-300 font-mono text-black">₹{totalLandedCosts.chunk.toFixed(2)}</td>
                  <td className="py-2.5 px-3 text-right font-mono text-black">₹{totalLandedCosts.sticker.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mb-6">
            <h3 className="text-xs uppercase font-bold text-neutral-700 mb-2 font-mono">Table 2.2: Retail Pricing & Profit Margin Analysis</h3>
            <table className="w-full text-left border-collapse text-xs border border-neutral-300">
              <thead>
                <tr className="bg-neutral-100 border-b border-neutral-300 font-mono text-[10px] uppercase text-neutral-700">
                  <th className="py-2 px-3 border-r border-neutral-300">Product Line</th>
                  <th className="py-2 px-3 text-right border-r border-neutral-300">Landed Cost</th>
                  <th className="py-2 px-3 text-right border-r border-neutral-300">Recommended RRP</th>
                  <th className="py-2 px-3 text-right border-r border-neutral-300">Gross Margin</th>
                  <th className="py-2 px-3 text-right">Gross Margin %</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {pricingModel.map((item, idx) => (
                  <tr key={idx}>
                    <td className="py-1.5 px-3 border-r border-neutral-300 font-medium text-black">{item.product}</td>
                    <td className="py-1.5 px-3 text-right border-r border-neutral-300 font-mono text-black">₹{item.landed.toFixed(2)}</td>
                    <td className="py-1.5 px-3 text-right border-r border-neutral-300 font-mono text-black">₹{item.retail.toLocaleString('en-IN')}</td>
                    <td className="py-1.5 px-3 text-right border-r border-neutral-300 font-mono text-black">₹{item.margin.toLocaleString('en-IN')}</td>
                    <td className="py-1.5 px-3 text-right font-mono font-bold text-emerald-800">{item.marginPercent}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div>
            <h3 className="text-xs uppercase font-bold text-neutral-700 mb-2 font-mono">Figure 2.3: Pyramid 200g Cost Segment Allocation</h3>
            <div className="border border-neutral-200 p-4 rounded bg-neutral-50 flex items-center justify-between">
              {/* Fallback chart representing the breakdown visually for PDF output */}
              <div className="w-[180px] h-[180px] shrink-0 border border-neutral-300 rounded bg-white flex flex-col justify-center items-center p-2 text-center">
                <span className="text-[10px] font-mono font-bold text-neutral-500">Pyramid 200g Landed Cost</span>
                <span className="text-lg font-bold text-black mt-1">₹376</span>
                <span className="text-[9px] text-neutral-500 mt-1 font-mono">Raw Material: 47.9% Logistics: 15.2% Taxes: 19.4%</span>
              </div>
              <div className="flex-1 ml-6 space-y-1.5">
                {pyramidPieData.map((entry, index) => (
                  <div key={index} className="flex justify-between text-[11px] border-b border-neutral-200 pb-1">
                    <span className="text-neutral-600 font-mono">{entry.name}</span>
                    <strong className="text-black font-mono">{entry.value}% <span className="text-neutral-500 font-normal">(₹{entry.cost})</span></strong>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: SUPPLIER REFERENCES */}
        <section className="mb-10 print-page-break">
          <h2 className="text-lg font-bold border-b border-neutral-400 pb-1.5 mb-4 uppercase font-mono tracking-wider">
            3. Sourcing Reference Verification
          </h2>
          
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="border border-neutral-300 rounded p-4">
              <h3 className="text-xs font-mono font-bold uppercase border-b border-neutral-300 pb-1 mb-2 text-black">
                Reference 01: Karelian Exports LLC
              </h3>
              <p className="text-[11px] text-neutral-800 space-y-1">
                <div><strong>Origin:</strong> Petrozavodsk, Karelia (Russia)</div>
                <div><strong>Quote Ref:</strong> SQ-001-2026</div>
                <div><strong>MOQ:</strong> 200 units per product</div>
                <div><strong>Lead Time:</strong> 21–28 days</div>
                <div><strong>Pyramid 200g:</strong> USD 3.20 FOB (~₹267)</div>
                <div><strong>Sphere 150g:</strong> USD 2.75 FOB (~₹230)</div>
                <div><strong>Raw Chunk 60g:</strong> USD 1.50 FOB (~₹125)</div>
                <div className="text-neutral-600 mt-2 italic">Notes: Gold Supplier on Alibaba. Accepts T/T and LC payment.</div>
              </p>
            </div>
            
            <div className="border border-neutral-300 rounded p-4 bg-neutral-50">
              <h3 className="text-xs font-mono font-bold uppercase border-b border-neutral-300 pb-1 mb-2 text-emerald-800">
                Reference 02: RusShungite Trade Co. (Primary)
              </h3>
              <p className="text-[11px] text-neutral-800 space-y-1">
                <div><strong>Origin:</strong> Moscow / Karelia Sourcing (Russia)</div>
                <div><strong>Quote Ref:</strong> SQ-002-2026</div>
                <div><strong>MOQ:</strong> 500 units mixed</div>
                <div><strong>Lead Time:</strong> 14–21 days (Expedited)</div>
                <div><strong>Pyramid 200g:</strong> USD 2.95 FOB (~₹246)</div>
                <div><strong>Sphere 150g:</strong> USD 2.55 FOB (~₹213)</div>
                <div><strong>Raw Chunk 60g:</strong> USD 1.35 FOB (~₹113)</div>
                <div><strong>Phone Sticker:</strong> USD 0.45 FOB (~₹38)</div>
                <div className="text-neutral-600 mt-2 italic">Notes: Lower MOQ pricing flexibility, faster lead time, primary supplier.</div>
              </p>
            </div>
          </div>

          <div className="mb-4 text-xs font-mono">
            <strong>Exchange Rate Basis:</strong> 1 USD = ₹83.50.
          </div>

          <div>
            <h3 className="text-xs uppercase font-bold text-neutral-700 mb-2 font-mono">Table 3.1: Supplier Evaluation Comparison</h3>
            <table className="w-full text-left border-collapse text-xs border border-neutral-300">
              <thead>
                <tr className="bg-neutral-100 border-b border-neutral-300 font-mono text-[10px] uppercase text-neutral-700">
                  <th className="py-2 px-3 border-r border-neutral-300">Criteria</th>
                  <th className="py-2 px-3 border-r border-neutral-300">Karelian Exports</th>
                  <th className="py-2 px-3 border-r border-neutral-300">RusShungite Trade</th>
                  <th className="py-2 px-3 text-right">Winner</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {supplierComparison.map((row, idx) => (
                  <tr key={idx}>
                    <td className="py-1.5 px-3 border-r border-neutral-300 text-neutral-800">{row.criteria}</td>
                    <td className="py-1.5 px-3 border-r border-neutral-300 font-mono text-neutral-700">{row.supplier1}</td>
                    <td className="py-1.5 px-3 border-r border-neutral-300 font-mono text-neutral-700">{row.supplier2}</td>
                    <td className="py-1.5 px-3 text-right font-mono font-bold text-emerald-800">{row.winner}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 4: BREAKEVEN ANALYSIS */}
        <section className="mb-10 print-page-break">
          <h2 className="text-lg font-bold border-b border-neutral-400 pb-1.5 mb-4 uppercase font-mono tracking-wider">
            4. Volume & Breakeven Projections
          </h2>

          <div className="space-y-4 mb-6">
            {scenarios.map((scen) => (
              <div key={scen.id} className="border border-neutral-300 rounded p-4">
                <div className="flex justify-between items-center border-b border-neutral-200 pb-1 mb-2">
                  <strong className="text-xs uppercase font-mono text-black">{scen.title}</strong>
                  <span className="text-xs text-neutral-600">Risk: {scen.risk}</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs font-mono text-neutral-800">
                  <div><strong>Quantity:</strong> {scen.moq}</div>
                  <div><strong>Landed Cost:</strong> {scen.landed}</div>
                  <div><strong>Avg Cost/Unit:</strong> {scen.avgCost}</div>
                  <div><strong>Avg Retail:</strong> {scen.avgRetail}</div>
                  <div><strong>Proj. Revenue:</strong> {scen.revenue}</div>
                  <div><strong>Gross Profit:</strong> {scen.profit}</div>
                </div>
                <div className="mt-2 pt-2 border-t border-neutral-200 text-xs flex justify-between font-mono bg-neutral-50 px-2 py-1">
                  <span><strong>Breakeven stock:</strong> {scen.breakevenUnits} ({scen.breakevenPercent})</span>
                  <span><strong>Breakeven revenue:</strong> {scen.breakevenRevenue}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="border border-neutral-200 p-4 rounded bg-neutral-50 flex items-center justify-between gap-6">
            <div className="w-[180px] h-[150px] shrink-0 border border-neutral-300 rounded bg-white flex flex-col justify-center items-center p-2 text-center">
              <span className="text-[10px] font-mono font-bold text-neutral-500">Breakeven Stock %</span>
              <span className="text-sm font-extrabold text-black mt-2">Low MOQ: 44.5%</span>
              <span className="text-sm font-extrabold text-[#047857] mt-1">Medium MOQ: 34.8%</span>
              <span className="text-sm font-extrabold text-black mt-1">High MOQ: 30.6%</span>
            </div>
            <div className="flex-1 text-xs text-neutral-700">
              <h4 className="font-bold text-black font-mono uppercase text-[10px] mb-1">Financial Analysis Commentary</h4>
              The break-even metrics highlight a highly resilient business model. At the recommended Medium MOQ (500 units), the enterprise reaches breakeven after selling only <span className="font-semibold text-black">174 units (34.8% of stock)</span>. This provides a substantial margin of safety of 65.2% to cover marketing, operational, and customer acquisition costs.
            </div>
          </div>
        </section>

        {/* SECTION 5: FEASIBILITY VERDICT */}
        <section className="mb-8">
          <h2 className="text-lg font-bold border-b border-neutral-400 pb-1.5 mb-4 uppercase font-mono tracking-wider">
            5. Feasibility Verdict & Recommendations
          </h2>

          <div className="border-2 border-black rounded p-5 text-center mb-6 bg-neutral-50">
            <div className="text-xs uppercase font-mono font-bold text-neutral-600 mb-1">Official Final Decision</div>
            <h3 className="text-xl font-serif font-bold text-emerald-800">
              VERDICT: ✅ COMMERCIALLY VIABLE
            </h3>
            <p className="text-xs text-neutral-600 mt-2 max-w-lg mx-auto">
              Sourcing and landing Karelia Shungite products in India holds strong margin dynamics, clear import logistics pipelines, and accessible breakeven targets.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="text-xs font-mono font-bold uppercase mb-2 text-emerald-800">Supporting Evidence</h4>
              <ul className="space-y-1.5 text-xs text-neutral-800 list-disc list-inside">
                {supportingEvidence.map((point, index) => (
                  <li key={index} className="text-[11px] leading-tight">{point}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-mono font-bold uppercase mb-2 text-amber-800">Identified Risk Factors</h4>
              <ul className="space-y-1.5 text-xs text-neutral-800 list-disc list-inside">
                {riskFactors.map((risk, index) => (
                  <li key={index} className="text-[11px] leading-tight">{risk}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-xs font-mono font-bold uppercase mb-2 text-black">Strategic Recommendations</h4>
            <div className="space-y-2">
              {recommendations.map((rec) => (
                <div key={rec.id} className="border border-neutral-300 p-2.5 rounded text-xs bg-neutral-50">
                  <strong>Recommendation 0{rec.id}:</strong> {rec.text}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-mono font-bold uppercase mb-2 text-black">Implementation Timeline</h4>
            <table className="w-full text-left border-collapse text-xs border border-neutral-300">
              <thead>
                <tr className="bg-neutral-100 border-b border-neutral-300 font-mono text-[10px] uppercase text-neutral-700">
                  <th className="py-2 px-3 border-r border-neutral-300">Action Item</th>
                  <th className="py-2 px-3 border-r border-neutral-300">Owner</th>
                  <th className="py-2 px-3 text-right">Target Timeline</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {timelineSteps.map((step, idx) => (
                  <tr key={idx}>
                    <td className="py-1.5 px-3 border-r border-neutral-300 text-black font-semibold">{step.action}</td>
                    <td className="py-1.5 px-3 border-r border-neutral-300 text-neutral-700">{step.owner}</td>
                    <td className="py-1.5 px-3 text-right text-emerald-800 font-bold font-mono">{step.timeline}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Print Footer */}
        <div className="mt-12 pt-4 border-t border-neutral-400 text-center text-[10px] text-neutral-500 font-mono">
          <div>GO-BRICS Business Lab — Sourcing & Production Research Department</div>
          <div>CONFIDENTIAL REPORT — SHUNGITE FEASIBILITY ASSESSMENT 2026</div>
        </div>

      </div>

    </div>
  );
}

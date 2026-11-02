import React, { useState } from 'react';
import { PlotSpecification } from '../types';
import { calculateInstallmentPlan, formatCurrencyNaira } from '../utils/realEstateCalculators';
import { Calculator, ArrowRight, Check } from 'lucide-react';

interface PaymentCalculatorProps {
  plotSizes: PlotSpecification[];
  developmentName: string;
  onEnquireWithPlan: (planSummary: string) => void;
}

export const PaymentCalculator: React.FC<PaymentCalculatorProps> = ({
  plotSizes,
  developmentName,
  onEnquireWithPlan
}) => {
  const [selectedPlotIndex, setSelectedPlotIndex] = useState(0);
  const [duration, setDuration] = useState<number>(6); // 0 (outright), 3, 6, 12
  const [depositPercent, setDepositPercent] = useState<number>(30); // 20, 30, 50

  const activePlot = plotSizes[selectedPlotIndex] || plotSizes[0];
  const price = activePlot ? (activePlot.promoPrice || activePlot.price) : 0;

  const plan = calculateInstallmentPlan(
    price,
    duration,
    duration === 0 ? 100 : depositPercent
  );

  return (
    <div className="bg-[#102342] border border-[#1E3A6E] rounded-2xl p-6 sm:p-8 shadow-xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-[#0B1930] border border-[#C8A45D]/50 flex items-center justify-center text-[#C8A45D]">
          <Calculator className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white tracking-tight">
            Flexible Milestone & Payment Plan Calculator
          </h3>
          <p className="text-xs text-slate-400">
            Select a plot size and review structured cash-flow milestones for {developmentName}.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls */}
        <div className="lg:col-span-7 space-y-6">
          {/* Plot Size Selection */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              1. Select Plot Size
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {plotSizes.map((plot, idx) => (
                <button
                  key={plot.id}
                  onClick={() => setSelectedPlotIndex(idx)}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    selectedPlotIndex === idx
                      ? 'bg-[#0B1930] border-[#C8A45D] ring-1 ring-[#C8A45D]'
                      : 'bg-[#060E1A]/80 border-[#1E3A6E] hover:border-slate-500'
                  }`}
                >
                  <div className="text-sm font-bold text-white">{plot.size}</div>
                  <div className="text-[11px] text-[#C8A45D] font-medium mt-0.5">{plot.title}</div>
                  <div className="text-xs font-mono font-semibold text-slate-200 mt-2">
                    {formatCurrencyNaira(plot.promoPrice || plot.price)}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Payment Horizon / Duration */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              2. Select Payment Horizon
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {[
                { months: 0, label: 'Outright (30 Days)' },
                { months: 3, label: '3 Months' },
                { months: 6, label: '6 Months' },
                { months: 12, label: '12 Months' }
              ].map((item) => (
                <button
                  key={item.months}
                  onClick={() => setDuration(item.months)}
                  className={`py-2.5 px-3 rounded-lg border text-xs font-medium transition-all ${
                    duration === item.months
                      ? 'bg-[#C8A45D] text-[#0B1930] font-bold border-[#C8A45D]'
                      : 'bg-[#060E1A] text-slate-300 border-[#1E3A6E] hover:border-slate-500 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Down Payment % (if installment) */}
          {duration > 0 && (
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                3. Initial Commitment Deposit
              </label>
              <div className="flex items-center gap-3">
                {[20, 25, 30, 50].map((pct) => (
                  <button
                    key={pct}
                    onClick={() => setDepositPercent(pct)}
                    className={`flex-1 py-2 rounded-lg border text-xs font-medium transition-all ${
                      depositPercent === pct
                        ? 'bg-[#142B52] border-[#C8A45D] text-[#C8A45D] font-semibold'
                        : 'bg-[#060E1A] border-[#1E3A6E] text-slate-400 hover:text-white'
                    }`}
                  >
                    {pct}% Deposit
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Results Card */}
        <div className="lg:col-span-5 bg-[#060E1A] border border-[#1E3A6E] rounded-xl p-6 space-y-4">
          <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
            Payment Breakdown Summary
          </div>

          <div className="space-y-3 divide-y divide-[#1E3A6E]/50 text-xs">
            <div className="flex justify-between items-center pt-2">
              <span className="text-slate-400">Selected Plot:</span>
              <span className="font-semibold text-white">{activePlot?.size} ({activePlot?.title})</span>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="text-slate-400">Total Purchase Price:</span>
              <span className="font-mono font-bold text-base text-white">
                {formatCurrencyNaira(plan.totalPrice)}
              </span>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="text-slate-400">Initial Down Payment ({duration === 0 ? '100%' : `${plan.initialDepositPercent}%`}):</span>
              <span className="font-mono font-bold text-emerald-400">
                {formatCurrencyNaira(duration === 0 ? plan.totalPrice : plan.initialDepositAmount)}
              </span>
            </div>
            {duration > 0 && (
              <>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-slate-400">Remaining Balance:</span>
                  <span className="font-mono text-slate-300">
                    {formatCurrencyNaira(plan.remainingBalance)}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-2 bg-[#102342]/50 p-2.5 rounded-lg -mx-1">
                  <span className="text-amber-200 font-medium">Estimated Monthly Payment ({duration} mos):</span>
                  <span className="font-mono font-bold text-base text-[#C8A45D]">
                    {formatCurrencyNaira(plan.monthlyPayment)} /mo
                  </span>
                </div>
              </>
            )}
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                const summary = `${activePlot?.size} on ${plan.planName} (Initial Deposit: ${formatCurrencyNaira(
                  duration === 0 ? plan.totalPrice : plan.initialDepositAmount
                )})`;
                onEnquireWithPlan(summary);
              }}
              className="w-full py-3 px-4 text-xs font-semibold uppercase tracking-wider rounded-lg bg-[#C8A45D] hover:bg-[#DFC07C] text-[#0B1930] transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Lock in This Payment Plan</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="text-[10px] text-slate-400 leading-normal italic">
            * Note: Figures serve as structured payment projections. Survey and legal documentation fees are finalized with official contract execution.
          </p>
        </div>
      </div>
    </div>
  );
};

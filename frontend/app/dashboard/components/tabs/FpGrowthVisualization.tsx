'use client';

import React, { useState } from 'react';
import { ArrowRight, BarChart3, CheckCircle2, ChevronDown, ChevronRight, Database, GitBranch, Layers, Zap } from 'lucide-react';

export interface FpTreeNode {
  item: string;
  count: number;
  children?: FpTreeNode[];
}

export interface FpGrowthProcessData {
  parameters: {
    minSupport: number;
    minConfidence: number;
    minSupportCount: number;
    totalTransactions: number;
  };
  step1_allItems: Array<{ item: string; count: number; support: number }>;
  step2_frequentItems: Array<{ item: string; count: number; support: number; passed: boolean }>;
  step3_orderedTransactions: Array<{ original: string[]; ordered: string[] }>;
  step4_fpTree: FpTreeNode;
  step5_headerTable: Array<{ item: string; count: number }>;
  step6_conditionalPatterns: Array<{
    item: string;
    patterns: Array<{ path: string[]; count: number }>;
    frequentCondItems: Array<{ item: string; count: number }>;
    frequent3Itemsets: Array<{ items: string[]; count: number }>;
  }>;
  step7_frequentItemsets: Array<{ items: string[]; count: number; support: number }>;
  step8_rules: Array<{
    product_a: string;
    product_b: string;
    product_c: string | null;
    support: number;
    confidence: number;
    lift: number;
    supportPercent: string;
    confidencePercent: string;
    liftRatio: string;
  }>;
}

interface Props {
  processData: FpGrowthProcessData;
}

function StepHeader({ step, title, icon: Icon, isOpen, onToggle, badge }: {
  step: number; title: string; icon: React.ElementType; isOpen: boolean; onToggle: () => void; badge?: string;
}) {
  return (
    <button onClick={onToggle} className="w-full flex items-center gap-3 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors text-left group">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 text-amber-700 font-bold text-sm shrink-0">
        {step}
      </div>
      <Icon className="h-4 w-4 text-gray-500 shrink-0" />
      <span className="text-sm font-bold text-gray-900 flex-1">{title}</span>
      {badge && <span className="text-[10px] font-bold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">{badge}</span>}
      {isOpen ? <ChevronDown className="h-4 w-4 text-gray-400" /> : <ChevronRight className="h-4 w-4 text-gray-400" />}
    </button>
  );
}

function TreeNode({ node, depth = 0 }: { node: FpTreeNode; depth?: number }) {
  const [isExpanded, setIsExpanded] = useState(depth < 2);
  const hasChildren = (node.children?.length ?? 0) > 0;
  const isRoot = node.item === 'root';

  return (
    <div className={depth > 0 ? 'ml-4 md:ml-6 border-l-2 border-gray-200 pl-3 md:pl-4' : ''}>
      <div className="flex items-center gap-2 py-1">
        {hasChildren ? (
          <button onClick={() => setIsExpanded(!isExpanded)} className="shrink-0 w-5 h-5 flex items-center justify-center rounded text-gray-400 hover:text-gray-700 hover:bg-gray-100">
            {isExpanded ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
          </button>
        ) : (
          <div className="w-5" />
        )}
        <div className={`flex items-center gap-2 px-2 py-1 rounded-lg text-xs font-medium ${isRoot ? 'bg-gray-200 text-gray-700' : 'bg-amber-50 text-amber-800 border border-amber-200'}`}>
          <span className="font-bold">{isRoot ? 'ROOT' : node.item}</span>
          {!isRoot && <span className="text-amber-600">×{node.count}</span>}
        </div>
      </div>
      {isExpanded && hasChildren && (
        <div>
          {node.children!.map((child: FpTreeNode, idx: number) => (
            <TreeNode key={`${child.item}-${idx}`} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

function FpGrowthVisualization({ processData }: Props) {
  const [openSteps, setOpenSteps] = useState<Set<number>>(new Set([1]));

  const toggleStep = (step: number) => {
    setOpenSteps((prev) => {
      const next = new Set(prev);
      if (next.has(step)) { next.delete(step); } else { next.add(step); }
      return next;
    });
  };

  const p = processData.parameters;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-4 sm:px-6 py-4 sm:py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-amber-500 shrink-0">
            <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
          </div>
          <div className="min-w-0">
            <h3 className="text-sm sm:text-lg font-bold text-white">Visualisasi Proses FP-Growth</h3>
            <p className="text-[10px] sm:text-xs text-gray-400">Langkah-langkah algoritma FP-Growth dari data transaksi hingga association rules</p>
          </div>
        </div>
        <div className="mt-3 sm:mt-4 grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
          <div className="rounded-lg bg-white/10 px-2 sm:px-3 py-2">
            <p className="text-[10px] text-gray-400 uppercase font-bold">Total Transaksi</p>
            <p className="text-base sm:text-lg font-bold text-white">{p.totalTransactions}</p>
          </div>
          <div className="rounded-lg bg-white/10 px-2 sm:px-3 py-2">
            <p className="text-[10px] text-gray-400 uppercase font-bold">Min Support</p>
            <p className="text-base sm:text-lg font-bold text-white">{(p.minSupport * 100).toFixed(1)}%</p>
          </div>
          <div className="rounded-lg bg-white/10 px-2 sm:px-3 py-2">
            <p className="text-[10px] text-gray-400 uppercase font-bold">Min Confidence</p>
            <p className="text-base sm:text-lg font-bold text-white">{(p.minConfidence * 100).toFixed(0)}%</p>
          </div>
          <div className="rounded-lg bg-white/10 px-2 sm:px-3 py-2">
            <p className="text-[10px] text-gray-400 uppercase font-bold">Min Support Count</p>
            <p className="text-base sm:text-lg font-bold text-white">≥ {p.minSupportCount} txn</p>
          </div>
        </div>
      </div>
      <div className="p-3 sm:p-4 md:p-6 space-y-3">
        <div>
          <StepHeader step={1} title="Scan 1 — Hitung Frekuensi Setiap Item" icon={Database} isOpen={openSteps.has(1)} onToggle={() => toggleStep(1)} badge={`${processData.step1_allItems.length} item`} />
          {openSteps.has(1) && (
            <div className="mt-3 overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 px-3 font-bold text-gray-500">Item Produk</th>
                    <th className="text-center py-2 px-3 font-bold text-gray-500">Frekuensi</th>
                    <th className="text-center py-2 px-3 font-bold text-gray-500">Support</th>
                    <th className="text-center py-2 px-3 font-bold text-gray-500">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {processData.step1_allItems.map((item) => {
                    const passed = item.count >= p.minSupportCount;
                    return (
                      <tr key={item.item} className={`border-b border-gray-50 ${passed ? '' : 'opacity-50'}`}>
                        <td className="py-2 px-3 font-semibold text-gray-800">{item.item}</td>
                        <td className="py-2 px-3 text-center font-mono">{item.count}</td>
                        <td className="py-2 px-3 text-center font-mono">{(item.support * 100).toFixed(2)}%</td>
                        <td className="py-2 px-3 text-center">
                          {passed ? (
                            <span className="inline-flex items-center gap-1 text-emerald-600 font-bold"><CheckCircle2 className="h-3 w-3" /> Lolos</span>
                          ) : (
                            <span className="text-red-400 font-semibold">Tidak Lolos</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <div>
          <StepHeader step={2} title="Filter Item Frequent (≥ Min Support)" icon={CheckCircle2} isOpen={openSteps.has(2)} onToggle={() => toggleStep(2)} badge={`${processData.step2_frequentItems.length} item lolos`} />
          {openSteps.has(2) && (
            <div className="mt-3 flex flex-wrap gap-2 px-2">
              {processData.step2_frequentItems.map((item) => (
                <div key={item.item} className="flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2">
                  <span className="text-xs font-bold text-amber-800">{item.item}</span>
                  <span className="text-[10px] font-mono bg-amber-200 text-amber-800 px-1.5 py-0.5 rounded">{item.count}× ({(item.support * 100).toFixed(1)}%)</span>
                </div>
              ))}
              <p className="w-full text-[11px] text-gray-500 mt-2 italic">Diurutkan descending berdasarkan frekuensi — urutan ini menentukan struktur FP-Tree.</p>
            </div>
          )}
        </div>
        <div>
          <StepHeader step={3} title="Scan 2 — Urutkan Transaksi Berdasarkan Frekuensi" icon={Layers} isOpen={openSteps.has(3)} onToggle={() => toggleStep(3)} badge={`${processData.step3_orderedTransactions.length} sampel`} />
          {openSteps.has(3) && (
            <div className="mt-3 overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 px-3 font-bold text-gray-500 w-8">TID</th>
                    <th className="text-left py-2 px-3 font-bold text-gray-500">Transaksi Asli</th>
                    <th className="text-center py-2 px-3 font-bold text-gray-500 w-8" />
                    <th className="text-left py-2 px-3 font-bold text-gray-500">Setelah Diurutkan</th>
                  </tr>
                </thead>
                <tbody>
                  {processData.step3_orderedTransactions.map((txn, idx) => (
                    <tr key={idx} className="border-b border-gray-50">
                      <td className="py-2 px-3 font-bold text-gray-400">T{idx + 1}</td>
                      <td className="py-2 px-3">
                        <div className="flex flex-wrap gap-1">
                          {txn.original.map((item) => (
                            <span key={item} className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">{item}</span>
                          ))}
                        </div>
                      </td>
                      <td className="py-2 px-3 text-center"><ArrowRight className="h-3 w-3 text-gray-400 mx-auto" /></td>
                      <td className="py-2 px-3">
                        <div className="flex flex-wrap gap-1">
                          {txn.ordered.map((item, i) => (
                            <span key={item} className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-semibold">
                              {i > 0 && <span className="text-amber-400 mr-0.5">→ </span>}{item}
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {p.totalTransactions > 20 && (
                <p className="text-[10px] text-gray-400 mt-2 px-3 italic">Menampilkan 20 dari {p.totalTransactions} transaksi.</p>
              )}
            </div>
          )}
        </div>
        <div>
          <StepHeader step={4} title="Pembangunan FP-Tree" icon={GitBranch} isOpen={openSteps.has(4)} onToggle={() => toggleStep(4)} />
          {openSteps.has(4) && (
            <div className="mt-3 px-2 py-3 bg-gray-50 rounded-xl overflow-x-auto">
              <p className="text-[11px] text-gray-500 mb-3 italic">Semua transaksi dimasukkan sebagai path dari root. Transaksi yang berbagi prefix → node di-merge (count bertambah).</p>
              <TreeNode node={processData.step4_fpTree} />
            </div>
          )}
        </div>
        <div>
          <StepHeader step={5} title="Header Table" icon={BarChart3} isOpen={openSteps.has(5)} onToggle={() => toggleStep(5)} badge={`${processData.step5_headerTable.length} item`} />
          {openSteps.has(5) && (
            <div className="mt-3 overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 px-3 font-bold text-gray-500">Item</th>
                    <th className="text-center py-2 px-3 font-bold text-gray-500">Frekuensi Total</th>
                    <th className="text-left py-2 px-3 font-bold text-gray-500">Keterangan</th>
                  </tr>
                </thead>
                <tbody>
                  {processData.step5_headerTable.map((item) => (
                    <tr key={item.item} className="border-b border-gray-50">
                      <td className="py-2 px-3 font-bold text-gray-800">{item.item}</td>
                      <td className="py-2 px-3 text-center font-mono">{item.count}</td>
                      <td className="py-2 px-3 text-gray-500">Linked list ke semua node &quot;{item.item}&quot; di FP-Tree</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <div>
          <StepHeader step={6} title="Mining — Conditional Pattern Base" icon={Layers} isOpen={openSteps.has(6)} onToggle={() => toggleStep(6)} badge={`${processData.step6_conditionalPatterns.length} item diproses`} />
          {openSteps.has(6) && (
            <div className="mt-3 space-y-3 px-2">
              <p className="text-[11px] text-gray-500 italic">Untuk setiap item (dari frekuensi terendah), telusuri semua path ke root → kumpulkan conditional pattern base → cari frequent itemsets.</p>
              {processData.step6_conditionalPatterns.map((cp) => (
                <div key={cp.item} className="rounded-xl border border-gray-100 p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold bg-gray-900 text-white px-2 py-0.5 rounded">{cp.item}</span>
                    <span className="text-[10px] text-gray-500">Conditional Pattern Base:</span>
                  </div>
                  {cp.patterns.length > 0 ? (
                    <div className="space-y-1 mb-2">
                      {cp.patterns.map((pat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-[11px]">
                          <span className="text-gray-400">Path:</span>
                          <div className="flex gap-1">
                            {pat.path.map((pathItem) => (
                              <span key={pathItem} className="bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded font-medium">{pathItem}</span>
                            ))}
                          </div>
                          <span className="text-gray-500 font-mono">(count: {pat.count})</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-[10px] text-gray-400 mb-2 italic">Tidak ada path (item ini hanya muncul sebagai root child)</p>
                  )}
                  {cp.frequentCondItems.length > 0 && (
                    <div className="flex flex-wrap items-center gap-2 mt-1 pt-2 border-t border-gray-100">
                      <ArrowRight className="h-3 w-3 text-emerald-500 shrink-0" />
                      <span className="text-[10px] text-emerald-700 font-bold">Frequent 2-itemset:</span>
                      {cp.frequentCondItems.map((fi) => (
                        <span key={fi.item} className="text-[10px] bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded font-semibold">
                          {`{${fi.item}, ${cp.item}}`} (count: {fi.count})
                        </span>
                      ))}
                    </div>
                  )}
                  {cp.frequent3Itemsets?.length > 0 && (
                    <div className="flex flex-wrap items-center gap-2 mt-1 pt-2 border-t border-gray-100">
                      <ArrowRight className="h-3 w-3 text-purple-500 shrink-0" />
                      <span className="text-[10px] text-purple-700 font-bold">Frequent 3-itemset:</span>
                      {cp.frequent3Itemsets.map((is3, idx) => (
                        <span key={idx} className="text-[10px] bg-purple-50 text-purple-700 px-1.5 py-0.5 rounded font-semibold">
                          {`{${is3.items.join(', ')}}`} (count: {is3.count})
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
          <StepHeader step={7} title="Frequent Itemsets (Setelah Deduplikasi)" icon={Layers} isOpen={openSteps.has(7)} onToggle={() => toggleStep(7)} badge={`${processData.step7_frequentItemsets.length} itemset`} />
          {openSteps.has(7) && (
            <div className="mt-3 overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 px-3 font-bold text-gray-500">Itemset</th>
                    <th className="text-center py-2 px-3 font-bold text-gray-500">Ukuran</th>
                    <th className="text-center py-2 px-3 font-bold text-gray-500">Count</th>
                    <th className="text-center py-2 px-3 font-bold text-gray-500">Support</th>
                  </tr>
                </thead>
                <tbody>
                  {processData.step7_frequentItemsets.map((is, idx) => (
                    <tr key={idx} className="border-b border-gray-50">
                      <td className="py-2 px-3">
                        <span className="font-semibold text-gray-800">{`{${is.items.join(', ')}}`}</span>
                      </td>
                      <td className="py-2 px-3 text-center">
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${is.items.length === 2 ? 'bg-emerald-50 text-emerald-700' : 'bg-purple-50 text-purple-700'}`}>
                          {is.items.length}-itemset
                        </span>
                      </td>
                      <td className="py-2 px-3 text-center font-mono">{is.count}</td>
                      <td className="py-2 px-3 text-center font-mono">{(is.support * 100).toFixed(2)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <div>
          <StepHeader step={8} title="Association Rules (Hasil Akhir)" icon={Zap} isOpen={openSteps.has(8)} onToggle={() => toggleStep(8)} badge={`${processData.step8_rules.length} rules`} />
          {openSteps.has(8) && (
            <div className="mt-3 overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 px-3 font-bold text-gray-500">Rule</th>
                    <th className="text-center py-2 px-3 font-bold text-gray-500">Support</th>
                    <th className="text-center py-2 px-3 font-bold text-gray-500">Confidence</th>
                    <th className="text-center py-2 px-3 font-bold text-gray-500">Lift</th>
                    <th className="text-left py-2 px-3 font-bold text-gray-500">Interpretasi</th>
                  </tr>
                </thead>
                <tbody>
                  {processData.step8_rules.map((rule, idx) => (
                    <tr key={idx} className="border-b border-gray-50">
                      <td className="py-2 px-3">
                        <span className="font-bold text-gray-800">{rule.product_a}</span>
                        <span className="text-amber-500 mx-1">→</span>
                        <span className="font-bold text-gray-800">{rule.product_b}</span>
                        {rule.product_c && <span className="ml-1 text-[10px] bg-purple-50 text-purple-700 px-1.5 py-0.5 rounded font-bold">3-item</span>}
                      </td>
                      <td className="py-2 px-3 text-center font-mono text-blue-600">{rule.supportPercent}</td>
                      <td className="py-2 px-3 text-center font-mono font-bold text-emerald-600">{rule.confidencePercent}</td>
                      <td className="py-2 px-3 text-center font-mono text-purple-600">{rule.liftRatio}</td>
                      <td className="py-2 px-3 text-gray-500">
                        {rule.confidencePercent} pembeli <strong>{rule.product_a}</strong> juga membeli <strong>{rule.product_b}</strong>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default React.memo(FpGrowthVisualization);

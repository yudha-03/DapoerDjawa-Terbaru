'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { TrendingUp, ShoppingBag, Package, Box, Download, Sparkles, RefreshCw, ArrowUpRight, ChevronDown, SlidersHorizontal, Info } from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { formatRupiah } from '@/lib/api';
import { toast } from '@/components/ui/toast';
import FpGrowthVisualization, { type FpGrowthProcessData } from './FpGrowthVisualization';

type TimeFrame = 'thisMonth' | 'thisYear' | 'allTime';

interface ChartDataItem {
  name: string;
  revenue: number;
  orders?: number;
}

interface PeriodStats {
  revenue: number;
  orders: number;
}

interface OverviewTabProps {
  initialStats: {
    totalRevenue?: number;
    totalOrders?: number;
    totalProducts?: number;
    chartData?: {
      today?: ChartDataItem[];
      last7?: ChartDataItem[];
      last30?: ChartDataItem[];
      thisMonth?: ChartDataItem[];
      thisYear?: ChartDataItem[];
      allTime?: ChartDataItem[];
    };
    periodStats?: {
      today?: PeriodStats;
      last7?: PeriodStats;
      last30?: PeriodStats;
      thisMonth?: PeriodStats;
      thisYear?: PeriodStats;
      allTime?: PeriodStats;
    };
    topProducts?: Array<{ nama: string; terjual: number; harga: string; gambar?: string }>;
    activeRulesCount?: number;
    fpGrowthRules?: Array<{
      product_a: string;
      product_b: string;
      product_c?: string | null;
      support: number;
      confidence: number;
      lift?: number;
      image_a?: string;
      image_b?: string;
      image_c?: string | null;
    }>;
  };
}

interface JsPDFCustom {
  lastAutoTable: {
    finalY: number;
  };
  [key: string]: unknown;
}

const periodLabelMap: Record<string, string> = {
  thisMonth: 'Bulan Ini',
  thisYear: 'Tahun Ini',
  allTime: 'Semua Waktu',
};

function OverviewTab({ initialStats }: OverviewTabProps) {
  const [timeFrame, setTimeFrame] = useState<TimeFrame>('allTime');
  const [showExportMenu, setShowExportMenu] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [stats] = useState({
    totalRevenue: initialStats.totalRevenue ?? 0,
    totalProducts: initialStats.totalProducts ?? 8,
    chartData: initialStats.chartData ?? {
      thisMonth: [],
      thisYear: [],
      allTime: [],
    },
    periodStats: initialStats.periodStats ?? {
      thisMonth: { revenue: 0, orders: 0 },
      thisYear: { revenue: 0, orders: 0 },
      allTime: { revenue: 0, orders: 0 },
    },
    topProducts: initialStats.topProducts ?? [],
    activeRulesCount: initialStats.activeRulesCount ?? 0,
    fpGrowthRules: initialStats.fpGrowthRules ?? [],
  });

  const {
    totalRevenue = 0,
    // totalOrders not directly displayed — revenue/orders come from periodStats
    totalProducts = 0,
    chartData,
    periodStats,
    topProducts = [],
    activeRulesCount = 0,
    fpGrowthRules = [],
  } = stats;

  const [isLoadingFpGrowth, setIsLoadingFpGrowth] = useState(false);
  const [currentRulesCount, setCurrentRulesCount] = useState(activeRulesCount);
  const [showFpGrowthResults, setShowFpGrowthResults] = useState(false);
  const [fpGrowthProcessData, setFpGrowthProcessData] = useState<FpGrowthProcessData | null>(null);
  const [showFpGrowthPanel, setShowFpGrowthPanel] = useState(false);
  const [minSupport, setMinSupport] = useState(0.03);
  const [minConfidence, setMinConfidence] = useState(0.5);
  const fpGrowthPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowExportMenu(false);
      }
      if (fpGrowthPanelRef.current && !fpGrowthPanelRef.current.contains(event.target as Node)) {
        setShowFpGrowthPanel(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getActiveChartData = (): ChartDataItem[] => {
    if (!chartData) return [];
    if (Array.isArray(chartData)) return chartData;
    return chartData[timeFrame] || [];
  };

  const activeChart = getActiveChartData();

  const periodLabels: Record<TimeFrame, string> = {
    thisMonth: 'Bulan Ini',
    thisYear: 'Tahun Ini',
    allTime: 'Semua',
  };

  const activePeriod = periodStats?.[timeFrame] || { revenue: 0, orders: 0 };
  const activePeriodLabel = periodLabels[timeFrame];

  const summaryCards = [
    {
      title: `Pendapatan (${activePeriodLabel})`,
      value: formatRupiah(activePeriod.revenue),
      subtext: `Total omset periode ${activePeriodLabel.toLowerCase()}`,
      icon: TrendingUp,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-100',
      badge: activePeriodLabel,
      badgeColor: 'bg-emerald-100 text-emerald-700',
    },
    {
      title: `Pesanan (${activePeriodLabel})`,
      value: activePeriod.orders.toLocaleString('id-ID'),
      subtext: `Transaksi terkirim periode ${activePeriodLabel.toLowerCase()}`,
      icon: ShoppingBag,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-100',
      badge: `${activePeriod.orders} pesanan`,
      badgeColor: 'bg-blue-100 text-blue-700',
    },
    {
      title: 'Aturan Bundling',
      value: currentRulesCount.toString(),
      subtext: 'Pola paket FP-Growth',
      icon: Package,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-100',
      badge: 'Aktif',
      badgeColor: 'bg-amber-100 text-amber-700',
    },
    {
      title: 'Total Produk',
      value: totalProducts.toString(),
      subtext: 'Katalog varian toko',
      icon: Box,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-100',
      badge: 'Siap Jual',
      badgeColor: 'bg-purple-100 text-purple-700',
    },
  ];

  const handleRunFpGrowth = async () => {
    setIsLoadingFpGrowth(true);
    try {
      await new Promise((r) => setTimeout(r, 600));
      setCurrentRulesCount(0);
      setFpGrowthProcessData(null);
      setShowFpGrowthResults(true);
      toast.add({
        type: 'info',
        title: 'Belum Ada Transaksi Cukup',
        description: 'Algoritma FP-Growth membutuhkan riwayat transaksi penjualan untuk menghasilkan aturan asosiasi produk.',
      });
    } catch {
      toast.add({ type: 'error', title: 'Terjadi kesalahan saat memproses data.' });
    } finally {
      setIsLoadingFpGrowth(false);
    }
  };

  const handleExportPDF = async (mode: TimeFrame) => {
    setShowExportMenu(false);
    const { default: jsPDFLib } = await import('jspdf');
    const { default: autoTable } = await import('jspdf-autotable');
    const doc = new jsPDFLib();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 14;
    const contentWidth = pageWidth - margin * 2;
    const printDate = new Intl.DateTimeFormat('id-ID', { dateStyle: 'full', timeStyle: 'short' }).format(new Date());
    const periodText = periodLabelMap[mode];
    const periodChartData = chartData?.[mode] || [];
    const periodRevenue = periodChartData.length > 0
      ? periodChartData.reduce((acc, curr) => acc + (curr.revenue || 0), 0)
      : totalRevenue;

    const COLORS = {
      dark: [15, 23, 42] as [number, number, number],
      slate700: [51, 65, 85] as [number, number, number],
      slate500: [100, 116, 139] as [number, number, number],
      amber600: [217, 119, 6] as [number, number, number],
      amber50: [255, 251, 235] as [number, number, number],
      emerald600: [5, 150, 105] as [number, number, number],
      blue600: [37, 99, 235] as [number, number, number],
      white: [255, 255, 255] as [number, number, number],
      line: [226, 232, 240] as [number, number, number],
      bgLight: [248, 250, 252] as [number, number, number],
    };

    const drawAccentLine = (y: number) => {
      doc.setDrawColor(...COLORS.amber600);
      doc.setLineWidth(0.8);
      doc.line(margin, y, margin + 40, y);
      doc.setDrawColor(...COLORS.line);
      doc.setLineWidth(0.2);
      doc.line(margin + 42, y, pageWidth - margin, y);
    };

    const drawSectionTitle = (title: string, y: number): number => {
      drawAccentLine(y);
      doc.setTextColor(...COLORS.dark);
      doc.setFontSize(13);
      doc.setFont('helvetica', 'bold');
      doc.text(title, margin, y + 8);
      return y + 14;
    };

    const drawFooter = (pageNum: number, totalPagesPlaceholder?: string) => {
      doc.setDrawColor(...COLORS.line);
      doc.setLineWidth(0.3);
      doc.line(margin, pageHeight - 15, pageWidth - margin, pageHeight - 15);
      doc.setFontSize(7);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(...COLORS.slate500);
      doc.text('Dokumen ini digenerate otomatis oleh sistem DapoerDjawa', margin, pageHeight - 10);
      doc.text(
        `Halaman ${pageNum}${totalPagesPlaceholder ? ` dari ${totalPagesPlaceholder}` : ''}`,
        pageWidth - margin,
        pageHeight - 10,
        { align: 'right' }
      );
    };

    const checkPageBreak = (y: number, needed: number): number => {
      if (y + needed > pageHeight - 25) {
        drawFooter(doc.getNumberOfPages());
        doc.addPage();
        return 20;
      }
      return y;
    };

    doc.setFillColor(...COLORS.dark);
    doc.rect(0, 0, pageWidth, 44, 'F');
    doc.setFillColor(...COLORS.amber600);
    doc.rect(0, 44, pageWidth, 3, 'F');
    doc.setTextColor(...COLORS.white);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.text('LAPORAN KINERJA', margin, 18);
    doc.setFontSize(24);
    doc.text('DAPOER DJAWA', margin, 28);
    doc.setFillColor(...COLORS.amber600);
    doc.roundedRect(pageWidth - margin - 52, 10, 52, 12, 2, 2, 'F');
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...COLORS.white);
    doc.text(`PERIODE ${periodText.toUpperCase()}`, pageWidth - margin - 26, 17.5, { align: 'center' });
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(180, 190, 200);
    doc.text(`Dicetak: ${printDate}`, margin, 38);

    let y = 58;
    doc.setTextColor(...COLORS.dark);
    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.text('Ringkasan Eksekutif', margin, y);
    y += 6;

    const pdfPeriodStats = periodStats?.[mode] || { revenue: 0, orders: 0 };
    const cardWidth = (contentWidth - 9) / 4;
    const cardHeight = 28;
    const cardData = [
      { label: `Pendapatan (${periodText})`, value: formatRupiah(pdfPeriodStats.revenue), accent: COLORS.emerald600 },
      { label: `Pesanan (${periodText})`, value: `${pdfPeriodStats.orders}`, accent: COLORS.blue600 },
      { label: 'Varian Produk', value: `${totalProducts}`, accent: COLORS.amber600 },
      { label: 'Bundling Aktif', value: `${currentRulesCount}`, accent: COLORS.dark },
    ];

    cardData.forEach((card, i) => {
      const x = margin + i * (cardWidth + 3);
      doc.setFillColor(...COLORS.bgLight);
      doc.roundedRect(x, y, cardWidth, cardHeight, 2, 2, 'F');
      doc.setFillColor(...(card.accent as [number, number, number]));
      doc.rect(x, y, cardWidth, 2, 'F');
      doc.setFontSize(7);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(...COLORS.slate500);
      doc.text(card.label.toUpperCase(), x + cardWidth / 2, y + 10, { align: 'center' });
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(...COLORS.dark);
      doc.text(card.value, x + cardWidth / 2, y + 20, { align: 'center' });
    });

    y += cardHeight + 14;

    if (periodChartData.length > 0) {
      y = checkPageBreak(y, 60);
      y = drawSectionTitle(`Rincian Pendapatan — ${periodText}`, y);
      const chartRows = periodChartData.map((item, idx) => [
        `${idx + 1}`,
        item.name,
        formatRupiah(item.revenue),
      ]);
      chartRows.push(['', 'TOTAL', formatRupiah(periodRevenue)]);
      autoTable(doc, {
        startY: y,
        head: [['No', (mode === 'thisYear' || mode === 'allTime') ? 'Bulan' : 'Tanggal', 'Pendapatan']],
        body: chartRows,
        theme: 'plain',
        showHead: 'everyPage',
        margin: { left: margin, right: margin, bottom: 22 },
        styles: { fontSize: 9, cellPadding: { top: 4, bottom: 4, left: 6, right: 6 }, font: 'helvetica', lineColor: COLORS.line, lineWidth: 0.2 },
        headStyles: { fillColor: COLORS.dark, textColor: COLORS.white, fontStyle: 'bold', fontSize: 8, halign: 'center' },
        bodyStyles: { textColor: COLORS.slate700 },
        alternateRowStyles: { fillColor: COLORS.bgLight },
        columnStyles: {
          0: { cellWidth: 16, halign: 'center', fontStyle: 'bold' },
          1: { cellWidth: 'auto' },
          2: { cellWidth: 55, halign: 'right', fontStyle: 'bold', textColor: COLORS.emerald600 },
        },
        didParseCell: (data) => {
          if (data.row.index === chartRows.length - 1) {
            data.cell.styles.fillColor = COLORS.amber50;
            data.cell.styles.fontStyle = 'bold';
            data.cell.styles.textColor = COLORS.dark;
            data.cell.styles.fontSize = 10;
          }
        },
      });
      y = (doc as unknown as JsPDFCustom).lastAutoTable.finalY + 14;
    }

    y = checkPageBreak(y, 60);
    y = drawSectionTitle('Produk Terlaris — Top 5', y);

    if (topProducts.length > 0) {
      const topProductsData = topProducts.map((p, index) => [
        `${index + 1}`,
        p.nama,
        `${p.terjual} pcs`,
        p.harga,
      ]);
      autoTable(doc, {
        startY: y,
        head: [['#', 'Nama Produk', 'Terjual', 'Harga Satuan']],
        body: topProductsData,
        theme: 'plain',
        showHead: 'everyPage',
        margin: { left: margin, right: margin, bottom: 22 },
        styles: { fontSize: 9, cellPadding: { top: 4, bottom: 4, left: 6, right: 6 }, font: 'helvetica', lineColor: COLORS.line, lineWidth: 0.2 },
        headStyles: { fillColor: COLORS.amber600, textColor: COLORS.white, fontStyle: 'bold', fontSize: 8, halign: 'center' },
        bodyStyles: { textColor: COLORS.slate700 },
        alternateRowStyles: { fillColor: COLORS.bgLight },
        columnStyles: {
          0: { cellWidth: 14, halign: 'center', fontStyle: 'bold', textColor: COLORS.amber600 },
          1: { cellWidth: 'auto', fontStyle: 'bold' },
          2: { cellWidth: 32, halign: 'center' },
          3: { cellWidth: 45, halign: 'right', textColor: COLORS.emerald600 },
        },
      });
      y = (doc as unknown as JsPDFCustom).lastAutoTable.finalY + 14;
    }

    if (fpGrowthRules.length > 0) {
      y = checkPageBreak(y, 60);
      y = drawSectionTitle('Rekomendasi Bundling — Algoritma FP-Growth', y);
      doc.setFontSize(7.5);
      doc.setFont('helvetica', 'italic');
      doc.setTextColor(...COLORS.slate500);
      doc.text('Association rules digenerate otomatis dari pola belanja pelanggan menggunakan algoritma FP-Growth.', margin, y);
      y += 6;
      const seenPdf = new Set<string>();
      const dedupedPdf = fpGrowthRules.filter((r: Record<string, unknown>) => {
        const allProducts = [...(r.product_a as string).split(', '), r.product_b as string];
        const key = allProducts.map(p => p.trim().toLowerCase()).sort().join('|');
        if (seenPdf.has(key)) return false;
        seenPdf.add(key);
        return true;
      });
      const rules3ForPdf = dedupedPdf.filter((r: Record<string, unknown>) => r.product_c).slice(0, 5);
      const remainingPdf = 10 - rules3ForPdf.length;
      const rules2ForPdf = dedupedPdf.filter((r: Record<string, unknown>) => !r.product_c).slice(0, remainingPdf);
      const combinedForPdf = [...rules3ForPdf, ...rules2ForPdf];
      const fpGrowthData = combinedForPdf.map((r, i) => [
        `${i + 1}`,
        r.product_a,
        r.product_b,
        `${(r.confidence * 100).toFixed(0)}%`,
        `${(r.support * 100).toFixed(1)}%`,
        r.lift != null ? Number(r.lift).toFixed(2) : '-',
      ]);
      autoTable(doc, {
        startY: y,
        head: [['No', 'Antecedent', 'Consequent', 'Confidence', 'Support', 'Lift']],
        body: fpGrowthData,
        theme: 'plain',
        showHead: 'everyPage',
        margin: { left: margin, right: margin, bottom: 22 },
        styles: { fontSize: 9, cellPadding: { top: 4, bottom: 4, left: 6, right: 6 }, font: 'helvetica', lineColor: COLORS.line, lineWidth: 0.2 },
        headStyles: { fillColor: COLORS.dark, textColor: COLORS.white, fontStyle: 'bold', fontSize: 8, halign: 'center' },
        bodyStyles: { textColor: COLORS.slate700 },
        alternateRowStyles: { fillColor: COLORS.bgLight },
        columnStyles: {
          0: { cellWidth: 14, halign: 'center', fontStyle: 'bold' },
          1: { cellWidth: 'auto', fontStyle: 'bold' },
          2: { cellWidth: 'auto', fontStyle: 'bold' },
          3: { cellWidth: 28, halign: 'center', fontStyle: 'bold', textColor: COLORS.emerald600 },
          4: { cellWidth: 24, halign: 'center', textColor: COLORS.blue600 },
          5: { cellWidth: 20, halign: 'center', textColor: COLORS.slate700 },
        },
      });
      y = (doc as unknown as JsPDFCustom).lastAutoTable.finalY + 6;
      y = checkPageBreak(y, 20);
      doc.setFillColor(...COLORS.bgLight);
      doc.roundedRect(margin, y, contentWidth, 16, 2, 2, 'F');
      doc.setFontSize(7);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(...COLORS.dark);
      doc.text('Keterangan:', margin + 4, y + 5);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(...COLORS.slate500);
      doc.text('Confidence = Persentase pembeli Produk A yang juga membeli Produk B', margin + 4, y + 10);
      doc.text('Support = Persentase kemunculan kombinasi dari total seluruh transaksi', margin + 4, y + 14);
    }

    const totalPagesCount = doc.getNumberOfPages();
    for (let p = 1; p <= totalPagesCount; p++) {
      doc.setPage(p);
      drawFooter(p, `${totalPagesCount}`);
    }

    doc.save(`Laporan_DapoerDjawa_${periodText}_${new Date().getTime()}.pdf`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-gray-900">Ringkasan Bisnis</h2>
          <p className="text-xs sm:text-sm text-gray-500">Pantau performa penjualan dan hasil rekomendasi algoritma FP-Growth.</p>
        </div>
        <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-2 sm:gap-3">
          <div className="relative" ref={fpGrowthPanelRef}>
            <button
              onClick={() => setShowFpGrowthPanel(!showFpGrowthPanel)}
              disabled={isLoadingFpGrowth}
              className="flex items-center justify-center gap-2 rounded-lg bg-amber-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-700 disabled:opacity-50 active:scale-95 w-full sm:w-auto"
            >
              {isLoadingFpGrowth ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
              {isLoadingFpGrowth ? 'Memproses...' : 'Rekomendasi Bundling'}
              <ChevronDown className={`h-4 w-4 transition-transform ${showFpGrowthPanel ? 'rotate-180' : ''}`} />
            </button>
            {showFpGrowthPanel && (
              <div className="absolute right-0 sm:right-0 sm:left-auto top-full mt-2 w-[calc(100vw-2rem)] sm:w-96 origin-top-right rounded-2xl border border-amber-100 bg-white p-5 shadow-xl z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100">
                    <SlidersHorizontal className="h-4 w-4 text-amber-700" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">Parameter FP-Growth</h4>
                    <p className="text-[10px] text-gray-500">Atur threshold untuk mining association rules</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-semibold text-gray-700">Minimum Support</label>
                      <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">{(minSupport * 100).toFixed(0)}%</span>
                    </div>
                    <input type="range" min="1" max="50" value={minSupport * 100} onChange={(e) => setMinSupport(Number(e.target.value) / 100)} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-amber-600" />
                    <div className="flex justify-between text-[10px] text-gray-400 mt-1"><span>1%</span><span>50%</span></div>
                    <div className="flex items-start gap-1.5 mt-1.5 p-2 rounded-lg bg-blue-50">
                      <Info className="h-3 w-3 text-blue-500 mt-0.5 shrink-0" />
                      <p className="text-[10px] text-blue-700 leading-relaxed">Seberapa sering kombinasi produk muncul di seluruh transaksi. Nilai kecil = lebih banyak rules, nilai besar = hanya pola yang sangat sering.</p>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-semibold text-gray-700">Minimum Confidence</label>
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">{(minConfidence * 100).toFixed(0)}%</span>
                    </div>
                    <input type="range" min="10" max="100" value={minConfidence * 100} onChange={(e) => setMinConfidence(Number(e.target.value) / 100)} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600" />
                    <div className="flex justify-between text-[10px] text-gray-400 mt-1"><span>10%</span><span>100%</span></div>
                    <div className="flex items-start gap-1.5 mt-1.5 p-2 rounded-lg bg-blue-50">
                      <Info className="h-3 w-3 text-blue-500 mt-0.5 shrink-0" />
                      <p className="text-[10px] text-blue-700 leading-relaxed">Seberapa yakin pembeli Produk A juga akan membeli Produk B. Nilai tinggi = rekomendasi lebih akurat tapi lebih sedikit.</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-100">
                  <button
                    onClick={() => { setShowFpGrowthPanel(false); handleRunFpGrowth(); }}
                    disabled={isLoadingFpGrowth}
                    className="w-full flex items-center justify-center gap-2 rounded-lg bg-amber-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-amber-700 disabled:opacity-50 active:scale-95"
                  >
                    {isLoadingFpGrowth ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                    Jalankan FP-Growth
                  </button>
                  <p className="text-[10px] text-gray-400 text-center mt-2">Proses akan menganalisis seluruh transaksi dan menyimpan rules baru</p>
                </div>
              </div>
            )}
          </div>
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowExportMenu(!showExportMenu)}
              className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 active:scale-95 w-full sm:w-auto"
            >
              <Download className="h-4 w-4" />
              Cetak PDF
              <ChevronDown className={`h-4 w-4 transition-transform ${showExportMenu ? 'rotate-180' : ''}`} />
            </button>
            {showExportMenu && (
              <div className="absolute right-0 top-full mt-2 w-48 origin-top-right overflow-hidden rounded-xl border border-gray-100 bg-white p-1.5 shadow-lg outline-none z-50 animate-in fade-in zoom-in-95 duration-100">
                <div className="px-2 py-1.5 text-[10px] font-bold tracking-wider text-gray-400 uppercase">Pilih Periode</div>
                {(['thisMonth', 'thisYear', 'allTime'] as const).map((m) => (
                  <button key={m} onClick={() => handleExportPDF(m)} className="flex w-full items-center rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-blue-50 hover:text-blue-700">
                    Laporan {periodLabelMap[m]}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {summaryCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.title} className={`relative overflow-hidden rounded-2xl border ${stat.borderColor} bg-white p-5 shadow-xs transition-all hover:shadow-md`}>
              <div className="flex items-center justify-between">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.bgColor}`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${stat.badgeColor}`}>
                  {stat.badge}
                  <ArrowUpRight className="h-3 w-3" />
                </span>
              </div>
              <div className="mt-4">
                <p className="text-xs font-medium text-gray-500">{stat.title}</p>
                <h3 className="mt-1 text-2xl font-bold tracking-tight text-gray-900">{stat.value}</h3>
                <p className="mt-1 text-[11px] text-gray-400">{stat.subtext}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-gray-100 bg-white p-3 sm:p-6 shadow-xs lg:col-span-2">
          <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Grafik Pendapatan Penjualan</h3>
              <p className="text-xs text-gray-500">Tren statistik pemasukan berdasarkan rentang waktu terpilih</p>
            </div>
            <div className="inline-flex rounded-xl bg-gray-100 p-0.5 sm:p-1">
              {(['thisMonth', 'thisYear', 'allTime'] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setTimeFrame(m)}
                  className={`rounded-lg px-2.5 sm:px-3.5 py-1 sm:py-1.5 text-[11px] sm:text-xs font-semibold transition-all ${
                    timeFrame === m ? 'bg-white text-amber-700 shadow-xs' : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  {periodLabels[m]}
                </button>
              ))}
            </div>
          </div>
          <div className="h-56 sm:h-72 w-full -ml-2 sm:ml-0 flex items-center justify-center">
            {activeChart.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={activeChart} margin={{ top: 10, right: 5, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorPendapatan" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#d97706" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#d97706" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} dy={10} />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: '#64748b' }}
                    tickFormatter={(val) => (Number(val) >= 1000000 ? `${Number(val) / 1000000}M` : `${Number(val) / 1000}k`)}
                    width={45}
                  />
                  <Tooltip
                    formatter={(value) => [formatRupiah(Number(value ?? 0)), 'Pendapatan']}
                    labelStyle={{ color: '#1f2937', fontWeight: 'bold' }}
                    contentStyle={{ borderRadius: '12px', border: '1px solid #f3f4f6', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.05)' }}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#d97706" strokeWidth={3} fillOpacity={1} fill="url(#colorPendapatan)" />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex flex-col items-center justify-center text-center p-6 text-gray-400">
                <TrendingUp className="h-10 w-10 text-gray-300 mb-2" />
                <p className="text-sm font-semibold text-gray-600">Belum Ada Riwayat Transaksi</p>
                <p className="text-xs text-gray-400 mt-1 max-w-xs">Grafik pendapatan akan terisi otomatis setelah ada transaksi penjualan.</p>
              </div>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-3 sm:p-6 shadow-xs">
          <h3 className="mb-1 text-lg font-bold text-gray-900">Produk Terlaris</h3>
          <p className="mb-6 text-xs text-gray-500">Peringkat 5 kue favorit pembeli</p>
          <div className="space-y-5">
            {topProducts.length > 0 ? (
              topProducts.map((product, index) => (
                <div key={product.nama} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-xs font-extrabold text-amber-700">
                      #{index + 1}
                    </div>
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-gray-100 bg-gray-50 shadow-xs">
                      {product.gambar ? (
                        <Image src={product.gambar} alt={product.nama} width={44} height={44} className="h-full w-full object-cover" />
                      ) : (
                        <span className="text-sm font-bold text-gray-400">{product.nama.charAt(0)}</span>
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{product.nama}</p>
                      <p className="text-xs font-medium text-gray-400">{product.harga}</p>
                    </div>
                  </div>
                  <div className="ml-2 text-right whitespace-nowrap">
                    <span className="text-sm font-bold text-gray-900">{product.terjual}</span>
                    <span className="ml-1 text-xs text-gray-500">pcs</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">Belum ada data penjualan.</p>
            )}
          </div>
        </div>
      </div>

      {showFpGrowthResults && fpGrowthRules.length === 0 && (
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-xs">
          <div className="flex flex-col items-center py-8 text-center">
            <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mb-3">
              <Sparkles className="w-8 h-8 text-purple-400" />
            </div>
            <h4 className="text-sm font-semibold text-gray-900 mb-1">Belum Ada Rekomendasi</h4>
            <p className="text-xs text-gray-500 max-w-xs">Tidak ditemukan pola bundling dengan parameter saat ini. Coba turunkan nilai minimum support atau confidence, lalu jalankan ulang.</p>
          </div>
        </div>
      )}
      {showFpGrowthResults && fpGrowthRules.length > 0 && (
        <div className="rounded-2xl border border-amber-100 bg-white p-3 sm:p-6 shadow-xs">
          <div className="mb-4 sm:mb-5 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
              <Sparkles className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <h3 className="text-base sm:text-lg font-bold text-gray-900">Rekomendasi Bundling Aktif (Hasil FP-Growth)</h3>
              <p className="text-xs text-gray-500">
                Strategi paket produk otomatis dari riwayat transaksi
                <span className="ml-2 inline-flex items-center gap-1 text-[10px] font-medium text-amber-600">
                  Support ≥ {(minSupport * 100).toFixed(0)}% · Confidence ≥ {(minConfidence * 100).toFixed(0)}%
                </span>
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {(() => {
              // Deduplikasi: satu bundle hanya tampil 1x (confidence tertinggi)
              const seen = new Set<string>();
              const deduped = fpGrowthRules.filter((r: Record<string, unknown>) => {
                const allProducts = [...(r.product_a as string).split(', '), r.product_b as string];
                const key = allProducts.map(p => p.trim().toLowerCase()).sort().join('|');
                if (seen.has(key)) return false;
                seen.add(key);
                return true;
              });
              const rules3 = deduped.filter((r: Record<string, unknown>) => r.product_c).slice(0, 5);
              const remaining = 10 - rules3.length;
              const rules2 = deduped.filter((r: Record<string, unknown>) => !r.product_c).slice(0, remaining);
              const combined = [...rules3, ...rules2];
              return combined.map((rule, idx) => (
              <div key={idx} className="rounded-xl border border-amber-100 bg-amber-50/40 p-4 transition-all hover:border-amber-200 hover:bg-amber-50">
                <div className="flex items-center gap-2">
                  <div className="text-xs font-bold tracking-wide text-amber-700 uppercase">Paket Bundling #{idx + 1}</div>
                  {rule.product_c && <span className="text-[10px] bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded-full font-bold">3-item</span>}
                </div>
                <div className="my-3 flex items-center gap-2">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border-2 border-white bg-white shadow-xs">
                    {rule.image_a ? (
                      <Image src={rule.image_a} alt={rule.product_a.split(', ')[0]} width={48} height={48} className="h-full w-full object-cover" />
                    ) : (
                      <span className="text-base font-bold text-amber-700">{rule.product_a.charAt(0)}</span>
                    )}
                  </div>
                  {rule.product_c && (
                    <>
                      <span className="text-[10px] font-bold text-gray-400">+</span>
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border-2 border-white bg-white shadow-xs">
                        {rule.image_c ? (
                          <Image src={rule.image_c} alt={rule.product_c} width={48} height={48} className="h-full w-full object-cover" />
                        ) : (
                          <span className="text-base font-bold text-amber-700">{rule.product_c.charAt(0)}</span>
                        )}
                      </div>
                    </>
                  )}
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-200 text-amber-800 text-xs font-bold">→</div>
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border-2 border-white bg-white shadow-xs">
                    {rule.image_b ? (
                      <Image src={rule.image_b} alt={rule.product_b} width={48} height={48} className="h-full w-full object-cover" />
                    ) : (
                      <span className="text-base font-bold text-amber-700">{rule.product_b.charAt(0)}</span>
                    )}
                  </div>
                </div>
                <div className="text-sm font-bold text-gray-800 break-words">
                  {rule.product_a} <span className="text-amber-600">→</span> {rule.product_b}
                </div>
                <div className="mt-2 space-y-1 text-xs text-gray-600">
                  <p>
                    <span className="font-bold text-emerald-600">{(rule.confidence * 100).toFixed(0)}%</span> pembeli <strong>{rule.product_a}</strong> juga membeli <strong>{rule.product_b}</strong>.
                  </p>
                  <p className="text-[10px] text-gray-400">*Muncul di {(rule.support * 100).toFixed(1)}% total transaksi. Lift: {rule.lift != null ? Number(rule.lift).toFixed(2) : '-'}</p>
                </div>
              </div>
            ));
            })()}
          </div>
        </div>
      )}
      {showFpGrowthResults && fpGrowthProcessData && (
        <FpGrowthVisualization processData={fpGrowthProcessData} />
      )}
    </div>
  );
}

export default React.memo(OverviewTab);


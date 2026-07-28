"use client";

import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import * as d3 from "d3";
import { Maximize2, X } from "lucide-react";

interface Investor {
  id: string; name: string; firm: string; role: string;
  location: string; type: string; score: number;
  linkedin: string; email: string; website: string;
  tags: string[]; stage: string; cheque: string; description: string;
}

export interface DashboardFilters {
  region?: string; type?: string; sector?: string;
  linkedinOnly?: boolean; emailOnly?: boolean;
  chequeBucket?: string;
}

function getRegion(loc: string): string {
  const l = (loc || "").toLowerCase();
  if (/india|mumbai|delhi|bangalore|bengaluru|pune|hyderabad|chennai|kolkata|gurgaon|noida|ahmedabad/.test(l)) return "India";
  if (/global|multi/.test(l)) return "Global";
  if (/us|united states|new york|san francisco|california|silicon valley|nyc|bay area|chicago|boston|seattle|austin|los angeles/.test(l)) return "USA";
  if (/singapore/.test(l)) return "Singapore";
  if (/uk|united kingdom|london|england|europe|france|germany|netherlands|sweden|spain|italy|switzerland|ireland|belgium/.test(l)) return "UK / Europe";
  if (/china|hong kong|shanghai|beijing|shenzhen|japan|tokyo|seoul|korea|taiwan/.test(l)) return "APAC";
  if (/middle east|dubai|uae|saudi|israel|tel aviv/.test(l)) return "Middle East";
  if (/canada|toronto/.test(l)) return "Canada";
  if (/australia|sydney|melbourne/.test(l)) return "Australia / NZ";
  if (/africa|nigeria|kenya|south africa|lagos|nairobi/.test(l)) return "Africa";
  if (/brazil|são paulo|mexico|latin|argentina|chile|colombia/.test(l)) return "LATAM";
  return "Other";
}

function getContactStatus(r: Investor): string {
  const hasLi = !!r.linkedin;
  const hasEm = !!r.email;
  if (hasLi && hasEm) return "Both";
  if (hasLi) return "LinkedIn Only";
  if (hasEm) return "Email Only";
  return "No Contact";
}

function chequeBucket(c: string): string {
  if (!c) return "Unknown";
  const l = c.toLowerCase();
  if (l.includes("boot") || l.includes("grant")) return "Bootstrapped";
  if (l.includes("5k") || l.includes("10k") || l.includes("25k") || l.includes("35k") || l.includes("50k")) return "<$50k";
  if (l.includes("75k") || l.includes("100k") || l.includes("150k") || l.includes("200k") || l.includes("250k")) return "$50k\u2013$250k";
  if (l.includes("300k") || l.includes("500k") || l.includes("750k")) return "$250k\u2013$1M";
  if (l.includes("1m") || l.includes("2m") || l.includes("3m") || l.includes("5m") || l.includes("8m") || l.includes("10m")) return "$1M\u2013$10M";
  if (l.includes("15m") || l.includes("20m") || l.includes("25m") || l.includes("50m") || l.includes("100m")) return "$10M+";
  if (l.includes("m") || /^\d+\s*-\s*\d/.test(c)) return "$1M\u2013$10M";
  return "Other";
}

function enrichmentScore(r: { linkedin?: string; email?: string; website?: string; tags: string[]; stage?: string; cheque?: string; location?: string }): number {
  const checks = [!!r.linkedin, !!r.email, !!r.website, (r.tags?.length ?? 0) > 0, !!r.stage, !!r.cheque, !!r.location && !["Global", "India / Global"].includes(r.location)];
  return checks.filter(Boolean).length * 15;
}

const REGIONS = ["India", "USA", "Global", "UK / Europe", "Singapore", "APAC", "Middle East", "Canada", "LATAM", "Africa", "Australia / NZ", "Other"];
const TYPES = ["VC / Fund", "Angel Investor", "Incubator & Accelerator"];
const SECTOR_ORDER = ["AI / ML", "Web3 / Crypto", "Fintech", "SaaS", "Deep Tech", "Biotech", "Climate / CleanTech", "EdTech", "Consumer", "Enterprise"];

const CHEQUE_BUCKETS = ["<$50k", "$50k\u2013$250k", "$250k\u2013$1M", "$1M\u2013$10M", "$10M+"];
const CHEQUE_COLORS = ["#E6F3FF", "#99CCFF", "#4D99FF", "#0066CC", "#003399"];

const COLORS = ["#CF4F27", "#0B8D80", "#4A90E2", "#F5A623", "#7B68EE", "#E94E77", "#50C878", "#FF6B35", "#A855F7", "#14B8A6"];

export default function InvestorDashboard({
  data, onFilter
}: {
  data: Investor[];
  onFilter: (f: DashboardFilters) => void;
}) {
  const [regionFilter, setRegionFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [sectorFilter, setSectorFilter] = useState("all");
  const [chequeFilter, setChequeFilter] = useState("all");
  const [linkedinOnly, setLinkedinOnly] = useState(false);
  const [emailOnly, setEmailOnly] = useState(false);
  const [fullscreenChart, setFullscreenChart] = useState<string | null>(null);

  const donutRef = useRef<SVGSVGElement>(null);
  const treemapRef = useRef<SVGSVGElement>(null);
  const bubbleRef = useRef<SVGSVGElement>(null);
  const heatmapRef = useRef<SVGSVGElement>(null);
  const enrichRef = useRef<SVGSVGElement>(null);
  const fsRef = useRef<SVGSVGElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const fireFilter = useCallback((overrides: Partial<DashboardFilters>) => {
    const f: DashboardFilters = {
      region: overrides.region ?? (regionFilter !== "all" ? regionFilter : undefined),
      type: overrides.type ?? (typeFilter !== "all" ? typeFilter : undefined),
      sector: overrides.sector ?? (sectorFilter !== "all" ? sectorFilter : undefined),
      linkedinOnly: overrides.linkedinOnly ?? (linkedinOnly || undefined),
      emailOnly: overrides.emailOnly ?? (emailOnly || undefined),
      chequeBucket: overrides.chequeBucket,
    };
    onFilter(f);
  }, [regionFilter, typeFilter, sectorFilter, linkedinOnly, emailOnly, onFilter]);

  const sectorList = useMemo(() => {
    const counts: Record<string, number> = {};
    data.forEach(r => (r.tags || []).forEach(t => counts[t] = (counts[t] || 0) + 1));
    return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 10).map(([k]) => k);
  }, [data]);

  const filteredData = useMemo(() => {
    return data.filter(r => {
      if (regionFilter !== "all" && getRegion(r.location) !== regionFilter) return false;
      if (typeFilter !== "all" && r.type !== typeFilter) return false;
      if (sectorFilter !== "all" && !(r.tags || []).includes(sectorFilter)) return false;
      if (chequeFilter !== "all") {
        const cb = chequeBucket(r.cheque);
        if (cb === "Unknown" && chequeFilter !== "Unknown") return false;
        if (cb !== "Unknown" && cb !== chequeFilter) return false;
      }
      if (linkedinOnly && !r.linkedin) return false;
      if (emailOnly && !r.email) return false;
      return true;
    });
  }, [data, regionFilter, typeFilter, sectorFilter, chequeFilter, linkedinOnly, emailOnly]);

  const typeDist = useMemo(() => {
    const counts: Record<string, number> = {};
    filteredData.forEach(r => counts[r.type] = (counts[r.type] || 0) + 1);
    return TYPES.map(t => ({ label: t, value: counts[t] || 0 }));
  }, [filteredData]);

  const regionDist = useMemo(() => {
    const counts: Record<string, number> = {};
    filteredData.forEach(r => { const reg = getRegion(r.location); counts[reg] = (counts[reg] || 0) + 1; });
    return REGIONS.map(r => ({ label: r, value: counts[r] || 0 })).sort((a, b) => b.value - a.value);
  }, [filteredData]);

  const sectorDist = useMemo(() => {
    const counts: Record<string, number> = {};
    filteredData.forEach(r => (r.tags || []).forEach(t => counts[t] = (counts[t] || 0) + 1));
    const entries = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    const top = entries.slice(0, 10).map(([label, value]) => ({ label, value }));
    const rest = entries.slice(10);
    if (rest.length > 0) top.push({ label: "Other", value: rest.reduce((s, [, v]) => s + v, 0) });
    return top;
  }, [filteredData]);

  const heatmapData = useMemo(() => {
    const matrix: Record<string, Record<string, number>> = {};
    filteredData.forEach(r => {
      const cb = chequeBucket(r.cheque);
      if (cb === "Unknown") return;
      const reg = getRegion(r.location);
      if (!matrix[reg]) matrix[reg] = {};
      matrix[reg][cb] = (matrix[reg][cb] || 0) + 1;
    });
    const result: Array<{ region: string; bucket: string; value: number }> = [];
    for (const [region, buckets] of Object.entries(matrix)) {
      for (const bucket of CHEQUE_BUCKETS) {
        result.push({ region, bucket, value: buckets[bucket] || 0 });
      }
    }
    return result.sort((a, b) => {
      const ri = REGIONS.indexOf(a.region) - REGIONS.indexOf(b.region);
      if (ri !== 0) return ri;
      return CHEQUE_BUCKETS.indexOf(a.bucket) - CHEQUE_BUCKETS.indexOf(b.bucket);
    });
  }, [filteredData]);

  const clearFilters = useCallback(() => {
    setRegionFilter("all"); setTypeFilter("all"); setSectorFilter("all");
    setChequeFilter("all"); setLinkedinOnly(false); setEmailOnly(false);
  }, []);

  const hasFilters = regionFilter !== "all" || typeFilter !== "all" || sectorFilter !== "all" || chequeFilter !== "all" || linkedinOnly || emailOnly;

  const showTooltip = useCallback((html: string, event: MouseEvent) => {
    const el = tooltipRef.current;
    if (!el) return;
    el.innerHTML = html;
    el.style.visibility = "visible";
    el.style.left = `${event.pageX + 12}px`;
    el.style.top = `${event.pageY - 10}px`;
  }, []);

  const moveTooltip = useCallback((event: MouseEvent) => {
    const el = tooltipRef.current;
    if (!el) return;
    el.style.left = `${event.pageX + 12}px`;
    el.style.top = `${event.pageY - 10}px`;
  }, []);

  const hideTooltip = useCallback(() => {
    const el = tooltipRef.current;
    if (el) el.style.visibility = "hidden";
  }, []);

  const total = filteredData.length;
  const maxHeatVal = d3.max(heatmapData, d => d.value) || 1;

    // --- Donut ---
  useEffect(() => {
    const svg = d3.select(donutRef.current);
    svg.selectAll("*").remove();
    if (typeDist.every(d => d.value === 0)) return;

    const w = donutRef.current!.clientWidth || 300;
    const h = 260;
    const r = Math.min(w, h) / 2 - 30;
    const color = d3.scaleOrdinal<string>().domain(TYPES).range(COLORS);

    const g = svg.attr("width", w).attr("height", h)
      .append("g").attr("transform", `translate(${w / 2},${h / 2})`);

    const pie = d3.pie<{ label: string; value: number }>().value(d => d.value).sort(null);
    const arc = d3.arc<d3.PieArcDatum<{ label: string; value: number }>>().innerRadius(r * 0.55).outerRadius(r);

    g.selectAll("path").data(pie(typeDist)).join("path")
      .attr("d", arc).attr("fill", d => color(d.data.label))
      .attr("stroke", "var(--ys-surface)").attr("stroke-width", 2).style("cursor", "pointer")
      .on("mouseover", function (event, d) {
        d3.select(this).attr("opacity", 0.8);
        showTooltip(`<strong>${d.data.label}</strong><br/>Count: ${d.data.value}<br/>${(d.data.value / total * 100).toFixed(1)}%`, event);
      })
      .on("mousemove", moveTooltip)
      .on("mouseout", function () {
        d3.select(this).attr("opacity", 1);
        hideTooltip();
      })
      .on("click", function (_event, d) {
        setTypeFilter(d.data.label);
        fireFilter({ type: d.data.label });
      });

    // center annotation: total count
    g.append("text").attr("text-anchor", "middle").attr("y", -6)
      .attr("fill", "var(--ys-text)").style("font-size", "18px").style("font-weight", "bold")
      .style("font-family", "var(--font-headline)").text(total);
    g.append("text").attr("text-anchor", "middle").attr("y", 12)
      .attr("fill", "var(--ys-text-soft)").style("font-size", "9px").style("font-family", "monospace")
      .text("total");

    const legend = svg.append("g").attr("transform", `translate(${w - 130}, 16)`);
    typeDist.forEach((d, i) => {
      const row = legend.append("g").attr("transform", `translate(0, ${i * 22})`);
      row.append("rect").attr("width", 10).attr("height", 10).attr("fill", color(d.label)).attr("rx", 2);
      row.append("text").attr("x", 16).attr("y", 9).text(`${d.label}: ${d.value}`)
        .attr("fill", "var(--ys-text-soft)").style("font-size", "10px").style("font-family", "monospace");
    });
  }, [typeDist, showTooltip, moveTooltip, hideTooltip, fireFilter, total]);

  // --- Treemap (Regions) ---
  useEffect(() => {
    const svg = d3.select(treemapRef.current);
    svg.selectAll("*").remove();
    const nonZero = regionDist.filter(d => d.value > 0);
    if (nonZero.length === 0) return;

    const w = treemapRef.current!.clientWidth || 300;
    const h = 260;

    const root = d3.hierarchy({ label: "root", value: 0, children: nonZero } as any)
      .sum(d => (d as any).value || 0) as d3.HierarchyRectangularNode<any>;
    d3.treemap<any>().size([w, h]).padding(3).round(true)(root);

    svg.attr("width", w).attr("height", h);

    const color = d3.scaleOrdinal<string>().domain(REGIONS).range(COLORS);

    svg.selectAll("g").data(root.leaves()).join("g")
      .attr("transform", d => `translate(${d.x0},${d.y0})`).style("cursor", "pointer")
      .on("mouseover", function (event, d) {
        showTooltip(`<strong>${d.data.label}</strong><br/>Count: ${d.data.value}<br/>${(d.data.value / total * 100).toFixed(1)}%`, event);
      })
      .on("mousemove", moveTooltip)
      .on("mouseout", hideTooltip)
      .on("click", function (_event, d) {
        setRegionFilter(d.data.label);
        fireFilter({ region: d.data.label });
      })
      .each(function (d) {
        const g = d3.select(this);
        const cw = d.x1 - d.x0;
        const ch = d.y1 - d.y0;
        g.append("rect").attr("width", cw).attr("height", ch)
          .attr("fill", color(d.data.label)).attr("opacity", 0.85).attr("rx", 3);
        if (cw > 50 && ch > 30) {
          g.append("text").attr("x", 6).attr("y", 14).text(d.data.label)
            .attr("fill", "#fff").style("font-size", "11px").style("font-weight", "bold").style("font-family", "monospace");
          g.append("text").attr("x", 6).attr("y", 28).text(d.data.value.toLocaleString())
            .attr("fill", "rgba(255,255,255,0.8)").style("font-size", "10px").style("font-family", "monospace");
        }
      });
  }, [regionDist, showTooltip, moveTooltip, hideTooltip, fireFilter, total]);

  // --- Packed Bubbles (Sectors) ---
  useEffect(() => {
    const svg = d3.select(bubbleRef.current);
    svg.selectAll("*").remove();
    if (sectorDist.length === 0) return;

    const w = bubbleRef.current!.clientWidth || 300;
    const h = 260;
    const padding = 6;

    const root = d3.hierarchy({ label: "sectors", children: sectorDist } as any)
      .sum(d => (d as any).value || 0) as d3.HierarchyCircularNode<any>;
    d3.pack<any>().size([w - padding * 2, h - padding * 2]).padding(5)(root);

    svg.attr("width", w).attr("height", h);

    // Top annotation
    svg.append("text").attr("x", 6).attr("y", 14)
      .attr("fill", "var(--ys-text-soft)").style("font-size", "9px").style("font-family", "monospace")
      .text(`Top ${sectorDist.length} sectors · ${total.toLocaleString()} total`);

    const color = d3.scaleOrdinal<string>().domain(sectorDist.map(d => d.label)).range(COLORS);

    svg.append("g").attr("transform", `translate(${padding},${padding})`)
      .selectAll("circle").data(root.leaves()).join("circle")
      .attr("cx", d => d.x).attr("cy", d => d.y).attr("r", d => d.r)
      .attr("fill", d => color(d.data.label)).attr("opacity", 0.8)
      .attr("stroke", "var(--ys-surface)").attr("stroke-width", 1.5)
      .style("cursor", "pointer")
      .on("mouseover", function (event, d) {
        d3.select(this).attr("opacity", 1).attr("stroke-width", 3);
        showTooltip(`<strong>${d.data.label}</strong><br/>Count: ${d.data.value}<br/>${(d.data.value / total * 100).toFixed(1)}%`, event);
      })
      .on("mousemove", moveTooltip)
      .on("mouseout", function () {
        d3.select(this).attr("opacity", 0.8).attr("stroke-width", 1.5);
        hideTooltip();
      })
      .on("click", function (_event, d) {
        setSectorFilter(d.data.label);
        fireFilter({ sector: d.data.label });
      });

    svg.append("g").attr("transform", `translate(${padding},${padding})`)
      .selectAll("text").data(root.leaves().filter(d => d.r > 20)).join("text")
      .attr("x", d => d.x).attr("y", d => d.y + 3)
      .attr("text-anchor", "middle").attr("fill", "#fff")
      .style("font-size", d => Math.min(d.r / 4, 11) + "px")
      .style("font-weight", "bold").style("font-family", "monospace")
      .style("pointer-events", "none")
      .text(d => d.data.label.length > 12 ? d.data.label.slice(0, 10) + "…" : d.data.label);
  }, [sectorDist, showTooltip, moveTooltip, hideTooltip, fireFilter, total]);

  // --- Heatmap (Region × Cheque) ---
  useEffect(() => {
    const svg = d3.select(heatmapRef.current);
    svg.selectAll("*").remove();
    const nonZeroRegions = [...new Set(heatmapData.filter(d => d.value > 0).map(d => d.region))];
    if (nonZeroRegions.length === 0 || maxHeatVal === 0) {
      svg.attr("width", heatmapRef.current!.clientWidth || 300).attr("height", 150);
      svg.append("text").attr("x", 10).attr("y", 40).attr("fill", "var(--ys-text-soft)")
        .style("font-size", "12px").style("font-family", "monospace").text("No cheque data for current filter");
      return;
    }

    const w = heatmapRef.current!.clientWidth || 300;
    const h = 260;
    const margin = { top: 50, right: 16, bottom: 8, left: 90 };
    const iw = w - margin.left - margin.right;
    const ih = h - margin.top - margin.bottom;

    const g = svg.attr("width", w).attr("height", h)
      .append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    const regions = nonZeroRegions;
    const buckets = CHEQUE_BUCKETS;

    const x = d3.scaleBand<string>().domain(buckets).range([0, iw]).padding(0.05);
    const y = d3.scaleBand<string>().domain(regions).range([0, ih]).padding(0.05);

    const getVal = (region: string, bucket: string) => {
      const found = heatmapData.find(d => d.region === region && d.bucket === bucket);
      return found ? found.value : 0;
    };

    const colorScale = d3.scaleSequential(d3.interpolateYlOrRd).domain([0, maxHeatVal]);

    g.selectAll("rect.bg").data(regions.flatMap(r => buckets.map(b => ({ region: r, bucket: b }))))
      .join("rect").attr("class", "bg")
      .attr("x", d => x(d.bucket)!).attr("y", d => y(d.region)!)
      .attr("width", x.bandwidth()).attr("height", y.bandwidth())
      .attr("fill", d => { const v = getVal(d.region, d.bucket); return v > 0 ? colorScale(v) : "rgba(255,255,255,0.04)"; })
      .attr("rx", 2).style("cursor", "pointer")
      .on("mouseover", function (event, d) {
        const v = getVal(d.region, d.bucket);
        d3.select(this).attr("stroke", "#fff").attr("stroke-width", 2);
        showTooltip(`<strong>${d.region}</strong> · ${d.bucket}<br/>Count: ${v}`, event);
      })
      .on("mousemove", moveTooltip)
      .on("mouseout", function () {
        d3.select(this).attr("stroke", "none");
        hideTooltip();
      })
      .on("click", function (_event, d) {
        setRegionFilter(d.region);
        setChequeFilter(d.bucket);
        fireFilter({ region: d.region, chequeBucket: d.bucket });
      });

    g.selectAll("text.cell").data(regions.flatMap(r => buckets.map(b => ({ region: r, bucket: b }))))
      .join("text").attr("class", "cell")
      .attr("x", d => x(d.bucket)! + x.bandwidth() / 2)
      .attr("y", d => y(d.region)! + y.bandwidth() / 2 + 3)
      .attr("text-anchor", "middle").attr("fill", d => {
        const v = getVal(d.region, d.bucket);
        return v > maxHeatVal * 0.5 ? "#fff" : "var(--ys-text-soft)";
      })
      .style("font-size", "9px").style("font-family", "monospace").style("pointer-events", "none")
      .text(d => { const v = getVal(d.region, d.bucket); return v > 0 ? v : ""; });

    g.append("g").call(d3.axisLeft(y).tickSize(0)).attr("color", "var(--ys-text-soft)")
      .selectAll("text").attr("font-size", "9px").attr("font-family", "monospace");

    // Y-axis label: Regions
    g.append("text").attr("x", -margin.left + 4).attr("y", -6)
      .attr("fill", "var(--ys-text-soft)").style("font-size", "8px").style("font-family", "monospace")
      .style("font-weight", "bold").text("Regions →");

    // X-axis bucket labels with header
    g.append("g").attr("transform", `translate(0,-6)`)
      .selectAll("text").data(buckets).join("text")
      .attr("x", d => x(d)! + x.bandwidth() / 2).attr("y", 0)
      .attr("text-anchor", "end").attr("fill", "var(--ys-text-soft)")
      .style("font-size", "8px").style("font-family", "monospace")
      .attr("transform", d => `rotate(-30, ${x(d)! + x.bandwidth() / 2}, 0)`)
      .text(d => d);

    // Color legend reference bar
    const legendH = 8, legendW = 120;
    const lgX = w - legendW - margin.right;
    const lgY = 4;
    const lgDefs = svg.append("defs");
    const lgGrad = lgDefs.append("linearGradient").attr("id", "heatmap-legend-grad").attr("x1", "0%").attr("y1", "0%").attr("x2", "100%").attr("y2", "0%");
    lgGrad.append("stop").attr("offset", "0%").attr("stop-color", d3.interpolateYlOrRd(0));
    lgGrad.append("stop").attr("offset", "100%").attr("stop-color", d3.interpolateYlOrRd(1));
    svg.append("rect").attr("x", lgX).attr("y", lgY).attr("width", legendW).attr("height", legendH).attr("fill", "url(#heatmap-legend-grad)").attr("rx", 2);
    svg.append("text").attr("x", lgX).attr("y", lgY + legendH + 10).attr("fill", "var(--ys-text-soft)").style("font-size", "7px").style("font-family", "monospace")
      .text(`0 ────────────────────────── ${maxHeatVal}`);
  }, [heatmapData, maxHeatVal, showTooltip, moveTooltip, hideTooltip, fireFilter, total]);

  // --- Fullscreen render ---
  useEffect(() => {
    const svg = d3.select(fsRef.current);
    svg.selectAll("*").remove();
    if (!fullscreenChart) return;

    const w = window.innerWidth - 80;
    const h = window.innerHeight - 120;
    const margin = { top: 20, right: 20, bottom: 40, left: 120 };
    const iw = w - margin.left - margin.right;
    const ih = h - margin.top - margin.bottom;
    const total = filteredData.length;

    if (fullscreenChart === "donut") {
      if (typeDist.every(d => d.value === 0)) return;
      const r = Math.min(w, h) / 2 - 60;
      const color = d3.scaleOrdinal<string>().domain(TYPES).range(COLORS);
      const g = svg.attr("width", w).attr("height", h)
        .append("g").attr("transform", `translate(${w / 2},${h / 2})`);
      const pie = d3.pie<{ label: string; value: number }>().value(d => d.value).sort(null);
      const arc = d3.arc<d3.PieArcDatum<{ label: string; value: number }>>().innerRadius(r * 0.5).outerRadius(r);
      g.selectAll("path").data(pie(typeDist)).join("path")
        .attr("d", arc).attr("fill", d => color(d.data.label))
        .attr("stroke", "var(--ys-surface)").attr("stroke-width", 2).style("cursor", "pointer")
        .on("mouseover", function (event, d) {
          showTooltip(`<strong>${d.data.label}</strong><br/>Count: ${d.data.value}<br/>${(d.data.value / total * 100).toFixed(1)}%`, event);
        }).on("mousemove", moveTooltip).on("mouseout", hideTooltip)
        .on("click", function () { setFullscreenChart(null); fireFilter({ type: typeDist.find(t => t.value > 0)?.label }); });
      const lg = svg.append("g").attr("transform", `translate(20, 20)`);
      typeDist.forEach((d, i) => {
        const row = lg.append("g").attr("transform", `translate(0, ${i * 28})`);
        row.append("rect").attr("width", 14).attr("height", 14).attr("fill", color(d.label)).attr("rx", 2);
        row.append("text").attr("x", 22).attr("y", 11).text(`${d.label}: ${d.value} (${(d.value / total * 100).toFixed(1)}%)`)
          .attr("fill", "var(--ys-text)").style("font-size", "14px").style("font-family", "monospace");
      });
    }

    if (fullscreenChart === "treemap") {
      const nonZero = regionDist.filter(d => d.value > 0);
      if (nonZero.length === 0) return;
      const root = d3.hierarchy({ label: "root", value: 0, children: nonZero } as any)
        .sum(d => (d as any).value || 0) as d3.HierarchyRectangularNode<any>;
      d3.treemap<any>().size([w, h]).padding(4).round(true)(root);
      svg.attr("width", w).attr("height", h);
      // Top annotation: total count across regions
      svg.append("text").attr("x", 6).attr("y", 14)
        .attr("fill", "var(--ys-text-soft)").style("font-size", "9px").style("font-family", "monospace")
        .text(`Total: ${total.toLocaleString()} · ${nonZero.length} regions`);

      const color = d3.scaleOrdinal<string>().domain(REGIONS).range(COLORS);
      svg.selectAll("g").data(root.leaves()).join("g")
        .attr("transform", d => `translate(${d.x0},${d.y0})`).style("cursor", "pointer")
        .on("mouseover", function (event, d) {
          showTooltip(`<strong>${d.data.label}</strong><br/>Count: ${d.data.value}<br/>${(d.data.value / total * 100).toFixed(1)}%`, event);
        }).on("mousemove", moveTooltip).on("mouseout", hideTooltip)
        .on("click", function () { setFullscreenChart(null); fireFilter({ region: nonZero[0]?.label }); })
        .each(function (d) {
          const g = d3.select(this);
          const cw = d.x1 - d.x0; const ch = d.y1 - d.y0;
          g.append("rect").attr("width", cw).attr("height", ch).attr("fill", color(d.data.label)).attr("opacity", 0.85).attr("rx", 4);
          if (cw > 80 && ch > 50) {
            g.append("text").attr("x", 10).attr("y", 24).text(d.data.label).attr("fill", "#fff")
              .style("font-size", "18px").style("font-weight", "bold").style("font-family", "monospace");
            g.append("text").attr("x", 10).attr("y", 46).text(`${d.data.value.toLocaleString()} investors`)
              .attr("fill", "rgba(255,255,255,0.8)").style("font-size", "14px").style("font-family", "monospace");
            g.append("text").attr("x", 10).attr("y", 64).text(`${(d.data.value / total * 100).toFixed(1)}%`)
              .attr("fill", "rgba(255,255,255,0.6)").style("font-size", "12px").style("font-family", "monospace");
          }
        });
    }

    if (fullscreenChart === "bubbles") {
      if (sectorDist.length === 0) return;
      const root = d3.hierarchy({ label: "sectors", children: sectorDist } as any)
        .sum(d => (d as any).value || 0) as d3.HierarchyCircularNode<any>;
      d3.pack<any>().size([w - 20, h - 20]).padding(8)(root);
      svg.attr("width", w).attr("height", h);
      const color = d3.scaleOrdinal<string>().domain(sectorDist.map(d => d.label)).range(COLORS);
      svg.append("g").attr("transform", `translate(10,10)`)
        .selectAll("circle").data(root.leaves()).join("circle")
        .attr("cx", d => d.x).attr("cy", d => d.y).attr("r", d => d.r)
        .attr("fill", d => color(d.data.label)).attr("opacity", 0.8)
        .attr("stroke", "var(--ys-surface)").attr("stroke-width", 2).style("cursor", "pointer")
        .on("mouseover", function (event, d) {
          d3.select(this).attr("opacity", 1).attr("stroke-width", 4);
          showTooltip(`<strong>${d.data.label}</strong><br/>Count: ${d.data.value}<br/>${(d.data.value / total * 100).toFixed(1)}%`, event);
        }).on("mousemove", moveTooltip).on("mouseout", function () {
          d3.select(this).attr("opacity", 0.8).attr("stroke-width", 2); hideTooltip();
        }).on("click", function () { setFullscreenChart(null); fireFilter({ sector: sectorDist[0]?.label }); });
      svg.append("g").attr("transform", `translate(10,10)`)
        .selectAll("text").data(root.leaves().filter(d => d.r > 30)).join("text")
        .attr("x", d => d.x).attr("y", d => d.y + 4).attr("text-anchor", "middle").attr("fill", "#fff")
        .style("font-size", d => Math.min(d.r / 5, 18) + "px").style("font-weight", "bold")
        .style("font-family", "monospace").style("pointer-events", "none").text(d => d.data.label);
    }

    if (fullscreenChart === "heatmap") {
      const nonZeroRegions = [...new Set(heatmapData.filter(d => d.value > 0).map(d => d.region))];
      if (nonZeroRegions.length === 0 || maxHeatVal === 0) return;
      const g = svg.attr("width", w).attr("height", h)
        .append("g").attr("transform", `translate(${margin.left},${margin.top})`);
      const regions = nonZeroRegions;
      const buckets = CHEQUE_BUCKETS;
      const x = d3.scaleBand<string>().domain(buckets).range([0, iw]).padding(0.08);
      const y = d3.scaleBand<string>().domain(regions).range([0, ih]).padding(0.08);
      const getVal = (region: string, bucket: string) => { const f = heatmapData.find(d => d.region === region && d.bucket === bucket); return f ? f.value : 0; };
      const colorScale = d3.scaleSequential(d3.interpolateYlOrRd).domain([0, maxHeatVal]);
      g.selectAll("rect").data(regions.flatMap(r => buckets.map(b => ({ region: r, bucket: b }))))
        .join("rect").attr("x", d => x(d.bucket)!).attr("y", d => y(d.region)!)
        .attr("width", x.bandwidth()).attr("height", y.bandwidth())
        .attr("fill", d => { const v = getVal(d.region, d.bucket); return v > 0 ? colorScale(v) : "rgba(255,255,255,0.04)"; })
        .attr("rx", 3).style("cursor", "pointer")
        .on("mouseover", function (event, d) {
          d3.select(this).attr("stroke", "#fff").attr("stroke-width", 2);
          showTooltip(`<strong>${d.region}</strong> · ${d.bucket}<br/>Count: ${getVal(d.region, d.bucket)}`, event);
        }).on("mousemove", moveTooltip).on("mouseout", function () { d3.select(this).attr("stroke", "none"); hideTooltip(); })
        .on("click", function () { setFullscreenChart(null); });
      g.selectAll("text.cell").data(regions.flatMap(r => buckets.map(b => ({ region: r, bucket: b }))))
        .join("text").attr("x", d => x(d.bucket)! + x.bandwidth() / 2).attr("y", d => y(d.region)! + y.bandwidth() / 2 + 4)
        .attr("text-anchor", "middle").attr("fill", d => { const v = getVal(d.region, d.bucket); return v > maxHeatVal * 0.5 ? "#fff" : "var(--ys-text-soft)"; })
        .style("font-size", "12px").style("font-family", "monospace").style("pointer-events", "none")
        .text(d => { const v = getVal(d.region, d.bucket); return v > 0 ? v : ""; });
      g.append("g").call(d3.axisLeft(y).tickSize(0)).attr("color", "var(--ys-text-soft)")
        .selectAll("text").attr("font-size", "12px").attr("font-family", "monospace");
      g.append("g").attr("transform", `translate(0,-10)`)
        .selectAll("text").data(buckets).join("text")
        .attr("x", d => x(d)! + x.bandwidth() / 2).attr("y", 0).attr("text-anchor", "end")
        .attr("fill", "var(--ys-text-soft)").style("font-size", "11px").style("font-family", "monospace")
        .attr("transform", d => `rotate(-30, ${x(d)! + x.bandwidth() / 2}, 0)`).text(d => d);
      // Color legend
      const flgX = w - 220, flgY = h - 30;
      svg.append("rect").attr("x", flgX).attr("y", flgY).attr("width", 200).attr("height", 10)
        .attr("fill", d3.interpolateYlOrRd(0)).attr("rx", 2);
      // gradient fill for legend
      const fDefs = svg.append("defs");
      const fGrad = fDefs.append("linearGradient").attr("id", "fs-heat-legend").attr("x1", "0%").attr("y1", "0%").attr("x2", "100%").attr("y2", "0%");
      fGrad.append("stop").attr("offset", "0%").attr("stop-color", d3.interpolateYlOrRd(0));
      fGrad.append("stop").attr("offset", "100%").attr("stop-color", d3.interpolateYlOrRd(1));
      svg.select("rect[height='10']").attr("fill", "url(#fs-heat-legend)");
      svg.append("text").attr("x", flgX).attr("y", flgY - 4).attr("fill", "var(--ys-text-soft)")
        .style("font-size", "10px").style("font-family", "monospace").text(`0 ────────────────────── ${maxHeatVal}`);
    }
  }, [fullscreenChart, typeDist, regionDist, sectorDist, heatmapData, maxHeatVal, showTooltip, moveTooltip, hideTooltip, fireFilter, filteredData.length]);

  // Escape key exits fullscreen
  useEffect(() => {
    if (!fullscreenChart) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setFullscreenChart(null); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [fullscreenChart]);

  return (
    <div className="space-y-6">
      <div ref={tooltipRef} className="fixed z-50 px-3 py-2 rounded-lg text-xs font-mono pointer-events-none shadow-lg border"
        style={{ visibility: "hidden", background: "var(--ys-surface-strong)", borderColor: "var(--ys-border)", color: "var(--ys-text)" }} />

      {/* Summary Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total Investors", value: filteredData.length, color: "var(--ys-accent-strong)" },
          { label: "Has LinkedIn", value: filteredData.filter(r => r.linkedin).length, color: "#4A90E2" },
          { label: "Has Email", value: filteredData.filter(r => r.email).length, color: "#0B8D80" },
          { label: "VC / Funds", value: filteredData.filter(r => r.type === "VC / Fund").length, color: "#F5A623" },
        ].map(stat => (
          <div key={stat.label} className="rounded-xl border px-4 py-3" style={{ borderColor: "var(--ys-border)", background: "var(--ys-surface-strong)" }}>
            <div className="text-[10px] font-mono uppercase tracking-widest" style={{ color: stat.color }}>{stat.label}</div>
            <div className="text-2xl font-bold mt-1" style={{ fontFamily: "var(--font-headline)", color: "var(--ys-text)" }}>
              {stat.value.toLocaleString()}
            </div>
          </div>
        ))}
      </div>

      {/* Filter Bar */}
      <div className="rounded-xl border p-4 flex flex-wrap items-center gap-3" style={{ borderColor: "var(--ys-border)", background: "var(--ys-surface-strong)" }}>
        <select value={regionFilter} onChange={e => setRegionFilter(e.target.value)}
          className="rounded-lg border px-3 py-1.5 text-xs font-mono outline-none cursor-pointer"
          style={{ borderColor: "var(--ys-border)", background: "var(--ys-surface)", color: "var(--ys-text)" }}>
          <option value="all">All Regions</option>
          {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
        </select>

        <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)}
          className="rounded-lg border px-3 py-1.5 text-xs font-mono outline-none cursor-pointer"
          style={{ borderColor: "var(--ys-border)", background: "var(--ys-surface)", color: "var(--ys-text)" }}>
          <option value="all">All Types</option>
          {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
        </select>

        <select value={sectorFilter} onChange={e => setSectorFilter(e.target.value)}
          className="rounded-lg border px-3 py-1.5 text-xs font-mono outline-none cursor-pointer"
          style={{ borderColor: "var(--ys-border)", background: "var(--ys-surface)", color: "var(--ys-text)" }}>
          <option value="all">All Sectors</option>
          {sectorList.map(s => <option key={s} value={s}>{s}</option>)}
        </select>

        <select value={chequeFilter} onChange={e => setChequeFilter(e.target.value)}
          className="rounded-lg border px-3 py-1.5 text-xs font-mono outline-none cursor-pointer"
          style={{ borderColor: "var(--ys-border)", background: "var(--ys-surface)", color: "var(--ys-text)" }}>
          <option value="all">All Cheques</option>
          {CHEQUE_BUCKETS.map(c => <option key={c} value={c}>{c}</option>)}
          <option value="Unknown">No Data</option>
        </select>

        <label className="flex items-center gap-1.5 text-xs font-mono cursor-pointer" style={{ color: "var(--ys-text-soft)" }}>
          <input type="checkbox" checked={linkedinOnly} onChange={e => setLinkedinOnly(e.target.checked)}
            className="rounded border" style={{ accentColor: "var(--ys-accent)" }} />
          LinkedIn Only
        </label>

        <label className="flex items-center gap-1.5 text-xs font-mono cursor-pointer" style={{ color: "var(--ys-text-soft)" }}>
          <input type="checkbox" checked={emailOnly} onChange={e => setEmailOnly(e.target.checked)}
            className="rounded border" style={{ accentColor: "var(--ys-highlight)" }} />
          Email Only
        </label>

        {hasFilters && (
          <button onClick={clearFilters}
            className="ml-auto rounded-lg border px-3 py-1.5 text-[10px] font-mono transition-colors hover:opacity-70"
            style={{ borderColor: "var(--ys-border)", color: "var(--ys-text-soft)" }}>
            Clear Filters
          </button>
        )}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="rounded-xl border p-4" style={{ borderColor: "var(--ys-border)", background: "var(--ys-surface-strong)" }}>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-mono font-semibold uppercase tracking-widest" style={{ color: "var(--ys-accent-strong)" }}>
              Investor Types
            </h3>
            <button onClick={() => setFullscreenChart("donut")} className="p-1 rounded hover:opacity-70 transition-opacity" style={{ color: "var(--ys-text-soft)" }} title="Fullscreen">
              <Maximize2 size={12} />
            </button>
          </div>
          <p className="text-[10px] font-mono mb-2" style={{ color: "var(--ys-text-soft)" }}>Click a slice to filter by type</p>
          <svg ref={donutRef} className="w-full" style={{ minHeight: 260 }} />
        </div>

        <div className="rounded-xl border p-4" style={{ borderColor: "var(--ys-border)", background: "var(--ys-surface-strong)" }}>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-mono font-semibold uppercase tracking-widest" style={{ color: "var(--ys-accent-strong)" }}>
              Regions — Treemap
            </h3>
            <button onClick={() => setFullscreenChart("treemap")} className="p-1 rounded hover:opacity-70 transition-opacity" style={{ color: "var(--ys-text-soft)" }} title="Fullscreen">
              <Maximize2 size={12} />
            </button>
          </div>
          <p className="text-[10px] font-mono mb-2" style={{ color: "var(--ys-text-soft)" }}>Click a block to filter by region</p>
          <svg ref={treemapRef} className="w-full" style={{ minHeight: 260 }} />
        </div>

        <div className="rounded-xl border p-4" style={{ borderColor: "var(--ys-border)", background: "var(--ys-surface-strong)" }}>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-mono font-semibold uppercase tracking-widest" style={{ color: "var(--ys-accent-strong)" }}>
              Sectors — Packed Bubbles
            </h3>
            <button onClick={() => setFullscreenChart("bubbles")} className="p-1 rounded hover:opacity-70 transition-opacity" style={{ color: "var(--ys-text-soft)" }} title="Fullscreen">
              <Maximize2 size={12} />
            </button>
          </div>
          <p className="text-[10px] font-mono mb-2" style={{ color: "var(--ys-text-soft)" }}>Click a bubble to filter by sector</p>
          <svg ref={bubbleRef} className="w-full" style={{ minHeight: 260 }} />
        </div>

        <div className="rounded-xl border p-4" style={{ borderColor: "var(--ys-border)", background: "var(--ys-surface-strong)" }}>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-mono font-semibold uppercase tracking-widest" style={{ color: "var(--ys-accent-strong)" }}>
              Cheque Size × Region — Heatmap
            </h3>
            <button onClick={() => setFullscreenChart("heatmap")} className="p-1 rounded hover:opacity-70 transition-opacity" style={{ color: "var(--ys-text-soft)" }} title="Fullscreen">
              <Maximize2 size={12} />
            </button>
          </div>
          <p className="text-[10px] font-mono mb-2" style={{ color: "var(--ys-text-soft)" }}>Click a cell to filter by region + cheque range</p>
          <svg ref={heatmapRef} className="w-full" style={{ minHeight: 260 }} />
        </div>
      </div>

      {/* Fullscreen Overlay */}
      {fullscreenChart && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center" style={{ background: "rgba(0,0,0,0.85)" }}>
          <div className="relative rounded-2xl border p-6" style={{ background: "var(--ys-surface)", borderColor: "var(--ys-border)", width: "calc(100vw - 40px)", height: "calc(100vh - 40px)" }}>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-mono font-semibold uppercase tracking-widest" style={{ color: "var(--ys-accent-strong)" }}>
                {fullscreenChart === "donut" ? "Investor Types" : fullscreenChart === "treemap" ? "Regions" : fullscreenChart === "bubbles" ? "Sectors" : "Cheque Size × Region"}
              </h3>
              <button onClick={() => setFullscreenChart(null)} className="p-2 rounded hover:opacity-70 transition-opacity" style={{ color: "var(--ys-text-soft)" }} title="Close (Esc)">
                <X size={18} />
              </button>
            </div>
            <p className="text-[10px] font-mono mb-2" style={{ color: "var(--ys-text-soft)" }}>Esc to close · Click chart element to filter</p>
            <svg ref={fsRef} className="w-full" style={{ height: "calc(100vh - 120px)" }} />
          </div>
        </div>
      )}
    </div>
  );
}

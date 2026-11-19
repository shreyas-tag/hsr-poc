import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell } from "recharts";
import { Card, CardHead, Kpi, PageHead, Swatch, Segmented } from "../../components/ui";
import { useStore, aud } from "../../state/store";
import { colourHex } from "../../data/seed";
import { useState } from "react";

const WEEKS = [
  { w: "20 Oct", trade: 0, auto: 0, land: 0 }, { w: "27 Oct", trade: 1800, auto: 460, land: 0 }, { w: "3 Nov", trade: 3900, auto: 720, land: 980 },
  { w: "10 Nov", trade: 5200, auto: 1180, land: 1520 }, { w: "17 Nov", trade: 6400, auto: 1260, land: 2380 },
];
const PIE = ["#0F1115", "#FF5A1F", "#8A93A0", "#D8DDE3"];

export default function Reports() {
  const { jobs } = useStore();
  const [range, setRange] = useState<"month" | "quarter">("month");
  const byType = Object.entries(jobs.reduce<Record<string, number>>((a, j) => ((a[j.type] = (a[j.type] ?? 0) + j.value), a), {})).map(([name, value]) => ({ name, value }));
  const byColour = Object.entries(jobs.reduce<Record<string, number>>((a, j) => ((a[j.colour] = (a[j.colour] ?? 0) + j.qty), a), {})).sort((a, b) => b[1] - a[1]).slice(0, 6);
  const total = WEEKS.reduce((a, w) => a + w.trade + w.auto + w.land, 0);
  return (
    <div data-tour="reports">
      <PageHead title="Reports" sub="Sample figures for the concept." right={<Segmented value={range} onChange={setRange} options={[{ value: "month", label: "This month" }, { value: "quarter", label: "Quarter" }]} />} />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Kpi accent label="Revenue (ex GST)" value={aud(total)} foot="since opening" />
        <Kpi label="Jobs completed" value="23" foot="avg 4.1 days turnaround" />
        <Kpi label="Average job" value={aud(1150)} foot="trade jobs avg $2,040" />
        <Kpi label="Quote acceptance" value="68%" foot="17 of 25 decided" />
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-[1.6fr_1fr] gap-4 mt-4">
        <Card>
          <CardHead title="Revenue by week" sub="By customer type, ex GST" />
          <div className="h-[260px] -ml-2">
            <ResponsiveContainer>
              <BarChart data={WEEKS}>
                <CartesianGrid vertical={false} stroke="#EEF0F3" />
                <XAxis dataKey="w" tick={{ fontSize: 11, fill: "#8A909A" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#8A909A" }} axisLine={false} tickLine={false} width={48} tickFormatter={(v) => `$${v / 1000}k`} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} formatter={(v: number) => aud(v)} />
                <Bar dataKey="trade" name="Trade" stackId="a" fill="#0F1115" barSize={34} />
                <Bar dataKey="auto" name="Automotive" stackId="a" fill="#FF5A1F" />
                <Bar dataKey="land" name="Landscaping & custom" stackId="a" fill="#B6BDC7" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-4 text-xs text-ink-3 mt-2">{[["Trade", "#0F1115"], ["Automotive", "#FF5A1F"], ["Landscaping & custom", "#B6BDC7"]].map(([l, c]) => <span key={l} className="inline-flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm" style={{ background: c }} />{l}</span>)}</div>
        </Card>
        <Card>
          <CardHead title="Work in progress by customer type" />
          <div className="h-[200px]">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={byType} dataKey="value" nameKey="name" innerRadius={52} outerRadius={82} paddingAngle={2}>
                  {byType.map((_, k) => <Cell key={k} fill={PIE[k % PIE.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} formatter={(v: number) => aud(v)} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">{byType.map((t, k) => <span key={t.name} className="inline-flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm" style={{ background: PIE[k % PIE.length] }} />{t.name} · {aud(t.value)}</span>)}</div>
        </Card>
      </div>
      <Card className="mt-4">
        <CardHead title="Most-used colours" sub="Pieces coated, to plan powder stock" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {byColour.map(([c, n]) => (
            <div key={c} className="flex items-center gap-3 rounded-lg border border-line p-3">
              <Swatch hex={colourHex(c)} size={34} />
              <div className="flex-1"><div className="text-sm font-semibold">{c}</div><div className="mt-1.5 h-1.5 rounded-full bg-steel-100 overflow-hidden"><div className="h-full bg-flame rounded-full" style={{ width: `${(n / byColour[0][1]) * 100}%` }} /></div></div>
              <span className="text-sm tnum font-semibold">{n}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

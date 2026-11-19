import { Link, useNavigate } from "react-router-dom";
import { Inbox, FileText, Trophy, Users, ArrowRight, Image, Megaphone, HelpCircle, Palette } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, CartesianGrid } from "recharts";
import { Card, CardHead, Kpi, PageHead, Pill, statusTone, Button } from "../../components/ui";
import { useStore } from "../../state/store";

const VISITS = [
  { w: "13 Oct", v: 0 }, { w: "20 Oct", v: 0 }, { w: "27 Oct", v: 118 }, { w: "3 Nov", v: 246 }, { w: "10 Nov", v: 391 }, { w: "17 Nov", v: 512 },
];

export default function Dashboard() {
  const { enquiries } = useStore();
  const nav = useNavigate();
  const newN = enquiries.filter((e) => e.status === "New").length;
  const won = enquiries.filter((e) => e.status === "Won").length;
  const closed = enquiries.filter((e) => e.status === "Won" || e.status === "Lost").length;
  const src = Object.entries(enquiries.reduce<Record<string, number>>((a, e) => ((a[e.source] = (a[e.source] ?? 0) + 1), a), {})).map(([s, n]) => ({ s, n })).sort((a, b) => b.n - a.n);
  return (
    <>
      <PageHead eyebrow="Thursday 19 November" title="Good morning, Harshal" sub="Here's what came in through the website." right={<Button variant="secondary" onClick={() => nav("/site")}>View website <ArrowRight size={15} /></Button>} />
      <div data-tour="cms-kpis" className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Kpi accent label="New enquiries" value={newN} foot="waiting for a reply" icon={<Inbox size={16} />} />
        <Kpi label="Enquiries this month" value={enquiries.length} foot="from website, Google and social" icon={<FileText size={16} className="text-ink-4" />} />
        <Kpi label="Won" value={`${closed ? Math.round((won / closed) * 100) : 0}%`} foot={`${won} of ${closed} decided`} icon={<Trophy size={16} className="text-ink-4" />} />
        <Kpi label="Website visitors" value="512" foot="this week · sample" icon={<Users size={16} className="text-ink-4" />} />
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-[1.6fr_1fr] gap-4 mt-4">
        <Card data-tour="cms-latest" pad={false}>
          <div className="px-5 py-4 flex items-center justify-between border-b border-line">
            <div className="text-sm font-semibold">Latest enquiries</div>
            <Link to="/cms/enquiries" className="text-xs font-semibold text-flame inline-flex items-center gap-1">All enquiries <ArrowRight size={13} /></Link>
          </div>
          <div className="divide-y divide-line-2">
            {enquiries.slice(0, 6).map((e) => (
              <button key={e.id} onClick={() => nav(`/cms/enquiries?open=${e.id}`)} className="w-full text-left px-5 py-3 flex items-center gap-3 hover:bg-steel-50">
                {e.photos[0] ? <img src={e.photos[0]} alt="" className="w-11 h-11 rounded-lg object-cover" /> : <span className="w-11 h-11 rounded-lg bg-steel-100" />}
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold truncate">{e.name}{e.company && <span className="font-normal text-ink-4"> · {e.company}</span>}</div>
                  <div className="text-xs text-ink-4 truncate">{e.items.map((i) => `${i.qty} × ${i.desc}`).join(", ")}</div>
                </div>
                <div className="text-right shrink-0">
                  <Pill tone={statusTone(e.status)}>{e.status}</Pill>
                  <div className="text-2xs text-ink-4 mt-1">{e.received}</div>
                </div>
              </button>
            ))}
          </div>
        </Card>
        <div className="space-y-4">
          <Card>
            <CardHead title="Website visitors" sub="Weekly, since launch · sample" />
            <div className="h-[150px] -ml-3">
              <ResponsiveContainer>
                <AreaChart data={VISITS}>
                  <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FF5A1F" stopOpacity={0.35} /><stop offset="1" stopColor="#FF5A1F" stopOpacity={0} /></linearGradient></defs>
                  <XAxis dataKey="w" tick={{ fontSize: 11, fill: "#8A909A" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "#8A909A" }} axisLine={false} tickLine={false} width={34} />
                  <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                  <Area type="monotone" dataKey="v" name="Visitors" stroke="#FF5A1F" strokeWidth={2} fill="url(#g)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
          <Card>
            <CardHead title="Where enquiries come from" />
            <div className="h-[150px] -ml-3">
              <ResponsiveContainer>
                <BarChart data={src} layout="vertical" margin={{ left: 10 }}>
                  <CartesianGrid horizontal={false} stroke="#EEF0F3" />
                  <XAxis type="number" hide allowDecimals={false} />
                  <YAxis type="category" dataKey="s" width={128} tick={{ fontSize: 11, fill: "#5A606B" }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                  <Bar dataKey="n" name="Enquiries" fill="#0F1115" radius={[0, 4, 4, 0]} barSize={12} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
        {[
          { i: Image, t: "Add gallery photos", to: "/cms/content?tab=gallery" },
          { i: Megaphone, t: "Notice banner", to: "/cms/content?tab=banner" },
          { i: HelpCircle, t: "Edit FAQs", to: "/cms/content?tab=faqs" },
          { i: Palette, t: "Colours shown", to: "/cms/content?tab=colours" },
        ].map((q) => (
          <Link key={q.t} to={q.to} className="rounded-xl bg-white border border-line p-4 flex items-center gap-3 hover:border-ink-5 hover:shadow-card">
            <span className="w-9 h-9 rounded-lg bg-steel-100 inline-flex items-center justify-center"><q.i size={17} /></span>
            <span className="text-sm font-medium">{q.t}</span>
          </Link>
        ))}
      </div>
    </>
  );
}

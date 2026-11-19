import { NavLink, Outlet, useNavigate, Link } from "react-router-dom";
import { Sun, KanbanSquare, Layers, FileText, Users, Receipt, BarChart3, Tablet, Settings, Plus, Search, Bell, Inbox } from "lucide-react";
import { DemoBar } from "../../components/DemoBar";
import { TourLauncher } from "../../components/Tour";
import { Avatar, cx } from "../../components/ui";
import { useStore } from "../../state/store";

export function WsLayout() {
  const { jobs, newQuote, enquiries } = useStore();
  const nav = useNavigate();
  const active = jobs.filter((j) => j.stage !== "Collected").length;
  const items = [
    { to: "/ws", label: "Today", icon: Sun, end: true },
    { to: "/ws/jobs", label: "Jobs", icon: KanbanSquare, badge: active },
    { to: "/ws/batching", label: "Colour batching", icon: Layers },
    { to: "/ws/quotes", label: "Quotes", icon: FileText },
    { to: "/ws/customers", label: "Customers", icon: Users },
    { to: "/ws/invoices", label: "Invoices", icon: Receipt },
    { to: "/ws/reports", label: "Reports", icon: BarChart3 },
    { to: "/ws/floor", label: "Shop-floor mode", icon: Tablet },
    { to: "/ws/settings", label: "Settings", icon: Settings },
  ];
  const newEnq = enquiries.filter((e) => e.status === "New").length;
  return (
    <div className="min-h-full flex flex-col bg-canvas">
      <DemoBar />
      <div className="flex-1 flex min-h-0">
        <aside className="hidden lg:flex w-[236px] shrink-0 flex-col bg-steel-950 text-white">
          <div className="h-16 px-5 flex items-center gap-2.5 border-b border-white/10">
            <span className="display-wide font-extrabold text-[18px]">HSR<span className="text-flame">.</span></span>
            <span className="text-[10px] uppercase tracking-[0.16em] font-semibold text-white/45">Workshop</span>
          </div>
          <div className="p-3">
            <button onClick={() => nav(`/ws/quotes/${newQuote()}`)} className="w-full h-10 rounded-lg bg-flame hover:bg-flame-600 text-sm font-semibold inline-flex items-center justify-center gap-2"><Plus size={16} /> New quote</button>
          </div>
          <nav className="px-3 flex flex-col gap-0.5">
            {items.map((it) => (
              <NavLink key={it.to} to={it.to} end={it.end} className={({ isActive }) => cx("h-10 px-3 rounded-lg flex items-center gap-3 text-sm transition-colors", isActive ? "bg-white/10 text-white font-semibold" : "text-white/60 hover:text-white hover:bg-white/5")}>
                <it.icon size={17} /> <span className="flex-1">{it.label}</span>
                {!!it.badge && <span className="text-[11px] text-white/45 tnum">{it.badge}</span>}
              </NavLink>
            ))}
          </nav>
          <div className="mt-auto p-3">
            <Link to="/cms/enquiries" className="flex items-center gap-3 rounded-lg p-3 bg-white/5 hover:bg-white/10 text-sm">
              <Inbox size={16} className="text-flame" />
              <span className="flex-1 text-white/80">Website enquiries</span>
              {!!newEnq && <span className="min-w-5 h-5 px-1.5 rounded-full bg-flame text-[11px] font-semibold inline-flex items-center justify-center">{newEnq}</span>}
            </Link>
            <div className="flex items-center gap-2.5 p-2.5 mt-2">
              <Avatar name="Harshal Gaikar" size={30} dark />
              <div className="min-w-0"><div className="text-xs font-semibold truncate">Harshal Gaikar</div><div className="text-2xs text-white/45">Owner</div></div>
            </div>
          </div>
        </aside>
        <div className="flex-1 min-w-0 flex flex-col">
          <header className="h-14 bg-white border-b border-line flex items-center gap-3 px-4 sm:px-6">
            <div className="flex items-center gap-2 h-9 px-3 rounded-md bg-steel-50 border border-line flex-1 max-w-[420px]">
              <Search size={14} className="text-ink-4" />
              <input placeholder="Search jobs, customers, quotes" className="flex-1 bg-transparent outline-none text-sm min-w-0" />
              <span className="hidden sm:inline text-2xs text-ink-5 border border-line-3 rounded px-1">/</span>
            </div>
            <button className="ml-auto relative p-2 rounded-md hover:bg-steel-100 text-ink-3" aria-label="Notifications"><Bell size={18} /><span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-flame" /></button>
            <button onClick={() => nav(`/ws/quotes/${newQuote()}`)} className="lg:hidden h-9 px-3 rounded-md bg-flame text-white text-sm font-semibold inline-flex items-center gap-1.5"><Plus size={15} /> Quote</button>
          </header>
          <div className="lg:hidden flex items-center gap-1 px-3 h-12 bg-white border-b border-line overflow-x-auto">
            {items.map((it) => (
              <NavLink key={it.to} to={it.to} end={it.end} className={({ isActive }) => cx("h-8 px-3 rounded-md text-xs inline-flex items-center gap-1.5 whitespace-nowrap", isActive ? "bg-ink text-white font-semibold" : "text-ink-3")}>
                <it.icon size={14} /> {it.label}
              </NavLink>
            ))}
          </div>
          <main className="flex-1 p-4 sm:p-6 lg:p-8 w-full max-w-[1500px]"><Outlet /></main>
        </div>
      </div>
      <TourLauncher tour="ws" />
    </div>
  );
}

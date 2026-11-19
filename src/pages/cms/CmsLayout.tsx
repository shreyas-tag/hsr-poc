import { NavLink, Outlet, Link } from "react-router-dom";
import { LayoutDashboard, Inbox, PenSquare, ExternalLink, Factory, LogOut } from "lucide-react";
import { DemoBar } from "../../components/DemoBar";
import { TourLauncher } from "../../components/Tour";
import { Avatar, cx } from "../../components/ui";
import { useStore } from "../../state/store";

export function CmsLayout() {
  const { enquiries } = useStore();
  const n = enquiries.filter((e) => e.status === "New").length;
  const items = [
    { to: "/cms/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/cms/enquiries", label: "Enquiries", icon: Inbox, badge: n },
    { to: "/cms/content", label: "Website content", icon: PenSquare },
  ];
  return (
    <div className="min-h-full flex flex-col bg-canvas">
      <DemoBar />
      <div className="flex-1 flex min-h-0">
        <aside className="hidden md:flex w-[232px] shrink-0 flex-col bg-white border-r border-line">
          <div className="h-16 px-5 flex items-center gap-2.5 border-b border-line">
            <span className="display-wide font-extrabold text-[18px]">HSR<span className="text-flame">.</span></span>
            <span className="text-[10px] uppercase tracking-[0.16em] font-semibold text-ink-4">Website CMS</span>
          </div>
          <nav className="p-3 flex flex-col gap-0.5">
            {items.map((it) => (
              <NavLink key={it.to} to={it.to} className={({ isActive }) => cx("h-10 px-3 rounded-lg flex items-center gap-3 text-sm transition-colors", isActive ? "bg-flame-50 text-flame-700 font-semibold" : "text-ink-2 hover:bg-steel-50")}>
                <it.icon size={17} /> <span className="flex-1">{it.label}</span>
                {!!it.badge && <span className="min-w-5 h-5 px-1.5 rounded-full bg-flame text-white text-[11px] font-semibold inline-flex items-center justify-center">{it.badge}</span>}
              </NavLink>
            ))}
          </nav>
          <div className="mt-auto p-3 space-y-1">
            <Link to="/ws" className="h-10 px-3 rounded-lg flex items-center gap-3 text-sm text-ink-2 hover:bg-steel-50"><Factory size={17} /> Workshop System</Link>
            <Link to="/site" className="h-10 px-3 rounded-lg flex items-center gap-3 text-sm text-ink-2 hover:bg-steel-50"><ExternalLink size={17} /> View website</Link>
            <div className="flex items-center gap-2.5 p-2.5 mt-2 rounded-lg bg-steel-50">
              <Avatar name="Harshal Gaikar" size={30} dark />
              <div className="min-w-0 flex-1"><div className="text-xs font-semibold truncate">Harshal Gaikar</div><div className="text-2xs text-ink-4">Owner</div></div>
              <Link to="/cms" title="Sign out" className="p-1.5 rounded hover:bg-white text-ink-4"><LogOut size={14} /></Link>
            </div>
          </div>
        </aside>
        <div className="flex-1 min-w-0 flex flex-col">
          <div className="md:hidden flex items-center gap-1 px-3 h-12 bg-white border-b border-line overflow-x-auto">
            {items.map((it) => (
              <NavLink key={it.to} to={it.to} className={({ isActive }) => cx("h-8 px-3 rounded-md text-xs inline-flex items-center gap-1.5 whitespace-nowrap", isActive ? "bg-flame-50 text-flame-700 font-semibold" : "text-ink-3")}>
                <it.icon size={14} /> {it.label} {!!it.badge && <span className="text-flame">({it.badge})</span>}
              </NavLink>
            ))}
          </div>
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1320px] w-full"><Outlet /></main>
        </div>
      </div>
      <TourLauncher tour="cms" />
    </div>
  );
}

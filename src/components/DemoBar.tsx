import { NavLink } from "react-router-dom";
import { LayoutGrid, Globe, Inbox, Factory, Palette } from "lucide-react";
import { cx } from "./ui";

const LINKS = [
  { to: "/", label: "Overview", icon: LayoutGrid, end: true },
  { to: "/site", label: "Website", icon: Globe },
  { to: "/cms", label: "CMS", icon: Inbox },
  { to: "/ws", label: "Workshop System", icon: Factory },
  { to: "/brand", label: "Logo concepts", icon: Palette },
];

export function DemoBar() {
  return (
    <div className="bg-steel-950 text-white/70 text-[11.5px] relative z-[45]">
      <div className="max-w-[1440px] mx-auto px-3 sm:px-4 h-9 flex items-center gap-3">
        <span className="hidden xl:inline text-white/45 whitespace-nowrap truncate">Concept mock-up for HSR Powder Coating · by Axera Digital · sample data · everything can be customised</span>
        <nav className="flex items-center gap-0.5 overflow-x-auto scroll-thin ml-auto -mx-1 px-1">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) => cx("h-7 px-2.5 rounded-md inline-flex items-center gap-1.5 whitespace-nowrap transition-colors", isActive ? "bg-white/12 text-white bg-white/10" : "hover:text-white hover:bg-white/5")}
            >
              <l.icon size={13} /> {l.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
}

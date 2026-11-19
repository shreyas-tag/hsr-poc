import { useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { Phone, Menu, X, ChevronDown, ArrowRight, Megaphone, Mail, MapPin, Clock } from "lucide-react";
import { DemoBar } from "../../components/DemoBar";
import { TourLauncher } from "../../components/Tour";
import { Wordmark, cx } from "../../components/ui";
import { useStore } from "../../state/store";

const WHO = [
  { to: "/site/who/trade", label: "Trade & fabricators", sub: "Extrusions, frames, steelwork, volume" },
  { to: "/site/who/automotive", label: "Automotive", sub: "Wheels, ute trays, bars, frames" },
  { to: "/site/who/landscaping", label: "Landscaping & custom", sub: "Gates, fences, screens, furniture" },
];

export function SiteLayout() {
  const { banner, business } = useStore();
  const [open, setOpen] = useState(false);
  const [dd, setDd] = useState(false);
  const loc = useLocation();
  const link = ({ isActive }: { isActive: boolean }) => cx("h-9 px-3 inline-flex items-center rounded-md text-[13.5px] transition-colors", isActive ? "text-white" : "text-white/65 hover:text-white");
  return (
    <div className="min-h-full flex flex-col bg-white">
      <DemoBar />
      {banner.on && (
        <div className="bg-flame text-white text-[13px]">
          <div className="max-w-[1240px] mx-auto px-4 h-10 flex items-center justify-center gap-2 text-center">
            <Megaphone size={15} className="shrink-0" /> <span className="truncate">{banner.text}</span>
          </div>
        </div>
      )}
      <header className="sticky top-0 z-40 bg-steel-950/92 backdrop-blur-md border-b border-white/10" style={{ backgroundColor: "rgba(11,13,16,.92)" }}>
        <div className="max-w-[1240px] mx-auto px-4 lg:px-6 h-[68px] flex items-center gap-4">
          <Link to="/site" className="shrink-0"><Wordmark dark /></Link>
          <nav className="hidden lg:flex items-center gap-0.5 ml-6">
            <NavLink to="/site/powder-coating" className={link}>Powder coating</NavLink>
            <div className="relative" onMouseEnter={() => setDd(true)} onMouseLeave={() => setDd(false)}>
              <button className={cx("h-9 px-3 inline-flex items-center gap-1 rounded-md text-[13.5px]", loc.pathname.startsWith("/site/who") ? "text-white" : "text-white/65 hover:text-white")}>
                Who we coat <ChevronDown size={14} />
              </button>
              {dd && (
                <div className="absolute left-0 top-full pt-2 w-[300px] anim-fade">
                  <div className="rounded-xl bg-white shadow-pop border border-line p-2">
                    {WHO.map((w) => (
                      <Link key={w.to} to={w.to} onClick={() => setDd(false)} className="block rounded-lg px-3 py-2.5 hover:bg-steel-50">
                        <div className="text-sm font-semibold text-ink">{w.label}</div>
                        <div className="text-xs text-ink-4">{w.sub}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <NavLink to="/site/gallery" className={link}>Gallery</NavLink>
            <NavLink to="/site/colours" className={link}>Colours</NavLink>
            <NavLink to="/site/about" className={link}>About</NavLink>
            <NavLink to="/site/contact" className={link}>Contact</NavLink>
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <a href="#call" onClick={(e) => e.preventDefault()} className="hidden md:inline-flex h-10 px-3 items-center gap-2 text-sm text-white/80 hover:text-white">
              <Phone size={15} className="text-flame" /> {business.phone}
            </a>
            <Link to="/site/quote" data-tour="nav-quote" className="hidden sm:inline-flex h-10 px-4 rounded-md bg-flame hover:bg-flame-600 text-white text-sm font-semibold items-center gap-1.5">
              Get a quote <ArrowRight size={15} />
            </Link>
            <button onClick={() => setOpen(true)} className="lg:hidden h-10 w-10 inline-flex items-center justify-center rounded-md text-white hover:bg-white/10" aria-label="Menu">
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-[86%] max-w-[360px] bg-steel-950 text-white p-5 anim-slide flex flex-col">
            <div className="flex items-center justify-between">
              <Wordmark dark compact />
              <button onClick={() => setOpen(false)} className="p-2 rounded-md hover:bg-white/10" aria-label="Close"><X size={20} /></button>
            </div>
            <nav className="mt-6 flex flex-col">
              {[["/site", "Home"], ["/site/powder-coating", "Powder coating"], ...WHO.map((w) => [w.to, w.label]), ["/site/gallery", "Gallery"], ["/site/colours", "Colours"], ["/site/about", "About"], ["/site/contact", "Contact"]].map(([to, l]) => (
                <Link key={to} to={to} onClick={() => setOpen(false)} className="py-3 border-b border-white/10 text-[15px] text-white/85">{l}</Link>
              ))}
            </nav>
            <Link to="/site/quote" onClick={() => setOpen(false)} className="mt-auto h-12 rounded-md bg-flame text-white font-semibold inline-flex items-center justify-center gap-2">Get a quote <ArrowRight size={16} /></Link>
          </div>
        </div>
      )}

      <main className="flex-1"><Outlet /></main>

      <footer className="bg-steel-950 text-white/65">
        <div className="max-w-[1240px] mx-auto px-4 lg:px-6 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr] gap-10">
          <div>
            <Wordmark dark />
            <p className="text-sm mt-4 leading-[22px] max-w-[300px]">Powder coating for trade, automotive and landscaping customers, with a large-format oven for parts up to 7 m.</p>
          </div>
          <div>
            <div className="text-white text-sm font-semibold mb-3">Services</div>
            <ul className="space-y-2 text-sm">
              <li><Link className="hover:text-white" to="/site/powder-coating">Powder coating</Link></li>
              {WHO.map((w) => <li key={w.to}><Link className="hover:text-white" to={w.to}>{w.label}</Link></li>)}
              <li><Link className="hover:text-white" to="/site/colours">Colour selector</Link></li>
            </ul>
          </div>
          <div>
            <div className="text-white text-sm font-semibold mb-3">Company</div>
            <ul className="space-y-2 text-sm">
              <li><Link className="hover:text-white" to="/site/about">About</Link></li>
              <li><Link className="hover:text-white" to="/site/gallery">Gallery</Link></li>
              <li><Link className="hover:text-white" to="/site/contact">Contact</Link></li>
              <li><Link className="hover:text-white" to="/site/quote">Trade accounts</Link></li>
            </ul>
          </div>
          <div className="text-sm space-y-2.5">
            <div className="text-white font-semibold mb-3">Contact</div>
            <div className="flex gap-2"><Phone size={15} className="text-flame mt-0.5 shrink-0" /> {business.phone}</div>
            <div className="flex gap-2"><Mail size={15} className="text-flame mt-0.5 shrink-0" /> {business.email}</div>
            <div className="flex gap-2"><MapPin size={15} className="text-flame mt-0.5 shrink-0" /> {business.address}</div>
            <div className="flex gap-2"><Clock size={15} className="text-flame mt-0.5 shrink-0" /> {business.hours}</div>
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="max-w-[1240px] mx-auto px-4 lg:px-6 py-5 flex flex-wrap gap-3 justify-between text-xs text-white/40">
            <span>© 2026 {business.legal} · {business.abn}</span>
            <span>Privacy policy · Terms · <Link to="/cms" className="hover:text-white">Staff login</Link></span>
          </div>
        </div>
      </footer>

      <div className="sm:hidden fixed bottom-0 inset-x-0 z-40 p-3 bg-white/95 backdrop-blur border-t border-line grid grid-cols-2 gap-2">
        <a href="#call" onClick={(e) => e.preventDefault()} className="h-11 rounded-md border border-line-3 inline-flex items-center justify-center gap-2 text-sm font-semibold"><Phone size={16} /> Call</a>
        <Link to="/site/quote" className="h-11 rounded-md bg-flame text-white inline-flex items-center justify-center gap-2 text-sm font-semibold">Get a quote</Link>
      </div>
      <div className="sm:hidden h-[68px]" />
      <TourLauncher tour="site" raised />
    </div>
  );
}

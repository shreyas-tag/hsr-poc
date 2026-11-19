import { useNavigate, Link } from "react-router-dom";
import { Lock, ArrowRight, Factory, Inbox } from "lucide-react";
import { DemoBar } from "../../components/DemoBar";
import { IMG } from "../../data/seed";

export default function CmsLogin() {
  const nav = useNavigate();
  return (
    <div className="min-h-full flex flex-col bg-white">
      <DemoBar />
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2">
        <div className="relative hidden lg:block bg-steel-950">
          <img src={IMG.trade} alt="" className="absolute inset-0 w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-t from-steel-950 via-steel-950/40 to-transparent" />
          <div className="absolute bottom-0 p-12 text-white max-w-[520px]">
            <div className="display-wide text-[22px] font-extrabold">HSR<span className="text-flame">.</span></div>
            <div className="display text-[30px] leading-9 font-bold mt-6">Every enquiry, every job, one login.</div>
            <p className="text-white/60 mt-3 text-sm">Staff sign-in for the HSR website CMS and Workshop System.</p>
          </div>
        </div>
        <div className="flex items-center justify-center p-6 sm:p-12">
          <div className="w-full max-w-[380px] anim-up">
            <div className="w-11 h-11 rounded-xl bg-flame-50 text-flame inline-flex items-center justify-center"><Lock size={20} /></div>
            <h1 className="display text-[28px] font-bold mt-5">Staff sign in</h1>
            <p className="text-sm text-ink-3 mt-1">Demo: details are filled in, just press sign in.</p>
            <form onSubmit={(e) => { e.preventDefault(); nav("/cms/dashboard"); }} className="mt-7 space-y-4">
              <label className="block"><span className="text-xs font-medium text-ink-2">Email</span><input className="input mt-1.5" defaultValue="harshal@hsrpowdercoating.com.au" /></label>
              <label className="block"><span className="text-xs font-medium text-ink-2">Password</span><input className="input mt-1.5" type="password" defaultValue="demo-password" /></label>
              <button className="w-full h-11 rounded-md bg-ink text-white font-semibold inline-flex items-center justify-center gap-2 hover:bg-steel-700">Sign in <ArrowRight size={16} /></button>
              <p className="text-2xs text-ink-4 text-center">Two-step verification by SMS is available for the owner account.</p>
            </form>
            <div className="mt-8 grid grid-cols-2 gap-2">
              <Link to="/cms/dashboard" className="rounded-lg border border-line p-3 text-xs hover:border-ink-4"><Inbox size={15} className="text-flame mb-1.5" />Website CMS</Link>
              <Link to="/ws" className="rounded-lg border border-line p-3 text-xs hover:border-ink-4"><Factory size={15} className="text-flame mb-1.5" />Workshop System</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

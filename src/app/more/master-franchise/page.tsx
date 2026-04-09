import { StadiumBg } from "@/components/ui/stadium-bg";
export default function MasterFranchisePage() {
  return (
    <StadiumBg overlay="dark">
        <div className="section-shell section-space">
            <div className="section-label">Partnership</div>
            <h1 className="section-title">Master Franchise</h1>

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
                <div className="glow-card p-6">
                <div className="ui-font text-xl font-bold uppercase text-[var(--flame)]">Why Partner</div>
                <p className="mt-4 text-sm leading-7 text-white/65">
                    Organise local tournaments, grow regional engagement, and build a branded competitive structure under the ITCPL ecosystem.
                </p>
                </div>

                <div className="glow-card p-6">
                <div className="ui-font text-xl font-bold uppercase text-[var(--flame)]">Request Form</div>
                <div className="mt-5 grid gap-4">
                    <input placeholder="Organisation / Group" className="border border-white/10 bg-black/40 px-4 py-3 outline-none" />
                    <input placeholder="Contact Person" className="border border-white/10 bg-black/40 px-4 py-3 outline-none" />
                    <input placeholder="City / Region" className="border border-white/10 bg-black/40 px-4 py-3 outline-none" />
                    <textarea placeholder="Tell us about your proposal" rows={5} className="border border-white/10 bg-black/40 px-4 py-3 outline-none" />
                    <button className="ui-font w-fit bg-[var(--flame)] px-5 py-3 text-sm font-bold uppercase tracking-[0.22em] text-black">
                    Submit Request
                    </button>
                </div>
                </div>
            </div>
        </div>
    </StadiumBg>

  );
}
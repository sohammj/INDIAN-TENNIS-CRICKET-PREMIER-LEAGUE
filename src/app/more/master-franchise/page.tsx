import { StadiumBg } from "@/components/ui/stadium-bg";

export default function MasterFranchisePage() {
  return (
    <StadiumBg overlay="light">
      <div className="min-h-screen flex flex-col pt-24">
        
        <div className="flex-1 section-shell section-space">
          <div className="section-label">Partnership</div>

          <h1 className="section-title">Master Franchise</h1>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="glow-card p-6">
              <div className="ui-font text-xl font-bold uppercase text-[#7fb800]">
                Why Partner
              </div>
              <p className="mt-4 text-sm leading-7 text-black/65">
                Organise local tournaments, grow regional engagement, and build a
                branded competitive structure under the ITCPL ecosystem.
              </p>
            </div>

            <div className="glow-card p-6">
              <div className="ui-font text-xl font-bold uppercase text-[#7fb800]">
                Request Form
              </div>

              <div className="mt-5 grid gap-4">
                <input
                  placeholder="Organisation / Group"
                  className="rounded-xl border border-black/10 bg-white px-4 py-3 text-black outline-none placeholder:text-black/35"
                />

                <input
                  placeholder="Contact Person"
                  className="rounded-xl border border-black/10 bg-white px-4 py-3 text-black outline-none placeholder:text-black/35"
                />

                <input
                  placeholder="City / Region"
                  className="rounded-xl border border-black/10 bg-white px-4 py-3 text-black outline-none placeholder:text-black/35"
                />

                <textarea
                  placeholder="Tell us about your proposal"
                  rows={5}
                  className="rounded-xl border border-black/10 bg-white px-4 py-3 text-black outline-none placeholder:text-black/35"
                />

                <button className="ui-font w-fit rounded-full bg-[#c8ff00] px-5 py-3 text-sm font-bold uppercase tracking-[0.22em] text-black hover:scale-[1.02] transition">
                  Submit Request
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </StadiumBg>
  );
}
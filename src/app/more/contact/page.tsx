import { StadiumBg } from "@/components/ui/stadium-bg";

export default function ContactPage() {
  return (
    <StadiumBg overlay="light">
      <div className="min-h-screen flex flex-col pt-24">
        <div className="flex-1 section-shell section-space">
          <div className="section-label">Support & Inquiry</div>
          <h1 className="section-title">Contact Us</h1>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="glow-card p-6">
              <div className="ui-font text-xl font-bold uppercase text-[#7fb800]">
                FAQ
              </div>

              <div className="mt-5 space-y-4 text-sm text-black/65">
                <p>
                  <strong className="text-black">How do I register?</strong>
                  <br />
                  Create an account and choose an open tournament.
                </p>
                <p>
                  <strong className="text-black">Can I view live matches?</strong>
                  <br />
                  Yes, from the Match Center.
                </p>
                <p>
                  <strong className="text-black">How do rankings work?</strong>
                  <br />
                  They are based on accumulated points across matches.
                </p>
              </div>
            </div>

            <div className="glow-card p-6">
              <div className="ui-font text-xl font-bold uppercase text-[#7fb800]">
                Inquiry Form
              </div>

              <div className="mt-5 grid gap-4">
                <input
                  placeholder="Full Name"
                  className="rounded-xl border border-black/10 bg-white px-4 py-3 text-black outline-none placeholder:text-black/35"
                />
                <input
                  placeholder="Email"
                  className="rounded-xl border border-black/10 bg-white px-4 py-3 text-black outline-none placeholder:text-black/35"
                />
                <input
                  placeholder="Phone"
                  className="rounded-xl border border-black/10 bg-white px-4 py-3 text-black outline-none placeholder:text-black/35"
                />
                <textarea
                  placeholder="Message"
                  rows={5}
                  className="rounded-xl border border-black/10 bg-white px-4 py-3 text-black outline-none placeholder:text-black/35"
                />
                <button className="ui-font w-fit rounded-full bg-[#c8ff00] px-5 py-3 text-sm font-bold uppercase tracking-[0.22em] text-black">
                  Send Inquiry
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StadiumBg>
  );
}
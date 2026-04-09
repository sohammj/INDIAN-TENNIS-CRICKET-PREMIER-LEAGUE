import { StadiumBg } from "@/components/ui/stadium-bg";
export default function ContactPage() {
  return (
    <StadiumBg overlay="dark">
        <div className="section-shell section-space">
            <div className="section-label">Support & Inquiry</div>
            <h1 className="section-title">Contact Us</h1>

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
                <div className="glow-card p-6">
                <div className="ui-font text-xl font-bold uppercase text-[var(--flame)]">FAQ</div>
                <div className="mt-5 space-y-4 text-sm text-white/65">
                    <p><strong className="text-white">How do I register?</strong><br />Create an account and choose an open tournament.</p>
                    <p><strong className="text-white">Can I view live matches?</strong><br />Yes, from the Match Center.</p>
                    <p><strong className="text-white">How do rankings work?</strong><br />They are based on accumulated points across matches.</p>
                </div>
                </div>

                <div className="glow-card p-6">
                <div className="ui-font text-xl font-bold uppercase text-[var(--flame)]">Inquiry Form</div>
                <div className="mt-5 grid gap-4">
                    <input placeholder="Full Name" className="border border-white/10 bg-black/40 px-4 py-3 outline-none" />
                    <input placeholder="Email" className="border border-white/10 bg-black/40 px-4 py-3 outline-none" />
                    <input placeholder="Phone" className="border border-white/10 bg-black/40 px-4 py-3 outline-none" />
                    <textarea placeholder="Message" rows={5} className="border border-white/10 bg-black/40 px-4 py-3 outline-none" />
                    <button className="ui-font w-fit bg-[var(--flame)] px-5 py-3 text-sm font-bold uppercase tracking-[0.22em] text-black">
                    Send Inquiry
                    </button>
                </div>
                </div>
            </div>
        </div>
    </StadiumBg>
  );
}
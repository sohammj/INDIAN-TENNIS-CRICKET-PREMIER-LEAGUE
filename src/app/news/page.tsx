import { news } from "@/lib/data";
import { StadiumBg } from "@/components/ui/stadium-bg";

export default function NewsPage() {
  return (
    <StadiumBg overlay="dark">
      <div className="section-shell section-space">
        <div className="section-label">External Coverage</div>
        <h1 className="section-title">
          News <span className="hl">Section</span>
        </h1>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {news.map((item) => (
            <a key={item.title} href="#" className="glow-card block p-6">
              <div className="mono-font text-[10px] uppercase tracking-[0.2em] text-[var(--flame)]">
                {item.source}
              </div>
              <div className="ui-font mt-3 text-lg font-bold uppercase">{item.title}</div>
              <p className="mt-3 text-sm text-white/55">{item.description}</p>
            </a>
          ))}
        </div>
      </div>
    </StadiumBg>
  );
}
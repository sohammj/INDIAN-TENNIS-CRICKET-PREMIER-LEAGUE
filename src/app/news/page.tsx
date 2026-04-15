import { news } from "@/lib/data";
import { StadiumBg } from "@/components/ui/stadium-bg";

export default function NewsPage() {
  return (
    <StadiumBg overlay="light">
      <div className="min-h-screen flex flex-col pt-24">
        
        <div className="flex-1 section-shell section-space">
          <div className="section-label">External Coverage</div>

          <h1 className="section-title">
            News <span className="hl">Section</span>
          </h1>

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {news.map((item) => (
              <a
                key={item.title}
                href="#"
                className="glow-card block p-6 transition hover:-translate-y-1"
              >
                <div className="mono-font text-[10px] uppercase tracking-[0.2em] text-[#7fb800]">
                  {item.source}
                </div>

                <div className="ui-font mt-3 text-lg font-bold uppercase text-black">
                  {item.title}
                </div>

                <p className="mt-3 text-sm text-black/55">
                  {item.description}
                </p>
              </a>
            ))}
          </div>
        </div>

      </div>
    </StadiumBg>
  );
}
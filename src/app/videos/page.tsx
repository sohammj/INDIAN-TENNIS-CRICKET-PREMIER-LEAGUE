import { videos } from "@/lib/data";
import { StadiumBg } from "@/components/ui/stadium-bg";

export default function VideosPage() {
  return (
    <StadiumBg overlay="light">
      <div className="min-h-screen flex flex-col pt-24">
        
        {/* this makes content stretch */}
        <div className="flex-1 section-shell section-space">
          <div className="section-label">YouTube Gallery</div>

          <h1 className="section-title">
            Videos <span className="hl">Section</span>
          </h1>

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {videos.map((video) => (
              <div key={video.title} className="glow-card overflow-hidden">
                <div className="aspect-video">
                  <iframe
                    className="h-full w-full"
                    src={`https://www.youtube.com/embed/${video.youtubeId}`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>

                <div className="p-5">
                  <div className="mono-font text-[10px] uppercase tracking-[0.2em] text-black/50">
                    {video.category}
                  </div>

                  <div className="ui-font mt-2 text-lg font-bold uppercase text-black">
                    {video.title}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </StadiumBg>
  );
}
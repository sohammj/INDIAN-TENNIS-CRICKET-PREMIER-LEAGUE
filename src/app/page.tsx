// import { Hero } from "@/components/home/hero";
// import {
//   HomeTicker,
//   MatchPreviewSection,
//   RankingsPreviewSection,
//   TeamsPreviewSection,
//   VideosNewsMoreSection,
// } from "@/components/home/home-sections";

// export default function HomePage() {
//   return (
//     <>
//       <Hero />
//       <HomeTicker />
//       <MatchPreviewSection />
//       <RankingsPreviewSection />
//       <TeamsPreviewSection />
//       <VideosNewsMoreSection />
//     </>
//   );
// }

import { Hero } from "@/components/home/hero";
import {
  HomeTicker,
  MatchPreviewSection,
  RankingsPreviewSection,
  TeamsPreviewSection,
  VideosNewsMoreSection,
} from "@/components/home/home-sections";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export default function HomePage() {
  return (
    <>
      <Hero />
      <HomeTicker />

      <ScrollReveal>
        <MatchPreviewSection />
      </ScrollReveal>

      <ScrollReveal delay={0.05}>
        <RankingsPreviewSection />
      </ScrollReveal>

      <ScrollReveal delay={0.08}>
        <TeamsPreviewSection />
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <VideosNewsMoreSection />
      </ScrollReveal>
    </>
  );
}
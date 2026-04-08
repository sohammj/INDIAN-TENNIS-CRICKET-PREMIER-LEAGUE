import { Hero } from "@/components/home/hero";
import {
  HomeTicker,
  MatchPreviewSection,
  RankingsPreviewSection,
  TeamsPreviewSection,
  VideosNewsMoreSection,
} from "@/components/home/home-sections";

export default function HomePage() {
  return (
    <>
      <Hero />
      <HomeTicker />
      <MatchPreviewSection />
      <RankingsPreviewSection />
      <TeamsPreviewSection />
      <VideosNewsMoreSection />
    </>
  );
}
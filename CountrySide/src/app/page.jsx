"use client";

import { PopularTopics } from "../components/PopularTopics";
import { HeroSection } from "../components/HeroSection";
import { PopularPage } from "../components/PopularPage";
import { LearnByTopic } from "../components/LearnByTopic";
import { CarouselContainer } from "../components/CarouselContainer";
import { ScrollToTopButton } from "../components/ScrollToTopButton";

export default function Home() {
  return (
    <div className="md:px-40 px-10 py-20">
      <HeroSection />
      <PopularPage />
      <PopularTopics />
      <LearnByTopic />
      <CarouselContainer />
      <ScrollToTopButton />
    </div>
  );
}

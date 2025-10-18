import { useRef, useState } from "react";
import video from "../public/assets/hero-video.mp4";
import { PIcon } from "@porsche-design-system/components-react";

const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const toggleVideo = () => {
    if (!videoRef.current) return;
    if (isPaused) videoRef.current.play();
    else videoRef.current.pause();
    setIsPaused(!isPaused);
  };

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background video */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover brightness-[60%]"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        src={video}
      />

      {/* Gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

      {/* Content */}
      <div className="relative flex flex-col justify-center h-full px-6 md:px-20 text-white select-none">
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-6xl mb-4 leading-tight">
            Ace the exam.
          </h1>
          <p className="text-lg md:text-md text-gray-200 mb-10">
            The number one platform to practice for the <br /> Georgian 2025
            theory exam.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="cursor-pointer px-6 md:px-8 py-3 rounded-md border border-white text-white bg-transparent hover:bg-white/10 hover:backdrop-blur-md hover:border-white/60 transition-all duration-300">
              Start learning
            </button>
            <button className="cursor-pointer px-6 md:px-8 py-3 rounded-md border border-white text-white bg-transparent hover:bg-white/10 hover:backdrop-blur-md hover:border-white/60 transition-all duration-300">
              Take the exam
            </button>
          </div>
        </div>
      </div>

      {/* Pause/Play button */}
      <button
        onClick={toggleVideo}
        className="cursor-pointer absolute bottom-6 right-6 z-20 backdrop-blur-md border border-white rounded-md p-3 text-white hover:bg-black/60 transition"
        aria-label={isPaused ? "Play video" : "Pause video"}
      >
        {isPaused ? (
          <PIcon name="play" color="contrast-low" size="medium" />
        ) : (
          <PIcon name="pause" color="contrast-low" size="medium" />
        )}
      </button>
    </section>
  );
};

export default HeroSection;

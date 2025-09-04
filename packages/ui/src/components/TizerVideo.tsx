"use client";

import { Skeleton } from "@ezlegin/ui/components/ui/skeleton";
import { Play } from "lucide-react";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";

const ReactPlayer = dynamic(() => import("react-player"), {
  ssr: false,
});

const TizerVideo = ({ url }: { url: string }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [playing, setPlaying] = useState(false);
  const playerRef = useRef(null);

  return (
    <div className="relative overflow-hidden w-full max-w-3xl mx-auto rounded-lg aspect-video">
      {isLoading && <Skeleton className="absolute inset-0 w-full h-full" />}

      <ReactPlayer
        ref={playerRef}
        url={url}
        playing={playing}
        controls={playing}
        width="100%"
        height="100%"
        className="rounded-lg"
        onReady={() => setIsLoading(false)}
      />

      {!playing && (
        <button
          className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-10 group"
          onClick={() => setPlaying(true)}
        >
          <div className="bg-black border border-muted-foreground hover:opacity-80 opacity-70 rounded-full flex items-center justify-center gap-2 px-6 py-3 shadow-lg group-hover:scale-[1.02] transition">
            <Play size={19} />
            <span>Play Teaser</span>
          </div>
        </button>
      )}
    </div>
  );
};

export default TizerVideo;

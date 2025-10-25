"use client";

import React, { useEffect, useState } from "react";
import Plyr, { PlyrOptions, PlyrSource } from "plyr-react";
import "plyr-react/plyr.css";
import { Skeleton } from "@ezlegin/ui/components/ui/skeleton";

interface VideoProps {
  src: string;
  subtitleSrc?: string;
  poster?: string;
}

const Video: React.FC<VideoProps> = ({ src, poster, subtitleSrc }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const plyrProps: {
    source: PlyrSource;
    options: PlyrOptions;
  } = {
    source: {
      type: "video",
      poster,
      sources: [
        {
          src,
          type: "video/mp4",
        },
      ],
      tracks: subtitleSrc
        ? [
            {
              kind: "captions",
              label: "English",
              src: subtitleSrc,
              srcLang: "en",
              default: true,
            },
          ]
        : [],
    },
    options: {
      speed: {
        selected: 1,
        options: [0.75, 1, 1.5, 2],
      },
      controls: [
        "play-large",
        "play",
        "progress",
        "current-time",
        "mute",
        "volume",
        "settings",
        "fullscreen",
      ],
      settings: ["quality", "speed", "captions"],
      autoplay: false,
    },
  };

  return (
    <div className="mx-auto rounded-md overflow-hidden">
      <div className="relative aspect-video bg-black">
        {isLoading && (
          <div className="absolute inset-0 z-10">
            <Skeleton />
          </div>
        )}
        {isMounted && (
          <div
            className="absolute inset-0"
            onLoadedData={() => setIsLoading(false)}
          >
            <Plyr {...plyrProps} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Video;

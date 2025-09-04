import { alirezaEzlegniPodcast } from "@/public";
import Image from "next/image";
import React from "react";

const VoiceoverSection = () => {
  return (
    <div className="p-28">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <Image
            alt="Alireza Ezlegini"
            src={alirezaEzlegniPodcast}
            width={300}
            height={300}
          />
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default VoiceoverSection;

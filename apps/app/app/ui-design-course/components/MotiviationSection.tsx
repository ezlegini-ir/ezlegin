import AnimatedTitle from "@/components/animations/AnimatedTitle";
import { alirezaEzlegniPointing } from "@/public";
import Image from "next/image";
import React from "react";

const MotiviationSection = () => {
  return (
    <div className="p-28 max-w-screen-2xl mx-auto">
      <div className="flex items-center gap-10">
        <div className="w-1/3">
          <Image
            alt="Alireza Ezlegini"
            src={alirezaEzlegniPointing}
            width={400}
            height={400}
            className="rounded-full mb-8"
          />
        </div>

        <div className="space-y-6 w-2/3">
          <AnimatedTitle
            textDir="LEFT"
            title="You Can Make it, As I did 14 years ago!"
            highlight="You Can Make it"
          />
          <p className="text-muted-foreground">
            <span className="text-2xl">"</span>
            <span>{motivationText}</span>
            <span className="text-2xl">"</span>
          </p>

          <div>
            <p>Alireza Ezlegini</p>
            <p className="text-muted-foreground text-xs">
              Senior Graphic Designer & Developer
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MotiviationSection;

const motivationText =
  "I’ve put all my effort into creating this page to introduce you to the best UI design course (YES, I'm a developer too), a project that took over 7 months to create and release. But in reality, it’s taken me more than 14 years to acquire the knowledge that this course offers. This course is the result of all the experiences and challenges I’ve faced in the design industry over the years. All those years have been filled with valuable lessons and experiences that I now want to share with you. I hope this course helps you kickstart your career and elevate your skills to the level you’ve always dreamed of. Start here, and move forward — nothing is impossible when you have both knowledge and perseverance.";

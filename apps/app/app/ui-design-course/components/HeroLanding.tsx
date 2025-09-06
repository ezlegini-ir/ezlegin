import React from "react";
import CourseTitle from "./CourseTitle";
import { Button } from "@ezlegin/ui/components/ui/button";
import { ArrowDown } from "lucide-react";
import TizerVideo from "@ezlegin/ui/components/TizerVideo";

interface Props {
  courseSummary: string;
}

const HeroLanding = ({ courseSummary }: Props) => {
  return (
    <div className="space-y-10 px-4">
      <div className="space-y-3 w-full">
        <CourseTitle title="UI Design" summery={courseSummary} />
        <div className="flex justify-center gap-3">
          <a href="#journey">
            <Button variant={"outline"}>
              Course Journey <ArrowDown />
            </Button>
          </a>
          <a href="#enroll">
            <Button variant={"indigo"}>
              Enroll Now <ArrowDown />
            </Button>
          </a>
        </div>
      </div>

      <TizerVideo url="https://dl.igraphical.ir/Courses/ui-design/tizer.mp4" />
    </div>
  );
};

export default HeroLanding;

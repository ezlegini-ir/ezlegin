import { alirezaEzlegini } from "@/public";
import Avatar from "@ezlegin/ui/components/Avatar";
import { Badge } from "@ezlegin/ui/components/ui/badge";
import { Check } from "lucide-react";
import React from "react";

const CourseLearnsInCourse = ({
  learnsInCourse,
}: {
  learnsInCourse: string[];
}) => {
  return (
    <div className="space-y-3">
      <h3 className="text-xl font-semibold">You learn in this course:</h3>

      <div className="md:columns-2  space-y-3">
        {learnsInCourse.map((item, index) => (
          <div key={index} className="flex items-center gap-3">
            <Badge
              variant={"green"}
              className="w-7 h-7 rounded-full flex items-center justify-center p-1.5"
            >
              <Check strokeWidth={3} />
            </Badge>
            <div className="text-muted-foreground">{item}</div>
          </div>
        ))}
      </div>

      <div className="flex gap-2 items-center">
        <Avatar src={alirezaEzlegini} size={28} />
        <p>"See? I meant it when I said complete course! 🚀😎"</p>
      </div>
    </div>
  );
};

export default CourseLearnsInCourse;

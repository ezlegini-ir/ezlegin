"use client";

import ReadOnlyEditor from "@ezlegin/editor/ReadOnlyEditor";
import React from "react";

interface CourseDescriptionProps {
  content: string;
}

const CourseDescription: React.FC<CourseDescriptionProps> = ({ content }) => {
  return (
    <div className="space-y-3">
      <h3 className="text-xl font-semibold mb-3">About this course</h3>
      <div>
        <ReadOnlyEditor content={content} />
      </div>
    </div>
  );
};

export default CourseDescription;

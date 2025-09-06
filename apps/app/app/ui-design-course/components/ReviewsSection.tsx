import CourseReviews from "./CourseReviews";
import AnimatedTitle from "@/components/animations/AnimatedTitle";
import {
  squarePatternSquare,
  studentProfile1,
  studentProfile2,
  studentProfile3,
  studentProfile4,
  studentProfile5,
  studentProfile6,
  studentProfile7,
  studentProfile8,
  studentProfile9,
} from "@/public";
import Image from "next/image";
import React from "react";

const ReviewsSection = () => {
  return (
    <div className="px-4 md:px-28 py-28 space-y-16 relative">
      <div className="pointer-events-none absolute -right-36 top-1/2 -translate-y-1/2 h-[420px] w-[420px] bg-primary/30 rounded-full blur-[120px]" />
      <Image
        alt=""
        src={squarePatternSquare}
        width={320}
        height={320}
        className="opacity-10 absolute -right-36 top-1/2 -translate-y-1/2  scale-125 pointer-events-none select-none"
      />
      <div className="pointer-events-none absolute -left-36 top-1/2 -translate-y-1/2 h-[420px] w-[420px] bg-primary/30 rounded-full blur-[120px]" />
      <Image
        alt=""
        src={squarePatternSquare}
        width={320}
        height={320}
        className="opacity-10 absolute -left-36 top-1/2 -translate-y-1/2  scale-125 pointer-events-none select-none"
      />

      <AnimatedTitle
        title="From Beginners to Designers"
        highlight="Designers"
        subtitle="Hear how students transformed their skills with Ezlegin."
      />

      <div className="max-w-screen-xl mx-auto">
        <CourseReviews reviews={reviews} />
      </div>
    </div>
  );
};

export default ReviewsSection;
const reviews = [
  {
    name: "Sophia Martinez",
    picture: studentProfile1,
    rating: 5,
    review:
      "I had tried YouTube tutorials before, but nothing clicked until this course. The Riala project gave me a real sense of how designers work in teams. It’s not just theory — it’s like being part of a product team for a few weeks. Now, when I look at job posts, I actually feel ready to apply.",
    date: "2023-02-14",
  },
  {
    name: "Liam Johnson",
    picture: studentProfile2,
    rating: 4,
    review:
      "Very solid structure. The basics were easy to follow and I loved the UI fundamentals section. Personally, I hoped for even more complex prototyping examples, but for someone entering the field, this is perfect. Would recommend without hesitation.",
    date: "2022-11-20",
  },
  {
    name: "Emily Chen",
    picture: studentProfile3,
    rating: 5,
    review:
      "Hands down the best course I’ve ever purchased. Everything builds step by step, and the way the lessons flow is so natural. By the time I finished, I had a full portfolio project that I actually show to clients. If you want to break into UI, this is worth every dollar.",
    date: "2024-01-05",
  },
  {
    name: "Noah Smith",
    picture: studentProfile4,
    rating: 5,
    review:
      "Before this course, I barely knew how to use frames in Figma. Now I’ve designed a full app and a responsive website. The best part? I actually enjoyed the process because the instructions are clear and motivating. I can honestly say this course changed my career path.",
    date: "2023-07-11",
  },
  {
    name: "Benjamin Lee",
    picture: studentProfile9,
    rating: 5,
    review:
      "This is a long one, but I want to explain: I started the course just curious, with zero design background. By chapter 5 I was hooked. By chapter 9, I was redesigning my friend’s startup app. And now, just 6 months later, I’m working freelance with two paying clients. That’s wild. This course gave me a career shift I didn’t think was possible.",
    date: "2025-08-29",
  },
  {
    name: "James Anderson",
    picture: studentProfile6,
    rating: 5,
    review:
      "The support system is unlike anything I’ve seen in other courses. I sent multiple questions through the panel and always got real, detailed replies, not just one-liners. That gave me confidence to keep moving when I got stuck. It feels more like a mentorship than just a course.",
    date: "2023-10-09",
  },
  {
    name: "Mia Rodriguez",
    picture: studentProfile7,
    rating: 5,
    review:
      "Design systems scared me before, but now I build them from scratch. This section alone doubled my freelance rates. The course is practical, fun, and full of tips that you can immediately apply to real jobs.",
    date: "2025-04-18",
  },
  {
    name: "Wei Zhang",
    picture: studentProfile8,
    rating: 4,
    review:
      "Some lessons are pretty dense, and I had to rewatch them, but that’s not really a bad thing. It just means the material is rich. Overall, I learned more here in two months than in an entire semester of design school.",
    date: "2023-01-27",
  },
  {
    name: "Aria Patel",
    picture: studentProfile5,
    rating: 4,
    review:
      "Short review here: Typography + color lessons = game changer. My designs finally look polished instead of amateur. Worth it for that alone.",
    date: "2022-12-03",
  },
];

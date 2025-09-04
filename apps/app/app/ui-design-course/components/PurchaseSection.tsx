import { CourseType } from "@/app/(HOME)/courses/[slug]/components/CourseContent";
import CourseIncludes, {
  CourseIncludesTypes,
} from "@/app/(HOME)/courses/[slug]/components/CourseIncludes";
import CourseRegister from "@/app/(HOME)/courses/[slug]/components/CourseSidebar";
import AnimatedTitle from "@/components/animations/AnimatedTitle";
import { squarePatternSquare } from "@/public";
import { formatDuration } from "@ezlegin/utils";
import {
  Award,
  FileText,
  LifeBuoy,
  MessageCircle,
  TvMinimalPlay,
  Users,
} from "lucide-react";
import Image from "next/image";

interface Props {
  course: CourseType;
}

const PurchaseSection = ({ course }: Props) => {
  const duration = formatDuration(course.duration);
  const seasons = course.curriculum.length;
  const lessons = course.curriculum.reduce(
    (acc, curr) => acc + curr.lessons.filter((l) => l.type === "VIDEO").length,
    0
  );

  const courseIncludes: CourseIncludesTypes[] = [
    {
      label: `${duration}+ content`,
      icon: TvMinimalPlay,
      iconColor: "text-primary",
    },
    {
      label: `${seasons} Seasons - ${lessons} Lessons`,
      icon: FileText,
      iconColor: "text-foreground",
    },
    {
      label: `Includes certificate`,
      icon: Award,
      iconColor: "text-yellow-400",
    },
    {
      label: `Unlimited & Free support`,
      icon: LifeBuoy,
      iconColor: "text-cyan-400",
    },
    {
      label: `Direct chat with tutor`,
      icon: MessageCircle,
      iconColor: "text-pink-400",
    },
    {
      label: `Lifetime & Limitless Access`,
      icon: Users,
      iconColor: "text-green-400",
    },
  ];

  return (
    <div id="enroll" className="py-28  border-b border-t border-muted relative">
      <div className="pointer-events-none absolute -right-36 top-1/2 -translate-y-1/2 h-[420px] w-[420px] bg-indigo-500/30 rounded-full blur-[120px]" />
      <Image
        alt=""
        src={squarePatternSquare}
        width={320}
        height={320}
        className="opacity-10 absolute -right-36 top-1/2 -translate-y-1/2  scale-125 pointer-events-none select-none"
      />
      <div className="pointer-events-none absolute -left-36 top-1/2 -translate-y-1/2 h-[420px] w-[420px] bg-indigo-500/30 rounded-full blur-[120px]" />
      <Image
        alt=""
        src={squarePatternSquare}
        width={320}
        height={320}
        className="opacity-10 absolute -left-36 top-1/2 -translate-y-1/2  scale-125 pointer-events-none select-none"
      />

      <div className="mx-auto space-y-8">
        <AnimatedTitle
          title="Start Your UI/UX Journey Today"
          highlight="UI/UX Journey"
          subtitle="Enroll now and get lifetime access, unlimited support, and a certificate to showcase your skills."
        />

        <div className="flex gap-10 justify-center">
          <p className="flex flex-col items-center">
            <span className="text-3xl font-semibold title-gradient">
              +2,500
            </span>
            <span className="text-muted-foreground text-sm">Student</span>
          </p>

          <p className="flex flex-col items-center">
            <span className="text-3xl font-semibold bg-gradient-to-r from-orange-400  to-orange-600 bg-clip-text text-transparent">
              4.83
            </span>
            <span className="text-muted-foreground text-sm">Rating</span>
          </p>
        </div>

        <div className="space-y-3 max-w-screen-sm mx-auto">
          <CourseRegister course={course} />

          <CourseIncludes courseIncludes={courseIncludes} />
        </div>
      </div>
    </div>
  );
};

export default PurchaseSection;
{
  /* <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="space-y-4">
              <Card className="p-5 flex items-center gap-3 border border-slate-800">
                <div className="">⭐ 4.9/5</div>
                <div className="text-sm text-muted-foreground">
                  1,200 reviews
                </div>
              </Card>
              <Card className="p-5 flex items-center gap-3 border border-slate-800">
                <div className="">👥 2,500+</div>
                <div className="text-sm text-muted-foreground">students</div>
              </Card>
            </div>
          </div>
          <div>
          </div>
        </div> */
}

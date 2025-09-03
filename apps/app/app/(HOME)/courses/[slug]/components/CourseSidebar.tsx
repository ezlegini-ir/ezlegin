import { getEnrollmentByUserIdAndCourseId } from "@/data/enrollment";
import { getSessionUser } from "@/data/user";
import Price from "@ezlegin/ui/components/Price";
import { Button } from "@ezlegin/ui/components/ui/button";
import { Card } from "@ezlegin/ui/components/ui/card";
import { formatDuration } from "@ezlegin/utils";
import {
  Award,
  FileText,
  LifeBuoy,
  MessageCircle,
  TvMinimalPlay,
  Users,
} from "lucide-react";
import Link from "next/link";
import { CourseType } from "./CourseContent";
import CourseIncludes, { CourseIncludesTypes } from "./CourseIncludes";
import CourseRegisterButton from "./CourseRegisterButton";

interface Props {
  course: CourseType;
}

const CourseSidebar = async ({ course }: Props) => {
  const userId = (await getSessionUser())?.id;
  const enrollment = await getEnrollmentByUserIdAndCourseId(
    userId || 0,
    course.id
  );

  const isUserEnrolled = !!enrollment;
  const classroomId = enrollment?.classroom?.id;

  const duration = formatDuration(course.duration);
  const seasons = course.curriculum.length;
  const lessons = course.curriculum.reduce(
    (acc, curr) => acc + curr.lessons.filter((l) => l.type === "VIDEO").length,
    0
  );

  const courseIncludes: CourseIncludesTypes[] = [
    {
      label: `${duration}+ hrs content`,
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
      label: `MessageCircle`,
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
    <div className="order-first md:order-last md:sticky top-16 self-start space-y-3 ">
      <Card className="p-5 space-y-6">
        {!isUserEnrolled && (
          <div className="flex justify-between items-center">
            <Price
              basePrice={course.basePrice}
              discount={!!course.discount}
              price={course.price}
            />
          </div>
        )}
        <CourseIncludes courseIncludes={courseIncludes} />
        {!isUserEnrolled ? (
          <div className="space-y-3">
            <CourseRegisterButton
              isPresale={course.status === "PRESALE"}
              releaseDate={course.releaseDate}
              classroomId={classroomId}
              isUserEnrolled={isUserEnrolled}
              basePrice={course.basePrice}
              discount={course.discount}
              price={course.price}
              courseId={course.id}
            />

            {/* <CashBackCard price={course.price} /> */}
          </div>
        ) : (
          <div>
            <Link href={`/classroom/${classroomId}`}>
              <Button variant={"lightBlue"} className="w-full">
                <TvMinimalPlay size={22} />
                Enter Classroom
              </Button>
            </Link>
          </div>
        )}
      </Card>

      <div className="grid grid-cols-2 gap-3">
        <Card className="p-3 flex items-center gap-3 border border-slate-800">
          <div className="text-sm">⭐ 4.9/5</div>
          <div className="text-xs text-muted-foreground">1,200 reviews</div>
        </Card>
        <Card className="p-3 flex items-center gap-3 border border-slate-800">
          <div className="text-sm">👥 2,500+</div>
          <div className="text-xs text-muted-foreground">students</div>
        </Card>
      </div>
    </div>
  );
};

export default CourseSidebar;

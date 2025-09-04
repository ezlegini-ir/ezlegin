import WideNavBar from "@/components/WideNavBar";
import { getSessionUser } from "@/data/user";
import { database } from "@ezlegin/database";
import TizerVideo from "@ezlegin/ui/components/TizerVideo";
import { notFound } from "next/navigation";
import CourseTitle from "./components/CourseTitle";
import Instractor from "./components/Instractor";
import LearningPath from "./components/LearningPath";
import PromiseSection from "./components/PromiseSection";
import ReviewsSection from "./components/ReviewsSection";

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ reviews: string }>;
}

const page = async ({ searchParams }: Props) => {
  const { reviews } = await searchParams;

  const course = await database.course.findUnique({
    where: { url: "ui-design-course" },
    include: {
      enrollment: {
        include: {
          classroom: true,
        },
      },
      image: true,
      review: {
        take: +(reviews || 8),
        orderBy: { id: "desc" },
        include: {
          user: true,
        },
      },
      curriculum: {
        include: {
          lessons: true,
        },
      },
      discount: true,
      gallery: {
        include: {
          image: true,
        },
      },
      tutor: {
        include: { image: true },
      },
      category: true,
      learn: true,
      prerequisite: true,
    },
  });

  if (!course) notFound();

  const user = await getSessionUser();

  return (
    <div>
      <div className="space-y-20 h-screen border-b border-muted pt-4">
        <div className="max-w-screen-xl mx-auto z-50">
          <WideNavBar user={user} />
        </div>

        <CourseTitle title="UI Design" summery={course?.summary} />

        <TizerVideo url="https://dl.igraphical.ir/Courses/ui-design/tizer.mp4" />
      </div>

      <LearningPath />

      <Instractor />

      <PromiseSection />

      <ReviewsSection />
    </div>
  );
};

export default page;

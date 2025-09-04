import CourseSidebar from "@/app/(HOME)/courses/[slug]/components/CourseSidebar";
import { database } from "@ezlegin/database";
import TizerVideo from "@ezlegin/ui/components/TizerVideo";
import { extractSummaryFromLexical } from "@ezlegin/utils";
import { BookOpen, Briefcase, CheckCircle, Users } from "lucide-react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import CourseAudienceItems, {
  courseContentItemsType,
} from "./components/CourseAudience";
import CourseCurriculum from "./components/CourseCurriculum";
import CourseDescription from "./components/CourseDescription";
import CourseTutor from "./components/CourseInstructor";
import CourseLearnsInCourse from "./components/CourseLearnsInCourse";
import CourseReviews from "./components/CourseReviews";
import CourseExercise from "./components/CourseSamples";
import CourseTitle from "../../../ui-design-course/components/CourseTitle";

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ reviews: string }>;
}

const getCourse = cache(async (slug: string, reviews?: string) => {
  const decodedSlug = decodeURIComponent(slug);

  return await database.course.findUnique({
    where: { url: decodedSlug },
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
});

const page = async ({ params, searchParams }: Props) => {
  const { slug } = await params;
  const { reviews } = await searchParams;

  const course = await getCourse(slug, reviews);

  if (!course) return notFound();

  const courseContentItems: courseContentItemsType[] = [
    { title: "Who is this course for?", content: course.audience, icon: Users },
    { title: "Course needs", content: course.audience, icon: CheckCircle },
    { title: "Job market", content: course.jobMarket, icon: Briefcase },
    {
      title: "Prerequisites",
      content: course.prerequisite.map((p) => p.value).join(" - "),
      icon: BookOpen,
    },
  ];

  return (
    <div className="flex flex-col gap-16 justify-center">
      <CourseTitle title="" summery="" />

      <TizerVideo url={course.tizerUrl} />

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-3">
          <CourseSidebar course={course} />
        </div>
        <div className="col-span-9 space-y-24">
          <CourseDescription content={course.description} />

          <CourseAudienceItems courseContentItems={courseContentItems} />

          <CourseLearnsInCourse
            learnsInCourse={course.learn.map((l) => l.value)}
          />

          <CourseCurriculum curriculums={course.curriculum} />

          <CourseReviews reviews={course.review} />

          <CourseExercise
            courseTitle="Hi"
            exercises={course.gallery?.image.map((g) => ({
              title: course.title,
              url: g.url,
            }))}
          />

          <CourseTutor tutor={course.tutor!} />
        </div>
      </div>
    </div>
  );
};

export default page;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const course = await getCourse(slug);
  if (!course) return {};

  const description = extractSummaryFromLexical(course.description).slice(
    0,
    120
  );

  return {
    title: `${course.title}`,
    description,
    openGraph: {
      title: course.title,
      description,
      images: [
        {
          url: course.image?.url || "/og-cover.png",
          width: 1200,
          height: 630,
          alt: course.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: course.title,
      description,
      images: [course.image?.url || "/og-cover.png"],
    },
  };
}

import CourseSidebar from "@/app/(HOME)/courses/[slug]/components/CourseSidebar";
import { alirezaEzlegini } from "@/public";
import { database } from "@ezlegin/database";
import Avatar from "@ezlegin/ui/components/Avatar";
import TizerVideo from "@ezlegin/ui/components/TizerVideo";
import { Badge } from "@ezlegin/ui/components/ui/badge";
import { Card } from "@ezlegin/ui/components/ui/card";
import { extractSummaryFromLexical } from "@ezlegin/utils";
import { BookOpen, Briefcase, Check, CheckCircle, Users } from "lucide-react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import CourseTitle from "./components/CourseTitle";
import CourseCurriculum from "./components/CourseCurriculum";
import CourseReviews from "./components/CourseReviews";
import CourseExercise from "./components/CourseSamples";
import CourseTutor from "./components/CourseInstructor";

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

  return (
    <div className="flex flex-col gap-16 justify-center">
      <CourseTitle title="" summery="" />

      <TizerVideo url="http://dl.igraphical.ir//Courses/ui-design/tizer.mp4" />

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-3">
          <CourseSidebar course={course} />
        </div>
        <div className="col-span-9 space-y-20">
          <div>
            <h3 className="text-xl font-semibold mb-3">About this course</h3>
            <p className="text-muted-foreground leading-relaxed">
              This course covers UI fundamentals and real product workflows.
              You’ll move from wireframes to polished interfaces, learn to build
              a design system, and ship interactive prototypes. Each module
              includes hands-on lessons, downloadable Figma files, and a final
              capstone project that you can use in your portfolio.
              <br />
              This course covers UI fundamentals and real product workflows.
              You’ll move from wireframes to polished interfaces, learn to build
              a design system, and ship interactive prototypes. Each module
              includes hands-on lessons, downloadable Figma files, and a final
              capstone project that you can use in your portfolio.This course
              covers UI fundamentals and real product workflows. You’ll move
              from wireframes to polished interfaces, learn to build a design
              system, and ship interactive prototypes. Each module includes
              hands-on lessons, downloadable Figma files, and a final capstone
              project that you can use in your portfolio.
              <br />
              <br />
              This course covers UI fundamentals and real product workflows.
              You’ll move from wireframes to polished interfaces, learn to build
              a design system, and ship interactive prototypes. Each module
              includes hands-on lessons, downloadable Figma files, and a final
              capstone project that you can use in your portfolio.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-xl font-semibold">You learn in this course:</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "UI design fundamentals from scratch",
                "Figma: From basics to advanced features",
                "Design systems & style guides",
                "Responsive design & grid systems",
                "Typography rules in UI",
                "Color theory & palettes for digital products",
                "Iconography & imagery best practices",
                "Wireframing & prototyping in Figma",
                "Creating reusable UI components",
                "Auto-layout & constraints in Figma",
                "Interactive prototypes & smart animations",
                "Redesigning bad UI examples (hands-on)",
                "Designing a clean login & signup flow",
                "Landing page UI case study",
                "Dashboard UI case study",
                "Mobile app design workflow",
                "Collaboration & handoff for developers",
                "Accessibility principles in UI design",
                "Exporting assets & preparing for dev",
                "Building a professional UI portfolio",
              ].map((f) => (
                <div key={f} className="flex items-center gap-3">
                  <Badge
                    variant={"green"}
                    className="w-7 h-7 rounded-full flex items-center justify-center p-1.5"
                  >
                    <Check strokeWidth={3} />
                  </Badge>
                  <div className="text-muted-foreground">{f}</div>
                </div>
              ))}

              <div className="flex gap-2 items-center">
                <Avatar src={alirezaEzlegini} size={28} />
                <p>"See? I meant it when I said complete course! 🚀😎"</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Audience */}
            <Card className="p-5 space-y-2">
              <div className="flex items-center gap-3">
                <Badge variant={"blue"} className="w-9 h-9 rounded-full p-2">
                  <Users />
                </Badge>
                <h4 className="font-semibold">Who is this course for?</h4>
              </div>
              <ul className="text-muted-foreground list-disc ml-5 space-y-1">
                {[
                  "Beginner designers who want a career in UI",
                  "Frontend devs who want to design better interfaces",
                  "Product people who need practical UI skills",
                ].map((i, idx) => (
                  <li key={idx}>{i}</li>
                ))}
              </ul>
            </Card>

            {/* Needs */}
            <Card className="p-5 space-y-2">
              <div className="flex items-center gap-3">
                <Badge variant={"blue"} className="w-9 h-9 rounded-full p-2">
                  <CheckCircle />
                </Badge>
                <h4 className="font-semibold">Course needs</h4>
              </div>
              <ul className="text-muted-foreground list-disc ml-5 space-y-1">
                {[
                  "A free Figma account (we use the web app)",
                  "Computer with modern browser",
                  "Willingness to practice & iterate",
                ].map((i, idx) => (
                  <li key={idx}>{i}</li>
                ))}
              </ul>
            </Card>

            {/* Job Market */}
            <Card className="p-5 space-y-2">
              <div className="flex items-center gap-3">
                <Badge variant={"blue"} className="w-9 h-9 rounded-full p-2">
                  <Briefcase />
                </Badge>
                <h4 className="font-semibold">Job market</h4>
              </div>
              <p className="text-muted-foreground">
                UI and product design roles are growing. With a strong
                portfolio, designers can earn entry to mid-level salaries and
                freelance income. This course focuses on practical outputs
                recruiters and clients look for.
              </p>
            </Card>

            {/* Prerequisites */}
            <Card className="p-5 space-y-2">
              <div className="flex items-center gap-3">
                <Badge variant={"blue"} className="w-9 h-9 rounded-full p-2">
                  <BookOpen />
                </Badge>
                <h4 className="font-semibold">Prerequisites</h4>
              </div>
              <ul className="text-muted-foreground list-disc ml-5 space-y-1">
                {[
                  "Basic computer literacy",
                  "No prior design experience required",
                ].map((i, idx) => (
                  <li key={idx}>{i}</li>
                ))}
              </ul>
            </Card>
          </div>

          <CourseCurriculum curriculums={course.curriculum} />

          <CourseReviews reviews={course.review} />

          <CourseExercise
            courseTitle="Hi"
            exercises={[
              {
                title: "hi",
                url: "https://dl.igraphical.ir/assets/igraph-logo.png",
              },
            ]}
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

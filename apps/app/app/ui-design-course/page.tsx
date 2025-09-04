import WideNavBar from "@/components/WideNavBar";
import { getSessionUser } from "@/data/user";
import { squarePatternSquare } from "@/public";
import { database } from "@ezlegin/database";
import TizerVideo from "@ezlegin/ui/components/TizerVideo";
import { Card } from "@ezlegin/ui/components/ui/card";
import Image from "next/image";
import { notFound } from "next/navigation";
import CourseTitle from "../(HOME)/courses/[slug]/components/CourseTitle";

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

      <div className="relative w-full h-screen p-10">
        <div className="pointer-events-none absolute -left-36 top-36 h-[420px] w-[420px] bg-violet-700/20 rounded-full blur-[120px]" />
        <div className="pointer-events-none absolute -left-36 top-36 h-[420px] w-[420px] bg-violet-700/20 rounded-full blur-[120px]" />
        <Image
          alt=""
          src={squarePatternSquare}
          width={320}
          height={320}
          className="opacity-10 absolute left-0 top-0 scale-125 pointer-events-none select-none"
        />

        <div className="pointer-events-none absolute -right-36 bottom-0 h-[420px] w-[420px] bg-green-700/20 rounded-full blur-[120px]" />
        <Image
          alt=""
          src={squarePatternSquare}
          width={320}
          height={320}
          className="opacity-10 absolute right-0 bottom-0 scale-125 pointer-events-none select-none"
        />

        <div className="space-y-20">
          <h2 className="text-center">
            What is <span className="title-gradient">Our Journey</span> in This
            Course?
          </h2>

          <div className="flex items-center gap-4 w-screen overflow-scroll">
            {roadMap.map((step, idx) => (
              <Card className="p-5 w-[350px]" key={idx}>
                <div className="relative flex items-center h-10">
                  <div className="h-10 w-10 bg-primary/20 rounded-full absolute top-0 left-0" />
                  <span className="pl-2">Step {idx + 1}</span>
                </div>
                <p>{step}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const roadMap = [
  "Start Learning",
  "Foundations of Product Design",
  "UI Design Fundamentals",
  "Color Theory",
  "Structuring UI",
  "Building Style Guide",
  "Design Systems",
  "Designing Application",
  "Designing Website",
  "Responsive Design",
  "Prototyping & Interactions",
  "Paid Figma",
  "Figma Files",
  "You Made It",
];

export default page;

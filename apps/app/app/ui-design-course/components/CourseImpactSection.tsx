import CourseAudienceItems from "@/app/(HOME)/courses/[slug]/components/CourseAudience";
import AnimatedTitle from "@/components/animations/AnimatedTitle";
import { BookOpen, Briefcase, CheckCircle, Users } from "lucide-react";

const CourseImpactSection = () => {
  return (
    <div className="space-y-20 p-28">
      <AnimatedTitle
        title="Who, Why, What Next"
        highlight="What Next"
        subtitle="Clear entry points, simple needs, and career outcomes."
      />

      <div className="max-w-screen-xl mx-auto">
        <CourseAudienceItems courseContentItems={courseContentItems} />
      </div>
    </div>
  );
};

export default CourseImpactSection;

const courseContentItems = [
  {
    title: "Course Needs",
    icon: CheckCircle,
    content: [
      "A computer or laptop with a modern browser",
      "A free Figma account (all lessons use the web app)",
      "Stable internet connection for lessons and downloads",
      "Willingness to practice and experiment on your own",
    ],
  },
  {
    title: "Prerequisites",
    icon: BookOpen,
    content: [
      "Basic computer literacy (navigating software, saving files, etc.)",
      "No prior design background required",
      "English reading ability (for Figma UI & resources)",
      "Curiosity and creativity are a plus",
    ],
  },
  {
    title: "Job Market & Career Outlook",
    icon: Briefcase,
    content: [
      "UI/UX designers are in high demand worldwide, with opportunities in startups, agencies, and freelance work.",
      "Build a portfolio-ready mobile app and website project.",
      "Hands-on skills with Figma, design systems, and prototyping.",
      "Ability to collaborate with developers and product teams.",
      "Career paths: UI Designer, Product Designer, UX/UI Specialist.",
    ],
  },
  {
    title: "Who Is This Course For?",
    icon: Users,
    content: [
      "Beginners who want to start a professional career in UI/UX design",
      "Frontend developers who want to design better interfaces",
      "Graphic designers looking to transition into digital design",
      "Product managers who want practical UI knowledge for working with design teams",
      "Freelancers aiming to expand services with app and web UI design",
    ],
  },
];

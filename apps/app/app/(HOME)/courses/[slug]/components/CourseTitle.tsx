import { Badge } from "@ezlegin/ui/components/ui/badge";

const CourseTitle = ({
  title,
  summery,
}: {
  title: string;
  summery: string;
}) => {
  return (
    <div className="space-y-3 max-w-2xl mx-auto flex items-center flex-col text-center">
      <Badge className="w-fit">Full Course · Project Based</Badge>
      <h1 className="text-3xl md:text-4xl font-extrabold">
        Complete{" "}
        <span className="text-indigo-400">UI Design Course (Figma)</span> From
        Basics to Advanced
      </h1>
      <p className="mt-3 text-muted-foreground">{summery}</p>
    </div>
  );
};

export default CourseTitle;

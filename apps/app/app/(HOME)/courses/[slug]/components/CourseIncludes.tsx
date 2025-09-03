import { LucideIcon } from "lucide-react";

export interface CourseIncludesTypes {
  label: string;
  icon: LucideIcon;
  iconColor: string;
}

interface Props {
  courseIncludes: CourseIncludesTypes[];
}

const CourseIncludes = ({ courseIncludes }: Props) => {
  return (
    <div>
      <ul className=" text-sm text-muted-foreground space-y-2.5">
        {courseIncludes.map((item, index) => (
          <li key={index} className="flex gap-3 items-center">
            <item.icon size={18} className={item.iconColor} />
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseIncludes;

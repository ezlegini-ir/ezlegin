import { Badge } from "@ezlegin/ui/components/ui/badge";
import { Card } from "@ezlegin/ui/components/ui/card";
import { LucideIcon, Users } from "lucide-react";
import React from "react";

export interface courseContentItemsType {
  title: string;
  content: string;
  icon: LucideIcon;
}

interface Props {
  courseContentItems: courseContentItemsType[];
}

const CourseAudienceItems = ({ courseContentItems }: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {courseContentItems?.map((item, idx) => (
        <Card key={idx} className="p-5 space-y-2">
          <div className="flex items-center gap-3">
            <Badge variant={"blue"} className="w-9 h-9 rounded-full p-2">
              <item.icon />
            </Badge>
            <h4 className="font-semibold">{item.title}</h4>
          </div>
          <pre className="text-muted-foreground">{item.content}</pre>
        </Card>
      ))}
    </div>
  );
};

export default CourseAudienceItems;

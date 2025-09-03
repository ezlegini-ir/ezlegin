import { tutorPlaceholder } from "@/public";
import { Image as ImageType, Tutor } from "@ezlegin/database";
import SocialsIcon from "@ezlegin/ui/components/SocialsIcon";
import {
  Card,
  CardContent,
  CardDescription,
} from "@ezlegin/ui/components/ui/card";
import Image from "next/image";

interface Props {
  tutor: Tutor & { image: ImageType | null };
}

const CourseTutor = ({ tutor }: Props) => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-3">You Learn From:</h2>
      <Card className="bg-none shadow-none">
        <CardContent className="py-4 flex flex-col md:flex-row items-center md:items-start flex-wrap md:flex-nowrap md:gap-5">
          <Image
            alt="tutor"
            src={tutor.image?.url || tutorPlaceholder}
            width={750}
            height={750}
            className="w-60 h-7w-60 object-cover"
          />

          <div className="mt-14 text-muted-foreground space-y-5 ">
            <div>
              <h3 className="text-foreground mb-1 text-2xl">{tutor.name}</h3>
              <div className="flex gap-2 items-stretch">
                <pre className="text-muted-foreground text-xs p-0">
                  {tutor.titles}
                </pre>
              </div>
            </div>

            <CardDescription>{tutor.bio}</CardDescription>

            <SocialsIcon />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseTutor;

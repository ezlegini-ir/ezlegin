import { alirezaEzlegniLooking } from "@/public";
import { Button } from "@ezlegin/ui/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const page = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <Image
          alt="Alireza Ezlegini"
          src={alirezaEzlegniLooking}
          width={450}
          height={450}
        />

        <div className="space-y-3 flex flex-col items-center ">
          <div>
            <h1>Alireza Ezlegini</h1>
            <p className="text-sm text-muted-foreground">
              Senior Web Designer & Developer
            </p>
          </div>

          <Link href={"/ui-design-course"}>
            <Button size={"lg"} variant={"indigo"} className="text-base">
              The Only UI Course You need!
            </Button>
          </Link>

          <p className="text-xs text-muted-foreground">
            I Know you may Expect more courses, But Ther is not! 😁
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;

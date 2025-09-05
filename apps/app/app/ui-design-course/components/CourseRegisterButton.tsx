"use client";

import { Discount } from "@ezlegin/database";
import Price from "@ezlegin/ui/components/Price";
import { Badge } from "@ezlegin/ui/components/ui/badge";
import { Button } from "@ezlegin/ui/components/ui/button";
import { formatJalaliDate } from "@ezlegin/utils";
import { TvMinimalPlay, UserRoundPlus } from "lucide-react";
import Link from "next/link";

const CourseRegisterButton = ({
  courseId,
  basePrice,
  discount,
  price,
  isUserEnrolled,
  classroomId,
  isPresale,
  releaseDate,
}: {
  courseId: number;
  basePrice: number;
  price: number;
  discount: Discount | null;
  isUserEnrolled: boolean;
  classroomId: string | undefined;
  isPresale: boolean;
  releaseDate: Date | null;
}) => {
  return (
    <>
      <div className="lg:hidden">
        <div className="card fixed bottom-0 rounded-br-none  rounded-bl-none left-1/2 -translate-x-1/2 px-4 w-full">
          {!isUserEnrolled ? (
            <div className="flex justify-between items-center">
              <div className="flex gap-3">
                <Link href={`/quick-cart/${courseId}`}>
                  <Button variant={isPresale ? "dark" : "default"}>
                    <UserRoundPlus size={20} />
                    {isPresale ? "پیش خرید" : "ثبت نام سریع"}
                  </Button>
                </Link>
              </div>

              <div>
                <Price
                  basePrice={basePrice}
                  discount={!!discount}
                  price={price}
                />
              </div>
            </div>
          ) : (
            <div>
              <Link href={`/classroom/${classroomId}`}>
                <Button variant={"lightBlue"} className="w-full">
                  <TvMinimalPlay size={22} />
                  Enter Classroom
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {!isUserEnrolled && (
        <div className="space-y-3 ">
          <div className="flex gap-3">
            <Link className="w-full" href={`/quick-cart/${courseId}`}>
              <Button
                size={"lg"}
                variant={isPresale ? "dark" : "indigo"}
                className="w-full hover:shadow-[0_0_80px_rgba(99,102,241,0.5)] transition-all text-base"
              >
                <UserRoundPlus className="scale-110" />
                {isPresale ? "Preenroll" : "Enroll Now"}
              </Button>
            </Link>

            {isPresale && releaseDate && (
              <Badge variant="blue" className="w-full gap-1">
                <span>Publish Date:</span>
                <span>{formatJalaliDate(releaseDate)}</span>
              </Badge>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CourseRegisterButton;

"use client";

import Avatar from "@ezlegin/ui/components/Avatar";
import { Card } from "@ezlegin/ui/components/ui/card";
import { formatDate } from "date-fns";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface Props {
  reviews: {
    name: string;
    picture: string;
    rating: number;
    review: string;
    date: string;
  }[];
}

const CourseReviews = ({ reviews }: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {reviews?.map((review, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.6 }}
        >
          <Card key={idx} className="p-5 space-y-3 mb-3 h-full">
            <p className="text-muted-foreground text-sm">{review.review}</p>
            <div className="flex gap-2">
              <Avatar src={review.picture} size={45} />

              <div>
                <span className="text-sm font-medium">{review.name}</span>

                <div className="flex gap-4 text-muted-foreground text-[10px] font-medium">
                  <span className="flex gap-1 items-center ">
                    {Array.from({ length: review.rating }).map((_, starIdx) => (
                      <Star
                        key={starIdx}
                        fill="#fb923c"
                        size={13}
                        className="text-orange-400"
                      />
                    ))}
                  </span>

                  <span className="flex gap-1 items-center ">
                    {formatDate(new Date(review.date), "yyyy/MM/dd")}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default CourseReviews;

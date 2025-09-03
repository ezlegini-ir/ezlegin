import { avatar } from "@/public";
import Avatar from "@ezlegin/ui/components/Avatar";
import { formatDate } from "date-fns";
import { Star } from "lucide-react";
import { ReviewType } from "./CourseReviews";

interface Props {
  review: ReviewType;
}

const ReviewCard = ({ review }: Props) => {
  return (
    <div className="border rounded-lg p-5 space-y-3 h-min mb-3">
      <p className=" text-sm">{review.content}</p>
      <div className="flex gap-2">
        <Avatar src={review.user.image || avatar} />

        <div>
          <span className="text-sm font-medium">{review.user.name}</span>

          <div className="flex gap-4 text-gray-400 text-[10px] font-medium">
            <span className="flex gap-1 items-center ">
              <Star size={13} className="text-orange-400" />
              {review.rate}
            </span>

            <span className="flex gap-1 items-center ">
              {formatDate(review.createdAt, "yyyy/MM/dd")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;

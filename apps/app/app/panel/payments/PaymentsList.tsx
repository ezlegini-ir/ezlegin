import Table from "@ezlegin/ui/components/Table";
import { Badge } from "@ezlegin/ui/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@ezlegin/ui/components/ui/dialog";
import { TableCell, TableRow } from "@ezlegin/ui/components/ui/table";
import {
  Course,
  Enrollment,
  Image as ImageType,
  Payment,
} from "@ezlegin/database";
import { Eye } from "lucide-react";
import CardBox from "@ezlegin/ui/components/CardBox";
import Image from "next/image";
import { placeHolder } from "@/public";
import { formatJalaliDate } from "@ezlegin/utils";

interface PaymentType extends Payment {
  enrollment: (Enrollment & { course: Course & { image: ImageType | null } })[];
}

interface Props {
  payments: PaymentType[];
}

const PaymentsList = ({ payments }: Props) => {
  const renderRows = (payment: PaymentType) => {
    const courses = payment.enrollment.map((item) => item.course);

    const success = payment.status === "SUCCESS";
    const pending = payment.status === "PENDING";
    const canceled = payment.status === "CANCELED";

    const status = success ? (
      <Badge
        className="w-[90px] text-nowrap flex justify-center font-medium"
        variant={"green"}
      >
        موفق
      </Badge>
    ) : pending ? (
      <Badge
        className="w-[90px] text-nowrap flex justify-center font-medium"
        variant={"orange"}
      >
        در انتظار پرداخت
      </Badge>
    ) : canceled ? (
      <Badge
        className="w-[90px] text-nowrap flex justify-center font-medium"
        variant={"gray"}
      >
        لغو شده
      </Badge>
    ) : (
      <Badge
        className="w-[90px] text-nowrap flex justify-center font-medium"
        variant={"red"}
      >
        ناموفق
      </Badge>
    );

    return (
      <TableRow key={payment.id}>
        <TableCell>{payment.id}</TableCell>
        <TableCell>
          {formatJalaliDate(payment.createdAt, { withTime: true })}
        </TableCell>
        <TableCell>{status}</TableCell>
        <TableCell>{payment.discountAmount?.toLocaleString("en-US")}</TableCell>
        <TableCell className="py-4">
          {payment.total.toLocaleString("en-US")}
        </TableCell>
        <TableCell className="text-left py-2">
          <Dialog>
            <DialogTrigger>
              <Eye
                size={33}
                className="text-gray-500 group-hover:text-primary scale-90 bg-slate-100 p-2 rounded-full"
              />
            </DialogTrigger>
            <DialogContent>
              <DialogTitle className="text-base">
                دوره های خریداری شده
              </DialogTitle>
              {courses.map((course, index) => (
                <div
                  key={index}
                  className="bg-slate-100 p-2 rounded-sm flex items-center gap-2 mb-3"
                >
                  <Image
                    alt=""
                    src={course.image?.url || placeHolder}
                    width={80}
                    height={80}
                    className="rounded-sm"
                  />
                  <span className="text-sm">{course.title}</span>
                </div>
              ))}
            </DialogContent>
          </Dialog>
        </TableCell>
      </TableRow>
    );
  };

  return (
    <CardBox title="پرداخت ها" className="min-h-[350px]">
      <Table
        columns={columns}
        data={payments}
        renderRows={renderRows}
        noDataMessage="شما تاکنون پرداختی نداشته اید"
      />
    </CardBox>
  );
};

const columns = [
  { label: "شناسه پرداخت", className: "text-right" },
  { label: "تاریخ  ایجاد", className: "text-right" },
  { label: "وضعیت", className: "text-right" },
  { label: "تخفیف (تومان)", className: "text-right" },
  { label: "مبلغ (تومان)", className: "text-right" },
  { label: "دوره ها", className: "text-left" },
];

export default PaymentsList;

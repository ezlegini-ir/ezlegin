import Filter from "@ezlegin/ui/components/Filter";
import Table from "@ezlegin/ui/components/Table";
import { TableCell, TableRow } from "@ezlegin/ui/components/ui/table";
import { Ticket } from "@ezlegin/database";
import { Eye } from "lucide-react";
import Link from "next/link";
import CardBox from "../../components/CardBox";
import TicketStatus from "./TicketStatus";
import Pagination from "@ezlegin/ui/components/Pagination";
import { globalPageSize } from "@ezlegin/utils";
import { formatJalaliDate } from "@ezlegin/utils";

interface Props {
  tickets: Ticket[];
  ticketsCount: number;
}

const TicketsList = async ({ tickets, ticketsCount }: Props) => {
  return (
    <CardBox
      title="تیکت ها"
      btn={{ title: "ارسال تیکت", href: "/panel/tickets/new" }}
    >
      <div className="flex justify-between">
        <Filter
          name="time"
          placeholder="جدید ترین"
          options={[{ label: "قدیمی ترین", value: "oldest" }]}
        />

        <Filter
          name="status"
          placeholder="همه وضعیت‌ها"
          options={[
            { label: "در انتظار پاسخ", value: "PENDING" },
            { label: "پاسخ داده شده", value: "REPLIED" },
            { label: "بسته شده", value: "CLOSED" },
          ]}
        />
      </div>

      <div>
        <Table
          columns={columns}
          data={tickets}
          noDataMessage="تیکتی وجود ندارد."
          renderRows={renderRows}
        />
        <Pagination pageSize={globalPageSize} totalItems={ticketsCount} />
      </div>
    </CardBox>
  );
};

const renderRows = (ticket: Ticket) => {
  return (
    <TableRow key={ticket.id}>
      <TableCell>{ticket.id}</TableCell>
      <TableCell>
        <Link href={`/panel/tickets/${ticket.id}`}>{ticket.subject}</Link>
      </TableCell>
      <TableCell className="flex justify-center items-center">
        <TicketStatus type={ticket.status} />
      </TableCell>
      <TableCell className="hidden md:table-cell text-center">
        {formatJalaliDate(ticket.createdAt, { withTime: true })}
      </TableCell>
      <TableCell className="text-left py-4 hidden lg:table-cell">
        <Link href={`/panel/tickets/${ticket.id}`} className="flex justify-end">
          <Eye size={18} className="text-gray-500" />
        </Link>
      </TableCell>
    </TableRow>
  );
};

const columns = [
  { label: "شناسه", className: "w-[120px] text-right" },
  { label: "موضوع", className: "text-right" },
  { label: "وضعیت", className: "text-center" },
  { label: "تاریخ", className: "w-[200px] hidden md:table-cell text-center" },
  { label: "مشاهده", className: "text-left hidden lg:table-cell" },
];

export default TicketsList;

import CampaignAnalytics from "@/components/CampaignAnalytics";
import { CampaignType } from "@/components/forms/marketing/CampaignForm";
import Loader from "@ezlegin/ui/components/Loader";
import Pagination from "@ezlegin/ui/components/Pagination";
import Table from "@ezlegin/ui/components/Table";
import { Badge } from "@ezlegin/ui/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@ezlegin/ui/components/ui/dialog";
import { TableCell, TableRow } from "@ezlegin/ui/components/ui/table";
import ViewButton from "@ezlegin/ui/components/ViewButton";
import { addMinutes, formatDate, isBefore } from "date-fns";

interface Props {
  campaigns: CampaignType[];
  totalCampaigns: number;
}

const CampaignList = async ({ campaigns, totalCampaigns }: Props) => {
  const pageSize = 15;

  return (
    <div className="card">
      <Table columns={columns} data={campaigns} renderRows={renderRows} />
      <Pagination pageSize={pageSize} totalItems={totalCampaigns} />
    </div>
  );
};

const renderRows = (campaign: CampaignType) => {
  const conversionRate =
    ((campaign.coupon?.payment.length || 0) /
      (campaign.messageDelivered ?? 0)) *
    100;

  const isReady = isBefore(
    addMinutes(new Date(campaign.createdAt), 5),
    new Date()
  );

  return (
    <TableRow key={campaign.id} className="odd:bg-slate-50">
      <TableCell dir="rtl" className="text-left">
        {campaign.title}
      </TableCell>

      <TableCell className="text-center">
        {formatDate(campaign.startAt, "yyyy/MM/dd")} -{" "}
        {formatDate(campaign.endAt, "yyyy/MM/dd")}
      </TableCell>

      <TableCell className="text-center">{campaign.messageSent}</TableCell>

      <TableCell className="text-center">
        {!isReady ? (
          <div className="flex justify-center text-slate-300">
            <Loader />
          </div>
        ) : (
          (campaign.messageDelivered ?? "Should be Fetched")
        )}
      </TableCell>

      <TableCell className="text-center">
        {!isReady ? (
          <div className="flex justify-center text-slate-300">
            <Loader />
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <Badge className="aspect-video" variant={"blue"}>
              %{conversionRate.toFixed(2)}
            </Badge>
          </div>
        )}
      </TableCell>

      <TableCell>
        <Dialog>
          <div className="flex justify-end w-full">
            <DialogTrigger asChild>
              <ViewButton />
            </DialogTrigger>
          </div>
          <DialogContent>
            <DialogHeader className="space-y-6">
              <DialogTitle dir="rtl" className="text-right pr-3">
                {campaign.title}
              </DialogTitle>
              <CampaignAnalytics
                campaign={campaign}
                isReady={isReady}
                conversionRate={conversionRate}
              />
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </TableCell>
    </TableRow>
  );
};

const columns = [
  { label: "Title", className: "" },
  { label: "Start / End", className: "text-center" },
  { label: "Sent Messages", className: "text-center" },
  { label: "Delivered Messages", className: "text-center" },
  { label: "Conversion Rate", className: "text-center" },
  { label: "Analytics", className: "text-right w-[100px]" },
];

export default CampaignList;

import { Metadata } from "next";
import CheckoutResult from "./CheckoutResult";
interface Props {
  searchParams: Promise<{
    Authority: string;
    Status: "OK" | "NOK";
  }>;
}

const page = async ({ searchParams }: Props) => {
  const { Authority, Status } = await searchParams;

  return <CheckoutResult authority={Authority} status={Status} />;
};

export default page;

export const metadata: Metadata = {
  title: "Payment Confirm",
};

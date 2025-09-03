"use client";

import {
  createQuickPayment,
  QuickPaymentDataType,
} from "@/actions/quickPayment";
import { Button } from "@ezlegin/ui/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@ezlegin/ui/components/ui/form";
import { Input } from "@ezlegin/ui/components/ui/input";
import Loader from "@ezlegin/ui/components/Loader";
import { Separator } from "@ezlegin/ui/components/ui/separator";
import { getCouponByCode } from "@/data/coupon";
import { getSessionUser } from "@/data/user";
import { useLoading } from "@ezlegin/utils";
import { formatPriceBy3Digits } from "@ezlegin/utils";
import { discountFormSchema, DiscountFormType } from "@/lib/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Coupon,
  CouponType,
  Course,
  Discount,
  Wallet,
} from "@ezlegin/database";
import { X } from "lucide-react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import CashBackCard from "@ezlegin/ui/components/CashBackCard";
import { Badge } from "@ezlegin/ui/components/ui/badge";
import { Switch } from "@ezlegin/ui/components/ui/switch";

export interface CourseType extends Course {
  discount: Discount | null;
}

interface Props {
  course: CourseType;
  wallet: Wallet | null;
}

const QuickCartCheckoutForm = ({ course, wallet }: Props) => {
  // HOOKS ---------------------------
  const [initialCartTotal] = useState(course.price);
  const [cartTotal, setCartTotal] = useState(course.price);
  const [usedWalletAmount, setUsedWalletAmount] = useState(0);
  const [useWallet, setUseWallet] = useState<boolean>(false);
  const [coupon, setCoupon] = useState<Coupon | undefined>(undefined);
  const [couponAmount, setCouponAmount] = useState(0);
  const { loading: applyDiscountLoading, setLoading: setApplyDiscountLoading } =
    useLoading();
  const { loading, setLoading } = useLoading();

  // CONSTS ---------------------------
  const walletBalance = wallet?.balance || 0;
  const form = useForm<DiscountFormType>({
    resolver: zodResolver(discountFormSchema),
    defaultValues: { code: "" },
  });
  const discountAmount = course.discount
    ? course.discount?.type === "FIXED"
      ? course.discount?.amount
      : (course.discount?.amount / 100) * course.basePrice
    : 0;
  const form_DiscountCode = form.watch("code");

  // EFFECTS ---------------------------
  useEffect(() => {
    // enable
    if (useWallet) {
      if (coupon) {
        // Coupon Exists
        const usedWalletAmount = Math.min(
          walletBalance,
          initialCartTotal - couponAmount
        );
        setUsedWalletAmount(usedWalletAmount);
        setCartTotal(initialCartTotal - couponAmount - usedWalletAmount);
      } else {
        // Coupon Not Exists
        const usedWalletAmount = Math.min(initialCartTotal, walletBalance);
        setUsedWalletAmount(usedWalletAmount);
        setCartTotal(initialCartTotal - usedWalletAmount);
      }
    } else {
      setUsedWalletAmount(0);
      setCartTotal((prev) => prev + usedWalletAmount);
    }
    // disable
  }, [useWallet]);

  //! APPLY DISCOUNT  ---------------------------
  const applyDiscount = async () => {
    // REMOVE DISCOUNT CODE if already applied
    if (coupon) {
      setCoupon(undefined);
      setCartTotal((prev) => prev + couponAmount);
      setCouponAmount(0);
      form.reset();

      toast.warning("Discount code removed");
      if (useWallet && usedWalletAmount > 0) {
        const usedWalletAmount = Math.min(initialCartTotal, walletBalance);
        setUsedWalletAmount(usedWalletAmount);
        setCartTotal(initialCartTotal - usedWalletAmount);
      }

      return;
    }

    setApplyDiscountLoading(true);

    // COUPON CHECK ---------------
    const existingCoupon = await getCouponByCode(form_DiscountCode);
    if (!existingCoupon) {
      toast.error("Invalid discount code!");
      setApplyDiscountLoading(false);
      return;
    }

    function applyDiscountAmount(type: CouponType) {
      if (!existingCoupon) return;
      setCoupon(existingCoupon);

      if (type === "FIXED_ON_CART" || type === "FIXED_ON_COURSE") {
        const discountValue = existingCoupon.amount;
        const isNegativePrice = cartTotal - discountValue <= 0;
        const finalDiscount = isNegativePrice
          ? useWallet
            ? initialCartTotal - (wallet?.balance || 0)
            : initialCartTotal
          : discountValue;
        setCouponAmount(finalDiscount);
        setCartTotal((prev) => Math.max(0, prev - discountValue));
      } else {
        const discountValue = initialCartTotal * (existingCoupon.amount / 100);
        setCouponAmount(discountValue);
        setCartTotal((prev) => prev - discountValue);
      }
    }

    // DATE CHECK ---------------
    if (existingCoupon.to) {
      const isExpired = existingCoupon.to < new Date();
      if (isExpired) {
        toast.error("This discount code has expired.");
        setApplyDiscountLoading(false);
        return;
      }
    }
    if (existingCoupon.from) {
      const isNotStarted = existingCoupon.from > new Date();
      if (isNotStarted) {
        toast.error("This discount code is not active yet.");
        setApplyDiscountLoading(false);
        return;
      }
    }

    // LIMIT CHECK ---------------
    if (existingCoupon.limit) {
      const isReachedToLimit = existingCoupon.used === existingCoupon.limit;
      if (isReachedToLimit) {
        toast.error("This discount code has reached its usage limit.");
        setApplyDiscountLoading(false);
        return;
      }
    }

    // COURSE INCLUDE/EXCLUDE CHECK ---------------
    if (
      existingCoupon.courseInclude.length > 0 ||
      existingCoupon.courseExclude.length > 0
    ) {
      // COURSE INCLUDE CHECK
      if (existingCoupon.courseInclude.length > 0) {
        const courseIncludeIds = existingCoupon.courseInclude.map((c) => c.id);
        if (!courseIncludeIds.includes(course.id)) {
          toast.error("This discount code is not valid for this course.");
          setApplyDiscountLoading(false);
          return;
        }
        applyDiscountAmount(existingCoupon.type);
      }

      // COURSE EXCLUDE CHECK
      if (existingCoupon.courseExclude.length > 0) {
        const courseExcludeIds = existingCoupon.courseExclude.map((c) => c.id);
        if (courseExcludeIds.includes(course.id)) {
          toast.error("This discount code is not valid for this course.");
          setApplyDiscountLoading(false);
          return;
        }
        applyDiscountAmount(existingCoupon.type);
      }
    } else {
      applyDiscountAmount(existingCoupon.type);
    }

    setApplyDiscountLoading(false);
    toast.success("Discount code applied successfully.");
  };

  //! ON SUBMIT  ---------------------------
  const onPayment = async () => {
    const user = await getSessionUser();
    setLoading(true);
    if (!user) return;

    const data: QuickPaymentDataType = {
      amount: cartTotal,
      courseId: course.id,
      user,
      itemsTotal: course.basePrice,
      discountAmount: couponAmount + (course.discount?.amount || 0) || 0,
      discountCode: coupon?.code,
      discountCodeAmount: couponAmount,
      useWallet,
      useWalletAmount: useWallet ? usedWalletAmount : undefined,
    };

    const res = await createQuickPayment(data);
    if (res.error) {
      toast.error(res.error);
      setLoading(false);
      return;
    }
    if (res.success && res.paymentUrl) {
      toast.success(res.success);
      redirect(res.paymentUrl);
    }
    if (res.success && res.redirectUrl) {
      toast.success(res.success);
      redirect(res.redirectUrl);
    }
  };

  return (
    <div className="space-y-5">
      <div className="space-y-3">
        <div className="flex text-nowrap items-center gap-2 text-sm font-medium">
          <span>Course price</span>
          <div className="w-full">
            <Separator />
          </div>
          <div>${course.basePrice}</div>
        </div>

        {discountAmount > 0 && (
          <div className="flex text-nowrap items-center gap-2 text-sm text-muted-foreground">
            <span>Course discount</span>
            <div className="w-full">
              <Separator />
            </div>
            <div>- ${formatPriceBy3Digits(discountAmount)}</div>
          </div>
        )}

        {couponAmount > 0 && (
          <div className="flex text-nowrap items-center gap-2 text-sm text-muted-foreground">
            <span>Discount code deduction</span>
            <div className="w-full">
              <Separator />
            </div>
            <div>- ${formatPriceBy3Digits(couponAmount)}</div>
          </div>
        )}

        {usedWalletAmount > 0 && (
          <div className="flex text-nowrap items-center gap-2 text-sm text-muted-foreground">
            <span>Wallet deduction</span>
            <div className="w-full">
              <Separator />
            </div>
            <div>- ${formatPriceBy3Digits(usedWalletAmount)}</div>
          </div>
        )}

        {/* //! PURCHASE BUTTON */}
        <div className="space-y-3">
          <Button
            size={"lg"}
            disabled={loading}
            className="w-full font-medium text-base"
            onClick={onPayment}
          >
            <Loader loading={loading} />
            {loading ? (
              "Redirecting..."
            ) : cartTotal > 0 ? (
              <span className="flex">Pay ${cartTotal}</span>
            ) : (
              <span className="flex">Complete registration</span>
            )}
          </Button>

          <CashBackCard price={cartTotal} />
        </div>
      </div>

      {walletBalance > 0 && initialCartTotal !== 0 && (
        <Badge
          variant={useWallet ? "blue" : "gray"}
          className={`flex justify-between items-center text-sm font-medium py-3 hover:bg-muted
            ${
              cartTotal === 0 &&
              coupon &&
              !usedWalletAmount &&
              "pointer-events-none opacity-50"
            }
            `}
        >
          <div className="flex flex-col gap-1">
            <span>Use wallet</span>
            <span className="text-xs">
              Balance: ${formatPriceBy3Digits(walletBalance)}
            </span>
          </div>

          <Switch
            dir="ltr"
            checked={useWallet}
            onCheckedChange={(checked: boolean) => setUseWallet(checked)}
          />
        </Badge>
      )}

      {/* //! DISCOUNT BUTTON */}
      <Form {...form}>
        <form className="relative" onSubmit={form.handleSubmit(applyDiscount)}>
          {initialCartTotal !== 0 && (
            <>
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        autoFocus
                        disabled={!!coupon}
                        className="relative pr-20 font-medium tracking-wide"
                        placeholder="Discount code"
                        {...field}
                        autoComplete="off"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button
                disabled={!form.formState.isValid || applyDiscountLoading}
                className="absolute px-4 inset-y-0 h-7 right-1 my-auto rounded-sm"
                type="submit"
                size={"sm"}
                variant={"secondary"}
              >
                <Loader loading={applyDiscountLoading} />
                {coupon ? (
                  <span className="flex gap-1">
                    <X />
                    Remove
                  </span>
                ) : applyDiscountLoading ? (
                  "Checking..."
                ) : (
                  "Apply"
                )}
              </Button>
            </>
          )}
        </form>
      </Form>
    </div>
  );
};

export default QuickCartCheckoutForm;

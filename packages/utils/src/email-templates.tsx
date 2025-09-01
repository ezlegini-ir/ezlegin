import React from "react";
import { Course, Enrollment, Payment } from "@ezlegin/database";
import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Text,
  Button,
  render,
} from "@react-email/components";

interface OtpEmailProps {
  otp: string;
}

const containerStyles = {
  backgroundColor: "#fff",
  padding: "20px",
  borderBottomLeftRadius: "10px",
  borderBottomRightRadius: "10px",
  textAlign: "center" as "left" | "center" | "right",
};
const buttonStyles = {
  backgroundColor: "#526eff",
  color: "#fff",
  padding: "10px 20px",
  borderRadius: "5px",
  textDecoration: "none",
  textAlign: "center" as "left" | "center" | "right",
  fontSize: "16px",
};

const linkStyles = {
  fontSize: "14px",
  display: "block",
  marginTop: "10px",
  textAlign: "center" as "left" | "center" | "right",
  color: "#526eff",
  textDecoration: "none",
};

const bodyStyles = {
  fontFamily: "Tahoma, sans-serif",
  backgroundColor: "#f9f9f9",
  padding: "20px",
};

const Header = () => {
  return (
    <Container
      style={{
        backgroundColor: "#526eff",
        padding: "20px",
        paddingTop: "27px",
        paddingBottom: "27px",
        borderTopLeftRadius: "10px",
        borderTopRightRadius: "10px",
        textAlign: "center",
      }}
    >
      <Img
        src="https://dl.igraphical.ir/assets/ezlegin-logo.png"
        alt="Ezlegin"
        width="135"
        height="auto"
        style={{ display: "inline-block" }}
      />
    </Container>
  );
};

//! ----------------------------------------------------------

const OtpEmail = ({ otp }: OtpEmailProps) => {
  return (
    <Html lang="fa" dir="rtl">
      <Head />
      <Preview>🔒 کد تایید شما: {otp}</Preview>
      <Body style={bodyStyles}>
        <Header />

        <Container style={containerStyles}>
          <Text style={{ fontSize: "18px", color: "#333", direction: "rtl" }}>
            کاربر عزیز، برای ورود یا تأیید هویت، لطفاً از کد زیر استفاده کنید:
          </Text>
          <Text
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              direction: "ltr",
              unicodeBidi: "plaintext",
              color: "#526eff",
            }}
          >
            <span dir="ltr" style={{ unicodeBidi: "plaintext" }}>
              {otp}
            </span>
          </Text>

          <Button href="https://igraphical.ir/login" style={buttonStyles}>
            ورود به حساب کاربری
          </Button>

          <Hr className="my-[16px] border-t-2 border-gray-300" />

          <Text style={{ color: "#6b7280", direction: "rtl" }}>
            این کد به دلایل امنیتی فقط برای مدت محدودی معتبر است. لطفاً هرچه
            سریع‌تر اقدام نمایید.
          </Text>
          <Text style={{ color: "#6b7280", direction: "rtl" }}>
            اگر شما این درخواست را ارسال نکرده‌اید، می‌توانید این ایمیل را
            نادیده بگیرید.
          </Text>

          <Hr className="my-[16px] border-t-2 border-gray-300" />

          <Text style={{ fontSize: "12px", color: "#888", direction: "rtl" }}>
            اگر سوالی دارید، با ما از طریق support@igraphical.ir در تماس باشید.
          </Text>

          <Link href={process.env.NEXT_PUBLIC_BASE_URL} style={linkStyles}>
            iGraphical.ir
          </Link>
        </Container>
      </Body>
    </Html>
  );
};

export const renderOtpEmail = (otp: string) =>
  render(<OtpEmail otp={otp} />, { pretty: true });

//! ----------------------------------------------------------

const ResetPasswordEmail = ({
  token,
  email,
}: {
  token: string;
  email: string;
}) => {
  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>🔒 Reset Password | Ezlegin</Preview>
      <Body style={bodyStyles}>
        <Header />

        <Container style={containerStyles}>
          <Text style={{ fontSize: "18px", color: "#333", direction: "ltr" }}>
            Dear user, to reset your password, please click the button below:
          </Text>
          <Text
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              direction: "ltr",
              unicodeBidi: "plaintext",
              color: "#526eff",
            }}
          >
            <Button
              href={`${process.env.NODE_ENV === "production" ? process.env.NEXT_PUBLIC_BASE_URL : "http://localhost:3000"}/login/reset-password?token=${token}&email=${email}`}
              style={buttonStyles}
            >
              Reset Your Password
            </Button>
          </Text>

          <Hr className="my-[16px] border-t-2 border-gray-300" />

          <Text style={{ color: "#6b7280", direction: "ltr" }}>
            For security reasons, this code is only valid for a limited time.
            Please act as soon as possible.
          </Text>
          <Text style={{ color: "#6b7280", direction: "ltr" }}>
            If you did not request this, you can safely ignore this email.
          </Text>

          <Hr className="my-[16px] border-t-2 border-gray-300" />

          <Text style={{ fontSize: "12px", color: "#888", direction: "ltr" }}>
            If you have any questions, contact us at ezlegin.com@gmail.com.
          </Text>

          <Link href={process.env.NEXT_PUBLIC_BASE_URL} style={linkStyles}>
            Ezlegin.com
          </Link>
        </Container>
      </Body>
    </Html>
  );
};

export const renderResetPasswordEmail = (token: string, email: string) =>
  render(<ResetPasswordEmail token={token} email={email} />, { pretty: true });

//! ----------------------------------------------------------

const FinishCourseEmail = ({
  fullName,
  courseTitle,
}: {
  fullName: string;
  courseTitle: string;
}) => {
  return (
    <Html lang="fa" dir="rtl">
      <Head />
      <Preview>🎉 تبریک {fullName} عزیز!</Preview>
      <Body style={bodyStyles}>
        <Header />

        <Container style={containerStyles}>
          <Text style={{ fontSize: "18px", color: "#333", direction: "rtl" }}>
            {fullName} عزیز، 🎉تبریک می گوییم!
          </Text>

          <Hr className="my-[16px] border-t-2 border-gray-300" />

          <Text style={{ fontSize: "18px", color: "#333", direction: "rtl" }}>
            🔹 شما با موفقیت <strong>{courseTitle}</strong> را به اتمام رساندید.
            این یک دستاورد بزرگ است!
          </Text>

          <Hr className="my-[16px] border-t-2 border-gray-300" />

          <Text style={{ fontSize: "18px", color: "#333", direction: "rtl" }}>
            نظرات ارزشمند شما به ما کمک خواهد کرد تا کیفیت دوره‌های آموزشی خود
            را بهبود بخشیم.
          </Text>

          <Button
            href="https://igraphical.ir/panel/courses"
            style={buttonStyles}
          >
            ثبت امتیاز و دانلود مدرک
          </Button>

          <Hr className="my-[16px] border-t-2 border-gray-300" />

          <Link href={process.env.NEXT_PUBLIC_BASE_URL} style={linkStyles}>
            iGraphical.ir
          </Link>
        </Container>
      </Body>
    </Html>
  );
};

export const renderFinishCourseEmail = (
  courseTitle: string,
  fullName: string
) =>
  render(<FinishCourseEmail courseTitle={courseTitle} fullName={fullName} />, {
    pretty: true,
  });

//! ----------------------------------------------------------

export interface PaymentType extends Payment {
  enrollment: (Enrollment & { course: Course })[];
}

const SuccessPaymentEmail = (data: {
  fullName: string;
  payment: PaymentType;
}) => {
  const { fullName, payment } = data;

  return (
    <Html lang="fa" dir="rtl">
      <Head />
      <Preview>🔹 ثبت نام شما در دوره آی‌گرافیکال موفق بود!</Preview>
      <Body style={bodyStyles}>
        <Header />

        <Container style={containerStyles}>
          <Text style={{ fontSize: "18px", color: "#333", direction: "rtl" }}>
            {fullName} عزیز،
          </Text>

          <Text style={{ fontSize: "18px", color: "#333", direction: "rtl" }}>
            از اعتماد شما به آی‌گرافیکال سپاس‌گزاریم 🌟
            <br />
            پرداخت شما به مبلغ{" "}
            <strong>{payment.total.toLocaleString("en-US")} تومان</strong> با
            موفقیت انجام شد و ثبت‌نام در دوره‌های زیر تکمیل گردید:
          </Text>

          <Hr className="my-[16px] border-t-2 border-gray-300" />

          {payment.enrollment.map(({ course }, index) => (
            <Text
              key={index}
              style={{
                fontSize: "18px",
                color: "#333",
                direction: "rtl",
              }}
            >
              🎓 {course.title}
            </Text>
          ))}

          <Hr className="my-[16px] border-t-2 border-gray-300" />

          <Button
            href="https://igraphical.ir/panel/courses"
            style={buttonStyles}
          >
            ورود به پنل و مشاهده دوره‌ها
          </Button>

          <Hr className="my-[16px] border-t-2 border-gray-300" />

          <Text
            style={{
              fontSize: "14px",
              color: "#888",
              direction: "rtl",
              textAlign: "center",
            }}
          >
            هر زمان که نیاز به پشتیبانی داشتید، از طریق سایت یا پنل کاربری با ما
            در ارتباط باشید.
          </Text>

          <Link href={process.env.NEXT_PUBLIC_BASE_URL} style={linkStyles}>
            iGraphical.ir
          </Link>
        </Container>
      </Body>
    </Html>
  );
};

export const renderSuccessPaymentEmail = (
  fullName: string,
  payment: PaymentType
) =>
  render(<SuccessPaymentEmail payment={payment} fullName={fullName} />, {
    pretty: true,
  });

//! ----------------------------------------------------------

const SuccessPaymentEmailToAdmin = (data: {
  fullName: string;
  payment: PaymentType;
}) => {
  const { fullName, payment } = data;

  return (
    <Html lang="fa" dir="rtl">
      <Head />
      <Preview>🔹 ثبت نام جدید</Preview>
      <Body style={bodyStyles}>
        <Header />

        <Container style={containerStyles}>
          <Text style={{ fontSize: "18px", color: "#333", direction: "rtl" }}>
            کاربر: {fullName}
          </Text>

          <Text style={{ fontSize: "18px", color: "#333", direction: "rtl" }}>
            پرداخت به مبلغ{" "}
            <strong>{payment.total.toLocaleString("en-US")} تومان</strong> با
            موفقیت انجام شد و ثبت‌نام در دوره‌های زیر تکمیل گردید:
          </Text>

          <Hr className="my-[16px] border-t-2 border-gray-300" />

          {payment.enrollment.map(({ course }, index) => (
            <Text
              key={index}
              style={{
                fontSize: "18px",
                color: "#333",
                direction: "rtl",
              }}
            >
              🎓 {course.title}
            </Text>
          ))}

          <Hr className="my-[16px] border-t-2 border-gray-300" />

          <Link href={process.env.NEXT_PUBLIC_BASE_URL} style={linkStyles}>
            iGraphical.ir
          </Link>
        </Container>
      </Body>
    </Html>
  );
};

export const renderSuccessPaymentEmailToAdmin = (
  fullName: string,
  payment: PaymentType
) =>
  render(<SuccessPaymentEmailToAdmin payment={payment} fullName={fullName} />, {
    pretty: true,
  });

//! ----------------------------------------------------------

import FloatingBanner from "@/components/FloatingBanner";
import Footer from "@/components/Footer";
import MobileNavbar from "@/components/MobileNavbar";
import SquarePattern from "@/components/SquarePattern";
import NotifBar from "@ezlegin/ui/components/NotifBar";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <SquarePattern />
      <div className="relative max-w-screen-xl mx-auto w-full">
        <div className="absolute -right-40 -top-72 h-[800px] w-[800px] bg-blue-950/50 rounded-full blur-[100px]" />
        <div className="absolute -right-16 -top-80 h-[400px] w-[400px] bg-blue-900/60 rounded-full blur-[100px]" />
      </div>
      <div
        className={`antialiased overflow-x-hidden mx-auto grid grid-rows-[auto_1fr_auto] min-h-screen dark`}
      >
        <div className="text-right pr-60">
          <NotifBar />
        </div>

        <main className="z-50">
          {children}
          <FloatingBanner />
          <MobileNavbar />
        </main>

        <Footer />
      </div>
    </div>
  );
}

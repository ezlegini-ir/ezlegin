import FloatingBanner from "@/components/FloatingBanner";
import Footer from "@/components/Footer";
import MobileNavbar from "@/components/MobileNavbar";
import NavBar from "@/components/NavBar";
import SquarePattern from "@/components/SquarePattern";
import NotifBar from "@ezlegin/ui/components/NotifBar";

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <SquarePattern />
      <div
        className={`antialiased max-w-screen-xl mx-auto p-4 grid grid-rows-[auto_1fr_auto] min-h-screen dark`}
      >
        <div>
          <NotifBar />
          <NavBar />
        </div>
        <main className="relative pt-16">
          <div className="absolute -right-40 -top-72 h-[800px] w-[800px] bg-blue-950/50 rounded-full blur-[100px]" />
          <div className="absolute -right-16 -top-80 h-[400px] w-[400px] bg-blue-900/60 rounded-full blur-[100px]" />
          {children}
          <FloatingBanner />
          <MobileNavbar />
        </main>
        <Footer />
      </div>
    </div>
  );
}

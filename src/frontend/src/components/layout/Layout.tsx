import { Toaster } from "@/components/ui/sonner";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { MobileNav } from "./MobileNav";

interface LayoutProps {
  children: React.ReactNode;
  hideFooter?: boolean;
  fullBleed?: boolean;
}

export function Layout({
  children,
  hideFooter = false,
  fullBleed = false,
}: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className={fullBleed ? "flex-1" : "flex-1 pb-20 md:pb-0"}>
        {children}
      </main>
      {!hideFooter && <Footer />}
      <MobileNav />
      <Toaster position="top-right" richColors />
    </div>
  );
}

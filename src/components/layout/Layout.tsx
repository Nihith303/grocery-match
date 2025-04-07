
import React from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { PageContainer } from "./PageContainer";
import { useIsMobile } from "@/hooks/use-mobile";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      {/* Sticky Navbar with glass effect */}
      <div className="fixed top-0 left-0 w-full z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md shadow-md">
        <Navbar />
      </div>

      {/* Main content with padding to prevent overlap */}
      <main className="flex-grow pt-[64px] md:pt-[72px] max-w-full">
        <PageContainer>{children}</PageContainer>
      </main>

      <Footer />
    </div>
  );
}

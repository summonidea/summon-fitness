import type { Metadata, Viewport } from "next";
import { AppShell } from "@/components/app-shell";
import { AppStateProvider } from "@/components/providers/app-state-provider";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Summon Fitness",
  description: "Mobile-first pickleball training app for home power, footwork, technique, and recovery.",
  manifest: "/manifest.webmanifest"
};

export const viewport: Viewport = {
  themeColor: "#132a2a",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppStateProvider>
          <AppShell>{children}</AppShell>
        </AppStateProvider>
      </body>
    </html>
  );
}

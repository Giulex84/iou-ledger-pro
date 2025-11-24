import "./globals.css";
import { IOUProvider } from "@/components/iou-context";
import BottomNav from "@/components/bottom-nav";

export const metadata = {
  title: "IOU Ledger Pro",
  generator: "v0.app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body className="min-h-screen bg-slate-50 text-slate-900">
        <IOUProvider>
          <main className="mx-auto flex min-h-screen max-w-md flex-col px-4 pb-24 pt-2">
            {children}
          </main>
          <BottomNav />
        </IOUProvider>
      </body>
    </html>
  );
}

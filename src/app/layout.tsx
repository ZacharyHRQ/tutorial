import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavMenu from '@/components/NavMenu';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Next.js & React Tutorial",
  description: "Interactive tutorial for Next.js, React, Web BLE, File System Access, and Performance Patterns",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 py-4">
              <h1 className="text-2xl font-bold text-gray-900">Next.js & React Tutorial</h1>
            </div>
          </header>
          <main className="max-w-7xl mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <aside className="md:col-span-1">
                <NavMenu />
              </aside>
              <div className="md:col-span-3 bg-white shadow rounded-lg p-6">
                {children}
              </div>
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}

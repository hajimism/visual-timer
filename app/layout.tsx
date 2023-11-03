import "../styles/tailwind.css";
import type { PropsWithChildren } from "react";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "moln | Visual timer",
  description: "When concentrating, consciousness floats like a cloud.",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

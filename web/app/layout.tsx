import type { Metadata } from "next";
import "./globals.css";
import Nav from "./components/nav";

export const metadata: Metadata = {
  title: "DistanceForDollars — Turn every mile into impact",
  description:
    "Track your runs, rides, and steps and turn your mileage into savings toward your goals or donations to charity, automatically.",
};


export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <Nav />
        {children}
      </body>
    </html>
  );
}
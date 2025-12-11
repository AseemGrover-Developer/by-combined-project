import "./globals.css";
import Providers from "./provider";

export const metadata = {
  title: "Bharat Yatra Admin",
  description: "Admin Dashboard for Bharat Yatra",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

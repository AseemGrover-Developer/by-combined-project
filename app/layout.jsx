import Footer from "../components/Footer";
import "./globals.css";
import Navbar from "../components/Navbar";
import Providers from "./provider";

export const metadata = {
  title: "Bharat Yatra Admin",
  description: "Admin Dashboard for Bharat Yatra",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar/>
          {children}
          <Footer/>
        </Providers>          
      </body>
    </html>
  );
}

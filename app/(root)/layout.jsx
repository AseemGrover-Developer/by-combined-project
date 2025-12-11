import Footer from "../../components/Footer";
import "../../app/globals.css";
import Navbar from "../../components/Navbar";

export default function Layout({ children}) {
  return (
    <html lang="en">
      <body>
          <Navbar/>
          {children}
          <Footer/>
      </body>
    </html>
  );
}

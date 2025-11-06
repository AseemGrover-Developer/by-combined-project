import Map from "@/components/Map.jsx";
import ArticalPage from "./about/page.jsx";
import ServicesPage from "./services/page.jsx";
import SlideShow from "./slides/page.jsx";
import AnccientIndia from "./anccient-india/page.jsx";
import Places from "./places/page.jsx";
import Consultant from "./consultant/page.jsx";
import Experience from "@/components/Experience.jsx";
import Reviews from "./reviews/page.jsx";
import Gallery from "./gallery/page.jsx";
import About from "./about/page.jsx";
import Contact from "./contact/page.jsx";
import HeritagesPage from "./heritage/page.jsx";
import BlogsPage from "./Blogs/page.jsx";
import ReviewsPage from "./reviews/page.jsx";

export default function Home() {
  return (
    <main>
      <SlideShow/>
      <Map/>
      <HeritagesPage/>
      <AnccientIndia/>
      <BlogsPage/>
      {/* <Places/> */}
      <ServicesPage/>
      {/* <Consultant/> */}
      {/* <Experience/> */}
      <ReviewsPage/>
      {/* <Gallery/> */}
      <About/>
      <Contact/>
    </main>
  );
}

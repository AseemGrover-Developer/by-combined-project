// /app/heritage/page.jsx

import CategoryCard from "@/components/CategoryCard";
// Corrected import path
import { heritageCategories } from "@/lib/heritageData/categories";


export default function HeritagePage() {
  return (
    <div className="min-h-screen text-black sm:mt-20">
      {/* Hero Section */}
      <div className="relative w-full h-auto text-left flex flex-col">
          
          <div>
            <h1 className="heading">
            44 UNESCO Heritage Sites of India
          </h1>
          <p className="text mb-5">
            Discover the cultural, natural, and mixed wonders.
          </p>
          </div>

          <img
          src= "https://ik.imagekit.io/allmyimages/bharat_yatra/heritages/heritage.png?updatedAt=1762368392857"
          className="w-full h-190 object-cover "
        />
        </div>

      <div className=" grid grid-cols-2 mx-5 mb-30 md:grid-cols-3 gap-6 md:p-10 z-15">
        {heritageCategories.map((cat) => (
          <CategoryCard key={cat.id} {...cat} />
        ))}
      </div>
    </div>
  );
}

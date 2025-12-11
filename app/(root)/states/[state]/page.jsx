import { stateData } from "@/public/scripts/mapdata/in";
import Image from "next/image";

export default async function StatePage({ params }) {
  const { state } = await params;
  const stateName = state?.replace(/-/g, " ") || "";

  const stateInfo = stateData.find(
    (s) => s.name.toLowerCase() === stateName.toLowerCase()
  );

  if (!stateInfo)
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-gray-700">
        <p>State not found</p>
      </div>
    );

  return (
    <div className="min-h-screen w-full text-gray-900 overflow-hidden">
      {/* ---------- Section 1: Hero with image and about ---------- */}
      <section className=" flex flex-col justify-between h-screen pb-10">
        <div className="w-full h-[70vh]">
          <Image
            src={stateInfo.image}
            alt={stateInfo.name}
            width={1600}
            height={1000}
            className="shadow-lg w-full h-[70vh] object-cover"
          />
        </div>

        {/* Right Text */}
        <div className="w-full space-y-5">
          <h1 className="heading">
            {stateInfo.name}
          </h1>
          <p className="text">
            {stateInfo.about}
          </p>
        </div>
      </section>
<section className="w-full flex flex-col lg:flex-row items-center justify-between gap-10 px-6 py-10">
  {/* Left Map */}
  <div className="w-full lg:w-2/3 flex justify-center">
    <Image
      src={stateInfo.stateMap}
      alt={`${stateInfo.name} Map`}
      width={1600}
      height={1000}
      className="object-cover image-to-orange"
    />
  </div>

  {/* Right Details */}
  <div className="w-full lg:w-1/2 text-center  space-y-4 mt-8 lg:mt-0">
    <h2 className="text-4xl font-bold text-[#ff7f00] mb-4">
      {stateInfo.name}
    </h2>

    <div className="space-y-3 text-lg md:text-xl text-gray-700">
      <p className="bg-[#ffd580] w-fit mx-auto px-4 py-2 rounded-md shadow-md">
        <strong>Capital:</strong> {stateInfo.capital}
      </p>
      <p className="bg-[#ffd580] w-fit mx-auto px-4 py-2 rounded-md shadow-md">
        <strong>Population:</strong> {stateInfo.population.toLocaleString()}
      </p>
      <p className="bg-[#ffd580] w-fit mx-auto px-4 py-2 rounded-md shadow-md">
        <strong>Area:</strong> {stateInfo.area}
      </p>
      <p className="bg-[#ffd580] w-fit mx-auto px-4 py-2 rounded-md shadow-md">
        <strong>Language:</strong> {stateInfo.language}
      </p>
    </div>
  </div>
</section>

    </div>
  );
}

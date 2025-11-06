// /components/SiteCard.jsx
// (No changes were needed, this code is correct)

export default function SiteCard({ site, reverse }) {
  return (
    <div
      className={`flex flex-col lg:flex-row ${
        reverse ? "lg:flex-row-reverse" : ""
      } items-center gap-8 overflow-hidden mb-10`}
    >
      {/* Image */}
      <div className="w-full lg:w-1/2 h-[300px] overflow-hidden">
        <img
          src={site.image}
          alt={site.name}
          className="w-full h-full object-cover "
        />
      </div>

      {/* Content */}
      <div className="w-full lg:w-1/2 px-6 py-8">
        <h2 className="text-2xl font-semibold text-orange-600 mb-2">{site.name}</h2>
        <p className="text-sm text-gray-500 mb-4">
          📍 {site.location}
        </p>
        <p className="text-gray-700 leading-relaxed">{site.about}</p>
      </div>
    </div>
  );
}
// // /components/CategoryCard.jsx

// import Link from "next/link";

// export default function CategoryCard({ id, title, description }) {
//   return (
//     <Link
//       href={`/heritage/${id}`}
//       className="cursor-pointer bg-gray-900 text-white border border-gray-700 
//                  rounded-2xl p-5 block
//                  hover:bg-orange-600 hover:scale-[1.03] hover:shadow-lg
//                  transition-all duration-300"
//     >
//       <h2 className="text-xl font-semibold mb-2">{title}</h2>
//       <p className="text-sm text-gray-300">{description}</p>
//     </Link>
//   );
// }

// /components/CategoryCard.jsx

import Link from "next/link";

export default function CategoryCard({ id, title, description }) {
  return (
    <Link
      href={`/heritage/${id}`}
      className="group cursor-pointer bg-[#FEE5BC] text-[#1a1a1a] border border-gray-200 
                 rounded-md px-3 py-5 block shadow-sm 
                 hover:shadow-xl hover:-translate-y-1 hover:border-orange-300
                 transition-all duration-300"
    >
      <div className="flex flex-col items-start space-y-3">
        {/* Gradient Heading */}
        <h2
          className="text-xl font-bold text-[#f77f00]"
        >
          {title}
        </h2>

        {/* Description */}
        <p className="text-sm text-gray-600 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
          {description}
        </p>

        {/* Decorative line effect */}
        <div className="w-0 h-[2px] bg-gradient-to-r from-orange-400 to-yellow-400 group-hover:w-full transition-all duration-500 rounded-full"></div>
      </div>
    </Link>
  );
}

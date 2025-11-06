"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { stateData } from "@/public/scripts/mapdata/in";

export default function Map() {
  const router = useRouter();
  const [hoveredState, setHoveredState] = useState(null);
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0 });

  useEffect(() => {
    const container = document.getElementById("india-map-container");

    // Ensure container exists before fetching
    if (!container) return;

    fetch("/in.svg")
      .then((res) => res.text())
      .then((svgText) => {
        container.innerHTML = svgText;

        // --- ADDED: Responsive SVG logic ---
        const svgElement = container.querySelector("svg");
        if (svgElement) {
          // Remove fixed dimensions from the SVG file
          svgElement.removeAttribute("width");
          svgElement.removeAttribute("height");

          // Add classes to make it scale
          // w-full = fill the container's width
          // h-auto = scale height based on aspect ratio (from viewBox)
          svgElement.classList.add("w-full", "h-auto");
        }
        // --- END: Responsive SVG logic ---

        const paths = container.querySelectorAll("path");

        paths.forEach((path) => {
          path.classList.add(
            "cursor-pointer",
            "transition-colors",
            "duration-300",
            "fill-[#FFE5BC]",
            "stroke-[#333333]",
            "stroke-1",
            "hover:fill-[#ffbc9a]",
          );

          // Hover events (LOGIC UNCHANGED)
          path.addEventListener("mouseenter", (e) => {
            const id = e.target.getAttribute("id");
            const state = stateData.find((s) => s.id === id);
            setHoveredState(state || { name: id });
            setTooltip({
              visible: true,
              x: e.pageX,
              y: e.pageY,
            });
          });

          path.addEventListener("mousemove", (e) => {
            setTooltip((t) => ({ ...t, x: e.pageX, y: e.pageY }));
          });

          path.addEventListener("mouseleave", () => {
            setHoveredState(null);
            setTooltip({ visible: false, x: 0, y: 0 });
          });

          // Click → navigate (LOGIC UNCHANGED)
          path.addEventListener("click", (e) => {
            const id = e.target.getAttribute("id");
            const state = stateData.find((s) => s.id === id);
            if (state?.name) {
              router.push(
                `/states/${state.name.toLowerCase().replace(/\s+/g, "-")}`
              );
            }
          });
        });
      })
      .catch((err) => console.error("Error loading SVG:", err));

    return () => {
      if (container) {
        container.innerHTML = "";
      }
    };
  }, [router]);

  return (
    <>
    <h1 className="heading mt-20">
      States & UT's
    </h1>
      <div className="text-black w-screen min-h-[5vh] flex justify-center items-1/2 overflow-hidden">
        <div
          id="india-map-container"
          className="w-auto h-[80vh] flex justify-center items-center lg:scale-200 overflow-hidden"
        ></div>

        {tooltip.visible && hoveredState && (
          <div
            className="absolute bg-gray-900 text-white text-sm px-3 py-2 rounded-md shadow-lg pointer-events-none z-50"
            style={{
              top: tooltip.y - 80,
              left: tooltip.x + 15,
              whiteSpace: "nowrap",
            }}
          >
            <p className="font-semibold text-orange-400">{hoveredState.name}</p>
            {hoveredState.capital && (
              <p className="text-gray-300 text-xs">
                Capital: {hoveredState.capital}
              </p>
            )}
          </div>
        )}
      </div>
    </>
  );
}

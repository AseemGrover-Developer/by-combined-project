// /lib/heritage-data.js
// (This is the NEW mapping file)

export const heritageDataMap = {
  "ancient-sites": {
    title: "Ancient & Archaeological Sites",
    getData: () => import("@/lib/heritageData/ancientSites").then((module) => module.ancientSites),
  },
  "temples-sites": {
    title: "Temples & Religious Complexes",
    getData: () => import("@/lib/heritageData/templesSites").then((module) => module.templesSites),
  },
  "forts-sites": {
    title: "Forts, Tombs & Mughal Architecture",
    getData: () => import("@/lib/heritageData/fortsSites").then((module) => module.fortsSites),
  },
  "cities-sites": {
    title: "Historic Cities & Urban Ensembles",
    getData: () => import("@/lib/heritageData/citiesSites").then((module) => module.citiesSites),
  },
  "colonial-sites": {
    title: "Colonial & Modern Architecture",
    getData: () => import("@/lib/heritageData/colonialSites").then((module) => module.colonialSites),
  },
  "engineering-sites": {
    title: "Engineering & Other Sites",
    getData: () => import("@/lib/heritageData/engineeringSites").then((module) => module.engineeringSites),
  },
  "military-sites": {
    title: "Military Landscapes",
    getData: () => import("@/lib/heritageData/militarySites").then((module) => module.militarySites),
  },
  "natural-sites": {
    title: "Natural Sites",
    getData: () => import("@/lib/heritageData/naturalSites").then((module) => module.naturalSites),
  },
  "mixed-sites": {
    title: "Mixed Heritage Site",
    getData: () => import("@/lib/heritageData/mixedSites").then((module) => module.mixedSites),
  },
};
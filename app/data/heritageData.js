// This file exports all our site data.

// 1. Data for the category cards on the main page
export const categories = [
  {
    name: "🏛️ Cultural Sites",
    description: "Recognized for their historical, artistic, or architectural significance.",
    slug: "cultural", // This will be used in the URL
    imageUrl: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNjUyOXwwfDF8c2VhcmNofDF8fHRhaiUyMG1haGFsfGVufDB8fHx8MTcxNzgzOTI0N3ww&ixlib=rb-4.0.3&q=80&w=1080" // Example Image
  },
  {
    name: "🌳 Natural Sites",
    description: "Recognized for exceptional natural beauty, ecosystems, and biodiversity.",
    slug: "natural",
    imageUrl: "https://images.unsplash.com/photo-1542601906-8b6a3263496e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNjUyOXwwfDF8c2VhcmNofDF8fGhpbWFsYXlhcyUyMG5hdGlvbmFsJTIwcGFya3xlbnwwfHx8MTcxNzgzOTM4Nnww&ixlib=rb-4.0.3&q=80&w=1080" // Example Image
  },
  {
    name: "🏞️ Mixed Site",
    description: "Recognized for both outstanding natural and cultural value.",
    slug: "mixed",
    imageUrl: "https://images.unsplash.com/photo-1616654228302-d95333830217?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNjUyOXwwfDF8c2VhcmNofDF8fHNpa2tpbSUyMGtoYW5nY2hlbmR6b25nYXxlbnwwfHx8MTcxNzgzOTQ0Mnww&ixlib=rb-4.0.3&q=80&w=1080" // Example Image
  }
];

// 2. Data for all the individual heritage sites, organized by category slug
export const sites = {
  cultural: [
    {
      name: "Agra Fort",
      location: "Uttar Pradesh",
      about: "A historical fort in the city of Agra, it was the main residence of the emperors of the Mughal Dynasty.",
      imageUrl: "https://images.unsplash.com/photo-1575824968159-4613b463b363?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNjUyOXwwfDF8c2VhcmNofDF8fGFncmElMjBmb3J0fGVufDB8fHx8MTcxNzgzOTU2M3ww&ixlib=rb-4.0.3&q=80&w=1080"
    },
    {
      name: "Ajanta Caves",
      location: "Maharashtra",
      about: "Buddhist cave monuments dating from the 2nd century BCE to about 480 CE.",
      imageUrl: "https://images.unsplash.com/photo-1599153928127-bf30c12b7f00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNjUyOXwwfDF8c2VhcmNofDF8fGFqYW50YSUyMGNhdmVzfGVufDB8fHx8MTcxNzgzOTU5OXww&ixlib=rb-4.0.3&q=80&w=1080"
    },
    {
      name: "Taj Mahal",
      location: "Uttar Pradesh",
      about: "An ivory-white marble mausoleum on the south bank of the Yamuna river in the Indian city of Agra.",
      imageUrl: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNjUyOXwwfDF8c2VhcmNofDF8fHRhaiUyMG1haGFsfGVufDB8fHx8MTcxNzgzOTI0N3ww&ixlib=rb-4.0.3&q=80&w=1080"
    },
    // ... Add all 36 cultural sites here following this format
  ],
  natural: [
    {
      name: "Great Himalayan National Park",
      location: "Himachal Pradesh",
      about: "Home to numerous flora and fauna, including some of the world's most endangered species.",
      imageUrl: "https://images.unsplash.com/photo-1542601906-8b6a3263496e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNjUyOXwwfDF8c2VhcmNofDF8fGhpbWFsYXlhcyUyMG5hdGlvbmFsJTIwcGFya3xlbnwwfHx8MTcxNzgzOTM4Nnww&ixlib=rb-4.0.3&q=80&w=1080"
    },
    {
      name: "Kaziranga National Park",
      location: "Assam",
      about: "A sanctuary that hosts two-thirds of the world's great one-horned rhinoceroses.",
      imageUrl: "https://images.unsplash.com/photo-1626568407422-26961f6c888d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNjUyOXwwfDF8c2VhcmNofDF8fGthemlyYW5nYXxlbnwwfHx8MTcxNzgzOTY4NHww&ixlib=rb-4.0.3&q=80&w=1080"
    },
    // ... Add all 7 natural sites here
  ],
  mixed: [
    {
      name: "Khangchendzonga National Park",
      location: "Sikkim",
      about: "A park that includes a unique diversity of plains, valleys, lakes, glaciers and snow-capped mountains covered with ancient forests.",
      imageUrl: "https://images.unsplash.com/photo-1616654228302-d95333830217?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNjUyOXwwfDF8c2VhcmNofDF8fHNpa2tpbSUyMGtoYW5nY2hlbmR6b25nYXxlbnwwfHx8MTcxNzgzOTQ0Mnww&ixlib=rb-4.0.3&q=80&w=1080"
    }
    // ... Add all mixed sites (just this one)
  ]
};
// Edit this file to update the shelter's public-facing details and demo content.
export const siteContent = {
  name: "Association For Animal Rights",
  since: "1988",
  donationUrl: "", // Add the shelter's secure donation page URL before launch.
  facebookUrl: "", // Add the official Facebook page URL before launch.
  contact: {
    email: "hello@example.org",
    phone: "(555) 000-0000",
    location: "Shelter location to be added",
  },
  campaign: {
    raised: 0,
    goal: 25000,
    isDemo: true,
    headline: "Help us keep their safe haven open.",
  },
  announcement: "",
  homepage: {
    headline: "Help Us Keep Their",
    headlineAccent: "Safe Haven Open",
    description:
      "Since 1988, we've been giving animals a second chance. Today, we need our community's help to continue that mission.",
  },
  images: {
    hero: "https://images.pexels.com/photos/30577826/pexels-photo-30577826.jpeg?auto=compress&cs=tinysrgb&w=2000",
    care: "https://images.pexels.com/photos/7469274/pexels-photo-7469274.jpeg?auto=compress&cs=tinysrgb&w=1600",
    closing: "https://images.pexels.com/photos/30577798/pexels-photo-30577798.jpeg?auto=compress&cs=tinysrgb&w=2000",
    history: "https://images.pexels.com/photos/36625707/pexels-photo-36625707.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  animals: [
    {
      id: "milo",
      name: "Milo",
      age: "4 years",
      category: "Dogs",
      status: "Needs Support",
      story: "A gentle, curious boy learning that a kind hand can mean comfort and a fresh start.",
      image:
        "https://images.pexels.com/photos/30556344/pexels-photo-30556344.jpeg?auto=compress&cs=tinysrgb&w=1100",
      alt: "A rescue dog on a leash looking toward the camera outdoors",
    },
    {
      id: "juniper",
      name: "Juniper",
      age: "2 years",
      category: "Cats",
      status: "In Our Care",
      story: "Quiet at first, then full of soft purrs once she knows she is somewhere safe.",
      image:
        "https://images.pexels.com/photos/38313609/pexels-photo-38313609.jpeg?auto=compress&cs=tinysrgb&w=1100",
      alt: "A black and white cat with bright eyes in a calm indoor setting",
    },
    {
      id: "poppy",
      name: "Poppy",
      age: "1 year",
      category: "Dogs",
      status: "Looking for a Home",
      story: "A bright-hearted companion who would love a patient person to call her own.",
      image:
        "https://images.pexels.com/photos/32838180/pexels-photo-32838180.jpeg?auto=compress&cs=tinysrgb&w=1100",
      alt: "A cheerful border collie standing indoors",
    },
    {
      id: "cedar",
      name: "Cedar",
      age: "3 years",
      category: "Other Animals",
      status: "In Our Care",
      story: "A thoughtful little rabbit who is happiest with a quiet corner and fresh greens.",
      image:
        "https://images.pexels.com/photos/13805714/pexels-photo-13805714.jpeg?auto=compress&cs=tinysrgb&w=1100",
      alt: "A brown rabbit sitting quietly on a garden path",
    },
    {
      id: "luna",
      name: "Luna",
      age: "8 months",
      category: "Cats",
      status: "Needs Support",
      story: "A watchful kitten with a playful side, waiting for comfort, care and time.",
      image:
        "https://images.pexels.com/photos/28199933/pexels-photo-28199933.jpeg?auto=compress&cs=tinysrgb&w=1100",
      alt: "A small white kitten sitting upright and looking at the camera",
    },
    {
      id: "benny",
      name: "Benny",
      age: "6 years",
      category: "Dogs",
      status: "Looking for a Home",
      story: "A relaxed, loyal friend who enjoys a slow walk and staying close to his people.",
      image:
        "https://images.pexels.com/photos/30577830/pexels-photo-30577830.jpeg?auto=compress&cs=tinysrgb&w=1100",
      alt: "A happy brown dog resting in the grass on a sunny day",
    },
  ],
} as const;

export type Animal = (typeof siteContent.animals)[number];
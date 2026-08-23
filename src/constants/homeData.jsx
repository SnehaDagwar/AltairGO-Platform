import React from 'react';
import { Sparkle, MapTrifold, Signpost, CloudSun } from '@phosphor-icons/react';

import luxuryResortImg from '../assets/luxury-resort.jpg';
import destGoa from '../assets/dest-goa.png';
import destKashmir from '../assets/dest-kashmir.png';
import destRajasthan from '../assets/dest-rajasthan.png';
import destKerala from '../assets/dest-kerala.png';
import destHimachal from '../assets/dest-himachal.png';
import destMeghalayaNew from '../assets/meghalaya-bridges.jpg';
import destUdaipur from '../assets/udaipur-palace.jpg';
import destMunnar from '../assets/munnar-tea.jpg';
import destHampi from '../assets/hampi-ruins.jpg';
import destAndaman from '../assets/andaman-islands.jpg';
import destLadakh from '../assets/ladakh.jpg';
import destJaipurHawa from '../assets/jaipur-hawa.jpg';
import journalKerala from '../assets/journal_kerala.png';
import journalHimachal from '../assets/journal_himachal.png';
import journalVaranasi from '../assets/journal_varanasi.png';
import destGokarna from '../assets/gokarna-cliffs.jpg';
import destOoty from '../assets/ooty-lake.jpg';
import destJaisalmerNew from '../assets/jaisalmer-desert-camel.jpg';
import destDarjeelingNew from '../assets/darjeeling-tea-pickers.jpg';
import destRishikesh from '../assets/rishikesh-yoga.jpg';
import destKashmirNew from '../assets/kashmir.jpg';

/* ---------- SVG Icon Helpers (Accessible, memoized-friendly) ---------- */
export const Icons = {
  Chev: (props) => (
    <svg width="12" height="12" viewBox="0 0 10 10" aria-hidden="true" {...props}>
      <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Arrow: (props) => (
    <svg width="14" height="14" viewBox="0 0 12 12" aria-hidden="true" {...props}>
      <path d="M2.5 6h7M6 2.5L9.5 6L6 9.5" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Spark: (props) => (
    <svg width="16" height="16" viewBox="0 0 14 14" aria-hidden="true" {...props}>
      <path d="M7 1.5L8.2 5.3L12 6.5L8.2 7.7L7 11.5L5.8 7.7L2 6.5L5.8 5.3Z" fill="currentColor" />
    </svg>
  ),
  ImagePlaceholder: (props) => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  )
};

/* ---------- Why AltairGO Feature Cards ---------- */
export const WHY_ALTAIRGO_CARDS = [
  { 
    id: 'ai-itineraries',
    value: 'AI', 
    title: 'AI-Powered Itineraries', 
    desc: 'Smarter journeys tailored to your vibe, budget, and travel style',
    icon: Sparkle
  },
  { 
    id: 'states-covered',
    value: '28', 
    title: '28 States Covered', 
    desc: 'Curated experiences across mountains, beaches, cities, and hidden gems',
    icon: MapTrifold
  },
  { 
    id: 'smart-routing',
    value: 'Smart', 
    title: 'Train + Roadtrip Smart', 
    desc: 'Real-world routing built around Indian travel patterns and flexibility',
    icon: Signpost
  },
  { 
    id: 'weather-aware',
    value: 'Live', 
    title: 'Season & Weather Aware', 
    desc: 'Travel recommendations optimized for monsoons, festivals, and peak seasons',
    icon: CloudSun
  }
];

/* ---------- Destination Tours for 3D Carousel ---------- */
export const TOURS = [
  { id: '01', title: 'Kashmir', img: destKashmirNew, tag: 'Himalayan Paradise' },
  { id: '02', title: 'Jaipur, Rajasthan', img: destJaipurHawa, tag: 'Royal Heritage' },
  { id: '03', title: 'Kerala Backwaters', img: destKerala, tag: 'Serene Waters' },
  { id: '04', title: 'Goa Beaches', img: destGoa, tag: 'Coastal Bliss' },
  { id: '05', title: 'Ladakh', img: destLadakh, tag: 'High Altitude Desert' },
  { id: '06', title: 'Taj Mahal, Agra', img: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=800&auto=format&fit=crop', tag: 'Wonder of World' },
  { id: '07', title: 'Varanasi Ghats', img: journalVaranasi, tag: 'Spiritual Capital' },
  { id: '08', title: 'Andaman Islands', img: destAndaman, tag: 'Tropical Coral' },
  { id: '09', title: 'Hampi Ruins, Karnataka', img: destHampi, tag: 'Ancient Empire' },
  { id: '10', title: 'Munnar Tea Hills, Kerala', img: destMunnar, tag: 'Mist & Plantations' },
  { id: '11', title: 'Udaipur Palace, Rajasthan', img: destUdaipur, tag: 'City of Lakes' },
  { id: '12', title: 'Meghalaya Living Bridges', img: destMeghalayaNew, tag: 'Rainforest Wonder' },
  { id: '13', title: 'Rishikesh Yoga Valley', img: destRishikesh, tag: 'Yoga & Adventure' },
  { id: '14', title: 'Darjeeling Tea Estates', img: destDarjeelingNew, tag: 'Queen of Hills' },
  { id: '15', title: 'Jaisalmer Desert, Rajasthan', img: destJaisalmerNew, tag: 'Golden Dunes' },
  { id: '16', title: 'Shimla Ridge, Himachal', img: destHimachal, tag: 'Colonial Charm' },
  { id: '17', title: 'Ooty Lake Hills, Tamil Nadu', img: destOoty, tag: 'Nilgiri Serenity' },
  { id: '18', title: 'Gokarna Cliffs, Karnataka', img: destGokarna, tag: 'Untouched Shores' }
];

/* ---------- Frequently Asked Questions ---------- */
export const FAQS = [
  { 
    id: 'faq-ai-planner',
    q: 'How does the AI trip planner create my itinerary?', 
    a: 'Our AI analyzes your budget, travel style, interests, trip duration, and destination preferences to generate a personalized travel plan within seconds.', 
    bg: destKashmir 
  },
  { 
    id: 'faq-customize',
    q: 'Can I customize the itinerary generated by AI?', 
    a: 'Yes. You can fully edit destinations, activities, hotels, transport options, and trip duration anytime after the itinerary is generated.', 
    bg: destRajasthan 
  },
  { 
    id: 'faq-updates',
    q: 'Will my itinerary update if my plans change?', 
    a: 'Yes. You can instantly regenerate or modify your itinerary anytime if your travel dates, destination, or preferences change.', 
    bg: destKerala 
  },
  { 
    id: 'faq-speed',
    q: 'How quickly can the AI generate a trip plan?', 
    a: 'Most personalized itineraries are generated in just a few seconds depending on the complexity of the trip.', 
    bg: destGoa 
  },
  { 
    id: 'faq-budget',
    q: 'Does the AI help manage my travel budget?', 
    a: 'Yes. The planner provides estimated costs for hotels, transport, activities, and food to help you stay within your budget.', 
    bg: journalVaranasi 
  }
];

/* ---------- Travel Inspiration Categories ---------- */
export const INSPIRATION_CARDS = [
  {
    id: 'adventure',
    title: 'Adventure Trails',
    subtitle: 'Himalayan hikes, Ladakh roads, Meghalaya escapes',
    img: journalHimachal,
    queryParam: 'Adventure',
    isVertical: true
  },
  {
    id: 'beach',
    title: 'Beach Escapes',
    subtitle: 'Goa, Andaman, Gokarna, Kerala coastlines',
    img: destGoa,
    queryParam: 'Beach',
    isHorizontal: true
  },
  {
    id: 'cultural',
    title: 'Cultural Journeys',
    subtitle: 'Jaipur, Varanasi, Hampi, spiritual circuits',
    img: journalVaranasi,
    queryParam: 'Heritage'
  },
  {
    id: 'luxury',
    title: 'Luxury Retreats',
    subtitle: 'Palaces, wellness resorts, curated stays',
    img: luxuryResortImg,
    queryParam: 'Luxury'
  }
];

/* Images for WhyAltairgo & FAQ Section collages */
export const COLLAGE_IMAGES = {
  kerala: journalKerala,
  himachal: journalHimachal,
  varanasi: journalVaranasi,
  kashmir: destKashmir,
  rajasthan: destRajasthan,
  goa: destGoa,
  desert: 'https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?q=80&w=800&auto=format&fit=crop',
  mountains: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop'
};

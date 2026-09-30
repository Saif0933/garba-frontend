import {
  User,
  FestivalEvent,
  CityInfo,
  SquadGroup,
  PartnerRequest,
  Match,
  Conversation,
  ChatMessage,
  AppNotification,
  SafetyReport,
  PricingPlan,
  BlogPost
} from '../types';

export const CURRENT_DEMO_USER: User = {
  id: 'user-001',
  name: 'Aarohi Verma',
  email: 'user@garbamitra.com',
  phone: '+91 98765 43210',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
  age: 23,
  dateOfBirth: '2003-05-14',
  gender: 'Female',
  city: 'Ranchi',
  area: 'Morabadi / Lalpur',
  bio: 'Passionate about traditional 3-Taali & Dodhiya! Looking for a rhythm-friendly partner for Ranchi Garba Night. Love dressing in Chaniya Cholis and dancing non-stop.',
  garbaLevel: 'Intermediate',
  dandiyaLevel: 'Intermediate',
  danceStyle: 'Traditional',
  lookingFor: ['Partner', 'Group'],
  preferredGender: 'Any',
  preferredAgeMin: 21,
  preferredAgeMax: 29,
  preferredEvents: ['event-ranchi-01', 'event-ranchi-02'],
  availability: {
    dates: ['2026-10-16', '2026-10-18', '2026-10-19'],
    startTime: '19:00',
    endTime: '23:30'
  },
  isVerified: {
    mobile: true,
    email: true,
    photo: true
  },
  role: 'user',
  isPremium: true,
  premiumPlan: 'Festival Pass',
  profileCompletion: 85,
  joinedAt: '2026-09-10',
  status: 'active'
};

export const DEMO_ADMIN_USER: User = {
  id: 'admin-001',
  name: 'Vikramaditya Rathore',
  email: 'admin@garbamitra.com',
  phone: '+91 98111 22334',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
  age: 32,
  gender: 'Male',
  city: 'Ranchi',
  area: 'Main Road',
  bio: 'GarbaMitra Lead Safety & Event Operations Admin.',
  garbaLevel: 'Expert',
  dandiyaLevel: 'Expert',
  danceStyle: 'All Styles',
  lookingFor: ['Group'],
  preferredGender: 'Any',
  preferredAgeMin: 20,
  preferredAgeMax: 40,
  preferredEvents: ['event-ranchi-01'],
  availability: {
    dates: ['2026-10-16', '2026-10-18'],
    startTime: '18:00',
    endTime: '23:59'
  },
  isVerified: {
    mobile: true,
    email: true,
    photo: true
  },
  role: 'admin',
  isPremium: true,
  profileCompletion: 100,
  joinedAt: '2026-08-01',
  status: 'active'
};

export const MOCK_CITIES: CityInfo[] = [
  {
    id: 'city-ranchi',
    name: 'Ranchi',
    slug: 'ranchi',
    state: 'Jharkhand',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80',
    partnerCount: 148,
    eventCount: 6,
    popularAreas: ['Morabadi Ground', 'Khelgaon', 'Harmu', 'Lalpur', 'Doranda', 'Bariatu'],
    description: 'Jharkhand’s liveliest Garba hub featuring mega grounds, stadium Dandiya nights, and vibrant youth squads.',
    isTopCity: true
  },
  {
    id: 'city-ahmedabad',
    name: 'Ahmedabad',
    slug: 'ahmedabad',
    state: 'Gujarat',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
    partnerCount: 1420,
    eventCount: 28,
    popularAreas: ['SG Highway', 'Sindhu Bhavan', 'Vastrapur', 'Manek Chowk', 'Bopal'],
    description: 'The world capital of Navratri with legendary United Way, GMDC, and traditional Sheri Garba.',
    isTopCity: true
  },
  {
    id: 'city-mumbai',
    name: 'Mumbai',
    slug: 'mumbai',
    state: 'Maharashtra',
    image: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=800&q=80',
    partnerCount: 980,
    eventCount: 22,
    popularAreas: ['Borivali', 'Goregaon', 'Ghatkopar', 'Bandra', 'Thane', 'Dadar'],
    description: 'High energy celebrity Dandiya nights, Falguni Pathak spectacles, and star-studded festive grounds.',
    isTopCity: true
  },
  {
    id: 'city-delhi',
    name: 'Delhi NCR',
    slug: 'delhi-ncr',
    state: 'Delhi / NCR',
    image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80',
    partnerCount: 760,
    eventCount: 18,
    popularAreas: ['Cyber Hub Gurugram', 'Noida Sector 62', 'Rohini', 'Dwarka', 'CP'],
    description: 'Mega indoor arenas, college festival Dandiyas, and grand corporate festive galas.',
    isTopCity: true
  },
  {
    id: 'city-bengaluru',
    name: 'Bengaluru',
    slug: 'bengaluru',
    state: 'Karnataka',
    image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=800&q=80',
    partnerCount: 640,
    eventCount: 14,
    popularAreas: ['Palace Grounds', 'Koramangala', 'Indiranagar', 'Whitefield', 'HSR Layout'],
    description: 'Tech city’s fusion Dandiya nights, open-air lawns, and vibrant community celebrations.',
    isTopCity: true
  },
  {
    id: 'city-pune',
    name: 'Pune',
    slug: 'pune',
    state: 'Maharashtra',
    image: 'https://images.unsplash.com/photo-1609137144822-0a15324b1716?auto=format&fit=crop&w=800&q=80',
    partnerCount: 520,
    eventCount: 12,
    popularAreas: ['Koregaon Park', 'Baner', 'Kothrud', 'Viman Nagar', 'Hinjewadi'],
    description: 'Youthful university crowds, grand lawn Dandiyas, and traditional Gujarati Samaj events.',
    isTopCity: true
  },
  {
    id: 'city-surat',
    name: 'Surat',
    slug: 'surat',
    state: 'Gujarat',
    image: 'https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&w=800&q=80',
    partnerCount: 890,
    eventCount: 19,
    popularAreas: ['Dumas Road', 'Adajan', 'Vesu', 'Piplod', 'Katargam'],
    description: 'Diamond city’s opulent dome setups, colorful Chaniya Choli showcases, and endless energetic steps.',
    isTopCity: true
  },
  {
    id: 'city-vadodara',
    name: 'Vadodara',
    slug: 'vadodara',
    state: 'Gujarat',
    image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80',
    partnerCount: 940,
    eventCount: 16,
    popularAreas: ['Navlakhi Ground', 'Alkapuri', 'Karelibaug', 'Gotri', 'Manjalpur'],
    description: 'The cultural soul of Baroda Garba with soulful vocals, synchronous 30,000-person concentric circles.',
    isTopCity: true
  },
  {
    id: 'city-indore',
    name: 'Indore',
    slug: 'indore',
    state: 'Madhya Pradesh',
    image: 'https://images.unsplash.com/photo-1598970434795-0c54fe7c0648?auto=format&fit=crop&w=800&q=80',
    partnerCount: 430,
    eventCount: 10,
    popularAreas: ['Abhay Prashal', 'Vijay Nagar', 'Palasia', 'Bhawarkua'],
    description: 'Cleanest city celebration blending royal Malwa traditions with energetic Dandiya Raas.',
    isTopCity: false
  },
  {
    id: 'city-jaipur',
    name: 'Jaipur',
    slug: 'jaipur',
    state: 'Rajasthan',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
    partnerCount: 380,
    eventCount: 9,
    popularAreas: ['Mansarovar', 'Malviya Nagar', 'Vaishali Nagar', 'C-Scheme'],
    description: 'Royal Rajasthani heritage palace lawns lit up with festive Dandiya beats and vibrant lehengas.',
    isTopCity: false
  },
  {
    id: 'city-kolkata',
    name: 'Kolkata',
    slug: 'kolkata',
    state: 'West Bengal',
    image: 'https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=800&q=80',
    partnerCount: 310,
    eventCount: 8,
    popularAreas: ['Salt Lake', 'Ballygunge', 'New Town', 'Bhowanipore'],
    description: 'Festive season extravaganza where Durga Puja pandal hopping meets high-tempo Dandiya nights.',
    isTopCity: false
  },
  {
    id: 'city-hyderabad',
    name: 'Hyderabad',
    slug: 'hyderabad',
    state: 'Telangana',
    image: 'https://images.unsplash.com/photo-1610476709841-ce921b714f34?auto=format&fit=crop&w=800&q=80',
    partnerCount: 360,
    eventCount: 9,
    popularAreas: ['Gachibowli', 'Madhapur', 'Secunderabad', 'Banjara Hills'],
    description: 'Huge convention center Dandiyas and vibrant Gujarati Pragati Samaj mega celebrations.',
    isTopCity: false
  }
];

export const MOCK_EVENTS: FestivalEvent[] = [
  {
    id: 'event-ranchi-01',
    slug: 'ranchi-garba-night-2026',
    title: 'Ranchi Garba Night 2026',
    tagline: 'Jharkhand’s Biggest Open-Air Navratri Extravaganza',
    bannerImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80',
    city: 'Ranchi',
    venue: 'Morabadi Ground, Ranchi',
    address: 'Morabadi Football Ground Road, Ranchi, Jharkhand 834008',
    date: '2026-10-18',
    displayDate: '18 October 2026',
    startTime: '19:00',
    endTime: '23:30',
    price: 499,
    originalPrice: 699,
    isFeatured: true,
    isTrending: true,
    organizer: {
      name: 'Ranchi Festival Arts Committee',
      verified: true,
      contact: 'events@ranchigarba.org'
    },
    description: 'Get ready for an electrifying night of rhythm, beats, and celebration at Morabadi Ground. Featuring live traditional Gujarati Dhol players, celebrity DJ mix, food court with 50+ festive delicacies, and grand prizes for Best Dressed & Best Dancing Pair.',
    rules: [
      'Traditional or festive ethnic wear is mandatory for arena entry',
      'Original Government ID required for 18+ age verification',
      'Dandiya sticks available at venue or bring your own wooden sticks',
      'Zero tolerance for misconduct, harassment or outside alcohol'
    ],
    whatToExpect: [
      'Live 12-piece Gujarati Folk & Bollywood Fusion Band',
      'Massive 40,000 sq.ft wooden-treated dance floor',
      'Professional photographers and 360° video booth',
      'Dedicated partner meetup zone with safe GarbaMitra lounge'
    ],
    safetyInfo: [
      '24x7 On-site medical booth with standby ambulance',
      'Over 60 private security personnel + women marshals',
      'CCTV monitored venue with well-lit parking zones',
      'Direct liaison with Ranchi Police Emergency Desk (112)'
    ],
    dressCode: 'Authentic Chaniya Choli, Kediyu, Kurta Pyjama or Festive Ethnic',
    registeredCount: 128,
    lookingForPartnerCount: 46,
    groupsCount: 14,
    category: 'Garba Night'
  },
  {
    id: 'event-ranchi-02',
    slug: 'dandiya-utsav-ranchi',
    title: 'Dandiya Utsav Ranchi',
    tagline: 'High Energy Beats, Dhol Tasha & Synchronous Dandiya',
    bannerImage: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1200&q=80',
    city: 'Ranchi',
    venue: 'Mega Sports Complex, Khelgaon Stadium',
    address: 'Khelgaon Sports Complex, Hotwar, Ranchi, Jharkhand 835217',
    date: '2026-10-16',
    displayDate: '16 October 2026',
    startTime: '18:30',
    endTime: '23:00',
    price: 399,
    originalPrice: 599,
    isFeatured: true,
    isTrending: false,
    organizer: {
      name: 'Jharkhand Dandiya Club',
      verified: true
    },
    description: 'An indoor stadium Dandiya spectacle with state-of-the-art acoustic sound and festive laser lights. Perfect for squads, intermediate dancers, and new festival friends looking for a high-octane evening.',
    rules: [
      'Entry strictly with valid digital ticket and QR scan',
      'Dandiya sticks included with early bird passes',
      'Follow ground etiquette and respect personal dancing space'
    ],
    whatToExpect: [
      'Indoor AC arena with cushion floor',
      'Special Sanedo & Raas competitions with prizes',
      'Authentic Gujarati fafda-jalebi and mocktail counters'
    ],
    safetyInfo: [
      'Bouncers stationed at every entry/exit gate',
      'Dedicated female safety helpdesk',
      'Rapid emergency exit corridors'
    ],
    dressCode: 'Ethnic Festive attire',
    registeredCount: 94,
    lookingForPartnerCount: 31,
    groupsCount: 9,
    category: 'Dandiya Raas'
  },
  {
    id: 'event-ranchi-03',
    slug: 'navratri-dance-fest-harmu',
    title: 'Navratri Dance Fest',
    tagline: 'Traditional 3-Taali & Community Circle Garba',
    bannerImage: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80',
    city: 'Ranchi',
    venue: 'Harmu Community Ground, Harmu Housing Colony',
    address: 'Near Harmu Ground, Ranchi, Jharkhand 834002',
    date: '2026-10-19',
    displayDate: '19 October 2026',
    startTime: '19:00',
    endTime: '23:00',
    price: 299,
    originalPrice: 450,
    isFeatured: false,
    isTrending: false,
    organizer: {
      name: 'Harmu Utsav Samiti',
      verified: true
    },
    description: 'Community-centric soulful traditional Garba with concentric circle dancing, classical Aarti, and warmth. Great for beginners and cultural enthusiasts.',
    rules: [
      'Modest festive wear encouraged',
      'Keep dance steps rhythmic with circle flow'
    ],
    whatToExpect: [
      'Traditional live shehnai & dhol musicians',
      'Prasad distribution after Maha Aarti',
      'Friendly and welcoming neighborhood crowd'
    ],
    safetyInfo: ['Local community volunteers and CCTV surveillance'],
    registeredCount: 72,
    lookingForPartnerCount: 22,
    groupsCount: 6,
    category: 'Traditional Mandli'
  },
  {
    id: 'event-ranchi-04',
    slug: 'garba-night-live-chanakya',
    title: 'Garba Night Live @ Hotel Chanakya',
    tagline: 'Premium Rooftop Dandiya & Gourmet Buffet Experience',
    bannerImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80',
    city: 'Ranchi',
    venue: 'Rooftop Lawn, Hotel Chanakya BNR',
    address: 'Station Road, Ranchi, Jharkhand 834001',
    date: '2026-10-20',
    displayDate: '20 October 2026',
    startTime: '19:30',
    endTime: '23:59',
    price: 599,
    originalPrice: 899,
    isFeatured: true,
    isTrending: true,
    organizer: {
      name: 'BNR Hospitality & Events',
      verified: true
    },
    description: 'An exclusive boutique Garba celebration under the stars with live fusion band, royal heritage backdrop, and lavish festive dinner buffet included.',
    rules: [
      'Smart festive ethnic wear mandatory',
      'Limited capacity of 300 guests for premium comfort'
    ],
    whatToExpect: [
      'Gourmet festive multi-cuisine buffet',
      'VIP lounge seating and signature mocktails',
      'Live singer performing Garba fusion hits'
    ],
    safetyInfo: ['Hotel five-star standard security and valet parking'],
    registeredCount: 88,
    lookingForPartnerCount: 28,
    groupsCount: 8,
    category: 'Mega Utsav'
  },
  {
    id: 'event-ahm-01',
    slug: 'united-way-garba-ahmedabad',
    title: 'United Navratri Utsav Ahmedabad',
    tagline: 'The Holy Grail of Navratri with 40,000 Dancers',
    bannerImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
    city: 'Ahmedabad',
    venue: 'GMDC Ground, Helmet Cross Roads',
    address: '132 Feet Ring Road, Memnagar, Ahmedabad, Gujarat 380052',
    date: '2026-10-18',
    displayDate: '18 October 2026',
    startTime: '20:00',
    endTime: '02:00',
    price: 799,
    isFeatured: true,
    organizer: { name: 'Gujarat Cultural Society', verified: true },
    description: 'Experience the world-renowned Ahmedabad Garba phenomenon with synchronous 10-tier concentric circles, legendary folk singers, and unmatched devotional energy.',
    rules: ['Traditional Kedia / Chaniya Choli required for arena entry', 'Biometric QR passes strictly enforced'],
    whatToExpect: ['40,000+ dancers in unison', 'Epic sound installation', 'Famous Atul Purohit style folk melodies'],
    safetyInfo: ['200+ police marshals, extensive camera network, female rapid response team'],
    registeredCount: 420,
    lookingForPartnerCount: 110,
    groupsCount: 48,
    category: 'Garba Night'
  },
  {
    id: 'event-mum-01',
    slug: 'mumbai-mega-dandiya-borivali',
    title: 'Mumbai Mega Dandiya Nights 2026',
    tagline: 'Queen of Dandiya Live in Borivali',
    bannerImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80',
    city: 'Mumbai',
    venue: 'Late Shri Pramod Mahajan Ground, Borivali West',
    address: 'Chikuwadi, Borivali West, Mumbai, Maharashtra 400092',
    date: '2026-10-18',
    displayDate: '18 October 2026',
    startTime: '19:30',
    endTime: '23:59',
    price: 899,
    isFeatured: true,
    organizer: { name: 'Sankalp Entertainment Mumbai', verified: true },
    description: 'Mumbai’s most iconic Dandiya celebration with celebrity singers, Bollywood stars, and over 15,000 enthusiastic Mumbaikars dancing together.',
    rules: ['ID verification at gate', 'No backpacks inside the main arena'],
    whatToExpect: ['Celebrity live performances', 'Massive laser light show', 'Special celebrity photo ops'],
    safetyInfo: ['Mumbai Police on-site station and private security network'],
    registeredCount: 310,
    lookingForPartnerCount: 82,
    groupsCount: 32,
    category: 'Mega Utsav'
  },
  {
    id: 'event-blr-01',
    slug: 'bengaluru-palace-dandiya-raas',
    title: 'Royal Palace Dandiya Raas Bengaluru',
    tagline: 'Dance under the Royal Chandeliers of Palace Grounds',
    bannerImage: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=80',
    city: 'Bengaluru',
    venue: 'Princess Shrine, Palace Grounds, Bellary Road',
    address: 'Jayachamarajendra Nagar, Bengaluru, Karnataka 560006',
    date: '2026-10-17',
    displayDate: '17 October 2026',
    startTime: '18:30',
    endTime: '23:30',
    price: 499,
    isFeatured: true,
    organizer: { name: 'Royal Beats Events BLR', verified: true },
    description: 'Bengaluru’s premier royal palace Dandiya extravaganza featuring top Gujarati DJs, live Dhol Tasha, and delicious festival food counters.',
    rules: ['Festive wear required', 'Entry passes non-transferable'],
    whatToExpect: ['Open-air lawn under fairy lights', 'Dance workshop for beginners from 6:30 to 7:15 PM'],
    safetyInfo: ['Private security, women help desks, verified transport pickup points'],
    registeredCount: 195,
    lookingForPartnerCount: 54,
    groupsCount: 19,
    category: 'Dandiya Raas'
  },
  {
    id: 'event-del-01',
    slug: 'delhi-ncr-mega-garba-utsav',
    title: 'Delhi NCR Mega Garba Utsav',
    tagline: 'The Capital’s Grandest Navratri Carnival',
    bannerImage: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=80',
    city: 'Delhi NCR',
    venue: 'JLN Stadium Grounds, Pragati Vihar',
    address: 'Near Lodhi Colony, New Delhi 110003',
    date: '2026-10-18',
    displayDate: '18 October 2026',
    startTime: '19:00',
    endTime: '23:30',
    price: 549,
    isFeatured: true,
    organizer: { name: 'Capital Festivals Org', verified: true },
    description: 'Grand festive carnival with Dandiya workshops, celebrity appearances, 40+ North & West Indian food stalls, and energetic music sets.',
    rules: ['Ethnic wear is mandatory', 'Strictly 18+ for partner discovery zone'],
    whatToExpect: ['Massive dance floor with LED screens', 'GarbaMitra Connect Lounge'],
    safetyInfo: ['Delhi Police support, female security guards, first aid zone'],
    registeredCount: 240,
    lookingForPartnerCount: 68,
    groupsCount: 22,
    category: 'Mega Utsav'
  }
];

export const MOCK_USERS: User[] = [
  {
    id: 'user-002',
    name: 'Rahul Sen',
    email: 'rahul.sen@example.com',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    age: 24,
    gender: 'Male',
    city: 'Ranchi',
    area: 'Khelgaon / Bariatu',
    bio: 'Dandiya enthusiast who loves syncing fast spins! Attending Ranchi Garba Night. Looking for a partner who knows basic 2-taali or wants to learn together.',
    garbaLevel: 'Intermediate',
    dandiyaLevel: 'Expert',
    danceStyle: 'Modern Bollywood',
    lookingFor: ['Partner', 'New Friends'],
    preferredGender: 'Female',
    preferredAgeMin: 20,
    preferredAgeMax: 26,
    preferredEvents: ['event-ranchi-01', 'event-ranchi-02'],
    availability: {
      dates: ['2026-10-16', '2026-10-18'],
      startTime: '19:00',
      endTime: '23:30'
    },
    isVerified: { mobile: true, email: true, photo: true },
    role: 'user',
    isPremium: true,
    profileCompletion: 90,
    joinedAt: '2026-09-08',
    status: 'active'
  },
  {
    id: 'user-003',
    name: 'Neha Singh',
    email: 'neha.singh@example.com',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
    age: 22,
    gender: 'Female',
    city: 'Ranchi',
    area: 'Harmu Housing Colony',
    bio: 'Navratri is my favorite festival of the year! Dressed in full traditional Kutch embroidery. Looking for a fun partner or squad to dance till late night.',
    garbaLevel: 'Expert',
    dandiyaLevel: 'Intermediate',
    danceStyle: 'Traditional',
    lookingFor: ['Partner', 'Group'],
    preferredGender: 'Any',
    preferredAgeMin: 21,
    preferredAgeMax: 28,
    preferredEvents: ['event-ranchi-01', 'event-ranchi-03'],
    availability: {
      dates: ['2026-10-18', '2026-10-19'],
      startTime: '19:30',
      endTime: '23:30'
    },
    isVerified: { mobile: true, email: true, photo: true },
    role: 'user',
    isPremium: false,
    profileCompletion: 95,
    joinedAt: '2026-09-12',
    status: 'active'
  },
  {
    id: 'user-004',
    name: 'Aditya Raj',
    email: 'aditya.raj@example.com',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80',
    age: 25,
    gender: 'Male',
    city: 'Ranchi',
    area: 'Lalpur / Circular Road',
    bio: 'Software engineer by day, high-tempo Garba spinner by night! Looking for someone who can keep up with fast beats at Morabadi ground.',
    garbaLevel: 'Intermediate',
    dandiyaLevel: 'Beginner',
    danceStyle: 'Traditional',
    lookingFor: ['Partner', 'Group'],
    preferredGender: 'Female',
    preferredAgeMin: 21,
    preferredAgeMax: 27,
    preferredEvents: ['event-ranchi-01'],
    availability: {
      dates: ['2026-10-18'],
      startTime: '19:00',
      endTime: '23:00'
    },
    isVerified: { mobile: true, email: true, photo: true },
    role: 'user',
    isPremium: true,
    profileCompletion: 80,
    joinedAt: '2026-09-15',
    status: 'active'
  },
  {
    id: 'user-005',
    name: 'Riya Gupta',
    email: 'riya.gupta@example.com',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80',
    age: 21,
    gender: 'Female',
    city: 'Ranchi',
    area: 'Doranda / Hinoo',
    bio: 'Beginner to Garba but super energetic! Looking for a patient partner or girl squad to teach me steps and enjoy delicious street food snacks together.',
    garbaLevel: 'Beginner',
    dandiyaLevel: 'Beginner',
    danceStyle: 'Fusion',
    lookingFor: ['Partner', 'New Friends'],
    preferredGender: 'Any',
    preferredAgeMin: 20,
    preferredAgeMax: 25,
    preferredEvents: ['event-ranchi-01', 'event-ranchi-04'],
    availability: {
      dates: ['2026-10-18', '2026-10-20'],
      startTime: '19:30',
      endTime: '23:00'
    },
    isVerified: { mobile: true, email: true, photo: false },
    role: 'user',
    isPremium: false,
    profileCompletion: 75,
    joinedAt: '2026-09-18',
    status: 'active'
  },
  {
    id: 'user-006',
    name: 'Karan Mehra',
    email: 'karan.mehra@example.com',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80',
    age: 26,
    gender: 'Male',
    city: 'Ranchi',
    area: 'Ashok Nagar',
    bio: 'Attending Hotel Chanakya Rooftop and Morabadi Ground. Love fusion Dandiya steps and capturing cinematic reels!',
    garbaLevel: 'Intermediate',
    dandiyaLevel: 'Intermediate',
    danceStyle: 'Modern Bollywood',
    lookingFor: ['Partner'],
    preferredGender: 'Female',
    preferredAgeMin: 22,
    preferredAgeMax: 27,
    preferredEvents: ['event-ranchi-01', 'event-ranchi-04'],
    availability: {
      dates: ['2026-10-18', '2026-10-20'],
      startTime: '19:00',
      endTime: '23:59'
    },
    isVerified: { mobile: true, email: true, photo: true },
    role: 'user',
    isPremium: true,
    profileCompletion: 90,
    joinedAt: '2026-09-05',
    status: 'active'
  },
  {
    id: 'user-007',
    name: 'Priya Sharma',
    email: 'priya.sharma@example.com',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
    age: 24,
    gender: 'Female',
    city: 'Ranchi',
    area: 'Ratu Road',
    bio: 'Trained classical dancer with high rhythm accuracy. Ready to dance the 6-step and Dodhiya in full glory at Ranchi Garba Night!',
    garbaLevel: 'Expert',
    dandiyaLevel: 'Expert',
    danceStyle: 'Traditional',
    lookingFor: ['Partner', 'Group'],
    preferredGender: 'Any',
    preferredAgeMin: 22,
    preferredAgeMax: 29,
    preferredEvents: ['event-ranchi-01'],
    availability: {
      dates: ['2026-10-18'],
      startTime: '19:00',
      endTime: '23:30'
    },
    isVerified: { mobile: true, email: true, photo: true },
    role: 'user',
    isPremium: false,
    profileCompletion: 100,
    joinedAt: '2026-09-02',
    status: 'active'
  },
  {
    id: 'user-008',
    name: 'Ananya Roy',
    email: 'ananya.roy@example.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    age: 23,
    gender: 'Female',
    city: 'Kolkata',
    area: 'Salt Lake Sector 5',
    bio: 'Festive vibes all the way! Looking for a Dandiya partner to groove at the big festival nights.',
    garbaLevel: 'Intermediate',
    dandiyaLevel: 'Intermediate',
    danceStyle: 'Fusion',
    lookingFor: ['Partner', 'New Friends'],
    preferredGender: 'Any',
    preferredAgeMin: 21,
    preferredAgeMax: 27,
    preferredEvents: ['event-blr-01'],
    availability: {
      dates: ['2026-10-17', '2026-10-18'],
      startTime: '19:00',
      endTime: '23:00'
    },
    isVerified: { mobile: true, email: true, photo: true },
    role: 'user',
    isPremium: false,
    profileCompletion: 85,
    joinedAt: '2026-09-14',
    status: 'active'
  },
  {
    id: 'user-009',
    name: 'Arjun Desai',
    email: 'arjun.desai@example.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    age: 27,
    gender: 'Male',
    city: 'Ahmedabad',
    area: 'Sindhu Bhavan Road',
    bio: 'Born and raised with Garba in my blood. Dancing at United Way! Looking for an expert partner to match fast spins.',
    garbaLevel: 'Expert',
    dandiyaLevel: 'Expert',
    danceStyle: 'Traditional',
    lookingFor: ['Partner'],
    preferredGender: 'Female',
    preferredAgeMin: 22,
    preferredAgeMax: 28,
    preferredEvents: ['event-ahm-01'],
    availability: {
      dates: ['2026-10-18'],
      startTime: '20:00',
      endTime: '02:00'
    },
    isVerified: { mobile: true, email: true, photo: true },
    role: 'user',
    isPremium: true,
    profileCompletion: 95,
    joinedAt: '2026-09-01',
    status: 'active'
  },
  {
    id: 'user-010',
    name: 'Ishita Patel',
    email: 'ishita.patel@example.com',
    avatar: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=600&q=80',
    age: 24,
    gender: 'Female',
    city: 'Ahmedabad',
    area: 'Vastrapur',
    bio: 'United Way regular! Ready with my 9-day custom outfit rotation. Love dancing in large synchronized groups.',
    garbaLevel: 'Expert',
    dandiyaLevel: 'Expert',
    danceStyle: 'Traditional',
    lookingFor: ['Group', 'Partner'],
    preferredGender: 'Any',
    preferredAgeMin: 22,
    preferredAgeMax: 30,
    preferredEvents: ['event-ahm-01'],
    availability: {
      dates: ['2026-10-18'],
      startTime: '20:00',
      endTime: '02:00'
    },
    isVerified: { mobile: true, email: true, photo: true },
    role: 'user',
    isPremium: true,
    profileCompletion: 100,
    joinedAt: '2026-08-28',
    status: 'active'
  },
  {
    id: 'user-011',
    name: 'Tanmay Joshi',
    email: 'tanmay.joshi@example.com',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
    age: 26,
    gender: 'Male',
    city: 'Mumbai',
    area: 'Borivali West',
    bio: 'Borivali Dandiya fanatic. Going with a group of friends and looking for 2-3 more energetic dancers to complete our squad.',
    garbaLevel: 'Intermediate',
    dandiyaLevel: 'Expert',
    danceStyle: 'Modern Bollywood',
    lookingFor: ['Group', 'New Friends'],
    preferredGender: 'Any',
    preferredAgeMin: 21,
    preferredAgeMax: 29,
    preferredEvents: ['event-mum-01'],
    availability: {
      dates: ['2026-10-18'],
      startTime: '19:30',
      endTime: '23:59'
    },
    isVerified: { mobile: true, email: true, photo: true },
    role: 'user',
    isPremium: false,
    profileCompletion: 85,
    joinedAt: '2026-09-04',
    status: 'active'
  },
  {
    id: 'user-012',
    name: 'Simran Kaur',
    email: 'simran.kaur@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80',
    age: 23,
    gender: 'Female',
    city: 'Delhi NCR',
    area: 'Gurugram Sector 43',
    bio: 'Love the festival energy and traditional dhol beats! Looking for a dependable partner for Delhi JLN stadium Garba.',
    garbaLevel: 'Intermediate',
    dandiyaLevel: 'Beginner',
    danceStyle: 'Fusion',
    lookingFor: ['Partner'],
    preferredGender: 'Male',
    preferredAgeMin: 22,
    preferredAgeMax: 28,
    preferredEvents: ['event-del-01'],
    availability: {
      dates: ['2026-10-18'],
      startTime: '19:00',
      endTime: '23:30'
    },
    isVerified: { mobile: true, email: true, photo: true },
    role: 'user',
    isPremium: true,
    profileCompletion: 90,
    joinedAt: '2026-09-11',
    status: 'active'
  },
  {
    id: 'user-013',
    name: 'Devansh Trivedi',
    email: 'devansh.trivedi@example.com',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    age: 25,
    gender: 'Male',
    city: 'Ranchi',
    area: 'Morabadi',
    bio: 'Living right next to Morabadi Ground! Ready for all 9 nights of dance. Excited to partner with someone who loves high energy Dandiya.',
    garbaLevel: 'Expert',
    dandiyaLevel: 'Intermediate',
    danceStyle: 'Traditional',
    lookingFor: ['Partner', 'Group'],
    preferredGender: 'Female',
    preferredAgeMin: 21,
    preferredAgeMax: 27,
    preferredEvents: ['event-ranchi-01', 'event-ranchi-02'],
    availability: {
      dates: ['2026-10-16', '2026-10-18', '2026-10-19'],
      startTime: '19:00',
      endTime: '23:30'
    },
    isVerified: { mobile: true, email: true, photo: true },
    role: 'user',
    isPremium: false,
    profileCompletion: 85,
    joinedAt: '2026-09-17',
    status: 'active'
  },
  {
    id: 'user-014',
    name: 'Kavya Nair',
    email: 'kavya.nair@example.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    age: 24,
    gender: 'Female',
    city: 'Bengaluru',
    area: 'Koramangala',
    bio: 'Palace Grounds Dandiya is our annual ritual. Looking for a partner who loves both Bollywood remixes and authentic steps.',
    garbaLevel: 'Intermediate',
    dandiyaLevel: 'Expert',
    danceStyle: 'Modern Bollywood',
    lookingFor: ['Partner'],
    preferredGender: 'Any',
    preferredAgeMin: 22,
    preferredAgeMax: 29,
    preferredEvents: ['event-blr-01'],
    availability: {
      dates: ['2026-10-17'],
      startTime: '18:30',
      endTime: '23:30'
    },
    isVerified: { mobile: true, email: true, photo: true },
    role: 'user',
    isPremium: false,
    profileCompletion: 85,
    joinedAt: '2026-09-13',
    status: 'active'
  }
];

export const MOCK_GROUPS: SquadGroup[] = [
  {
    id: 'group-001',
    name: 'Ranchi Garba Squad 💫',
    eventId: 'event-ranchi-01',
    eventName: 'Ranchi Garba Night 2026',
    city: 'Ranchi',
    date: '18 October 2026',
    venue: 'Morabadi Ground, Ranchi',
    description: 'Energetic group of 8 dancers planning coordinated dance entries, 3-Taali circles, and matching color themes (Royal Blue & Gold). Open to 2 more friendly dancers!',
    leaderId: 'user-003',
    leaderName: 'Neha Singh',
    leaderAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
    maxMembers: 10,
    currentMembers: [
      { id: 'user-003', name: 'Neha Singh', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80', role: 'Leader', garbaLevel: 'Expert' },
      { id: 'user-002', name: 'Rahul Sen', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80', role: 'Member', garbaLevel: 'Intermediate' },
      { id: 'user-007', name: 'Priya Sharma', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80', role: 'Member', garbaLevel: 'Expert' },
      { id: 'user-004', name: 'Aditya Raj', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80', role: 'Member', garbaLevel: 'Intermediate' },
      { id: 'user-006', name: 'Karan Mehra', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80', role: 'Member', garbaLevel: 'Intermediate' }
    ],
    lookingForCount: 2,
    tags: ['Coordinated Theme', 'Ranchi Morabadi', 'Intermediate+'],
    dressTheme: 'Royal Blue & Golden Accents'
  },
  {
    id: 'group-002',
    name: 'Khelgaon Dandiya Warriors 🔥',
    eventId: 'event-ranchi-02',
    eventName: 'Dandiya Utsav Ranchi',
    city: 'Ranchi',
    date: '16 October 2026',
    venue: 'Mega Sports Complex, Khelgaon Stadium',
    description: 'Fast-tempo Dandiya crew. We love speed rotations, synchronized stick clashing, and friendly competition!',
    leaderId: 'user-002',
    leaderName: 'Rahul Sen',
    leaderAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    maxMembers: 8,
    currentMembers: [
      { id: 'user-002', name: 'Rahul Sen', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80', role: 'Leader', garbaLevel: 'Intermediate' },
      { id: 'user-013', name: 'Devansh Trivedi', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80', role: 'Member', garbaLevel: 'Expert' }
    ],
    lookingForCount: 3,
    tags: ['Fast Dandiya', 'Indoor Arena', 'High Energy'],
    dressTheme: 'Bright Orange & Magenta'
  },
  {
    id: 'group-003',
    name: 'Ahmedabad United Dancers ✨',
    eventId: 'event-ahm-01',
    eventName: 'United Navratri Utsav Ahmedabad',
    city: 'Ahmedabad',
    date: '18 October 2026',
    venue: 'GMDC Ground, Helmet Cross Roads',
    description: 'Traditional Baroda-Ahmedabad fusion mandli forming synchronous outer circles at United Way.',
    leaderId: 'user-009',
    leaderName: 'Arjun Desai',
    leaderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    maxMembers: 12,
    currentMembers: [
      { id: 'user-009', name: 'Arjun Desai', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80', role: 'Leader', garbaLevel: 'Expert' },
      { id: 'user-010', name: 'Ishita Patel', avatar: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=600&q=80', role: 'Member', garbaLevel: 'Expert' }
    ],
    lookingForCount: 4,
    tags: ['United Way', 'Traditional Mandli', 'Expert Circles']
  }
];

export const MOCK_PARTNER_REQUESTS: PartnerRequest[] = [
  {
    id: 'req-001',
    senderId: 'user-002',
    senderName: 'Rahul Sen',
    senderAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    senderCity: 'Ranchi',
    senderAge: 24,
    senderGarbaLevel: 'Intermediate',
    recipientId: 'user-001',
    recipientName: 'Aarohi Verma',
    recipientAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    eventId: 'event-ranchi-01',
    eventName: 'Ranchi Garba Night 2026',
    eventDate: '18 Oct 2026',
    message: 'Hey Aarohi! I saw you are attending Ranchi Garba Night at Morabadi. I know intermediate 3-Taali and Dandiya. Would love to dance together!',
    status: 'pending',
    createdAt: '2026-09-30 11:20'
  },
  {
    id: 'req-002',
    senderId: 'user-004',
    senderName: 'Aditya Raj',
    senderAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80',
    senderCity: 'Ranchi',
    senderAge: 25,
    senderGarbaLevel: 'Intermediate',
    recipientId: 'user-001',
    recipientName: 'Aarohi Verma',
    recipientAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    eventId: 'event-ranchi-01',
    eventName: 'Ranchi Garba Night 2026',
    eventDate: '18 Oct 2026',
    message: 'Hi Aarohi, let us sync up for the 18 Oct Garba Night! Our energy will be great on the floor.',
    status: 'pending',
    createdAt: '2026-09-29 18:45'
  },
  {
    id: 'req-003',
    senderId: 'user-001',
    senderName: 'Aarohi Verma',
    senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    senderCity: 'Ranchi',
    senderAge: 23,
    senderGarbaLevel: 'Intermediate',
    recipientId: 'user-007',
    recipientName: 'Priya Sharma',
    recipientAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
    eventId: 'event-ranchi-01',
    eventName: 'Ranchi Garba Night 2026',
    eventDate: '18 Oct 2026',
    message: 'Hi Priya! Loved your classical background. Would love to join you for the main 6-step circle!',
    status: 'accepted',
    createdAt: '2026-09-28 14:10'
  }
];

export const MOCK_MATCHES: Match[] = [
  {
    id: 'match-001',
    users: ['user-001', 'user-007'],
    partner: MOCK_USERS.find(u => u.id === 'user-007') || MOCK_USERS[0],
    eventId: 'event-ranchi-01',
    eventName: 'Ranchi Garba Night 2026',
    eventDate: '18 Oct 2026',
    matchPercentage: 94,
    matchedAt: '2026-09-28',
    status: 'active',
    lastMessageSnippet: 'Super excited! Let’s meet at the GarbaMitra lounge at 7 PM.'
  },
  {
    id: 'match-002',
    users: ['user-001', 'user-003'],
    partner: MOCK_USERS.find(u => u.id === 'user-003') || MOCK_USERS[1],
    eventId: 'event-ranchi-01',
    eventName: 'Ranchi Garba Night 2026',
    eventDate: '18 Oct 2026',
    matchPercentage: 91,
    matchedAt: '2026-09-25',
    status: 'active',
    lastMessageSnippet: 'Yes! Our squad is wearing Royal Blue.'
  }
];

export const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-001',
    participantId: 'user-007',
    participant: MOCK_USERS.find(u => u.id === 'user-007') || MOCK_USERS[0],
    eventId: 'event-ranchi-01',
    eventName: 'Ranchi Garba Night 2026',
    lastMessage: 'Super excited! Let’s meet at the GarbaMitra lounge at 7 PM.',
    lastMessageTime: '10:45 AM',
    unreadCount: 0,
    isOnline: true,
    contactShared: {
      userShared: false,
      partnerShared: false
    }
  },
  {
    id: 'conv-002',
    participantId: 'user-003',
    participant: MOCK_USERS.find(u => u.id === 'user-003') || MOCK_USERS[1],
    eventId: 'event-ranchi-01',
    eventName: 'Ranchi Garba Night 2026',
    lastMessage: 'Yes! Our squad is wearing Royal Blue.',
    lastMessageTime: 'Yesterday',
    unreadCount: 1,
    isOnline: false,
    contactShared: {
      userShared: false,
      partnerShared: false
    }
  }
];

export const MOCK_CHAT_MESSAGES: Record<string, ChatMessage[]> = {
  'conv-001': [
    {
      id: 'msg-1',
      conversationId: 'conv-001',
      senderId: 'system',
      text: '🎉 Mutual Festival Match! You and Priya matched for Ranchi Garba Night 2026. Remember: Always meet inside the registered public venue and never share financial information.',
      timestamp: '28 Sep, 02:15 PM',
      status: 'read',
      isSystemNotice: true
    },
    {
      id: 'msg-2',
      conversationId: 'conv-001',
      senderId: 'user-007',
      text: 'Hey Aarohi! So happy we matched! Are you attending the 18 Oct Ranchi Garba Night?',
      timestamp: '28 Sep, 02:20 PM',
      status: 'read'
    },
    {
      id: 'msg-3',
      conversationId: 'conv-001',
      senderId: 'user-001',
      text: 'Yes, I will definitely be there! Have got my pass and traditional Chaniya Choli ready ✨',
      timestamp: '28 Sep, 02:22 PM',
      status: 'read'
    },
    {
      id: 'msg-4',
      conversationId: 'conv-001',
      senderId: 'user-007',
      text: 'Are you coming with a group or looking to dance primarily in pairs?',
      timestamp: '28 Sep, 02:25 PM',
      status: 'read'
    },
    {
      id: 'msg-5',
      conversationId: 'conv-001',
      senderId: 'user-001',
      text: 'I am looking for a partner for the main 3-taali and 6-step rounds, then we can join the big circle together!',
      timestamp: '28 Sep, 02:28 PM',
      status: 'read'
    },
    {
      id: 'msg-6',
      conversationId: 'conv-001',
      senderId: 'user-007',
      text: 'Great! I am also intermediate-expert. Super excited! Let’s meet at the GarbaMitra lounge at 7 PM.',
      timestamp: 'Today, 10:45 AM',
      status: 'read'
    }
  ],
  'conv-002': [
    {
      id: 'msg-201',
      conversationId: 'conv-002',
      senderId: 'system',
      text: '🎉 Mutual Festival Match! You and Neha matched for Ranchi Garba Night 2026.',
      timestamp: '25 Sep, 06:10 PM',
      status: 'read',
      isSystemNotice: true
    },
    {
      id: 'msg-202',
      conversationId: 'conv-002',
      senderId: 'user-003',
      text: 'Hi Aarohi! We have formed a Ranchi Garba Squad with 8 members.',
      timestamp: 'Yesterday, 04:12 PM',
      status: 'read'
    },
    {
      id: 'msg-203',
      conversationId: 'conv-002',
      senderId: 'user-001',
      text: 'That sounds amazing! What color are you all planning to wear?',
      timestamp: 'Yesterday, 05:01 PM',
      status: 'read'
    },
    {
      id: 'msg-204',
      conversationId: 'conv-002',
      senderId: 'user-003',
      text: 'Yes! Our squad is wearing Royal Blue.',
      timestamp: 'Yesterday, 06:18 PM',
      status: 'delivered'
    }
  ]
};

export const MOCK_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-001',
    userId: 'user-001',
    type: 'partner_request',
    title: 'New Partner Request',
    message: 'Rahul Sen sent you a partner request for Ranchi Garba Night.',
    timestamp: '15 minutes ago',
    isRead: false,
    actionUrl: '/requests',
    senderAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'notif-002',
    userId: 'user-001',
    type: 'new_match',
    title: '🎉 You Found a Garba Partner!',
    message: 'Priya Sharma accepted your request. You are now matched for Ranchi Garba Night 2026.',
    timestamp: '2 hours ago',
    isRead: false,
    actionUrl: '/messages',
    senderAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'notif-003',
    userId: 'user-001',
    type: 'new_message',
    title: '💬 Neha Singh sent you a message',
    message: '“Yes! Our squad is wearing Royal Blue.”',
    timestamp: 'Yesterday',
    isRead: true,
    actionUrl: '/messages',
    senderAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'notif-004',
    userId: 'user-001',
    type: 'event_reminder',
    title: '📅 Ranchi Garba Night starts in 18 days',
    message: 'Prepare your traditional outfit & coordinate meetup time with your partner.',
    timestamp: '2 days ago',
    isRead: true,
    actionUrl: '/events/event-ranchi-01'
  },
  {
    id: 'notif-005',
    userId: 'user-001',
    type: 'safety_alert',
    title: '🛡️ Festival Safety Reminder',
    message: 'Always meet inside the public event ground and use GarbaMitra in-app chat.',
    timestamp: '3 days ago',
    isRead: true,
    actionUrl: '/safety'
  }
];

export const MOCK_PRICING_PLANS: PricingPlan[] = [
  {
    id: 'plan-1day',
    name: '1 Day Pass',
    tagline: 'Ideal for a single night of Dandiya & partner discovery',
    price: 49,
    duration: '24 Hours',
    features: [
      'Send up to 10 partner requests',
      'Basic city event filter',
      'In-app safe chat with matched partners',
      'Verified 18+ attendee badge',
      'Standard customer support'
    ]
  },
  {
    id: 'plan-3day',
    name: '3 Day Pass',
    tagline: 'Perfect for weekend festival lovers & multiple event nights',
    price: 99,
    duration: '3 Days',
    features: [
      'Send up to 30 partner requests',
      'Advanced filters (Dance level, style & time)',
      'Squad Group joining & creation',
      'See who viewed your festival profile',
      'Priority event notification alerts'
    ]
  },
  {
    id: 'plan-festival',
    name: 'Festival Pass',
    tagline: 'The ultimate 9-night Navratri companion for active dancers',
    price: 199,
    duration: 'Full Season (15 Days)',
    isPopular: true,
    badge: '🌟 Most Popular Choice',
    features: [
      'Unlimited partner requests across all cities',
      'Instant Match algorithm prioritization',
      'Profile Spotlight Boost (3x more partner views)',
      'See who requested you before responding',
      'Join unlimited Squad groups',
      'Verified Gold Partner badge',
      'Direct WhatsApp emergency desk & VIP concierge'
    ]
  },
  {
    id: 'plan-premium',
    name: 'Premium Festival Pass',
    tagline: 'VIP access with exclusive event discounts & VIP lounge access',
    price: 299,
    duration: 'Full Season + Post-Navratri',
    features: [
      'Everything in Festival Pass',
      'Exclusive ₹100 discount on select event tickets',
      'VIP GarbaMitra meetup lounge entry at select grounds',
      'Professional photographer tag on matched reels',
      'Future access to Diwali & Holi partner platforms'
    ]
  }
];

export const MOCK_SAFETY_REPORTS: SafetyReport[] = [
  {
    id: 'rep-001',
    reporterId: 'user-005',
    reporterName: 'Riya Gupta',
    reportedUserId: 'user-099',
    reportedUserName: 'Vikram Malhotra',
    reason: 'Unwanted Messages',
    description: 'User repeatedly messaged asking for personal WhatsApp number and exact home address before mutual match.',
    createdAt: '2026-09-29 14:30',
    status: 'Under Review',
    priority: 'High'
  },
  {
    id: 'rep-002',
    reporterId: 'user-003',
    reporterName: 'Neha Singh',
    reportedUserId: 'user-098',
    reportedUserName: 'Amit Kumar',
    reason: 'Fake Profile',
    description: 'Profile uses celebrity stock photo and refuses 18+ ID selfie verification.',
    createdAt: '2026-09-28 09:15',
    status: 'Pending',
    priority: 'Medium'
  },
  {
    id: 'rep-003',
    reporterId: 'user-007',
    reporterName: 'Priya Sharma',
    reportedUserId: 'user-097',
    reportedUserName: 'Deepak Verma',
    reason: 'Scam',
    description: 'Attempted to sell unverified counterfeit VIP passes in direct messages.',
    createdAt: '2026-09-27 16:40',
    status: 'Resolved',
    priority: 'Urgent',
    resolutionNotes: 'Account banned and user phone blacklisted from the platform.'
  }
];

export const MOCK_BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-001',
    slug: 'how-to-find-garba-partner-ranchi',
    title: 'How to Find a Garba Partner in Ranchi (2026 Guide)',
    excerpt: 'Step-by-step guide to discovering verified Dandiya & Garba partners in Ranchi, coordinating outfits, and meeting safely at Morabadi Ground.',
    coverImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
    author: {
      name: 'Riddhi Shah',
      role: 'Festival Cultural Lead',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
    },
    publishedDate: '24 Sep 2026',
    readTime: '4 min read',
    category: 'Guides & Tips',
    content: [
      'Navratri in Ranchi has grown exponentially over the last five years. From Morabadi Ground to Khelgaon Stadium and Harmu, thousands of youth and families step out every evening.',
      'However, showing up alone without a partner or dance squad can feel daunting. That is where GarbaMitra changes the game: by letting you match with dancers attending the exact same Ranchi event.',
      'Key tips for finding your Ranchi partner:',
      '1. Select your event early (Ranchi Garba Night fills fast).',
      '2. State your dance level clearly (whether 2-taali beginner or Dodhiya pro).',
      '3. Always meet inside the registered venue near the main food pavilion or designated GarbaMitra meetup zone.'
    ]
  },
  {
    id: 'blog-002',
    slug: 'best-garba-events-ranchi-2026',
    title: 'Top 5 Best Garba & Dandiya Events in Ranchi (2026 Edition)',
    excerpt: 'Explore the biggest open-air grounds, stadium extravaganzas, and luxury rooftop Dandiyas happening across Ranchi this Navratri.',
    coverImage: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=800&q=80',
    author: {
      name: 'Aditya Raj',
      role: 'Ranchi City Editor',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80'
    },
    publishedDate: '20 Sep 2026',
    readTime: '5 min read',
    category: 'City Highlights',
    content: [
      'Ranchi is gearing up for its most vibrant Navratri season yet. Here are the top events you cannot miss:',
      '1. Ranchi Garba Night 2026 (Morabadi Ground): Expected to draw 4,000+ dancers with live 12-piece Gujarati orchestra.',
      '2. Dandiya Utsav @ Khelgaon: High energy AC indoor setup with cushion flooring for effortless spinning.',
      '3. Navratri Dance Fest @ Harmu: Warm neighborhood vibe with traditional Aarti and concentric circles.',
      '4. Garba Night Live @ Hotel Chanakya: Rooftop heritage atmosphere paired with gourmet dinner buffet.'
    ]
  },
  {
    id: 'blog-003',
    slug: 'how-to-dress-for-garba-night',
    title: 'How to Dress for Garba Night: Traditional vs Modern Fusion',
    excerpt: 'Everything you need to know about comfortable footwear, lightweight Chaniya Cholis, Kediyu styling, and mirror-work accessories that withstand hours of dance.',
    coverImage: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
    author: {
      name: 'Priya Sharma',
      role: 'Fashion & Dance Curator',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80'
    },
    publishedDate: '18 Sep 2026',
    readTime: '6 min read',
    category: 'Fashion & Style',
    content: [
      'Looking stunning while dancing for 4 continuous hours requires smart fabric choices and supportive footwear.',
      'Avoid heavy non-breathable synthetic layers. Opt for pure cotton or lightweight georgette with genuine Kutchi mirror work.',
      'Footwear rule: Flat juttis with silicone gel padding or stylish ethnic mojaris will keep your feet pain-free through the 9 nights.'
    ]
  },
  {
    id: 'blog-004',
    slug: 'garba-partner-etiquette-dos-and-donts',
    title: 'Garba Partner Etiquette: Do’s and Don’ts for a Great Night',
    excerpt: 'Essential festival etiquette to keep interactions respectful, safe, fun, and rhythm-friendly for everyone on the floor.',
    coverImage: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
    author: {
      name: 'Vikramaditya Rathore',
      role: 'Community Safety Officer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'
    },
    publishedDate: '15 Sep 2026',
    readTime: '3 min read',
    category: 'Safety & Etiquette',
    content: [
      'Garba is a celebratory social dance built on community harmony and joy. Here are simple rules every GarbaMitra follows:',
      'DO: Confirm your meetup point inside the public festival gates.',
      'DO: Check your partner’s dance pace and adjust gracefully.',
      'DON’T: Pressure your partner for personal social handles or phone numbers before they feel comfortable.',
      'DON’T: Forget to stay hydrated and take resting intervals between fast sets.'
    ]
  },
  {
    id: 'blog-005',
    slug: 'garba-vs-dandiya-whats-the-difference',
    title: 'Garba vs Dandiya: What’s the Real Difference?',
    excerpt: 'Understand the distinct origins, circular steps, stick rhythms, and musical tempos of Garba and Dandiya Raas.',
    coverImage: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=800&q=80',
    author: {
      name: 'Riddhi Shah',
      role: 'Festival Cultural Lead',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
    },
    publishedDate: '10 Sep 2026',
    readTime: '4 min read',
    category: 'Culture & Heritage',
    content: [
      'While often spoken in the same breath, Garba and Dandiya represent two unique forms of devotional and celebratory art.',
      'Garba is traditionally performed in circular formations around an earthen lamp (Garbhadip) using rhythmic hand claps (2-Taali, 3-Taali) and graceful foot movements.',
      'Dandiya Raas involves paired polished wooden sticks that clash rhythmically to fast beats, often moving in two opposing linear or circular columns.'
    ]
  },
  {
    id: 'blog-006',
    slug: 'first-garba-night-beginner-guide',
    title: 'What to Expect at Your Very First Garba Night',
    excerpt: 'Never attended a Navratri night before? Here is a welcoming breakdown of the evening flow, Aarti, and simple steps.',
    coverImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80',
    author: {
      name: 'Rahul Sen',
      role: 'Community Mentor',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80'
    },
    publishedDate: '05 Sep 2026',
    readTime: '5 min read',
    category: 'Beginner Guides',
    content: [
      'Walking into a festival ground with thousands of swirling dancers can feel overwhelming at first, but Garba is the most inclusive dance form in India.',
      'Dancers welcome beginners into the outer slow circles. Stand beside someone patient, observe the 1-2-3 clap rhythm, and let the dhol carry your feet!'
    ]
  }
];

export const MOCK_ADMIN_ANALYTICS = {
  summary: {
    registeredUsers: 2846,
    activeUsers: 1734,
    verifiedProfiles: 2311,
    upcomingEvents: 42,
    partnerRequests: 3284,
    successfulMatches: 1129,
    premiumUsers: 284,
    todayRevenue: 18450
  },
  dailyRegistrations: [
    { date: '24 Sep', users: 140, requests: 210, matches: 84 },
    { date: '25 Sep', users: 185, requests: 290, matches: 112 },
    { date: '26 Sep', users: 240, requests: 380, matches: 145 },
    { date: '27 Sep', users: 310, requests: 460, matches: 190 },
    { date: '28 Sep', users: 420, requests: 620, matches: 260 },
    { date: '29 Sep', users: 510, requests: 780, matches: 340 },
    { date: '30 Sep', users: 640, requests: 940, matches: 420 }
  ],
  cityDistribution: [
    { city: 'Ahmedabad', count: 1420, percentage: 38 },
    { city: 'Mumbai', count: 980, percentage: 26 },
    { city: 'Ranchi', count: 480, percentage: 14 },
    { city: 'Delhi NCR', count: 420, percentage: 12 },
    { city: 'Bengaluru', count: 340, percentage: 10 }
  ],
  revenueByPlan: [
    { plan: '1 Day Pass (₹49)', revenue: 14700, sales: 300 },
    { plan: '3 Day Pass (₹99)', revenue: 39600, sales: 400 },
    { plan: 'Festival Pass (₹199)', revenue: 119400, sales: 600 },
    { plan: 'Premium Pass (₹299)', revenue: 44850, sales: 150 }
  ]
};

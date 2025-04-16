/*const mongoose = require("mongoose");

const fakeListings = [
  {
    _id: new mongoose.Types.ObjectId("67b86f7ecdfd19fdd7252899"),
    title: "Luxury Apartment in Mumbai",
    description: "A stunning 3-bedroom apartment in the heart of Mumbai.",
    price: 15000,
    city: "Mumbai",
    country: "India",
    image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg", // Mumbai apartment
    propertyType: "Apartment",
    user: new mongoose.Types.ObjectId("67b707182c8cdca403f37bb0"),
    availableFrom: new Date("2025-01-01"),
    availableTo: new Date("2025-12-31"),
    maxGuests: 6,
    amenities: ["WiFi", "Pool", "Parking", "Gym"],
    bookings: [],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Beach House in Goa",
    description: "A beautiful beachfront house with stunning ocean views.",
    price: 20000,
    city: "Goa",
    country: "India",
    image: "https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg", // Goa beach house
    propertyType: "House",
    user: new mongoose.Types.ObjectId("67b707182c8cdca403f37bb0"),
    availableFrom: new Date("2025-02-01"),
    availableTo: new Date("2025-11-30"),
    maxGuests: 8,
    amenities: ["WiFi", "Beach Access", "BBQ Grill"],
    bookings: [],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Modern Loft in Bangalore",
    description: "A stylish loft with a dedicated workspace in Bangalore.",
    price: 12000,
    city: "Bangalore",
    country: "India",
    image: "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg", // Bangalore loft
    propertyType: "Loft",
    user: new mongoose.Types.ObjectId("67b707182c8cdca403f37bb0"),
    availableFrom: new Date("2025-03-01"),
    availableTo: new Date("2025-10-31"),
    maxGuests: 4,
    amenities: ["WiFi", "Workspace", "Gym"],
    bookings: [],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Cozy Cottage in Ooty",
    description: "A peaceful cottage nestled in the hills of Ooty.",
    price: 8000,
    city: "Ooty",
    country: "India",
    image: "https://images.pexels.com/photos/462235/pexels-photo-462235.jpeg", // Ooty cottage
    propertyType: "Cottage",
    user: new mongoose.Types.ObjectId("67b707182c8cdca403f37bb0"),
    availableFrom: new Date("2025-04-01"),
    availableTo: new Date("2025-09-30"),
    maxGuests: 4,
    amenities: ["WiFi", "Fireplace", "Garden"],
    bookings: [],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Luxury Villa in Hyderabad",
    description: "A luxurious villa with a private pool in Hyderabad.",
    price: 25000,
    city: "Hyderabad",
    country: "India",
    image: "https://images.pexels.com/photos/259962/pexels-photo-259962.jpeg", // Hyderabad villa
    propertyType: "Villa",
    user: new mongoose.Types.ObjectId("67b707182c8cdca403f37bb0"),
    availableFrom: new Date("2025-05-01"),
    availableTo: new Date("2025-12-31"),
    maxGuests: 10,
    amenities: ["WiFi", "Pool", "Gym", "Parking"],
    bookings: [],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Spacious Home in Chennai",
    description: "A 4-bedroom home in a quiet neighborhood in Chennai.",
    price: 18000,
    city: "Chennai",
    country: "India",
    image: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg", // Chennai home
    propertyType: "House",
    user: new mongoose.Types.ObjectId("67b707182c8cdca403f37bb0"),
    availableFrom: new Date("2025-06-01"),
    availableTo: new Date("2025-11-30"),
    maxGuests: 8,
    amenities: ["WiFi", "Backyard", "Garage"],
    bookings: [],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Studio Apartment in Pune",
    description: "A compact and modern studio apartment in Pune.",
    price: 10000,
    city: "Pune",
    country: "India",
    image: "https://images.pexels.com/photos/439391/pexels-photo-439391.jpeg", // Pune studio
    propertyType: "Apartment",
    user: new mongoose.Types.ObjectId("67b707182c8cdca403f37bb0"),
    availableFrom: new Date("2025-07-01"),
    availableTo: new Date("2025-12-31"),
    maxGuests: 2,
    amenities: ["WiFi", "Balcony", "Gym"],
    bookings: [],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Rustic Cabin in Manali",
    description: "A cozy cabin surrounded by the Himalayas in Manali.",
    price: 9000,
    city: "Manali",
    country: "India",
    image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg", // Manali cabin
    propertyType: "Cabin",
    user: new mongoose.Types.ObjectId("67b707182c8cdca403f37bb0"),
    availableFrom: new Date("2025-08-01"),
    availableTo: new Date("2025-12-31"),
    maxGuests: 4,
    amenities: ["WiFi", "Fireplace", "Hiking Trails"],
    bookings: [],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Modern Apartment in Delhi",
    description: "A 2-bedroom apartment with a balcony in Delhi.",
    price: 15000,
    city: "Delhi",
    country: "India",
    image: "https://images.pexels.com/photos/276671/pexels-photo-276671.jpeg", // Delhi apartment
    propertyType: "Apartment",
    user: new mongoose.Types.ObjectId("67b707182c8cdca403f37bb0"),
    availableFrom: new Date("2025-09-01"),
    availableTo: new Date("2025-12-31"),
    maxGuests: 4,
    amenities: ["WiFi", "Balcony", "Pool"],
    bookings: [],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Heritage Home in Jaipur",
    description: "A beautifully preserved heritage home in Jaipur.",
    price: 22000,
    city: "Jaipur",
    country: "India",
    image: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg", // Jaipur heritage home
    propertyType: "House",
    user: new mongoose.Types.ObjectId("67b707182c8cdca403f37bb0"),
    availableFrom: new Date("2025-10-01"),
    availableTo: new Date("2025-12-31"),
    maxGuests: 6,
    amenities: ["WiFi", "Garden", "Fireplace"],
    bookings: [],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Luxury Penthouse in Kolkata",
    description: "A luxurious penthouse with city views in Kolkata.",
    price: 30000,
    city: "Kolkata",
    country: "India",
    image: "https://images.pexels.com/photos/259962/pexels-photo-259962.jpeg", // Kolkata penthouse
    propertyType: "Penthouse",
    user: new mongoose.Types.ObjectId("67b707182c8cdca403f37bb0"),
    availableFrom: new Date("2025-11-01"),
    availableTo: new Date("2025-12-31"),
    maxGuests: 4,
    amenities: ["WiFi", "Pool", "Gym", "Parking"],
    bookings: [],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Beachfront Villa in Kerala",
    description: "A luxurious villa with direct access to the beach in Kerala.",
    price: 28000,
    city: "Kerala",
    country: "India",
    image: "https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg", // Kerala beach villa
    propertyType: "Villa",
    user: new mongoose.Types.ObjectId("67b707182c8cdca403f37bb0"),
    availableFrom: new Date("2025-12-01"),
    availableTo: new Date("2025-12-31"),
    maxGuests: 8,
    amenities: ["WiFi", "Beach Access", "BBQ Grill"],
    bookings: [],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Hilltop Cottage in Shimla",
    description: "A cozy cottage with panoramic views of the hills in Shimla.",
    price: 12000,
    city: "Shimla",
    country: "India",
    image: "https://images.pexels.com/photos/462235/pexels-photo-462235.jpeg", // Shimla cottage
    propertyType: "Cottage",
    user: new mongoose.Types.ObjectId("67b707182c8cdca403f37bb0"),
    availableFrom: new Date("2025-01-01"),
    availableTo: new Date("2025-12-31"),
    maxGuests: 4,
    amenities: ["WiFi", "Fireplace", "Garden"],
    bookings: [],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Modern Apartment in Ahmedabad",
    description: "A 2-bedroom apartment with modern amenities in Ahmedabad.",
    price: 11000,
    city: "Ahmedabad",
    country: "India",
    image: "https://images.pexels.com/photos/276671/pexels-photo-276671.jpeg", // Ahmedabad apartment
    propertyType: "Apartment",
    user: new mongoose.Types.ObjectId("67b707182c8cdca403f37bb0"),
    availableFrom: new Date("2025-02-01"),
    availableTo: new Date("2025-12-31"),
    maxGuests: 4,
    amenities: ["WiFi", "Balcony", "Gym"],
    bookings: [],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Luxury Farmhouse in Chandigarh",
    description: "A luxurious farmhouse with a private pool in Chandigarh.",
    price: 25000,
    city: "Chandigarh",
    country: "India",
    image: "https://images.pexels.com/photos/259962/pexels-photo-259962.jpeg", // Chandigarh farmhouse
    propertyType: "Farmhouse",
    user: new mongoose.Types.ObjectId("67b707182c8cdca403f37bb0"),
    availableFrom: new Date("2025-03-01"),
    availableTo: new Date("2025-12-31"),
    maxGuests: 10,
    amenities: ["WiFi", "Pool", "Gym", "Parking"],
    bookings: [],
  },
];

module.exports = fakeListings; */

/*const mongoose = require("mongoose");

const fakeListings = [
  {
    _id: new mongoose.Types.ObjectId("67b86f7ecdfd19fdd7252899"),
    title: "Luxury Apartment in Mumbai",
    description: `This stunning 3-bedroom apartment in South Mumbai offers breathtaking sea views from its floor-to-ceiling windows. The 2,200 sq ft residence features Italian marble flooring, a modular kitchen with premium appliances, and a master suite with walk-in closet. The building boasts 24/7 security, concierge service, infinity pool, spa, and children's play area. Located moments from Marine Drive and Colaba's art galleries, this property combines luxury living with cultural richness. Perfect for executives seeking sophisticated urban living with access to Mumbai's finest restaurants and business districts. The apartment comes fully furnished with smart home technology and climate control throughout.`,
    price: 15000,
    city: "Mumbai",
    country: "India",
    image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
    propertyType: "Apartment",
    user: new mongoose.Types.ObjectId("67b707182c8cdca403f37bb0"),
    availableFrom: new Date("2025-01-01"),
    availableTo: new Date("2025-12-31"),
    maxGuests: 6,
    amenities: ["WiFi", "Infinity Pool", "Secure Parking", "Fitness Center", "Concierge", "Smart Home"],
    bookings: []
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Beachfront Villa in Goa",
    description: `Nestled along a pristine stretch of sand in North Goa, this 4-bedroom Portuguese-style villa blends traditional architecture with modern luxury. The property features a private infinity pool, outdoor dining pavilion, and direct beach access. Each bedroom opens to sea views and includes ensuite bathrooms with rain showers. The villa's 3,000 sq ft living space includes a gourmet kitchen, media room, and yoga deck. Daily housekeeping and chef services available. Located near Anjuna's vibrant markets yet secluded for privacy. Perfect for families or groups wanting authentic Goan charm with contemporary comforts. Sunset views from the rooftop terrace are unforgettable.`,
    price: 20000,
    city: "Goa",
    country: "India",
    image: "https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg",
    propertyType: "Villa",
    user: new mongoose.Types.ObjectId("67b707182c8cdca403f37bb0"),
    availableFrom: new Date("2025-02-01"),
    availableTo: new Date("2025-11-30"),
    maxGuests: 8,
    amenities: ["Private Beach", "Infinity Pool", "Chef Service", "Yoga Deck", "Outdoor Shower", "Media Room"],
    bookings: []
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Designer Loft in Bangalore",
    description: `This architect-designed loft in central Bangalore features industrial-chic aesthetics with exposed brick walls and steel beam ceilings. The 1,800 sq ft open-plan space includes a mezzanine bedroom, gourmet kitchen, and dedicated workspace with high-speed internet. Building amenities include co-working spaces, rooftop garden, and 24/7 security. Located in the heart of the tech district, minutes from UB City's luxury boutiques. The loft comes with smart lighting, premium sound system, and automated window treatments. Ideal for digital nomads or creative professionals seeking stylish urban living with excellent connectivity to Bangalore's startup ecosystem.`,
    price: 12000,
    city: "Bangalore",
    country: "India",
    image: "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg",
    propertyType: "Loft",
    user: new mongoose.Types.ObjectId("67b707182c8cdca403f37bb0"),
    availableFrom: new Date("2025-03-01"),
    availableTo: new Date("2025-10-31"),
    maxGuests: 4,
    amenities: ["High-Speed WiFi", "Co-Working Space", "Rooftop Garden", "Smart Home", "Sound System", "Workspace"],
    bookings: []
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Heritage Haveli in Jaipur",
    description: `Experience royal living in this meticulously restored 19th-century haveli in Jaipur's old city. The property features hand-painted frescoes, antique furnishings, and a central courtyard with fountain. Five air-conditioned suites include four-poster beds and marble bathrooms. Enjoy authentic Rajasthani cuisine prepared by the in-house chef. The property includes a swimming pool, spa services, and guided heritage walks. Located near City Palace and Hawa Mahal, this heritage property offers cultural immersion with modern comforts. Evening cultural performances can be arranged. Perfect for travelers seeking an authentic royal experience with personalized service.`,
    price: 22000,
    city: "Jaipur",
    country: "India",
    image: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg",
    propertyType: "Heritage Home",
    user: new mongoose.Types.ObjectId("67b707182c8cdca403f37bb0"),
    availableFrom: new Date("2025-10-01"),
    availableTo: new Date("2025-12-31"),
    maxGuests: 6,
    amenities: ["Private Pool", "Spa Services", "Cultural Performances", "Chef", "AC", "Historical Architecture"],
    bookings: []
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Penthouse in Kolkata",
    description: `Perched on the 42nd floor, this luxurious penthouse offers panoramic views of Kolkata's skyline and the Hooghly River. The 3,500 sq ft residence features floor-to-ceiling windows, a designer kitchen, and a 1,000 sq ft terrace with jacuzzi. Building amenities include a sky lounge, temperature-controlled wine cellar, and chauffeur-driven car service. Located in the heart of the business district with direct elevator access to a luxury mall. The penthouse comes with smart home automation, premium entertainment system, and 24/7 concierge. Ideal for high-profile guests seeking privacy and exclusivity in Kolkata's most prestigious address.`,
    price: 30000,
    city: "Kolkata",
    country: "India",
    image: "https://images.pexels.com/photos/259962/pexels-photo-259962.jpeg",
    propertyType: "Penthouse",
    user: new mongoose.Types.ObjectId("67b707182c8cdca403f37bb0"),
    availableFrom: new Date("2025-11-01"),
    availableTo: new Date("2025-12-31"),
    maxGuests: 4,
    amenities: ["Private Terrace", "Jacuzzi", "Smart Home", "Wine Cellar", "Chauffeur Service", "Sky Lounge"],
    bookings: []
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Houseboat in Kerala",
    description: `Experience the magic of Kerala's backwaters aboard this luxurious 2-bedroom houseboat. The handcrafted vessel features teak wood interiors, a sun deck, and air-conditioned cabins with ensuite bathrooms. Cruise through tranquil waterways while enjoying freshly prepared Keralite cuisine. The boat includes a crew of three - captain, chef, and attendant. Daily itineraries include village visits and sunset cruises. Dock at private locations for birdwatching and fishing. Perfect for couples or small families seeking a peaceful retreat amidst palm-fringed canals. The boat is equipped with modern amenities while maintaining traditional charm.`,
    price: 18000,
    city: "Kerala",
    country: "India",
    image: "https://images.pexels.com/photos/427679/pexels-photo-427679.jpeg",
    propertyType: "Houseboat",
    user: new mongoose.Types.ObjectId("67b707182c8cdca403f37bb0"),
    availableFrom: new Date("2025-06-01"),
    availableTo: new Date("2025-09-30"),
    maxGuests: 4,
    amenities: ["AC Cabins", "Sun Deck", "Private Chef", "Fishing Equipment", "Village Tours", "Kayaks"],
    bookings: []
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Mountain Retreat in Manali",
    description: `This cedarwood cabin offers spectacular views of the Himalayas from its floor-to-ceiling windows. The 2-bedroom property features a stone fireplace, heated floors, and outdoor hot tub. Located on a private 2-acre forested plot with hiking trails. The cabin includes a fully-equipped kitchen and spa-style bathroom with soaking tub. Perfect for couples seeking a romantic getaway or writers/artists needing creative solitude. Winter access via private snowmobile. Summer activities include trout fishing and mountain biking. The property comes with a caretaker who prepares breakfast and can arrange guided treks.`,
    price: 9000,
    city: "Manali",
    country: "India",
    image: "https://images.pexels.com/photos/462235/pexels-photo-462235.jpeg",
    propertyType: "Cabin",
    user: new mongoose.Types.ObjectId("67b707182c8cdca403f37bb0"),
    availableFrom: new Date("2025-08-01"),
    availableTo: new Date("2025-12-31"),
    maxGuests: 4,
    amenities: ["Hot Tub", "Fireplace", "Heated Floors", "Hiking Trails", "Spa Bathroom", "Mountain Views"],
    bookings: []
  }
];

module.exports = fakeListings;*/
const mongoose = require("mongoose");
/*const listings = [
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Modern 2BHK Apartment with Lake View",
    description: "Stylish 2-bedroom apartment in Bengaluru's prime location featuring floor-to-ceiling windows with stunning lake views. Fully equipped kitchen, high-speed WiFi (100Mbps), and premium mattresses for ultimate comfort. Includes AC in both bedrooms, smart TV, and dedicated workspace. Building offers gym, swimming pool, and 24/7 security. Walking distance to cafes and shopping malls. Perfect for business travelers or families seeking comfort and convenience.",
    price: 2200,
    city: "Bengaluru",
    country: "India",
    images: [
      "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTM1MjcxOTk4NzgzODczMzE4MA%3D%3D/original/bef36e91-779b-46b8-b974-4d85f14b8651.jpeg?im_w=1200",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTM1MjcxOTk4NzgzODczMzE4MA%3D%3D/original/c1cf6195-1c00-49a1-9838-7081afdc4eb3.jpeg?im_w=720",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTM1MjcxOTk4NzgzODczMzE4MA%3D%3D/original/82604d59-d3bd-489c-a8b5-804e97dfed50.jpeg?im_w=720"
    ],
    propertyType: "Apartment",
    user: new mongoose.Types.ObjectId("67b707182c8cdca403f37bb0"),
    availableFrom: new Date("2025-06-01"),
    availableTo: new Date("2026-05-31"),
    maxGuests: 4,
    amenities: ["WiFi", "AC", "Swimming Pool", "Gym", "Smart TV"],
    bookings: []
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Cozy Studio in Mumbai's Art District",
    description: "Charming studio apartment located in Mumbai's vibrant art district. Features a queen-size bed, compact kitchenette, and workspace. Building has shared terrace with city views. Includes high-speed WiFi, AC, and weekly cleaning. Walking distance to galleries, cafes, and Colaba Causeway. Perfect for solo travelers or couples exploring Mumbai's cultural scene.",
    price: 1500,
    city: "Mumbai",
    country: "India",
    images: [
      "https://a0.muscache.com/im/pictures/hosting/Hosting-1364558723085852736/original/87dfd52c-7164-4cc2-93b1-0d93990725b8.jpeg?im_w=1200",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-1364558723085852736/original/673aad9b-2638-4af1-b27b-888d1612b4ed.jpeg?im_w=720",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-1364558723085852736/original/e5acda0d-78fc-47d5-86f8-56006403f4bb.jpeg?im_w=720"
    ],
    propertyType: "Flat",
    user: new mongoose.Types.ObjectId("67b707182c8cdca403f37bb1"),
    availableFrom: new Date("2025-07-15"),
    availableTo: new Date("2026-06-15"),
    maxGuests: 2,
    amenities: ["WiFi", "AC", "Kitchenette", "Workspace", "Terrace"],
    bookings: []
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Luxury Villa with Private Pool in Goa",
    description: "Stunning 3-bedroom villa in North Goa with private pool and tropical garden. Features open-plan living area, fully equipped kitchen, and outdoor dining space. Includes daily housekeeping and concierge service. Just 5 minutes walk to pristine beaches. Perfect for group vacations or special celebrations in paradise.",
    price: 8000,
    city: "Goa",
    country: "India",
    images: [
      "https://a0.muscache.com/im/pictures/hosting/Hosting-1370177447388866664/original/41b4ac72-e407-4e27-8e43-a783e655a2f7.jpeg?im_w=1200",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-1370177447388866664/original/41b4ac72-e407-4e27-8e43-a783e655a2f7.jpeg?im_w=1200",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-1370177447388866664/original/663e2287-7b6e-4ae5-98d0-9bf5aa5f4240.jpeg?im_w=720"
    ],
    propertyType: "Villa",
    user: new mongoose.Types.ObjectId("67b707182c8cdca403f37bb2"),
    availableFrom: new Date("2025-11-01"),
    availableTo: new Date("2026-04-30"),
    maxGuests: 6,
    amenities: ["Private Pool", "AC", "Garden", "Housekeeping", "Beach Access"],
    bookings: []
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Heritage House in Jaipur's Old City",
    description: "Beautifully restored haveli in Jaipur's historic center featuring traditional architecture with modern comforts. Includes 2 bedrooms with AC, courtyard seating, and rooftop terrace with city views. Experience authentic Rajasthani hospitality with optional cooking classes and guided tours. Walking distance to major attractions.",
    price: 3500,
    city: "Jaipur",
    country: "India",
    images: [
      "https://a0.muscache.com/im/pictures/miso/Hosting-1346628948170064718/original/0c45826e-922b-414f-a377-5f4f1f31067f.jpeg?im_w=1200",
      "https://a0.muscache.com/im/pictures/miso/Hosting-1346628948170064718/original/f8b2c399-97b8-4ca3-9ebc-88585779e2d2.jpeg?im_w=720",
      "https://a0.muscache.com/im/pictures/miso/Hosting-1346628948170064718/original/5d856edc-9667-4add-99ab-62439c503808.jpeg?im_w=720"
    ],
    propertyType: "House",
    user: new mongoose.Types.ObjectId("67b707182c8cdca403f37bb3"),
    availableFrom: new Date("2025-09-01"),
    availableTo: new Date("2026-08-31"),
    maxGuests: 4,
    amenities: ["AC", "Terrace", "Courtyard", "Cultural Activities", "Historic Property"],
    bookings: []
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Designer Apartment in Delhi's Diplomatic Area",
    description: "Sophisticated 1BHK apartment in Delhi's premium neighborhood. Features designer furnishings, fully equipped kitchen, and balcony with city views. Building offers gym, swimming pool, and 24/7 security. Close to embassies, fine dining, and shopping. Ideal for business travelers seeking luxury and convenience.",
    price: 3000,
    city: "Delhi",
    country: "India",
    images: [
      "https://a0.muscache.com/im/pictures/airflow/Hosting-956337527395728914/original/9eb93ac9-03b9-44db-870e-e7089085864e.jpg?im_w=1200",
      "https://a0.muscache.com/im/pictures/airflow/Hosting-956337527395728914/original/b47fb37b-4cce-4886-9e83-6ae43f57cebf.jpg?im_w=720",
      "https://a0.muscache.com/im/pictures/airflow/Hosting-956337527395728914/original/5be3a1be-da9b-4295-a392-df06fe458987.jpg?im_w=720"
    ],
    propertyType: "Apartment",
    user: new mongoose.Types.ObjectId("67b707182c8cdca403f37bb4"),
    availableFrom: new Date("2025-08-01"),
    availableTo: new Date("2026-07-31"),
    maxGuests: 2,
    amenities: ["Swimming Pool", "Gym", "AC", "Balcony", "Security"],
    bookings: []
  },
  // Additional 5 listings continue in the same format...
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Beachfront Cottage in Pondicherry",
    description: "Charming 1-bedroom cottage just steps from the beach in Pondicherry's French Quarter. Features private garden, open-air shower, and bicycle for guest use. Includes breakfast with French and Indian options. Perfect for romantic getaways or solo retreats in this peaceful coastal town.",
    price: 2800,
    city: "Pondicherry",
    country: "India",
    images: [
      "https://a0.muscache.com/im/ml/photo_enhancement/pictures/6e6e521d-c4c5-4a59-91bd-ac7d327f60e0.jpg?im_w=1200",
      "https://a0.muscache.com/im/ml/photo_enhancement/pictures/208e662a-67bd-46c9-810c-9e57f769ea60.jpg?im_w=720",
      "https://a0.muscache.com/im/ml/photo_enhancement/pictures/208e662a-67bd-46c9-810c-9e57f769ea60.jpg?im_w=720"
    ],
    propertyType: "House",
    user: new mongoose.Types.ObjectId("67b707182c8cdca403f37bb5"),
    availableFrom: new Date("2025-10-15"),
    availableTo: new Date("2026-03-15"),
    maxGuests: 2,
    amenities: ["Beach Access", "Garden", "Breakfast", "Bicycle", "Outdoor Shower"],
    bookings: []
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Penthouse with City Views in Hyderabad",
    description: "Luxurious 3BHK penthouse in Hyderabad's financial district featuring 360-degree city views. Includes premium furnishings, smart home system, and private terrace with jacuzzi. Building offers infinity pool, spa, and fine dining restaurant. Perfect for executives or special occasions.",
    price: 5000,
    city: "Hyderabad",
    country: "India",
    images: [
      "https://a0.muscache.com/im/ml/photo_enhancement/pictures/125804c8-cfc5-4044-b58f-bfe40afd9f34.jpg?im_w=1200",
      "https://a0.muscache.com/im/ml/photo_enhancement/pictures/21138b8a-d483-4b14-ab33-048b2262a927.jpg?im_w=720",
      "https://a0.muscache.com/im/ml/photo_enhancement/pictures/49502fde-92e2-4330-81ba-559bd8e0ff12.jpg?im_w=720"
    ],
    propertyType: "Apartment",
    user: new mongoose.Types.ObjectId("67b707182c8cdca403f37bb6"),
    availableFrom: new Date("2025-07-01"),
    availableTo: new Date("2026-06-30"),
    maxGuests: 6,
    amenities: ["Jacuzzi", "Infinity Pool", "Smart Home", "Spa", "Terrace"],
    bookings: []
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Artist's Flat in Kolkata's Cultural Hub",
    description: "Unique 1BHK flat in a heritage building in Kolkata's artistic neighborhood. Features original artwork, vintage furniture, and balcony overlooking bustling streets. Includes high-speed WiFi and workspace. Walking distance to galleries, bookstores, and famous eateries. Perfect for creative souls exploring Kolkata's vibrant culture.",
    price: 1800,
    city: "Kolkata",
    country: "India",
    images: [
      "https://a0.muscache.com/im/ml/photo_enhancement/pictures/hosting/Hosting-1054182165486422430/original/839eebf0-b118-4c2f-87b7-fd1216fac02f.jpeg?im_w=720",
      "https://a0.muscache.com/im/ml/photo_enhancement/pictures/hosting/Hosting-1054182165486422430/original/0c4f1090-3967-496c-9f99-4b880a9947e5.jpeg?im_w=720",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-1054182165486422430/original/fa7cdbb5-adc5-4e51-addb-6d94de3d62ce.jpeg?im_w=720"
    ],
    propertyType: "Flat",
    user: new mongoose.Types.ObjectId("67b707182c8cdca403f37bb7"),
    availableFrom: new Date("2025-09-15"),
    availableTo: new Date("2026-08-15"),
    maxGuests: 2,
    amenities: ["WiFi", "Workspace", "Balcony", "Artistic Decor", "Historic Building"],
    bookings: []
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Family Villa in Chennai's Suburbs",
    description: "Spacious 4-bedroom villa with private garden in Chennai's peaceful suburbs. Features modern kitchen, children's play area, and outdoor dining space. Includes domestic help and 24/7 security. Close to international schools and shopping centers. Perfect for relocating families or long-term stays.",
    price: 4500,
    city: "Chennai",
    country: "India",
    images: [
      "https://a0.muscache.com/im/ml/photo_enhancement/pictures/2e47832a-b7f6-4d75-86b9-e07c468ef61d.jpg?im_w=1200",
      "https://a0.muscache.com/im/ml/photo_enhancement/pictures/137f0f99-b7b0-43cd-9da2-536e96ab0722.jpg?im_w=720",
      "https://a0.muscache.com/im/ml/photo_enhancement/pictures/b5571ef5-9feb-4be8-84b7-7690e1c4e279.jpg?im_w=720"
    ],
    propertyType: "Villa",
    user: new mongoose.Types.ObjectId("67b707182c8cdca403f37bb8"),
    availableFrom: new Date("2025-08-20"),
    availableTo: new Date("2026-07-20"),
    maxGuests: 8,
    amenities: ["Garden", "Play Area", "Domestic Help", "Security", "Parking"],
    bookings: []
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Executive Studio in Pune's Tech Park",
    description: "Compact studio apartment located adjacent to Pune's major tech parks. Features smart storage solutions, ergonomic workspace, and kitchenette. Building offers co-working space, gym, and laundry facilities. Includes weekly cleaning. Perfect for business travelers on short-term assignments.",
    price: 2000,
    city: "Pune",
    country: "India",
    images: [
      "https://a0.muscache.com/im/pictures/hosting/Hosting-1183841935995495718/original/0b06da48-110c-4b1f-a3a8-4db71c1e4954.jpeg?im_w=720",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-1183841935995495718/original/5ff34857-8399-4576-b19b-377ead480b04.jpeg?im_w=720",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-1183841935995495718/original/0a6c743b-68fe-448e-9ec6-4477e82a3c8d.jpeg?im_w=720"
    ],
    propertyType: "Flat",
    user: new mongoose.Types.ObjectId("67b707182c8cdca403f37bb9"),
    availableFrom: new Date("2025-07-10"),
    availableTo: new Date("2026-06-10"),
    maxGuests: 1,
    amenities: ["Workspace", "Gym", "Laundry", "Co-working Space", "Weekly Cleaning"],
    bookings: []
  },

  // 11. Mountain View Cottage (Shimla)
{
  _id: new mongoose.Types.ObjectId(),
  title: "Himalayan Cottage with Panoramic Views",
  description: "Cozy 1-bedroom wooden cottage nestled in Shimla's apple orchards, offering breathtaking mountain views. Features a stone fireplace, private balcony, and traditional Himachali decor. Includes daily breakfast with local produce and guided nature walks. Perfect for couples seeking a romantic mountain escape. Just 10 minutes from Mall Road yet completely peaceful.",
  price: 3200,
  city: "Shimla",
  country: "India",
  images: [
    "https://a0.muscache.com/im/pictures/miso/Hosting-1222967228593798123/original/fa0e2dfd-6619-478a-8b35-113f06bb61ae.jpeg?im_w=720",
    "https://a0.muscache.com/im/pictures/miso/Hosting-1222967228593798123/original/91c1d087-3e9a-4e60-84ac-c242ac6e83ac.jpeg?im_w=1200",
    "https://a0.muscache.com/im/pictures/miso/Hosting-1222967228593798123/original/d15ec672-1343-4cdd-aca7-8ac85f1b5fb6.jpeg?im_w=720"
  ],
  propertyType: "Hotel",
  user: new mongoose.Types.ObjectId("67b707182c8cdca403f37bc0"),
  availableFrom: new Date("2025-05-01"),
  availableTo: new Date("2025-12-15"),
  maxGuests: 2,
  amenities: ["Mountain View", "Fireplace", "Balcony", "Breakfast", "Nature Walks"],
  bookings: []
},

// 12. Luxury Penthouse (Mumbai)
{
  _id: new mongoose.Types.ObjectId(),
  title: "Marine Drive Penthouse with Sea View",
  description: "Ultra-luxurious 3BHK penthouse on Mumbai's iconic Marine Drive. Features floor-to-ceiling windows, Italian marble floors, and private terrace with jacuzzi. Includes butler service, chef on request, and valet parking. Building has infinity pool, spa, and private cinema. Perfect for high-profile guests seeking privacy and luxury in South Mumbai.",
  price: 12000,
  city: "Mumbai",
  country: "India",
  images: [
    "https://a0.muscache.com/im/pictures/miso/Hosting-1000094124911351480/original/ea3e4c38-9fa2-4c80-9bae-b9236bb35f6a.jpeg?im_w=1200",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTAwMDA5NDEyNDkxMTM1MTQ4MA%3D%3D/original/6863012a-c2fb-43a7-bbd7-3ba865b5da12.jpeg?im_w=720",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTAwMDA5NDEyNDkxMTM1MTQ4MA%3D%3D/original/d8f6b939-af61-45c3-8f50-ac9b3d32445b.jpeg?im_w=720"
  ],
  propertyType: "Apartment",
  user: new mongoose.Types.ObjectId("67b707182c8cdca403f37bc1"),
  availableFrom: new Date("2025-10-01"),
  availableTo: new Date("2026-09-30"),
  maxGuests: 6,
  amenities: ["Sea View", "Jacuzzi", "Butler", "Infinity Pool", "Private Cinema"],
  bookings: []
},

// 13. Heritage Flat (Kolkata)
{
  _id: new mongoose.Types.ObjectId(),
  title: "Colonial-era Flat in Kolkata",
  description: "Charming 2BHK flat in a 1920s heritage building in Kolkata's cultural heart. Features high ceilings, original wooden floors, and antique furniture. Includes daily newspaper and tea service. Walking distance to Victoria Memorial and Park Street cafes. Perfect for history buffs wanting to experience Kolkata's golden era.",
  price: 2800,
  city: "Kolkata",
  country: "India",
  images: [
    "https://a0.muscache.com/im/pictures/miso/Hosting-1176438006817085733/original/e570f136-92ea-4910-9c65-5e46c4a59a87.jpeg?im_w=1200",
    "https://a0.muscache.com/im/pictures/miso/Hosting-1176438006817085733/original/413a1a18-0b94-46df-9172-4fa04595d806.jpeg?im_w=720",
    "https://a0.muscache.com/im/pictures/miso/Hosting-1176438006817085733/original/7e8f1dd3-e9f8-4fa0-8b6f-ee8243e0c1db.jpeg?im_w=720"
  ],
  propertyType: "Flat",
  user: new mongoose.Types.ObjectId("67b707182c8cdca403f37bc2"),
  availableFrom: new Date("2025-08-15"),
  availableTo: new Date("2026-07-15"),
  maxGuests: 4,
  amenities: ["Heritage Property", "High Ceilings", "Daily Tea", "Antique Decor", "Central Location"],
  bookings: []
},

// 14. Eco-Friendly Villa (Goa)
{
  _id: new mongoose.Types.ObjectId(),
  title: "Sustainable Bamboo Villa in South Goa",
  description: "Beautiful 2-bedroom villa made entirely of bamboo and recycled materials, set in a coconut grove. Features outdoor shower, solar power, and organic garden. Includes yoga deck and bicycles for guest use. Just 500m from a secluded beach. Perfect for eco-conscious travelers seeking harmony with nature.",
  price: 5500,
  city: "Goa",
  country: "India",
  images: [
    "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6NDYwNjA3Mzg%3D/original/99e23fcb-f8e6-4098-8549-c4e2a12bc55d.jpeg?im_w=1200",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6NDYwNjA3Mzg%3D/original/9a083065-18e6-471c-bb7f-76d9733fadff.jpeg?im_w=720",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6NDYwNjA3Mzg%3D/original/09e883cb-4c88-4e9b-a849-968772a7310e.jpeg?im_w=720"
  ],
  propertyType: "Villa",
  user: new mongoose.Types.ObjectId("67b707182c8cdca403f37bc3"),
  availableFrom: new Date("2025-11-01"),
  availableTo: new Date("2026-04-30"),
  maxGuests: 4,
  amenities: ["Eco-Friendly", "Solar Power", "Yoga Deck", "Bicycles", "Organic Garden"],
  bookings: []
},

// 15. Artist's Loft (Mumbai)
{
  _id: new mongoose.Types.ObjectId(),
  title: "Industrial-Chic Loft in Mumbai",
  description: "Spacious loft conversion in Mumbai's former mill district, featuring exposed brick walls and steel beams. Includes artist's studio space, vinyl record collection, and rooftop terrace. Walking distance to galleries and hipster cafes. Perfect for creative professionals seeking inspiration in Mumbai's trendiest neighborhood.",
  price: 3800,
  city: "Mumbai",
  country: "India",
  images: [
    "https://a0.muscache.com/im/pictures/airflow/Hosting-277504/original/a19a3eaf-2efc-413a-a231-eb01b2d5c48c.jpg?im_w=720",
    "https://a0.muscache.com/im/pictures/airflow/Hosting-277504/original/4705c8cb-c212-4e48-9966-cbfaf5cb5050.jpg?im_w=1200",
    "https://a0.muscache.com/im/pictures/airflow/Hosting-277504/original/4705c8cb-c212-4e48-9966-cbfaf5cb5050.jpg?im_w=1200"
  ],
  propertyType: "Apartment",
  user: new mongoose.Types.ObjectId("67b707182c8cdca403f37bc4"),
  availableFrom: new Date("2025-09-01"),
  availableTo: new Date("2026-08-31"),
  maxGuests: 3,
  amenities: ["Artist Studio", "Record Player", "Rooftop", "Industrial Decor", "Creative Space"],
  bookings: []
},

// 16. Treehouse Retreat (Bengaluru)
{
  _id: new mongoose.Types.ObjectId(),
  title: "Luxury house near Bengaluru",
  description: "Unique adults-only treehouse retreat set on a private estate 45 minutes from Bengaluru. Features king-size bed with canopy, outdoor bathtub, and panoramic forest views. Includes gourmet breakfast basket and evening bonfire. Perfect for digital detox or romantic weekend getaways surrounded by nature.",
  price: 4200,
  city: "Bengaluru",
  country: "India",
  images: [
    "https://a0.muscache.com/im/pictures/miso/Hosting-919527045734490373/original/791d85b5-f56c-4bd0-803d-e50fdcd36358.jpeg?im_w=1200",
    "https://a0.muscache.com/im/pictures/miso/Hosting-919527045734490373/original/6f5fc6d9-f0ee-482d-b145-217dc7655898.jpeg?im_w=720",
    "https://a0.muscache.com/im/pictures/miso/Hosting-919527045734490373/original/e4dafae6-034c-4efa-bcf4-c5f5adeacd7d.jpeg?im_w=720"
  ],
  propertyType: "House",
  user: new mongoose.Types.ObjectId("67b707182c8cdca403f37bc5"),
  availableFrom: new Date("2025-06-15"),
  availableTo: new Date("2026-05-15"),
  maxGuests: 2,
  amenities: ["Treehouse", "Outdoor Bathtub", "Breakfast Basket", "Forest Views", "Bonfire"],
  bookings: []
},

// 17. Houseboat (Kerala)
{
  _id: new mongoose.Types.ObjectId(),
  title: "Traditional Kerala Houseboat",
  description: "Authentic thatched-roof houseboat for private cruises through Kerala's backwaters. Features two bedrooms with AC, sun deck, and onboard chef preparing local cuisine. Includes sunset cruise and fishing equipment. Docked near Alleppey but can be booked for multi-day cruises. Perfect for experiencing Kerala's famous waterways in comfort.",
  price: 6800,
  city: "Alleppey",
  country: "India",
  images: [
    "https://a0.muscache.com/im/pictures/hosting/Hosting-45808969/original/e0830caa-b8b8-4ab2-8778-70872374ae47.jpeg?im_w=720",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6NDU4MDg5Njk%3D/original/8db0ef3a-65aa-444f-8e81-b1b4ae41fc0f.jpeg?im_w=1200",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-45808969/original/4de05c72-d7d0-41c9-a7a4-0a6d4f3b1140.jpeg?im_w=480"
  ],
  propertyType: "House",
  user: new mongoose.Types.ObjectId("67b707182c8cdca403f37bc6"),
  availableFrom: new Date("2025-10-01"),
  availableTo: new Date("2026-03-31"),
  maxGuests: 4,
  amenities: ["Houseboat", "Onboard Chef", "Sun Deck", "AC", "Fishing Equipment"],
  bookings: []
},

// 18. Luxury Tent (Rajasthan)
{
  _id: new mongoose.Types.ObjectId(),
  title: "Luxury Desert Camp in Jaisalmer",
  description: "Premium Swiss tent with private bathroom in a desert camp near Jaisalmer. Features four-poster bed, sitting area, and private bonfire space. Includes camel safari, cultural performances, and gourmet Rajasthani meals. Perfect for experiencing the Thar Desert in comfort without sacrificing authenticity.",
  price: 3800,
  city: "Jaisalmer",
  country: "India",
  images: [
    "https://a0.muscache.com/im/pictures/miso/Hosting-996901377686919245/original/553833c6-8d6f-4f79-8337-c7bc2fc8e45f.jpeg?im_w=1200",
    "https://a0.muscache.com/im/pictures/miso/Hosting-996901377686919245/original/2ed1c9ff-0674-436b-9845-58952b16c111.jpeg?im_w=720",
    "https://a0.muscache.com/im/pictures/miso/Hosting-996901377686919245/original/e82f3d8e-935c-4b75-8672-c24c1753293f.jpeg?im_w=720"
  ],
  propertyType: "House",
  user: new mongoose.Types.ObjectId("67b707182c8cdca403f37bc7"),
  availableFrom: new Date("2025-10-15"),
  availableTo: new Date("2026-03-15"),
  maxGuests: 2,
  amenities: ["Luxury Tent", "Private Bathroom", "Camel Safari", "Cultural Shows", "Bonfire"],
  bookings: []
},

// 19. Golf Villa (Delhi NCR)
{
  _id: new mongoose.Types.ObjectId(),
  title: "Villa in Gurgaon",
  description: "Elegant 3BHK villa overlooking a championship golf course in Gurgaon. Features private garden, home theater, and domestic staff. Includes golf club membership during stay. Close to corporate offices and shopping malls. Perfect for executives wanting luxury and recreation.",
  price: 8500,
  city: "Gurgaon",
  country: "India",
  images: [
    "https://a0.muscache.com/im/pictures/miso/Hosting-1118551674291132309/original/e3dc024c-2e10-4216-ac0f-6bc8b8a54cc4.jpeg?im_w=1200",
    "https://a0.muscache.com/im/pictures/miso/Hosting-1118551674291132309/original/33a96fbf-b031-4227-be54-26bac01bf6c9.jpeg?im_w=720",
    "https://a0.muscache.com/im/pictures/miso/Hosting-1118551674291132309/original/ffb3fb1c-a3e2-48e1-bf99-a46de37088c0.jpeg?im_w=720"
  ],
  propertyType: "Villa",
  user: new mongoose.Types.ObjectId("67b707182c8cdca403f37bc8"),
  availableFrom: new Date("2025-07-01"),
  availableTo: new Date("2026-06-30"),
  maxGuests: 6,
  amenities: ["Golf Course", "Home Theater", "Domestic Staff", "Garden", "Club Access"],
  bookings: []
},

// 20. Heritage Apartment (Mumbai)
{
  _id: new mongoose.Types.ObjectId(),
  title: "Art Deco Apartment in South Mumbai",
  description: "Stunning 2BHK in a 1930s Art Deco building, meticulously restored with original features. Features parquet floors, stained glass, and period furniture. Includes curated art collection and vinyl records. Walking distance to Marine Drive and Colaba. Perfect for design lovers wanting historic charm with modern comforts.",
  price: 4800,
  city: "Mumbai",
  country: "India",
  images: [
    "https://a0.muscache.com/im/pictures/miso/Hosting-1202951792250782408/original/83b3f1c9-15b3-45f0-a492-68f6c1605cf0.jpeg?im_w=1200",
    "https://a0.muscache.com/im/pictures/miso/Hosting-1202951792250782408/original/6f35783b-17a6-4f91-a517-a290ac89e7b6.jpeg?im_w=720",
    "https://a0.muscache.com/im/pictures/miso/Hosting-1202951792250782408/original/fa9df115-2280-4b10-b08f-9eda886d94ad.jpeg?im_w=720"
  ],
  propertyType: "Apartment",
  user: new mongoose.Types.ObjectId("67b707182c8cdca403f37bc9"),
  availableFrom: new Date("2025-08-01"),
  availableTo: new Date("2026-07-31"),
  maxGuests: 4,
  amenities: ["Art Deco", "Parquet Floors", "Vinyl Collection", "Historic Building", "Central Location"],
  bookings: []
}
];*/
const listings = [
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Modern 2BHK Apartment with Lake View",
    description: "Stylish 2-bedroom apartment in Bengaluru's prime location featuring floor-to-ceiling windows with stunning lake views. Fully equipped kitchen, high-speed WiFi (100Mbps), and premium mattresses for ultimate comfort. Includes AC in both bedrooms, smart TV, and dedicated workspace. Building offers gym, swimming pool, and 24/7 security. Walking distance to cafes and shopping malls. Perfect for business travelers or families seeking comfort and convenience.",
    price: 2200,
    city: "Bengaluru",
    country: "India",
    images: [
      { url: "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTM1MjcxOTk4NzgzODczMzE4MA%3D%3D/original/bef36e91-779b-46b8-b974-4d85f14b8651.jpeg?im_w=1200", filename: "bef36e91-779b-46b8-b974-4d85f14b8651" },
      { url: "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTM1MjcxOTk4NzgzODczMzE4MA%3D%3D/original/c1cf6195-1c00-49a1-9838-7081afdc4eb3.jpeg?im_w=720", filename: "c1cf6195-1c00-49a1-9838-7081afdc4eb3" },
      { url: "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTM1MjcxOTk4NzgzODczMzE4MA%3D%3D/original/82604d59-d3bd-489c-a8b5-804e97dfed50.jpeg?im_w=720", filename: "82604d59-d3bd-489c-a8b5-804e97dfed50" }
    ],
    propertyType: "Apartment",
    user: new mongoose.Types.ObjectId("67b707182c8cdca403f37bb0"),
    availableFrom: new Date("2025-06-01"),
    availableTo: new Date("2026-05-31"),
    maxGuests: 4,
    amenities: ["WiFi", "AC", "Swimming Pool", "Gym", "Smart TV"],
    bookings: [],
    reviews: []
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Cozy Studio in Mumbai's Art District",
    description: "Charming studio apartment located in Mumbai's vibrant art district. Features a queen-size bed, compact kitchenette, and workspace. Building has shared terrace with city views. Includes high-speed WiFi, AC, and weekly cleaning. Walking distance to galleries, cafes, and Colaba Causeway. Perfect for solo travelers or couples exploring Mumbai's cultural scene.",
    price: 1500,
    city: "Mumbai",
    country: "India",
    images: [
      { url: "https://a0.muscache.com/im/pictures/hosting/Hosting-1364558723085852736/original/87dfd52c-7164-4cc2-93b1-0d93990725b8.jpeg?im_w=1200", filename: "87dfd52c-7164-4cc2-93b1-0d93990725b8" },
      { url: "https://a0.muscache.com/im/pictures/hosting/Hosting-1364558723085852736/original/673aad9b-2638-4af1-b27b-888d1612b4ed.jpeg?im_w=720", filename: "673aad9b-2638-4af1-b27b-888d1612b4ed" },
      { url: "https://a0.muscache.com/im/pictures/hosting/Hosting-1364558723085852736/original/e5acda0d-78fc-47d5-86f8-56006403f4bb.jpeg?im_w=720", filename: "e5acda0d-78fc-47d5-86f8-56006403f4bb" }
    ],
    propertyType: "Flat",
    user: new mongoose.Types.ObjectId("67b707182c8cdca403f37bb1"),
    availableFrom: new Date("2025-07-15"),
    availableTo: new Date("2026-06-15"),
    maxGuests: 2,
    amenities: ["WiFi", "AC", "Kitchenette", "Workspace", "Terrace"],
    bookings: [],
    reviews: []
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Luxury Villa with Private Pool in Goa",
    description: "Stunning 3-bedroom villa in North Goa with private pool and tropical garden. Features open-plan living area, fully equipped kitchen, and outdoor dining space. Includes daily housekeeping and concierge service. Just 5 minutes walk to pristine beaches. Perfect for group vacations or special celebrations in paradise.",
    price: 8000,
    city: "Goa",
    country: "India",
    images: [
      { url: "https://a0.muscache.com/im/pictures/hosting/Hosting-1370177447388866664/original/41b4ac72-e407-4e27-8e43-a783e655a2f7.jpeg?im_w=1200", filename: "41b4ac72-e407-4e27-8e43-a783e655a2f7" },
      { url: "https://a0.muscache.com/im/pictures/hosting/Hosting-1370177447388866664/original/41b4ac72-e407-4e27-8e43-a783e655a2f7.jpeg?im_w=1200", filename: "41b4ac72-e407-4e27-8e43-a783e655a2f7_copy" },
      { url: "https://a0.muscache.com/im/pictures/hosting/Hosting-1370177447388866664/original/663e2287-7b6e-4ae5-98d0-9bf5aa5f4240.jpeg?im_w=720", filename: "663e2287-7b6e-4ae5-98d0-9bf5aa5f4240" }
    ],
    propertyType: "Villa",
    user: new mongoose.Types.ObjectId("67b707182c8cdca403f37bb2"),
    availableFrom: new Date("2025-11-01"),
    availableTo: new Date("2026-04-30"),
    maxGuests: 6,
    amenities: ["Private Pool", "AC", "Garden", "Housekeeping", "Beach Access"],
    bookings: [],
    reviews: []
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Heritage House in Jaipur's Old City",
    description: "Beautifully restored haveli in Jaipur's historic center featuring traditional architecture with modern comforts. Includes 2 bedrooms with AC, courtyard seating, and rooftop terrace with city views. Experience authentic Rajasthani hospitality with optional cooking classes and guided tours. Walking distance to major attractions.",
    price: 3500,
    city: "Jaipur",
    country: "India",
    images: [
      { url: "https://a0.muscache.com/im/pictures/miso/Hosting-1346628948170064718/original/0c45826e-922b-414f-a377-5f4f1f31067f.jpeg?im_w=1200", filename: "0c45826e-922b-414f-a377-5f4f1f31067f" },
      { url: "https://a0.muscache.com/im/pictures/miso/Hosting-1346628948170064718/original/f8b2c399-97b8-4ca3-9ebc-88585779e2d2.jpeg?im_w=720", filename: "f8b2c399-97b8-4ca3-9ebc-88585779e2d2" },
      { url: "https://a0.muscache.com/im/pictures/miso/Hosting-1346628948170064718/original/5d856edc-9667-4add-99ab-62439c503808.jpeg?im_w=720", filename: "5d856edc-9667-4add-99ab-62439c503808" }
    ],
    propertyType: "House",
    user: new mongoose.Types.ObjectId("67b707182c8cdca403f37bb3"),
    availableFrom: new Date("2025-09-01"),
    availableTo: new Date("2026-08-31"),
    maxGuests: 4,
    amenities: ["AC", "Terrace", "Courtyard", "Cultural Activities", "Historic Property"],
    bookings: [],
    reviews: []
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Designer Apartment in Delhi's Diplomatic Area",
    description: "Sophisticated 1BHK apartment in Delhi's premium neighborhood. Features designer furnishings, fully equipped kitchen, and balcony with city views. Building offers gym, swimming pool, and 24/7 security. Close to embassies, fine dining, and shopping. Ideal for business travelers seeking luxury and convenience.",
    price: 3000,
    city: "Delhi",
    country: "India",
    images: [
      { url: "https://a0.muscache.com/im/pictures/airflow/Hosting-956337527395728914/original/9eb93ac9-03b9-44db-870e-e7089085864e.jpg?im_w=1200", filename: "9eb93ac9-03b9-44db-870e-e7089085864e" },
      { url: "https://a0.muscache.com/im/pictures/airflow/Hosting-956337527395728914/original/b47fb37b-4cce-4886-9e83-6ae43f57cebf.jpg?im_w=720", filename: "b47fb37b-4cce-4886-9e83-6ae43f57cebf" },
      { url: "https://a0.muscache.com/im/pictures/airflow/Hosting-956337527395728914/original/5be3a1be-da9b-4295-a392-df06fe458987.jpg?im_w=720", filename: "5be3a1be-da9b-4295-a392-df06fe458987" }
    ],
    propertyType: "Apartment",
    user: new mongoose.Types.ObjectId("67b707182c8cdca403f37bb4"),
    availableFrom: new Date("2025-08-01"),
    availableTo: new Date("2026-07-31"),
    maxGuests: 2,
    amenities: ["Swimming Pool", "Gym", "AC", "Balcony", "Security"],
    bookings: [],
    reviews: []
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Beachfront Cottage in Pondicherry",
    description: "Charming 1-bedroom cottage just steps from the beach in Pondicherry's French Quarter. Features private garden, open-air shower, and bicycle for guest use. Includes breakfast with French and Indian options. Perfect for romantic getaways or solo retreats in this peaceful coastal town.",
    price: 2800,
    city: "Pondicherry",
    country: "India",
    images: [
      { url: "https://a0.muscache.com/im/ml/photo_enhancement/pictures/6e6e521d-c4c5-4a59-91bd-ac7d327f60e0.jpg?im_w=1200", filename: "6e6e521d-c4c5-4a59-91bd-ac7d327f60e0" },
      { url: "https://a0.muscache.com/im/ml/photo_enhancement/pictures/208e662a-67bd-46c9-810c-9e57f769ea60.jpg?im_w=720", filename: "208e662a-67bd-46c9-810c-9e57f769ea60" },
      { url: "https://a0.muscache.com/im/ml/photo_enhancement/pictures/208e662a-67bd-46c9-810c-9e57f769ea60.jpg?im_w=720", filename: "208e662a-67bd-46c9-810c-9e57f769ea60_copy" }
    ],
    propertyType: "House",
    user: new mongoose.Types.ObjectId("67b707182c8cdca403f37bb5"),
    availableFrom: new Date("2025-10-15"),
    availableTo: new Date("2026-03-15"),
    maxGuests: 2,
    amenities: ["Beach Access", "Garden", "Breakfast", "Bicycle", "Outdoor Shower"],
    bookings: [],
    reviews: []
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Penthouse with City Views in Hyderabad",
    description: "Luxurious 3BHK penthouse in Hyderabad's financial district featuring 360-degree city views. Includes premium furnishings, smart home system, and private terrace with jacuzzi. Building offers infinity pool, spa, and fine dining restaurant. Perfect for executives or special occasions.",
    price: 5000,
    city: "Hyderabad",
    country: "India",
    images: [
      { url: "https://a0.muscache.com/im/ml/photo_enhancement/pictures/125804c8-cfc5-4044-b58f-bfe40afd9f34.jpg?im_w=1200", filename: "125804c8-cfc5-4044-b58f-bfe40afd9f34" },
      { url: "https://a0.muscache.com/im/ml/photo_enhancement/pictures/21138b8a-d483-4b14-ab33-048b2262a927.jpg?im_w=720", filename: "21138b8a-d483-4b14-ab33-048b2262a927" },
      { url: "https://a0.muscache.com/im/ml/photo_enhancement/pictures/49502fde-92e2-4330-81ba-559bd8e0ff12.jpg?im_w=720", filename: "49502fde-92e2-4330-81ba-559bd8e0ff12" }
    ],
    propertyType: "Apartment",
    user: new mongoose.Types.ObjectId("67b707182c8cdca403f37bb6"),
    availableFrom: new Date("2025-07-01"),
    availableTo: new Date("2026-06-30"),
    maxGuests: 6,
    amenities: ["Jacuzzi", "Infinity Pool", "Smart Home", "Spa", "Terrace"],
    bookings: [],
    reviews: []
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Artist's Flat in Kolkata's Cultural Hub",
    description: "Unique 1BHK flat in a heritage building in Kolkata's artistic neighborhood. Features original artwork, vintage furniture, and balcony overlooking bustling streets. Includes high-speed WiFi and workspace. Walking distance to galleries, bookstores, and famous eateries. Perfect for creative souls exploring Kolkata's vibrant culture.",
    price: 1800,
    city: "Kolkata",
    country: "India",
    images: [
      { url: "https://a0.muscache.com/im/ml/photo_enhancement/pictures/hosting/Hosting-1054182165486422430/original/839eebf0-b118-4c2f-87b7-fd1216fac02f.jpeg?im_w=720", filename: "839eebf0-b118-4c2f-87b7-fd1216fac02f" },
      { url: "https://a0.muscache.com/im/ml/photo_enhancement/pictures/hosting/Hosting-1054182165486422430/original/0c4f1090-3967-496c-9f99-4b880a9947e5.jpeg?im_w=720", filename: "0c4f1090-3967-496c-9f99-4b880a9947e5" },
      { url: "https://a0.muscache.com/im/pictures/hosting/Hosting-1054182165486422430/original/fa7cdbb5-adc5-4e51-addb-6d94de3d62ce.jpeg?im_w=720", filename: "fa7cdbb5-adc5-4e51-addb-6d94de3d62ce" }
    ],
    propertyType: "Flat",
    user: new mongoose.Types.ObjectId("67b707182c8cdca403f37bb7"),
    availableFrom: new Date("2025-09-15"),
    availableTo: new Date("2026-08-15"),
    maxGuests: 2,
    amenities: ["WiFi", "Workspace", "Balcony", "Artistic Decor", "Historic Building"],
    bookings: [],
    reviews: []
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Family Villa in Chennai's Suburbs",
    description: "Spacious 4-bedroom villa with private garden in Chennai's peaceful suburbs. Features modern kitchen, children's play area, and outdoor dining space. Includes domestic help and 24/7 security. Close to international schools and shopping centers. Perfect for relocating families or long-term stays.",
    price: 4500,
    city: "Chennai",
    country: "India",
    images: [
      { url: "https://a0.muscache.com/im/ml/photo_enhancement/pictures/2e47832a-b7f6-4d75-86b9-e07c468ef61d.jpg?im_w=1200", filename: "2e47832a-b7f6-4d75-86b9-e07c468ef61d" },
      { url: "https://a0.muscache.com/im/ml/photo_enhancement/pictures/137f0f99-b7b0-43cd-9da2-536e96ab0722.jpg?im_w=720", filename: "137f0f99-b7b0-43cd-9da2-536e96ab0722" },
      { url: "https://a0.muscache.com/im/ml/photo_enhancement/pictures/b5571ef5-9feb-4be8-84b7-7690e1c4e279.jpg?im_w=720", filename: "b5571ef5-9feb-4be8-84b7-7690e1c4e279" }
    ],
    propertyType: "Villa",
    user: new mongoose.Types.ObjectId("67b707182c8cdca403f37bb8"),
    availableFrom: new Date("2025-08-20"),
    availableTo: new Date("2026-07-20"),
    maxGuests: 8,
    amenities: ["Garden", "Play Area", "Domestic Help", "Security", "Parking"],
    bookings: [],
    reviews: []
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Executive Studio in Pune's Tech Park",
    description: "Compact studio apartment located adjacent to Pune's major tech parks. Features smart storage solutions, ergonomic workspace, and kitchenette. Building offers co-working space, gym, and laundry facilities. Includes weekly cleaning. Perfect for business travelers on short-term assignments.",
    price: 2000,
    city: "Pune",
    country: "India",
    images: [
      { url: "https://a0.muscache.com/im/pictures/hosting/Hosting-1183841935995495718/original/0b06da48-110c-4b1f-a3a8-4db71c1e4954.jpeg?im_w=720", filename: "0b06da48-110c-4b1f-a3a8-4db71c1e4954" },
      { url: "https://a0.muscache.com/im/pictures/hosting/Hosting-1183841935995495718/original/5ff34857-8399-4576-b19b-377ead480b04.jpeg?im_w=720", filename: "5ff34857-8399-4576-b19b-377ead480b04" },
      { url: "https://a0.muscache.com/im/pictures/hosting/Hosting-1183841935995495718/original/0a6c743b-68fe-448e-9ec6-4477e82a3c8d.jpeg?im_w=720", filename: "0a6c743b-68fe-448e-9ec6-4477e82a3c8d" }
    ],
    propertyType: "Flat",
    user: new mongoose.Types.ObjectId("67b707182c8cdca403f37bb9"),
    availableFrom: new Date("2025-07-10"),
    availableTo: new Date("2026-06-10"),
    maxGuests: 1,
    amenities: ["Workspace", "Gym", "Laundry", "Co-working Space", "Weekly Cleaning"],
    bookings: [],
    reviews: []
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Himalayan Cottage with Panoramic Views",
    description: "Cozy 1-bedroom wooden cottage nestled in Shimla's apple orchards, offering breathtaking mountain views. Features a stone fireplace, private balcony, and traditional Himachali decor. Includes daily breakfast with local produce and guided nature walks. Perfect for couples seeking a romantic mountain escape. Just 10 minutes from Mall Road yet completely peaceful.",
    price: 3200,
    city: "Shimla",
    country: "India",
    images: [
      { url: "https://a0.muscache.com/im/pictures/miso/Hosting-1222967228593798123/original/fa0e2dfd-6619-478a-8b35-113f06bb61ae.jpeg?im_w=720", filename: "fa0e2dfd-6619-478a-8b35-113f06bb61ae" },
      { url: "https://a0.muscache.com/im/pictures/miso/Hosting-1222967228593798123/original/91c1d087-3e9a-4e60-84ac-c242ac6e83ac.jpeg?im_w=1200", filename: "91c1d087-3e9a-4e60-84ac-c242ac6e83ac" },
      { url: "https://a0.muscache.com/im/pictures/miso/Hosting-1222967228593798123/original/d15ec672-1343-4cdd-aca7-8ac85f1b5fb6.jpeg?im_w=720", filename: "d15ec672-1343-4cdd-aca7-8ac85f1b5fb6" }
    ],
    propertyType: "Hotel",
    user: new mongoose.Types.ObjectId("67b707182c8cdca403f37bc0"),
    availableFrom: new Date("2025-05-01"),
    availableTo: new Date("2025-12-15"),
    maxGuests: 2,
    amenities: ["Mountain View", "Fireplace", "Balcony", "Breakfast", "Nature Walks"],
    bookings: [],
    reviews: []
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Marine Drive Penthouse with Sea View",
    description: "Ultra-luxurious 3BHK penthouse on Mumbai's iconic Marine Drive. Features floor-to-ceiling windows, Italian marble floors, and private terrace with jacuzzi. Includes butler service, chef on request, and valet parking. Building has infinity pool, spa, and private cinema. Perfect for high-profile guests seeking privacy and luxury in South Mumbai.",
    price: 12000,
    city: "Mumbai",
    country: "India",
    images: [
      { url: "https://a0.muscache.com/im/pictures/miso/Hosting-1000094124911351480/original/ea3e4c38-9fa2-4c80-9bae-b9236bb35f6a.jpeg?im_w=1200", filename: "ea3e4c38-9fa2-4c80-9bae-b9236bb35f6a" },
      { url: "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTAwMDA5NDEyNDkxMTM1MTQ4MA%3D%3D/original/6863012a-c2fb-43a7-bbd7-3ba865b5da12.jpeg?im_w=720", filename: "6863012a-c2fb-43a7-bbd7-3ba865b5da12" },
      { url: "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTAwMDA5NDEyNDkxMTM1MTQ4MA%3D%3D/original/d8f6b939-af61-45c3-8f50-ac9b3d32445b.jpeg?im_w=720", filename: "d8f6b939-af61-45c3-8f50-ac9b3d32445b" }
    ],
    propertyType: "Apartment",
    user: new mongoose.Types.ObjectId("67b707182c8cdca403f37bc1"),
    availableFrom: new Date("2025-10-01"),
    availableTo: new Date("2026-09-30"),
    maxGuests: 6,
    amenities: ["Sea View", "Jacuzzi", "Butler", "Infinity Pool", "Private Cinema"],
    bookings: [],
    reviews: []
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Colonial-era Flat in Kolkata",
    description: "Charming 2BHK flat in a 1920s heritage building in Kolkata's cultural heart. Features high ceilings, original wooden floors, and antique furniture. Includes daily newspaper and tea service. Walking distance to Victoria Memorial and Park Street cafes. Perfect for history buffs wanting to experience Kolkata's golden era.",
    price: 2800,
    city: "Kolkata",
    country: "India",
    images: [
      { url: "https://a0.muscache.com/im/pictures/miso/Hosting-1176438006817085733/original/e570f136-92ea-4910-9c65-5e46c4a59a87.jpeg?im_w=1200", filename: "e570f136-92ea-4910-9c65-5e46c4a59a87" },
      { url: "https://a0.muscache.com/im/pictures/miso/Hosting-1176438006817085733/original/413a1a18-0b94-46df-9172-4fa04595d806.jpeg?im_w=720", filename: "413a1a18-0b94-46df-9172-4fa04595d806" },
      { url: "https://a0.muscache.com/im/pictures/miso/Hosting-1176438006817085733/original/7e8f1dd3-e9f8-4fa0-8b6f-ee8243e0c1db.jpeg?im_w=720", filename: "7e8f1dd3-e9f8-4fa0-8b6f-ee8243e0c1db" }
    ],
    propertyType: "Flat",
    user: new mongoose.Types.ObjectId("67b707182c8cdca403f37bc2"),
    availableFrom: new Date("2025-08-15"),
    availableTo: new Date("2026-07-15"),
    maxGuests: 4,
    amenities: ["Heritage Property", "High Ceilings", "Daily Tea", "Antique Decor", "Central Location"],
    bookings: [],
    reviews: []
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Sustainable Bamboo Villa in South Goa",
    description: "Beautiful 2-bedroom villa made entirely of bamboo and recycled materials, set in a coconut grove. Features outdoor shower, solar power, and organic garden. Includes yoga deck and bicycles for guest use. Just 500m from a secluded beach. Perfect for eco-conscious travelers seeking harmony with nature.",
    price: 5500,
    city: "Goa",
    country: "India",
    images: [
      { url: "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6NDYwNjA3Mzg%3D/original/99e23fcb-f8e6-4098-8549-c4e2a12bc55d.jpeg?im_w=1200", filename: "99e23fcb-f8e6-4098-8549-c4e2a12bc55d" },
      { url: "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6NDYwNjA3Mzg%3D/original/9a083065-18e6-471c-bb7f-76d9733fadff.jpeg?im_w=720", filename: "9a083065-18e6-471c-bb7f-76d9733fadff" },
      { url: "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6NDYwNjA3Mzg%3D/original/09e883cb-4c88-4e9b-a849-968772a7310e.jpeg?im_w=720", filename: "09e883cb-4c88-4e9b-a849-968772a7310e" }
    ],
    propertyType: "Villa",
    user: new mongoose.Types.ObjectId("67b707182c8cdca403f37bc3"),
    availableFrom: new Date("2025-11-01"),
    availableTo: new Date("2026-04-30"),
    maxGuests: 4,
    amenities: ["Eco-Friendly", "Solar Power", "Yoga Deck", "Bicycles", "Organic Garden"],
    bookings: [],
    reviews: []
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Industrial-Chic Loft in Mumbai",
    description: "Spacious loft conversion in Mumbai's former mill district, featuring exposed brick walls and steel beams. Includes artist's studio space, vinyl record collection, and rooftop terrace. Walking distance to galleries and hipster cafes. Perfect for creative professionals seeking inspiration in Mumbai's trendiest neighborhood.",
    price: 3800,
    city: "Mumbai",
    country: "India",
    images: [
      { url: "https://a0.muscache.com/im/pictures/airflow/Hosting-277504/original/a19a3eaf-2efc-413a-a231-eb01b2d5c48c.jpg?im_w=720", filename: "a19a3eaf-2efc-413a-a231-eb01b2d5c48c" },
      { url: "https://a0.muscache.com/im/pictures/airflow/Hosting-277504/original/4705c8cb-c212-4e48-9966-cbfaf5cb5050.jpg?im_w=1200", filename: "4705c8cb-c212-4e48-9966-cbfaf5cb5050" },
      { url: "https://a0.muscache.com/im/pictures/airflow/Hosting-277504/original/4705c8cb-c212-4e48-9966-cbfaf5cb5050.jpg?im_w=1200", filename: "4705c8cb-c212-4e48-9966-cbfaf5cb5050_copy" }
    ],
    propertyType: "Apartment",
    user: new mongoose.Types.ObjectId("67b707182c8cdca403f37bc4"),
    availableFrom: new Date("2025-09-01"),
    availableTo: new Date("2026-08-31"),
    maxGuests: 3,
    amenities: ["Artist Studio", "Record Player", "Rooftop", "Industrial Decor", "Creative Space"],
    bookings: [],
    reviews: []
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Luxury house near Bengaluru",
    description: "Unique adults-only treehouse retreat set on a private estate 45 minutes from Bengaluru. Features king-size bed with canopy, outdoor bathtub, and panoramic forest views. Includes gourmet breakfast basket and evening bonfire. Perfect for digital detox or romantic weekend getaways surrounded by nature.",
    price: 4200,
    city: "Bengaluru",
    country: "India",
    images: [
      { url: "https://a0.muscache.com/im/pictures/miso/Hosting-919527045734490373/original/791d85b5-f56c-4bd0-803d-e50fdcd36358.jpeg?im_w=1200", filename: "791d85b5-f56c-4bd0-803d-e50fdcd36358" },
      { url: "https://a0.muscache.com/im/pictures/miso/Hosting-919527045734490373/original/6f5fc6d9-f0ee-482d-b145-217dc7655898.jpeg?im_w=720", filename: "6f5fc6d9-f0ee-482d-b145-217dc7655898" },
      { url: "https://a0.muscache.com/im/pictures/miso/Hosting-919527045734490373/original/e4dafae6-034c-4efa-bcf4-c5f5adeacd7d.jpeg?im_w=720", filename: "e4dafae6-034c-4efa-bcf4-c5f5adeacd7d" }
    ],
    propertyType: "House",
    user: new mongoose.Types.ObjectId("67b707182c8cdca403f37bc5"),
    availableFrom: new Date("2025-06-15"),
    availableTo: new Date("2026-05-15"),
    maxGuests: 2,
    amenities: ["Treehouse", "Outdoor Bathtub", "Breakfast Basket", "Forest Views", "Bonfire"],
    bookings: [],
    reviews: []
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Traditional Kerala Houseboat",
    description:
      "Authentic thatched-roof houseboat for private cruises through Kerala's backwaters. Features two bedrooms with AC, sun deck, and onboard chef preparing local cuisine. Includes sunset cruise and fishing equipment. Docked near Alleppey but can be booked for multi-day cruises. Perfect for experiencing Kerala's famous waterways in comfort.",
    price: 6800,
    city: "Alleppey",
    country: "India",
    images: [
      {
        url: "https://a0.muscache.com/im/pictures/hosting/Hosting-45808969/original/e0830caa-b8b8-4ab2-8778-70872374ae47.jpeg?im_w=720",
        filename: "houseboat1.jpg",
      },
      {
        url: "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6NDU4MDg5Njk%3D/original/8db0ef3a-65aa-444f-8e81-b1b4ae41fc0f.jpeg?im_w=1200",
        filename: "houseboat2.jpg",
      },
      {
        url: "https://a0.muscache.com/im/pictures/hosting/Hosting-45808969/original/4de05c72-d7d0-41c9-a7a4-0a6d4f3b1140.jpeg?im_w=480",
        filename: "houseboat3.jpg",
      },
    ],
    propertyType: "House",
    user: new mongoose.Types.ObjectId("67b707182c8cdca403f37bc6"),
    availableFrom: new Date("2025-10-01"),
    availableTo: new Date("2026-03-31"),
    maxGuests: 4,
    amenities: [
      "Houseboat",
      "Onboard Chef",
      "Sun Deck",
      "AC",
      "Fishing Equipment",
    ],
    bookings: [],
    reviews: [],
    createdAt: new Date(),
  },

  {
    _id: new mongoose.Types.ObjectId(),
    title: "Luxury Desert Camp in Jaisalmer",
    description:
      "Premium Swiss tent with private bathroom in a desert camp near Jaisalmer. Features four-poster bed, sitting area, and private bonfire space. Includes camel safari, cultural performances, and gourmet Rajasthani meals. Perfect for experiencing the Thar Desert in comfort without sacrificing authenticity.",
    price: 3800,
    city: "Jaisalmer",
    country: "India",
    images: [
      {
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-996901377686919245/original/553833c6-8d6f-4f79-8337-c7bc2fc8e45f.jpeg?im_w=1200",
        filename: "desert1.jpg",
      },
      {
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-996901377686919245/original/2ed1c9ff-0674-436b-9845-58952b16c111.jpeg?im_w=720",
        filename: "desert2.jpg",
      },
      {
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-996901377686919245/original/e82f3d8e-935c-4b75-8672-c24c1753293f.jpeg?im_w=720",
        filename: "desert3.jpg",
      },
    ],
    propertyType: "House",
    user: new mongoose.Types.ObjectId("67b707182c8cdca403f37bc7"),
    availableFrom: new Date("2025-10-15"),
    availableTo: new Date("2026-03-15"),
    maxGuests: 2,
    amenities: [
      "Luxury Tent",
      "Private Bathroom",
      "Camel Safari",
      "Cultural Shows",
      "Bonfire",
    ],
    bookings: [],
    reviews: [],
    createdAt: new Date(),
  },

  {
    _id: new mongoose.Types.ObjectId(),
    title: "Villa in Gurgaon",
    description:
      "Elegant 3BHK villa overlooking a championship golf course in Gurgaon. Features private garden, home theater, and domestic staff. Includes golf club membership during stay. Close to corporate offices and shopping malls. Perfect for executives wanting luxury and recreation.",
    price: 8500,
    city: "Gurgaon",
    country: "India",
    images: [
      {
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-1118551674291132309/original/e3dc024c-2e10-4216-ac0f-6bc8b8a54cc4.jpeg?im_w=1200",
        filename: "villa1.jpg",
      },
      {
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-1118551674291132309/original/33a96fbf-b031-4227-be54-26bac01bf6c9.jpeg?im_w=720",
        filename: "villa2.jpg",
      },
      {
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-1118551674291132309/original/ffb3fb1c-a3e2-48e1-bf99-a46de37088c0.jpeg?im_w=720",
        filename: "villa3.jpg",
      },
    ],
    propertyType: "Villa",
    user: new mongoose.Types.ObjectId("67b707182c8cdca403f37bc8"),
    availableFrom: new Date("2025-07-01"),
    availableTo: new Date("2026-06-30"),
    maxGuests: 6,
    amenities: ["Golf Course", "Home Theater", "Domestic Staff", "Garden", "Club Access"],
    bookings: [],
    reviews: [],
    createdAt: new Date(),
  },

  {
    _id: new mongoose.Types.ObjectId(),
    title: "Art Deco Apartment in South Mumbai",
    description:
      "Stunning 2BHK in a 1930s Art Deco building, meticulously restored with original features. Features parquet floors, stained glass, and period furniture. Includes curated art collection and vinyl records. Walking distance to Marine Drive and Colaba. Perfect for design lovers wanting historic charm with modern comforts.",
    price: 4800,
    city: "Mumbai",
    country: "India",
    images: [
      {
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-1202951792250782408/original/83b3f1c9-15b3-45f0-a492-68f6c1605cf0.jpeg?im_w=1200",
        filename: "mumbai1.jpg",
      },
      {
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-1202951792250782408/original/6f35783b-17a6-4f91-a517-a290ac89e7b6.jpeg?im_w=720",
        filename: "mumbai2.jpg",
      },
      {
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-1202951792250782408/original/fa9df115-2280-4b10-b08f-9eda886d94ad.jpeg?im_w=720",
        filename: "mumbai3.jpg",
      },
    ],
    propertyType: "Apartment",
    user: new mongoose.Types.ObjectId("67b707182c8cdca403f37bc9"),
    availableFrom: new Date("2025-08-01"),
    availableTo: new Date("2026-07-31"),
    maxGuests: 4,
    amenities: [
      "Art Deco",
      "Parquet Floors",
      "Vinyl Collection",
      "Historic Building",
      "Central Location",
    ],
    bookings: [],
    reviews: [],
    createdAt: new Date(),
  },
];
module.exports = listings;
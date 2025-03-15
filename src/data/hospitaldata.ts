// import { hospitalInterface } from "@/Components/HospitalSeachPage/HospitalAbout"

// export const hospitals: hospitalInterface[] = [
//     {
//         name: "Artemis Hospital",
//         city: "gurugram",
//         state: "Haryana",
//         PIN: "122001",
//         contact: {
//             emergency: "+91- 124 4588 888",
//             appointments: "+91- 124 4511 111"
//         },
//         reviews: "3.2k reviews",
//         admissionCharges: 3000,
//         rating: 4.2,  // Added rating
//         image: "/images/artemis_hospital.jpg",  // Added image
//         wards: [
//             {
//                 name: "General Ward",
//                 charge: 1500,
//                 description: "Basic ward with shared rooms."
//             },
//             {
//                 name: "Private Ward",
//                 charge: 3000,
//                 description: "Private rooms with better amenities."
//             },
//             {
//                 name: "ICU",
//                 charge: 5000,
//                 description: "Intensive care unit with 24/7 monitoring."
//             },
//             {
//                 name: "Maternity Ward",
//                 charge: 4000,
//                 description: "Specialized ward for maternity and newborn care."
//             }
//         ],
//         operations: [
//             {
//                 name: "Cardiac Surgery",
//                 operationCharges: 15000,
//                 bedCharges: 2000
//             },
//             {
//                 name: "Orthopedic Surgery",
//                 operationCharges: 12000,
//                 bedCharges: 1500
//             },
//             {
//                 name: "Neurosurgery",
//                 operationCharges: 20000,
//                 bedCharges: 2500
//             },
//             {
//                 name: "Plastic Surgery",
//                 operationCharges: 18000,
//                 bedCharges: 2200
//             },
//             {
//                 name: "Bariatric Surgery",
//                 operationCharges: 25000,
//                 bedCharges: 3000
//             },
//             {
//                 name: "Ophthalmic Surgery",
//                 operationCharges: 8000,
//                 bedCharges: 1000
//             }
//         ],
//         about: "Artemis Hospital is a state-of-the-art healthcare provider offering advanced treatments across multiple disciplines. Known for its world-class medical infrastructure, Artemis is committed to providing compassionate care with the latest technology."
//     },
//     {
//         name: "Max Super Specialty Hospital",
//         city: "delhi",
//         state: "Delhi",
//         PIN: "110017",
//         contact: {
//             emergency: "+91- 11 2641 1111",
//             appointments: "+91- 11 2641 1112"
//         },
//         reviews: "4.5k reviews",
//         admissionCharges: 3500,
//         rating: 4.6,  // Added rating
//         image: "/images/max_hospital.jpg",  // Added image
//         wards: [
//             {
//                 name: "General Ward",
//                 charge: 1200,
//                 description: "Standard shared room with basic amenities."
//             },
//             {
//                 name: "Private Room",
//                 charge: 3500,
//                 description: "Room with private bathroom and amenities."
//             },
//             {
//                 name: "ICU",
//                 charge: 6000,
//                 description: "24/7 ICU with full monitoring."
//             },
//             {
//                 name: "Pediatric Ward",
//                 charge: 3000,
//                 description: "Special care for infants and children."
//             }
//         ],
//         operations: [
//             {
//                 name: "Gastrointestinal Surgery",
//                 operationCharges: 16000,
//                 bedCharges: 2000
//             },
//             {
//                 name: "ENT Surgery",
//                 operationCharges: 9000,
//                 bedCharges: 1200
//             },
//             {
//                 name: "Vascular Surgery",
//                 operationCharges: 22000,
//                 bedCharges: 2800
//             },
//             {
//                 name: "Pediatric Surgery",
//                 operationCharges: 13000,
//                 bedCharges: 1700
//             },
//             {
//                 name: "Endocrine Surgery",
//                 operationCharges: 14000,
//                 bedCharges: 1800
//             },
//             {
//                 name: "Thoracic Surgery",
//                 operationCharges: 22000,
//                 bedCharges: 2500
//             }
//         ],
//         about: "Max Super Specialty Hospital is known for its expert medical teams and cutting-edge facilities. The hospital offers specialized services in various fields, including cardiology, oncology, and neurology, with a focus on patient-centered care."
//     },
//     {
//         name: "Fortis Healthcare",
//         city: "Delhi",
//         state: "Delhi",
//         PIN: "110070",
//         contact: {
//             emergency: "+91- 11 4521 5555",
//             appointments: "+91- 11 4521 5556"
//         },
//         reviews: "5k reviews",
//         admissionCharges: 4000,
//         rating: 4.8,  // Added rating
//         image: "/images/fortis_hospital.jpg",  // Added image
//         wards: [
//             {
//                 name: "General Ward",
//                 charge: 1300,
//                 description: "Basic shared rooms with necessary facilities."
//             },
//             {
//                 name: "Private Room",
//                 charge: 4500,
//                 description: "Private rooms with better comfort."
//             },
//             {
//                 name: "ICU",
//                 charge: 5500,
//                 description: "High-end ICU with advanced equipment."
//             },
//             {
//                 name: "Maternity Ward",
//                 charge: 5000,
//                 description: "Dedicated ward for women in labor and post-delivery care."
//             }
//         ],
//         operations: [
//             {
//                 name: "Oncological Surgery",
//                 operationCharges: 25000,
//                 bedCharges: 3000
//             },
//             {
//                 name: "Transplant Surgery",
//                 operationCharges: 50000,
//                 bedCharges: 4000
//             }
//         ],
//         about: "Fortis Healthcare is a leading provider of health services in India, offering a wide range of specialty care. The hospital is renowned for its compassionate care, highly skilled doctors, and cutting-edge technology in the medical field."
//     },
//     {
//         name: "Medanta The Medicity",
//         city: "Gurugram",
//         state: "Haryana",
//         PIN: "122001",
//         contact: {
//             emergency: "+91- 124 414 1414",
//             appointments: "+91- 124 414 1415"
//         },
//         reviews: "4.8k reviews",
//         admissionCharges: 2800,
//         rating: 4.7,  // Added rating
//         image: "/images/medanta_hospital.jpg",  // Added image
//         wards: [
//             {
//                 name: "General Ward",
//                 charge: 1400,
//                 description: "Affordable shared room."
//             },
//             {
//                 name: "Private Room",
//                 charge: 3500,
//                 description: "Room with luxury amenities."
//             },
//             {
//                 name: "ICU",
//                 charge: 5000,
//                 description: "Advanced ICU with 24/7 monitoring."
//             },
//             {
//                 name: "Pediatric Ward",
//                 charge: 3000,
//                 description: "Child-friendly ward with special care."
//             }
//         ],
//         operations: [
//             {
//                 name: "Gynecological Surgery",
//                 operationCharges: 12000,
//                 bedCharges: 1500
//             },
//             {
//                 name: "Urological Surgery",
//                 operationCharges: 14000,
//                 bedCharges: 1800
//             },
//             {
//                 name: "Cardiac Surgery",
//                 operationCharges: 15000,
//                 bedCharges: 2000
//             },
//             {
//                 name: "Bariatric Surgery",
//                 operationCharges: 25000,
//                 bedCharges: 3000
//             },
//             {
//                 name: "Gastrointestinal Surgery",
//                 operationCharges: 16000,
//                 bedCharges: 2000
//             },
//             {
//                 name: "Ophthalmic Surgery",
//                 operationCharges: 8000,
//                 bedCharges: 1000
//             }
//         ],
//         about: "Medanta The Medicity is one of the largest multi-specialty hospitals in India. It brings together leading healthcare professionals and state-of-the-art infrastructure to provide exceptional treatment in various fields like cardiology, neurology, and oncology."
//     },
//     {
//         name: "Columbia Asia Hospital",
//         city: "Gurugram",
//         state: "Haryana",
//         PIN: "122017",
//         contact: {
//             emergency: "+91- 124 433 4444",
//             appointments: "+91- 124 433 4445"
//         },
//         reviews: "3.5k reviews",
//         admissionCharges: 3200,
//         rating: 4.3,  // Added rating
//         image: "/images/columbia_asia_hospital.jpg",  // Added image
//         wards: [
//             {
//                 name: "General Ward",
//                 charge: 1600,
//                 description: "Affordable and comfortable shared rooms."
//             },
//             {
//                 name: "Private Ward",
//                 charge: 3000,
//                 description: "Private room with enhanced services."
//             },
//             {
//                 name: "ICU",
//                 charge: 5500,
//                 description: "24/7 critical care monitoring."
//             },
//             {
//                 name: "Maternity Ward",
//                 charge: 4500,
//                 description: "Comfortable maternity rooms."
//             }
//         ],
//         operations: [
//             {
//                 name: "ENT Surgery",
//                 operationCharges: 9000,
//                 bedCharges: 1200
//             },
//             {
//                 name: "Plastic Surgery",
//                 operationCharges: 18000,
//                 bedCharges: 2200
//             },
//             {
//                 name: "Bariatric Surgery",
//                 operationCharges: 25000,
//                 bedCharges: 3000
//             },
//             {
//                 name: "Transplant Surgery",
//                 operationCharges: 50000,
//                 bedCharges: 4000
//             },
//             {
//                 name: "Pediatric Surgery",
//                 operationCharges: 13000,
//                 bedCharges: 1700
//             },
//             {
//                 name: "Orthopedic Surgery",
//                 operationCharges: 12000,
//                 bedCharges: 1500
//             }
//         ],
//         about: "Columbia Asia Hospital offers world-class healthcare services with a focus on patient safety and comfort. The hospital is equipped with advanced medical technology and a dedicated team of professionals providing high-quality care in a variety of specialties."
//     }
// ]

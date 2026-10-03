// ===== ADD PROJECTS HERE (only this file) =====
// categories: "AI / ML","Data Science","Computer Vision","Web Development","Full Stack","Other"
const projects = [
 { id:1, title:"Smart Hybrid Face + QR Attendance System", categories:["Computer Vision","AI / ML","Full Stack"],
   shortDescription:"A hybrid attendance system combining face recognition and QR-based attendance.",
   description:"A hybrid attendance system combining face recognition and QR-based attendance to provide a practical automated attendance solution.",
   technologies:["Python","OpenCV","Face Recognition","QR Code","Flask","JavaScript","Google Sheets API"], // confirm these
   github:"", liveDemo:"", coverImage:"assets/projects/project-01/cover.jpg",
   images:["assets/projects/project-01/image-01.jpg","assets/projects/project-01/image-02.jpg","assets/projects/project-01/image-03.jpg"],
   features:["Face recognition attendance","QR-based attendance","Hybrid mode","More details to be added"] },
 { id:2, title:"FaceAttend PRO — AI Hybrid Attendance System", categories:["Computer Vision","AI / ML","Web Development"],
   shortDescription:"Browser-based face + QR attendance with a live dashboard, hosted free on GitHub Pages.",
   description:"A browser-based hybrid attendance system using face recognition and QR scanning, with a live dashboard and records stored in Google Sheets via Google Apps Script.",
   technologies:["face-api.js","TensorFlow.js","jsQR","QRCode.js","Chart.js","Google Sheets","Google Apps Script","GitHub Pages","JavaScript","HTML","CSS"],
   github:"", liveDemo:"", coverImage:"assets/projects/project-02/cover.jpg",
   images:["assets/projects/project-02/image-01.jpg","assets/projects/project-02/image-02.jpg"],
   features:["Face Recognition","QR Attendance","Hybrid Attendance","Live Dashboard","Attendance Records","Charts","Responsive Interface"] },
 { id:3, title:"VaultChat — Encrypted P2P Chat", categories:["Web Development","Other"],
   shortDescription:"Peer-to-peer encrypted messaging running entirely in the browser.",
   description:"Browser-based peer-to-peer chat using WebRTC DataChannels with PeerJS signaling, ECDH P-384 key exchange and AES-GCM 256-bit encryption via the Web Crypto API. Messages are stored in IndexedDB; hosted on GitHub Pages.",
   technologies:["WebRTC","PeerJS","Web Crypto API","ECDH P-384","AES-GCM 256","IndexedDB","qrcodejs","GitHub Pages"],
   github:"", liveDemo:"", coverImage:"assets/projects/project-03/cover.jpg",
   images:["assets/projects/project-03/image-01.jpg","assets/projects/project-03/image-02.jpg"],
   features:["End-to-end encryption","Peer-to-peer transport","QR code pairing","Local message storage"] },
 { id:4, title:"Drowsiness Detection System", categories:["Computer Vision","AI / ML"],
   shortDescription:"Computer vision based system designed to detect signs of driver or user drowsiness.",
   description:"Computer vision based system designed to detect signs of driver or user drowsiness.",
   technologies:["Python","OpenCV","[ADD ACTUAL LIBRARIES]"], github:"", liveDemo:"", coverImage:"assets/projects/project-04/cover.jpg", images:[], features:["Details to be added"] },
 { id:5, title:"Project 05", categories:["Other"], shortDescription:"Project details to be added", description:"Project details to be added", technologies:[], github:"", liveDemo:"", coverImage:"assets/projects/project-05/cover.jpg", images:[], features:[] },
 { id:6, title:"Project 06", categories:["Other"], shortDescription:"Project details to be added", description:"Project details to be added", technologies:[], github:"", liveDemo:"", coverImage:"assets/projects/project-06/cover.jpg", images:[], features:[] }
];
const projectFilters = ["All","AI / ML","Data Science","Computer Vision","Web Development","Full Stack","Other"];

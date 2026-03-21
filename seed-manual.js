
import { collection, addDoc } from 'firebase/firestore';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import dotenv from 'dotenv';

dotenv.config();

// Manually configure and initialize Firebase
const firebaseConfig = {
  apiKey: process.env.VITE_API_KEY,
  authDomain: process.env.VITE_AUTH_DOMAIN,
  projectId: process.env.VITE_PROJECT_ID,
  storageBucket: process.env.VITE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const projectsToSeed = [
  { name: 'AI Chatbot', description: 'A conversational AI for customer support', tags: ['AI', 'NLP'], imageUrl: 'bot.png' },
  { name: 'Data Visualization Dashboard', description: 'An interactive dashboard for complex datasets', tags: ['Data Analysis', 'React'], imageUrl: 'data.png' },
  { name: 'E-commerce Website', description: 'A full-featured online store', tags: ['Web Dev', 'Firebase'], imageUrl: 'ecom.png' },
  { name: 'Predictive Maintenance Model', description: 'A model to predict machine failures', tags: ['ML', 'Python'], imageUrl: 'model.png' },
];

const seedDatabase = async () => {
  console.log("Starting to seed the database...");
  const projectsCollection = collection(db, 'projects');
  for (const project of projectsToSeed) {
    try {
      await addDoc(projectsCollection, project);
      console.log(`Successfully added project: ${project.name}`);
    } catch (error) {
      console.error(`Error adding project ${project.name}:`, error);
    }
  }
  console.log("Database seeding finished.");
};

seedDatabase();

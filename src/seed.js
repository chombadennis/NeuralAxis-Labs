
  import { collection, addDoc } from 'firebase/firestore';
  import { db } from './firebase.js';

  const dummyProjects = [
    { name: 'AI Chatbot', description: 'A conversational AI for customer support', tags: ['AI', 'NLP'], imageUrl: 'bot.png' },
    { name: 'Data Visualization Dashboard', description: 'An interactive dashboard for complex datasets', tags: ['Data Analysis', 'React'], imageUrl: 'data.png' },
    { name: 'E-commerce Website', description: 'A full-featured online store', tags: ['Web Dev', 'Firebase'], imageUrl: 'ecom.png' },
    { name: 'Predictive Maintenance Model', description: 'A model to predict machine failures', tags: ['ML', 'Python'], imageUrl: 'model.png' },
  ];

  const seedDatabase = async () => {
    console.log("Seeding database...");
    const projectsCollection = collection(db, 'projects');
    for (const project of dummyProjects) {
      try {
        await addDoc(projectsCollection, project);
        console.log(`Added project: ${project.name}`);
      } catch (error) {
        console.error(`Error adding project ${project.name}:`, error);
      }
    }
    console.log("Database seeding complete.");
  };

  seedDatabase();
  
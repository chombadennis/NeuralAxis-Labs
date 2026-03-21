
import React, { useState, useEffect } from 'react';
import { Typography, Grid, Box, Button, Skeleton } from '@mui/material';
import ProjectCard from '../components/ProjectCard';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { scroller } from 'react-scroll';

// Dummy data for fallback
const dummyProjects = [
  { id: 1, name: 'AI Chatbot', description: 'A conversational AI for customer support', tags: ['AI', 'NLP'], imageUrl: '/images/bot.png' },
  { id: 2, name: 'Data Visualization Dashboard', description: 'An interactive dashboard for complex datasets', tags: ['Data Analysis', 'React'], imageUrl: '/images/data.png' },
  { id: 3, name: 'E-commerce Website', description: 'A full-featured online store', tags: ['Web Dev', 'Firebase'], imageUrl: '/images/ecom.png' },
  { id: 4, name: 'Predictive Maintenance Model', description: 'A model to predict machine failures', tags: ['ML', 'Python'], imageUrl: '/images/model.png' },
  { id: 5, name: 'Project 5', description: 'Description for project 5', tags: ['TagA', 'TagB'], imageUrl: '/images/model.png' },
  { id: 6, name: 'Project 6', description: 'Description for project 6', tags: ['TagC', 'TagD'], imageUrl: '/images/model.png' },
  { id: 7, name: 'Project 7', description: 'Description for project 7', tags: ['TagE', 'TagF'], imageUrl: '/images/model.png' },
];

const INITIAL_VISIBLE_PROJECTS = 2;
const PROJECTS_INCREMENT = 2;

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleProjects, setVisibleProjects] = useState(INITIAL_VISIBLE_PROJECTS);

  useEffect(() => {
    const loadProjects = async () => {
      setLoading(true);
      const cachedProjects = sessionStorage.getItem('projectsData');

      if (cachedProjects) {
        console.log("Loading projects from session cache.");
        setProjects(JSON.parse(cachedProjects));
        setLoading(false);
      } else {
        console.log("Fetching projects from Firestore.");
        try {
          const querySnapshot = await getDocs(collection(db, "projects"));
          let projectsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

          if (projectsData.length > 0) {
            const formattedProjects = projectsData.map(project => ({
              ...project,
              imageUrl: `https://firebasestorage.googleapis.com/v0/b/neuralaxis-labs.firebasestorage.app/o/${encodeURIComponent(project.imageUrl)}?alt=media`
            }));
            setProjects(formattedProjects);
            sessionStorage.setItem('projectsData', JSON.stringify(formattedProjects));
          } else {
            console.log("No projects found in Firestore, using fallback data.");
            setProjects(dummyProjects);
          }
        } catch (error) {
          console.error("Error fetching projects: ", error);
          setProjects(dummyProjects);
        }
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  const handleShowMore = () => {
    setVisibleProjects(prev => Math.min(prev + PROJECTS_INCREMENT, projects.length));
  };

  const handleShowLess = () => {
    setVisibleProjects(INITIAL_VISIBLE_PROJECTS);
    scroller.scrollTo('projects', {
      duration: 500,
      smooth: true,
      offset: -70,
    });
  };

  return (
    <Box id="projects" sx={{ py: { xs: 6, sm: 8 }, background: '#1a1a1a', color: '#fff', px: { xs: 2, sm: 3, md: 4 } }}>
      <Box sx={{ maxWidth: '1200px', mx: 'auto' }}>
        <Typography 
          variant="h4" 
          component="h2" 
          gutterBottom 
          align="center" 
          sx={{ 
            fontWeight: 'bold',
            fontSize: { xs: '2rem', sm: '2.5rem' } 
          }}
        >
          Our Projects
        </Typography>
        <Grid container spacing={4} sx={{ mt: { xs: 2, sm: 4 } }}>
          {loading ? (
            Array.from(new Array(3)).map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Skeleton variant="rectangular" width="100%" height={200} sx={{ bgcolor: 'grey.900' }} />
                <Skeleton width="60%" sx={{ bgcolor: 'grey.900' }} />
                <Skeleton sx={{ bgcolor: 'grey.900' }} />
              </Grid>
            ))
          ) : (
            projects.slice(0, visibleProjects).map((project) => (
              <Grid item key={project.id} xs={12} sm={6} md={4}>
                <ProjectCard project={project} />
              </Grid>
            ))
          )}
        </Grid>
        {!loading && projects.length > INITIAL_VISIBLE_PROJECTS && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, gap: 2 }}>
            {visibleProjects < projects.length && (
              <Button onClick={handleShowMore} variant="contained" color="primary">Show More</Button>
            )}
            {visibleProjects > INITIAL_VISIBLE_PROJECTS && (
              <Button onClick={handleShowLess} variant="outlined" color="primary">Show Less</Button>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Projects;

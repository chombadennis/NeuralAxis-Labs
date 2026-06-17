
import React, { useState, useEffect } from 'react';
import { Typography, Grid, Box, Button, Skeleton } from '@mui/material';
import ProjectCard from '../components/ProjectCard';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { scroller } from 'react-scroll';

// Dummy data for fallback
const dummyProjects = [
  { id: 1, name: 'DevCollab Hub', description: 'A resource integration and collaboration environment designed to connect distributed developer teams.', tags: ['Collaboration Platforms', 'Resource Integration'], imageUrl: '/images/collaboration_hub.png' },
  { id: 2, name: 'FieldOps Platform', description: 'A construction operations platform focusing on revenue tracking, BOQ integration and automated progress tracking.', tags: ['Operations Systems', 'BOQ Analysis'], imageUrl: '/images/fieldops_revenue.png' },
  { id: 3, name: 'Makindu AHP Aggregator', description: 'Enterprise reporting intelligence system that processes site logs, correspondence registers and computes revenue with work progress.', tags: ['Construction Site Intelligence', 'Analytics'], imageUrl: '/images/makindu_ahp.png' },
  { id: 4, name: 'Logistics Fleet Dispatcher', description: 'A live fleet management dashboard for driver dispatching and cargo logistics.', tags: ['Operations & Logistics', 'Real-Time Sync'], imageUrl: '/images/logistics_fleet.png' }
];

const INITIAL_VISIBLE_PROJECTS = 2;
const PROJECTS_INCREMENT = 2;

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleProjects, setVisibleProjects] = useState(INITIAL_VISIBLE_PROJECTS);

  useEffect(() => {
    setProjects(dummyProjects);
    setLoading(false);
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
    <Box id="projects" sx={{ py: { xs: 8, sm: 12 }, background: 'linear-gradient(180deg, #080A16 0%, #0B0E1F 100%)', color: '#fff', px: { xs: 2, sm: 3, md: 4 } }}>
      <Box sx={{ maxWidth: '1200px', mx: 'auto' }}>
        <Typography
          variant="overline"
          align="center"
          sx={{
            color: '#00F2FE',
            fontWeight: 700,
            letterSpacing: '0.15em',
            fontFamily: 'Lexend, sans-serif',
            display: 'block',
            mb: 1
          }}
        >
          OUR PORTFOLIO
        </Typography>
        <Typography
          variant="h3"
          component="h2"
          gutterBottom
          align="center"
          sx={{
            fontWeight: 800,
            fontFamily: 'Lora, serif',
            fontSize: { xs: '2rem', sm: '2.5rem' },
            mb: 6
          }}
        >
          Featured Projects
        </Typography>
        <Grid container spacing={4}>
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

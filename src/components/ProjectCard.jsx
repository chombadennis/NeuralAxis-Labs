
import React from 'react';
import { Card, CardContent, CardMedia, Typography, Chip, Box } from '@mui/material';

const ProjectCard = ({ project }) => {
  return (
    <Card sx={{
      background: '#2a2a2a', 
      color: '#fff', 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column' 
    }}>
      <CardMedia
        component="img"
        sx={{ height: { xs: 140, sm: 160 } }}
        image={project.imageUrl || 'https://via.placeholder.com/300'}
        alt={project.name}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography 
          gutterBottom 
          variant="h5" 
          component="div"
          sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }}
        >
          {project.name}
        </Typography>
        <Typography 
          variant="body2" 
          color="#ccc"
          sx={{
            fontSize: { xs: '0.9rem', sm: '1rem' },
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {project.description}
        </Typography>
        <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {project.tags && project.tags.map((tag, index) => (
            <Chip 
              key={index} 
              label={tag} 
              sx={{ 
                background: '#4a4a4a', 
                color: '#fff', 
                fontSize: { xs: '0.7rem', sm: '0.8rem' } 
              }} 
            />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;

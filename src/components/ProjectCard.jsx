
import React from 'react';
import { Card, CardContent, CardMedia, Typography, Chip, Box } from '@mui/material';

const ProjectCard = ({ project }) => {
  return (
    <Card sx={{
      background: 'rgba(15, 18, 37, 0.4)', 
      backdropFilter: 'blur(12px)',
      color: '#fff', 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      borderRadius: '16px',
      border: '1px solid rgba(255, 255, 255, 0.05)',
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.4)',
      transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.3s ease, box-shadow 0.3s ease',
      overflow: 'hidden',
      '&:hover': {
        transform: 'translateY(-6px)',
        borderColor: 'rgba(0, 242, 254, 0.4)',
        boxShadow: '0 8px 30px rgba(0, 242, 254, 0.15)',
      }
    }}>
      <CardMedia
        component="img"
        sx={{ 
          height: { xs: 150, sm: 180 },
          filter: 'brightness(0.9)',
          transition: 'transform 0.5s ease',
          '&:hover': {
            transform: 'scale(1.03)',
          }
        }}
        image={project.imageUrl || 'https://via.placeholder.com/300'}
        alt={project.name}
      />
      <CardContent sx={{ flexGrow: 1, p: 3, display: 'flex', flexDirection: 'column' }}>
        <Typography 
          gutterBottom 
          variant="h6" 
          component="div"
          sx={{ 
            fontSize: { xs: '1.1rem', sm: '1.2rem' },
            fontFamily: 'Lora, serif',
            fontWeight: 700
          }}
        >
          {project.name}
        </Typography>
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{
            fontFamily: 'Inter, sans-serif',
            fontSize: { xs: '0.8rem', sm: '0.85rem' },
            lineHeight: 1.5,
            flexGrow: 1,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {project.description}
        </Typography>
        <Box sx={{ mt: 3, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {project.tags && project.tags.map((tag, index) => (
            <Chip 
              key={index} 
              label={tag} 
              sx={{ 
                background: 'rgba(0, 242, 254, 0.05)', 
                color: '#00F2FE', 
                border: '1px solid rgba(0, 242, 254, 0.25)',
                fontSize: { xs: '0.65rem', sm: '0.7rem' },
                fontFamily: 'Lexend, sans-serif',
                fontWeight: 500
              }} 
            />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;

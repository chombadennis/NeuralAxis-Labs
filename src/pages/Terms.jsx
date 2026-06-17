
import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Grid, Button, Paper, Divider } from '@mui/material';

const sections = [
  {
    id: 'acceptance',
    title: '1. Acceptance of Terms',
    content: `Welcome to NeuralAxis Labs. By accessing our website, platform, code repositories, or custom API endpoints, you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, you must cease all use of our services immediately. These terms constitute a binding legal agreement between you and NeuralAxis Labs.`
  },
  {
    id: 'services',
    title: '2. Description of Services',
    content: `NeuralAxis Labs designs, builds, and maintains custom software engines, automated workflows, custom artificial intelligence systems, and data analytics tools. Any new modifications, updates, or experimental feature releases added to our ongoing deployments are automatically subject to these Terms of Service.`
  },
  {
    id: 'intellectual',
    title: '3. Intellectual Property Rights',
    content: `• Custom Deployments: Unless specified otherwise in a Master Services Agreement (MSA), client-owned proprietary data, customized dashboard layouts, and unique database structures developed specifically for your operations belong to you.
• Core Technologies: NeuralAxis Labs retains all rights, titles, and interests in our base models, pre-built template frameworks, automated tooling suites, libraries, and code architectures created prior to or independently of custom contracts.`
  },
  {
    id: 'conduct',
    title: '4. Acceptable Use & Restrictions',
    content: `You agree not to misuse our system services or help others do so. Specifically, you shall not:
• Reverse-engineer, decompile, or extract the source code of our underlying proprietary machine learning models or API structures.
• Deploy automated scripts or scrapers to overload, disrupt, or bypass security layers of our hosted previews or production sites.
• Utilize our custom systems to process, store, or transmit illegal, malicious, or infringing data packets.`
  },
  {
    id: 'liability',
    title: '5. Limitation of Liability',
    content: `To the maximum extent permitted by applicable law, NeuralAxis Labs and its contributors provide all software, configurations, and advisory services "as is" without warranties of any kind. We shall not be liable for any indirect, incidental, special, or consequential damages—including loss of revenues, profits, data, or operational uptime—arising out of or in connection with the use of our services.`
  },
  {
    id: 'termination',
    title: '6. Account Suspension & Termination',
    content: `We reserve the right to suspend or terminate your access to our custom APIs, developer platforms, or hosted sites at our sole discretion, without prior notice, if we determine that your utilization violates these Terms of Service, infrings third-party rights, or poses a system security threat.`
  },
  {
    id: 'governing',
    title: '7. Governing Law & Contact Details',
    content: `These Terms of Service and any dispute arising from them will be governed by the laws of Kenya, without regard to conflict of law principles. If you have any clarifications or requests regarding these terms, please contact our legal counsel using the contact form on our homepage.`
  }
];

const Terms = () => {
  const [activeSection, setActiveSection] = useState('acceptance');

  const handleScrollTo = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 90;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Box sx={{ background: 'radial-gradient(circle at 50% 50%, #0F1633 0%, #070913 100%)', color: '#fff', minHeight: '100vh', pt: { xs: '80px', sm: '100px' }, pb: 8 }}>
      <Container maxWidth="lg">
        {/* Header Hero Section */}
        <Box sx={{ mb: 8, textAlign: 'center' }}>
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom 
            sx={{ 
              fontFamily: 'Lora, serif', 
              fontWeight: 800, 
              fontSize: { xs: '2rem', sm: '2.5rem' },
              letterSpacing: '-0.02em',
              background: 'linear-gradient(135deg, #ffffff 0%, #A0AEC0 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Terms of Service
          </Typography>
          <Typography variant="body2" sx={{ color: '#00F2FE', fontFamily: 'Lexend, sans-serif', fontWeight: 600 }}>
            Last updated: {new Date().toLocaleDateString()}
          </Typography>
        </Box>

        <Grid container spacing={5}>
          {/* Left Column: Table of Contents Sidebar */}
          <Grid item xs={12} md={4}>
            <Box 
              sx={{ 
                position: { md: 'sticky' }, 
                top: { md: '100px' }, 
                display: 'flex', 
                flexDirection: 'column', 
                gap: 1,
                background: 'rgba(15, 18, 37, 0.3)',
                backdropFilter: 'blur(12px)',
                p: 3,
                borderRadius: '16px',
                border: '1px solid rgba(255, 255, 255, 0.05)'
              }}
            >
              <Typography variant="h6" sx={{ fontFamily: 'Lora, serif', fontWeight: 700, mb: 2, fontSize: '1.1rem', letterSpacing: '0.05em' }}>
                TABLE OF CONTENTS
              </Typography>
              {sections.map((section) => (
                <Button
                  key={section.id}
                  onClick={() => handleScrollTo(section.id)}
                  variant="text"
                  sx={{
                    justifyContent: 'flex-start',
                    textAlign: 'left',
                    fontFamily: 'Lexend, sans-serif',
                    fontSize: '0.85rem',
                    py: 1,
                    px: 1.5,
                    borderRadius: '8px',
                    color: activeSection === section.id ? '#00F2FE' : 'text.secondary',
                    background: activeSection === section.id ? 'rgba(0, 242, 254, 0.06)' : 'transparent',
                    borderLeft: `2px solid ${activeSection === section.id ? '#00F2FE' : 'transparent'}`,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      color: '#00F2FE',
                      background: 'rgba(0, 242, 254, 0.03)'
                    }
                  }}
                >
                  {section.title.split('. ')[1]}
                </Button>
              ))}
            </Box>
          </Grid>

          {/* Right Column: Detailed Sections */}
          <Grid item xs={12} md={8}>
            <Paper 
              sx={{ 
                p: { xs: 4, sm: 6 }, 
                background: 'rgba(15, 18, 37, 0.25)', 
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.04)',
                borderRadius: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: 5
              }}
            >
              {sections.map((section, idx) => (
                <Box key={section.id} id={section.id} sx={{ scrollMarginTop: '100px' }}>
                  <Typography 
                    variant="h5" 
                    component="h2" 
                    gutterBottom 
                    sx={{ 
                      fontFamily: 'Lora, serif', 
                      fontWeight: 700,
                      fontSize: { xs: '1.25rem', sm: '1.4rem' },
                      color: '#ffffff',
                      mb: 2
                    }}
                  >
                    {section.title}
                  </Typography>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      color: 'text.secondary', 
                      fontFamily: 'Inter, sans-serif', 
                      lineHeight: 1.7,
                      fontSize: { xs: '0.9rem', sm: '0.95rem' },
                      whiteSpace: 'pre-line'
                    }}
                  >
                    {section.content}
                  </Typography>
                  {idx < sections.length - 1 && <Divider sx={{ mt: 5, borderColor: 'rgba(255, 255, 255, 0.06)' }} />}
                </Box>
              ))}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Terms;

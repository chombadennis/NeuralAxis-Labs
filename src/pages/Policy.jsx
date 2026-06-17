
import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Grid, Button, Paper, Divider } from '@mui/material';

const sections = [
  {
    id: 'intro',
    title: '1. Introduction & Overview',
    content: `NeuralAxis Labs ("we", "us", or "our") is dedicated to protecting your privacy while designing and building next-generation artificial intelligence and software solutions. This Privacy Policy details how we collect, handle, and secure data across our services, websites, and custom client integrations. By engaging with our services, you consent to the practices described herein. We hold ourselves to elite security standards to safeguard all operational parameters.`
  },
  {
    id: 'collect',
    title: '2. Information We Collect',
    content: `We collect data to optimize performance and deliver reliable integrations. This includes:
• Direct Communications: Name, email address, company details, and project parameters supplied when completing our contact forms.
• Integration & Telemetry: Project details, metadata, diagnostic data, and performance statistics necessary to monitor deployment stability.
• Web Analytics: Standard browser information, IP addresses, cookies, and referral URLs collected automatically to evaluate user engagement.`
  },
  {
    id: 'usage',
    title: '3. Data Processing & AI Guidelines',
    content: `We process data specifically to design, deploy, and maintain custom algorithms and cloud services. We enforce strict data usage principles:
• Foundation Models: Client operational data and communications are never utilized to train foundation models or public algorithms without explicit, written authorization.
• Service Improvement: Performance analytics and system logs are reviewed internally to identify resource bottlenecks and debug integrations.
• Secure Transmissions: All input and telemetry vectors are encrypted in transit using industry-standard TLS protocols.`
  },
  {
    id: 'sharing',
    title: '4. Sharing & Third-Party Disclosures',
    content: `We do not sell, rent, or lease personal or proprietary client data to third parties. Information is only shared under the following conditions:
• Cloud Infrastructure: With trusted infrastructure partners (such as Google Firebase for database hosting, and Resend for transactional emails) strictly to execute system functions.
• Legal Compliance: When mandated by legal processes, governmental regulations, or court orders to protect NeuralAxis Labs' operational integrity.
• Business Transfer: In the event of a merger, acquisition, or restructuring, where the transferring party ensures matching privacy protections.`
  },
  {
    id: 'security',
    title: '5. Technical Security & Encryption',
    content: `Our systems employ comprehensive technical controls to prevent unauthorized access, alteration, or data leaks:
• Encryption: High-grade AES-256 encryption for data at rest, and TLS 1.3 for data in transit.
• Access Control: Zero-trust internal structures limiting access to client codebases and databases to authorized research personnel.
• Continuous Auditing: Automated vulnerability sweeps and periodic dependency updates to maintain system resilience against external threats.`
  },
  {
    id: 'rights',
    title: '6. User Rights & System Controls',
    content: `Depending on your location, you may possess specific statutory rights regarding your data (such as GDPR or CCPA protections):
• Data Portability: You may request a structured copy of any communication records or metadata we store.
• Right of Erasure: You may request the deletion of your personal contact records from our active sales pipelines.
• Restriction of Processing: You can opt out of telemetry logging by coordinating custom configuration settings with our development team.`
  },
  {
    id: 'contact',
    title: '7. Revision History & Contact Info',
    content: `We periodically update this Privacy Policy to reflect changing security practices and regulatory standards. The "Last Updated" date at the top indicates the latest iteration. For any inquiries, concerns, or requests regarding this policy, please connect with us directly using the contact form on our homepage.`
  }
];

const Policy = () => {
  const [activeSection, setActiveSection] = useState('intro');

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
            Privacy Policy
          </Typography>
          <Typography variant="body2" sx={{ color: '#00F2FE', fontFamily: 'Lexend, sans-serif', fontWeight: 600 }}>
            Last updated: {new Date().toLocaleDateString()}
          </Typography>
        </Box>

        <Grid container spacing={5}>
          {/* Left Column: Sticky Sidebar Table of Contents */}
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

          {/* Right Column: Detailed Content Sections */}
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

export default Policy;


import React from 'react';
import { Container, Typography, Box, Card, CardContent } from '@mui/material';

const sections = [
  {
    title: '1. Information We Collect',
    content: `We collect information to provide better services to all our users. This includes information you provide us, such as your name and email address, and information we get from your use of our services, like your IP address and device information.`,
  },
  {
    title: '2. How We Use Information',
    content: `We use the information we collect to provide, maintain, protect, and improve our services, to develop new ones, and to protect ourselves and our users. We also use this information to offer you tailored content.`,
  },
  {
    title: '3. Information We Share',
    content: `We do not share personal information with companies, organizations, and individuals outside of our company unless one of the following circumstances applies: with your consent, for external processing, or for legal reasons.`,
  },
  {
    title: '4. Security',
    content: `We work hard to protect our users from unauthorized access to or unauthorized alteration, disclosure, or destruction of information we hold. We encrypt many of our services using SSL and we review our information collection, storage, and processing practices.`,
  },
  {
    title: '5. Changes',
    content: `Our Privacy Policy may change from time to time. We will post any privacy policy changes on this page and, if the changes are significant, we will provide a more prominent notice.`,
  },
  {
    title: '6. Contact Us',
    content: `If you have any questions about this Privacy Policy, please contact us.`,
  },
];

const Policy = () => {
  return (
    <Box sx={{ background: '#1a1a1a', color: '#fff', minHeight: '100vh' }}>
      <Container maxWidth="lg" sx={{ py: 8, mt: 8 }}>
        <Typography variant="h2" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>
          Privacy Policy
        </Typography>
        <Typography variant="body1" align="center" sx={{ mb: 6, color: '#ccc' }}>
          Last updated: {new Date().toLocaleDateString()}
        </Typography>
        {sections.map((section, index) => (
          <Card key={index} sx={{ background: '#2a2a2a', color: '#fff', mb: 4, borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
                {section.title}
              </Typography>
              <Typography variant="body1">
                {section.content}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Container>
    </Box>
  );
};

export default Policy;

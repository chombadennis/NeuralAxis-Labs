
import React from 'react';
import { Container, Typography, Box, Card, CardContent } from '@mui/material';

const sections = [
  {
    title: '1. Introduction',
    content: `Welcome to NeuralAxis-Labs. By accessing our website, you agree to these Terms of Service. Please read them carefully.`,
  },
  {
    title: '2. Use of Our Services',
    content: `You must follow any policies made available to you within the Services. Don't misuse our Services. For example, don't interfere with our Services or try to access them using a method other than the interface and the instructions that we provide.`,
  },
  {
    title: '3. Privacy and Copyright Protection',
    content: `Our privacy policies explain how we treat your personal data and protect your privacy when you use our Services. By using our Services, you agree that we can use such data in accordance with our privacy policies.`,
  },
  {
    title: '4. Your Content in our Services',
    content: `You retain ownership of any intellectual property rights that you hold in that content. In short, what belongs to you stays yours.`,
  },
  {
    title: '5. Modifying and Terminating our Services',
    content: `We are constantly changing and improving our Services. We may add or remove functionalities or features, and we may suspend or stop a Service altogether.`,
  },
  {
    title: '6. Governing Law',
    content: `The laws of the United States will apply to any disputes arising out of or relating to these terms or the Services.`,
  },
];

const Terms = () => {
  return (
    <Box sx={{ background: '#1a1a1a', color: '#fff', minHeight: '100vh' }}>
      <Container maxWidth="lg" sx={{ py: 8, mt: 8 }}>
        <Typography variant="h2" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>
          Terms of Service
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

export default Terms;

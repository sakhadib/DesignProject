import { 
    Container,
    Typography,
    Box,
    List,
    ListItem,
    ListItemText,
  } from '@mui/material';
  
  export default function PrivacyPolicy() {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography 
          variant="h1" 
          component="h1" 
          sx={{ 
            color: 'primary.main',
            fontSize: { xs: '2.5rem', md: '3.5rem' },
            mb: 4 
          }}
        >
          PRIVACY POLICY
        </Typography>
  
        <Typography variant="body1" sx={{ mb: 2 }}>
        <Box component="span" sx={{ fontWeight: 'bold' }}>Effective date:</Box> December 12, 2024
          
        </Typography>

        <Typography variant="body1" sx={{mb:2}}>
        <Box component="span" sx={{ fontWeight: 'bold' }}>Last Update:</Box> December 12, 2024
        </Typography>
  
        <Typography variant="body1" sx={{ mb: 4 }}>
          Welcome to MathXplorer, your go-to platform for mathematical competitions and problem-solving. At MathXplorer, your privacy is of utmost importance to us. This Privacy Policy outlines how we collect, use, and protect your information while you engage with our web platform.
        </Typography>
  
        <Typography 
          variant="h3" 
          sx={{ 
            color: 'primary.main',
            fontSize: { xs: '2rem', md: '2rem' },
            mb: 3 
          }}
        >
          Information We Collect 
        </Typography>
  
        <Typography variant="body1" sx={{ mb: 4 }}>
          At MathXplorer, we prioritize the privacy and security of our users' information. This section of our Privacy Policy explains how we collect and utilize the data you provide to us or that we gather when you interact with our platform.
        </Typography>

        <ul style={{ marginLeft: '1.5rem', fontSize: { xs: '2rem', md: '2.5rem' }, color: '#333' }}>
  <li>
    <strong>1.1 Account Information</strong>
    <ul style={{ marginLeft: '1rem' }}>
      <li>Name</li>
      <li>Email address</li>
      <li>Password (securely encrypted)</li>
      <li>Optional profile details (e.g., bio, profile picture)</li>
    </ul>
  </li>
  <li>
    <strong>1.2 Activity Data</strong>
    <ul style={{ marginLeft: '1rem' }}>
      <li>Problems attempted and solved</li>
      <li>Contest participation</li>
      <li>XP and ratings</li>
    </ul>
  </li>
  <li>
    <strong>1.3 Device and Log Information</strong>
    <ul style={{ marginLeft: '1rem' }}>
      <li>Browser type and settings</li>
      <li>IP address</li>
      <li>Log activity timestamps</li>
    </ul>
  </li>
  <li>
    <strong>1.4 Optional Data</strong>
    <ul style={{ marginLeft: '1rem' }}>
      <li>Community contributions, such as:</li>
      <ul style={{ marginLeft: '1rem' }}>
        <li>Blogs written or commented on</li>
        <li>Reviews and social interactions</li>
      </ul>
    </ul>
  </li>
</ul>

  
        <Typography 
          variant="h3" 
          sx={{ 
            color: '#1976d2',
            fontSize: { xs: '2rem', md: '2rem' },
            mb: 2 
          }}
        >
          How We Use Your Information :
        </Typography>

        <Typography variant="body1" sx={{ mb: 4 }}>
        We use the collected information to:
        </Typography>

        <ul style={{ marginLeft: '1.5rem' }}>
          <li>Provide and improve platform features.</li>
          <li>Personalize content and user experience.</li>
          <li>Maintain leaderboard rankings, ratings, and XP.</li>
          <li>Facilitate communication and provide support.</li>
          <li>Analyze usage trends for development and optimization.</li>
          <li>Ensure the security and integrity of our services.</li>   
        </ul>




        <Typography variant="h3" 
          sx={{ 
            color: '#1976d2',
            fontSize: { xs: '2rem', md: '2rem' },
            mb: 2 
          }}>

              Sharing Your Information : 

        </Typography>

        <Typography variant="body1" sx={{ mb: 4 }}>
        MathXplorer does not sell your personal information. However, we may share data:
        </Typography>


        <ul style={{marginLeft : '1.5rem'}}>
            <li>With trusted third-party service providers (e.g., hosting, analytics) to perform essential services.</li>
            <li>If required by law or to protect our platform’s integrity.</li>
            <li>For collaborative features, such as public leaderboards and blogs, where user contributions may be visible to others.</li>
        </ul>
  
        
      </Container>
    );
  }
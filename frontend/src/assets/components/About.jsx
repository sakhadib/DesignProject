import { Box, Container, Typography, Grid, Card, CardContent, Avatar } from '@mui/material';
import shuvro from '../img/shuvro.jpg';
import tahsin from '../img/tahsinfaltu.jpg';
import takia from '../img/takia.jpg';
import aboutpic from '../img/aboutpic.png';
import inclusivity from '../img/teamwork.png';
import excellence from '../img/award.png';
import passion from '../img/idea.png';
import collaboration from '../img/team.png';
import innovation from '../img/innovation.png';
import growth from '../img/growth.png';


export default function AboutSection() {
  const teamMembers = [
    {
      name: "Tahsin Islam",
      role: "Software Engineering student",
      description: "A Software Engineering student of Islamic University of Technology and developer of MathXplorer.",
      image: tahsin,
      github: "https://github.com/tahsinrayshad"
    },
    {
      name: "Takia Farhin",
      role: "Software Engineering student",
      description: "A Software Engineering student of Islamic University of Technology and developer of MathXplorer.",
      image: takia,
      github: "https://github.com/Takia03"
    },
    {
      name: "Sakhawat Adib",
      role: "Software Engineering student",
      description: "A Software Engineering student of Islamic University of Technology and developer of MathXplorer.",
      image: shuvro,
      github: "https://github.com/sakhadib"
    }
  ];
  

  const values = [
    {
      title: "Passion for Learning",
      description: "We believe in nurturing a deep love for mathematics and the excitement of discovery through engaging challenges.",
      image: passion
    },
    {
      title: "Inclusivity",
      description: "MathXplorer welcomes everyone, creating an environment where math enthusiasts of all levels feel valued and supported.",
      image: inclusivity
    },
    {
      title: "Collaboration",
      description: "We encourage users to learn from each other, share insights, and grow together as a community.",
      image: collaboration
    },
    {
      title: "Excellence",
      description: "We strive to provide high-quality content and a seamless user experience, fostering excellence in every math pursuit.",
      image: excellence
    },
    {
      title: "Innovation",
      description: "By integrating unique features like our Socratic chatbot, we aim to make math learning interactive, accessible, and fun.",
      image: innovation
    },
    {
      title: "Continuous Growth",
      description: "We are committed to lifelong learning, empowering users to improve their skills, confidence, and understanding of math.",
      image: growth
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      {/* About Us Section */}
      <Box sx={{ mb: 8, textAlign: 'center' }}>
        <Typography variant="h2" component="h1" sx={{ color: '#0D1E4C', mb: 6 }}>
          ABOUT US
        </Typography>
        <Box sx={{  mb: 4 }}>
          <Typography variant="h5" sx={{p:4, mb: 2, color: '#0f4987' }}>
            "Where Math Meets Passion: Join the Equation at MathRanker!"
          </Typography>

          {/* Grid for Image and Text Side-by-Side */}
          <Grid container spacing={4} alignItems="center">
            {/* Image Section */}
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src={aboutpic}
                alt="About Us"
                sx={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: 2
                }}
              />
            </Grid>
            
            {/* Text Section */}
            <Grid item xs={12} md={6}>
              <Typography>
                Welcome to MathXplorer – where math enthusiasts come to learn, compete, and grow through engaging problem-solving. Here, unique features like our Socratic dialogue-based chatbot, adaptive answer submissions, and community-driven challenges make learning math both dynamic and enjoyable. From friendly contests to personalized feedback, MathXplorer is designed to support every user’s journey in building strong problem-solving skills and fostering a true love for math.
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* Mission Section */}
<Box sx={{ p: 5, mb: 8 }}>
  <Typography variant="h3" component="h2" sx={{ color: '#0D1E4C', mb: 4, textAlign: 'center' }}>
    OUR MISSION
  </Typography>
  <Typography sx={{ mb: 4, textAlign: { xs: 'center', md: 'left' } }}>
    At MathXplorer, we’re committed to sparking a passion for mathematics and empowering every user to reach new heights. Through engaging challenges, thought-provoking problems, and a collaborative community, we strive to cultivate growth, connection, and excellence in math exploration.
  </Typography>
  <Grid container spacing={4}>
    <Grid item xs={12} sm={6} md={4}>
      <Card
        sx={{
          height: '100%',
          bgcolor: 'grey.50',
          transition: 'transform 0.3s ease',
          '&:hover': {
            transform: 'scale(1.05)',
            boxShadow: 6,
          },
        }}
      >
        <CardContent sx={{ textAlign: 'center' }}>
          <Typography variant="h6" sx={{fontWeight:"bold", color:"#1565C0", mb:1}}>Engage through Interaction</Typography>
          <Typography>Make math fun with interactive, guided challenges</Typography>
        </CardContent>
      </Card>
    </Grid>
    <Grid item xs={12} sm={6} md={4}>
      <Card
        sx={{
          height: '100%',
          bgcolor: 'grey.50',
          transition: 'transform 0.3s ease',
          
          '&:hover': {
            transform: 'scale(1.05)',
            boxShadow: 6,
          },
        }}
      >
        <CardContent sx={{ textAlign: 'center' }}>
          <Typography variant="h6" sx={{fontWeight:"bold", color:"#1565C0", mb:1}}>Empower Growth</Typography>
          <Typography>Boost skills and confidence at all levels. Be a math legend.</Typography>
        </CardContent>
      </Card>
    </Grid>
    <Grid item xs={12} sm={6} md={4}>
      <Card
        sx={{
          height: '100%',
          bgcolor: 'grey.50',
          transition: 'transform 0.3s ease',
          '&:hover': {
            transform: 'scale(1.05)',
            boxShadow: 6,
          },
        }}
      >
        <CardContent sx={{ textAlign: 'center' }}>
          <Typography variant="h6" sx={{fontWeight:"bold", color:"#1565C0", mb:1}}>Build Community</Typography>
          <Typography>Connect math enthusiasts from everywhere</Typography>
        </CardContent>
      </Card>
    </Grid>
  </Grid>
</Box>




{/* Values Section */}
<Box sx={{ mb: 8, p: 4, borderRadius: 2 }}>
  <Typography variant="h3" component="h2" sx={{ color: '#0D1E4C', mb: 4, textAlign: 'center' }}>
    OUR VALUES
  </Typography>
  <Typography variant="h5" sx={{ textAlign: 'center', mb: 4, color: '#0f4987' }}>
    "Core Values: Empowering Minds, Unveiling the Beauty of Numbers."
  </Typography>
  <Grid container spacing={4}>
    {values.map((value, index) => (
      <Grid item xs={12} sm={6} key={index}> {/* Two boxes per row */}
        <Box
          component="div"
          sx={{
            p: 3,
            borderRadius: 2,
            boxShadow: 3,
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'scale(1.05)',
              boxShadow: 6,
            },
            bgcolor: 'grey.50'
          }}
        >

          {/* Image Section */}

          <Avatar
            src={value.image}
            alt={value.title}
            sx={{ width: 80, height: 80, mx: 'auto', mb: 2,objectFit: 'cover',borderRadius: 1}}
          />

          
          <Typography variant="h6" sx={{fontWeight:"bold", color:"#8d256f", mb:1, textAlign: "center"}}>{value.title}</Typography>
          <Typography sx={{textAlign: "center"}}>{value.description}</Typography>
        </Box>
      </Grid>
    ))}
  </Grid>
</Box>



      {/* Team Section */}
      <Box>
  <Typography variant="h3" component="h2" sx={{ color: '#0D1E4C', mb: 4, textAlign: 'center' }}>
    MAKERS OF MathXplorer
  </Typography>
  <Grid container spacing={4}>
    {teamMembers.map((member, index) => (
      <Grid item xs={12} md={4} key={index}>
        <a href={member.github} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
          <Card
            sx={{
              p: 3,
              borderRadius: 2,
              boxShadow: 3,
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: 6,
              },
              bgcolor: 'grey.50',
              cursor: "pointer",
            }}
          >
            <CardContent sx={{ textAlign: 'center' }}>
              <Avatar
                src={member.image}
                sx={{ width: 120, height: 120, mx: 'auto', mb: 2 }}
              />
              <Typography variant="h6" sx={{ mb: 1 }}>{member.name}</Typography>
              <Typography variant="body2" color="text.secondary">{member.role}</Typography>
              <Typography variant="body2" sx={{ mt: 2 }}>{member.description}</Typography>
            </CardContent>
          </Card>
        </a>
      </Grid>
    ))}
  </Grid>
</Box>

    </Container>
  );
}
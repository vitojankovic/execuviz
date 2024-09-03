import React from 'react';
import IconButton from '@mui/material/IconButton';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Container, Grid, Typography } from '@mui/material';

/*const footerStyle = {
  position: 'fixed',
  bottom: 0,
  width: '100%',
  backgroundColor: 'light',
  textAlign: 'center',
  color: 'rgba(0, 0, 0, 0.6)',
  fontFamily: 'Inter, sans-serif',
};*/

export default function App() {
  return (
    <footer>
      <section>
        <div style={{ marginRight: '20px', display: 'none' }}>
          <span>Get connected with us on social networks:</span>
        </div>

        <div>
          <IconButton color='secondary' href=''>
            <FacebookIcon />
          </IconButton>
          <IconButton color='secondary' href=''>
            <TwitterIcon />
          </IconButton>
          <IconButton color='secondary' href=''>
            <InstagramIcon />
          </IconButton>
          <IconButton color='secondary' href=''>
            <LinkedInIcon />
          </IconButton>
          <IconButton color='secondary' href=''>
            <GitHubIcon />
          </IconButton>
        </div>
      </section>

      <section>
        <Container style={{ textAlign: 'center', marginTop: '20px' }}>
          <Grid container spacing={4} justifyContent="center">
            <Grid item md={3} lg={4} xl={3}>
              <Typography variant="h6" fontWeight="bold" sx={{ color: 'secondary.main' }}>
                Company name
              </Typography>
              <Typography>
                Here you can use rows and columns to organize your footer content. Lorem ipsum dolor sit
                amet, consectetur adipisicing elit.
              </Typography>
            </Grid>

            <Grid item md={2} lg={2} xl={2}>
              <Typography variant="h6" fontWeight="bold">
                Products
              </Typography>
              <Typography>
                <a href='#!' style={{ textDecoration: 'none', color: 'inherit' }}>
                  Angular
                </a>
              </Typography>
              <Typography>
                <a href='#!' style={{ textDecoration: 'none', color: 'inherit' }}>
                  React
                </a>
              </Typography>
              <Typography>
                <a href='#!' style={{ textDecoration: 'none', color: 'inherit' }}>
                  Vue
                </a>
              </Typography>
              <Typography>
                <a href='#!' style={{ textDecoration: 'none', color: 'inherit' }}>
                  Laravel
                </a>
              </Typography>
            </Grid>

            <Grid item md={3} lg={2} xl={2}>
              <Typography variant="h6" fontWeight="bold">
                Useful links
              </Typography>
              <Typography>
                <a href='#!' style={{ textDecoration: 'none', color: 'inherit' }}>
                  Pricing
                </a>
              </Typography>
              <Typography>
                <a href='#!' style={{ textDecoration: 'none', color: 'inherit' }}>
                  Settings
                </a>
              </Typography>
              <Typography>
                <a href='#!' style={{ textDecoration: 'none', color: 'inherit' }}>
                  Orders
                </a>
              </Typography>
              <Typography>
                <a href='#!' style={{ textDecoration: 'none', color: 'inherit' }}>
                  Help
                </a>
              </Typography>
            </Grid>

            <Grid item md={4} lg={3} xl={3}>
              <Typography variant="h6" fontWeight="bold">
                Contact
              </Typography>
              <Typography>
                New York, NY 10012, US
              </Typography>
              <Typography>
                info@example.com
              </Typography>
              <Typography>
                + 01 234 567 88
              </Typography>
              <Typography>
                + 01 234 567 89
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </section>

      <div style={{ textAlign: 'center', padding: '16px', backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © 2021
        <a href='https://mdbootstrap.com/' style={{ textDecoration: 'none', fontWeight: 'bold' }}>
          MDBootstrap.com
        </a>
      </div>
    </footer>
  );
}

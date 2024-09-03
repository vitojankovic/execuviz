import { Button, Grid, Paper, Typography } from '@mui/material'
import Logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';


export default function LandPage() {

  const token = localStorage.getItem('token');
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }

    if (loggedIn) {
      navigate('/dashboard');
    }
  }, [token, loggedIn, navigate]);

  if (loggedIn) {
    return null;
  }

  return (
    <div className="land-page">
      <div className="land-top">
        <div className="left">
          <Typography className="title" variant="h1">
            Example
          </Typography>
          <Typography variant="h3">
            Next Generation  <br></br>  Business Tool
          </Typography>
          <Button className="main-btn">
            Create An Account
          </Button>
        </div>
        <img className="logo" src={Logo} alt="Imaž" />
      </div>


      <Typography variant="h2" className="grid-title">
       Some Of Our Modules Include 
      </Typography>
      <Grid className="bento" container spacing={2}>

          <Paper className="paper" style={{ padding: 16 }}>
            <Typography variant="h6" className="title">1) Overview Of Your Company</Typography>
            <Typography variant="body1" className="description">Elevate your executive insight with our Overview of Your Company feature. Unleash the power of simplicity as we distill complex data into a visual masterpiece, providing a bird's-eye view of your company's heartbeat. Seamlessly amalgamating key metrics, milestones, and the essence of your brand, this feature transforms raw data into a captivating narrative, empowering you to make informed decisions with confidence..</Typography>
          </Paper>

        
          <Paper className="paper" style={{ padding: 16 }}>
            <Typography variant="h6" className="title">2) Financial Analysis </Typography>
            <Typography variant="body1" className="description">Dive into the financial pulse of your enterprise with our Financial Analysis suite. Immerse yourself in a realm of dynamic visualizations that breathe life into revenue streams, profitability, and key financial ratios. Uncover trends, make strategic financial decisions, and navigate the fiscal landscape with clarity. Transform your financial data into actionable intelligence and chart a course for sustainable growth.</Typography>
          </Paper>


          <Paper className="paper" style={{ padding: 16 }}>
            <Typography variant="h6" className="title">3) Team Managment</Typography>
            <Typography variant="body1" className="description">Witness the transformation of collaboration with our Team Management module. Imbued with a visual symphony of team dynamics, this feature orchestrates a harmonious display of individual performance metrics, team structures, and accomplishments. Empower leadership with a tool that transcends traditional management, fostering a culture of excellence and unity within your organization.</Typography>
          </Paper>

          <Paper className="paper" style={{ padding: 16 }}>
            <Typography variant="h6" className="title">4) Sales Analysis</Typography>
            <Typography variant="body1" className="description">Revolutionize your sales strategy with our Sales Analysis prowess. Immerse yourself in a canvas of vibrant charts and interactive graphs that unveil the story behind every sale. Identify top-performing products, navigate customer journeys, and amplify revenue streams. This feature transcends traditional analytics, providing a dynamic lens into the heart of your sales landscape.</Typography>
          </Paper>

        
          <Paper className="paper" style={{ padding: 16 }}>
            <Typography variant="h6" className="title">5) Efficiency Analysis </Typography>
            <Typography variant="body1" className="description">Ignite operational excellence with our Efficiency Analysis engine. Experience the seamless flow of operations through visual process flowcharts and key performance indicators. Identify bottlenecks, streamline workflows, and empower your organization with actionable insights. Efficiency Analysis is not just a feature; it's the catalyst for a transformative journey toward peak performance.</Typography>
          </Paper>


          <Paper className="paper" style={{ padding: 16 }}>
            <Typography variant="h6" className="title">6) Risk Managment</Typography>
            <Typography variant="body1" className="description">Navigate the unpredictable seas of business with our Risk Management command center. Immerse yourself in a visual matrix that categorizes and evaluates risks, unveiling opportunities for strategic mitigation. This feature is your vigilant companion, maintaining a transparent incident log and providing a proactive shield against uncertainties. It's not just risk management; it's a blueprint for resilience.</Typography>
          </Paper>
        

          <Paper className="paper" style={{ padding: 16 }}>
            <Typography variant="h6" className="title">7) Strategic Planning</Typography>
            <Typography variant="body1" className="description">Embrace the art of strategic orchestration with our Strategic Planning suite. Immerse yourself in a canvas that paints the future through SWOT analyses, goal progress tracking, and an inspiring roadmap. This is not just a planning tool; it's a visionary compass that guides your organization toward greatness, transforming aspirations into tangible realities.</Typography>
          </Paper>

          <Paper className="paper" style={{ padding: 16 }}>
            <Typography variant="h6" className="title">8) Market Analysis</Typography>
            <Typography variant="body1" className="description">Conquer market dynamics with our Market Analysis powerhouse. Immerse yourself in a captivating world of market share pie charts, competitor analyses, and trend visualizations. This feature is your compass in the ever-changing market landscape, offering insights that propel your business to the forefront. Market Analysis is not just data; it's your strategic vantage point in a competitive arena.</Typography>
          </Paper>

      </Grid>
  </div>
  )
}

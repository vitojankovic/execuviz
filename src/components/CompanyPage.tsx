import { Typography, Card, CardContent } from '@mui/material';
import { useParams } from 'react-router-dom';
import Carousel from 'react-material-ui-carousel';

export default function CompanyPage() {

  const { companyid, companyname } = useParams();
  const Id = companyid ?? '';
  const Name = companyname ?? '';

  const items = [
    {
      title: 'Financial Analytics',
      content: 'Visualize and analyze financial data with interactive graphs and comprehensive reports, helping you make informed business decisions.',
      link: 'finance',
    },
    {
      title: 'Sales Performance',
      content: 'Track and analyze your sales performance over time, including sales trends, customer behavior, and product performance, to optimize your sales strategies.',
      link: 'sales',
    },
    {
      title: 'Operational Efficiency',
      content: 'Monitor and improve operational efficiency by identifying bottlenecks, streamlining processes, and optimizing resource allocation for maximum productivity and cost savings.',
      link: 'efficiency',
    },
    {
      title: 'Strategic Planning',
      content: 'Create, manage, and track strategic plans, goals, and initiatives, ensuring alignment with your company\'s vision and enabling effective execution of business strategies.',
      link: 'planning',
    },
    {
      title: 'Team Management',
      content: 'Manage your team effectively with detailed insights into employee performance, productivity, and engagement, fostering a positive work environment and promoting collaboration.',
      link: 'team',
    },
    {
      title: 'AI-driven Insights and Recommendations',
      content: 'Utilize advanced AI algorithms to generate data-driven insights and personalized recommendations, leveraging cutting-edge technologies to optimize business strategies and operations.',
      link: 'recommendations',
    },
    {
      title: 'Risk Assessment and Mitigation',
      content: 'Assess and mitigate potential risks to your business by identifying and analyzing various risk factors, enabling proactive measures to minimize the impact of potential threats.',
      link: 'risk',
    },
    {
      title: 'Market Analysis and Competitor Insights',
      content: 'Conduct comprehensive market analysis and gain valuable insights into market trends, consumer behavior, and competitor strategies, empowering you to stay ahead in a competitive landscape.',
      link: 'market',
    },
  ];

  return (
    <div className="page-container">
      <Typography className="over-title" variant="h2">
        Visit
      </Typography>
      <Carousel className="view-wrapper" animation="fade" indicators={false} navButtonsAlwaysVisible={true}>
        {items.map((item, index) => (
          <Card key={index} className="select-card" component="a" href={`/${item.link}/${Id}/${Name}`}>
            <CardContent>
              <Typography className="white" variant="h2">{item.title}</Typography>
              <Typography variant="h4">{item.content}</Typography>
            </CardContent>
          </Card>
        ))}
      </Carousel>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { Typography, Card, CardContent, CircularProgress } from '@mui/material';
import { getCompaniesByFounder, getUserByEmail } from '../../FirebaseConfig';
import decode from './decodeToken';
import Carousel from 'react-material-ui-carousel';
import Logo from '../assets/logo.png';

export default function Overview() {
  
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [decodedToken, setDecodedToken] = useState<DecodedToken | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const decodedToken = localStorage.getItem('token');
        if (decodedToken) {
          const decoded: { userid: string, email: string } = decode();
          if (decoded) {
            const user = await getUserByEmail(decoded.email);
            if (user) {
              const { uid, username } = user;
              setUserId(uid);
              setUserName(username)
              setDecodedToken(decoded);

              const comps = await getCompaniesByFounder(uid);
              setCompanies(comps);
            }
          }
        }
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return <Typography>Error: {error.message}</Typography>;
  }


  return (
    <div className="page-container">
    <Typography className="over-title" variant="h2">
      {decodedToken ? `Welcome back, ${userName}` : 'Invalid token or no token found.'}
    </Typography>

    <Carousel className="view-wrapper" animation="fade" indicators={false} navButtonsAlwaysVisible={true}>
      {companies.map((company, index) => (
        <Card href={`/company/${company.id}/${company.name}`} key={index} className="select-card" component="a">
          <CardContent>
            <Typography className="white" variant="h1">{company.name}</Typography>
            <Typography variant="h2">{company.description}</Typography>
          </CardContent>
        </Card>
      ))}
    </Carousel>
  </div>
    )
}

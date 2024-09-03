import { useState, useEffect } from 'react';
import { Typography, Button, TextField, Modal } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { addToUser, getUserInfo } from '../../FirebaseConfig';

export default function Account() {

  const { userid, username } = useParams();
  
  const userId = userid ?? ''; 

  const userName = username ?? '';

  const navigate = useNavigate();
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [industry, setIndustry] = useState('');
  const [role, setRole] = useState('');
  const [department, setDepartment] = useState('');


  useEffect(()=> {
    (async () => {
      try {
        const user = await getUserInfo(userName);
        if(user != null) {
          setDescription(user.description);
          setLocation(user.location)
          setIndustry(user.industry)
          setRole(user.role)
          setDepartment(user.department)
        }
      } catch (error) {
        console.error('Error getting user info:', error);
      }
    })();
  },[])

  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleSaveDescription = () => {
    console.log(description)
    addToUser(userId, description, location, industry, role, department);
    setOpen(false);
  };

  return (
    <div className="page-container">
      <div className="prim-info">
        <div className="row">
          <div className="circle">{userName.charAt(0).toUpperCase()}</div>
          <div className="column">
            <Typography variant="h3" style={{ marginBottom: 20, color: 'white' }}>
              {username}
            </Typography>
            <Typography variant="h5" className="desc">
              { description }
            </Typography>
          </div>
        </div>
        <div className="custom-button-group">
          <Button className="first-btn" variant="contained" color="primary" onClick={() => setOpen(true)}>
            Edit Profile
          </Button>
          <Button className="second-btn" variant="contained" color="secondary" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>

      <Modal className="acc-page-edit" open={open}>
        <div className="modal-container">
          <div className="inputs">
            <TextField
              id="description"
              label="Description"
              variant="outlined"
              value={description}
              className="user-field"
              onChange={(e) => setDescription(e.target.value)}
            />
            <TextField
              id="location"
              label="Location"
              variant="outlined"
              value={location}
              className="user-field"
              onChange={(e) => setLocation(e.target.value)}
            />
            <TextField
              id="industry"
              label="Industry"
              variant="outlined"
              value={industry}
              className="user-field"
              onChange={(e) => setIndustry(e.target.value)}
            />
            <TextField
              id="role"
              label="Role"
              variant="outlined"
              value={role}
              className="user-field"
              onChange={(e) => setRole(e.target.value)}
            />
            <TextField
              id="department"
              label="Department"
              variant="outlined"
              value={department}
              className="user-field"
              onChange={(e) => setDepartment(e.target.value)}
            />
          </div>

          <Button className="main-btn" variant="contained" color="primary" onClick={handleSaveDescription}>
            Save
          </Button>
        </div>
      </Modal>
    </div>
  );
}
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Modal,
  Box,
  Typography,
  TextField
} from '@mui/material';import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCompany, updateTeam } from '../../FirebaseConfig';

export default function Team() {



  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { companyid, companyname } = useParams();
  const [team, setTeam] = useState([]);
  const Id = companyid ?? '';
  const Name = companyname ?? '';

  const fetchData = async () => {
    const company = await getCompany(Id);
    if (company) {
      setTeam(JSON.parse(company.team));
    }
  };

  useEffect(() => {
    fetchData();
    console.log(team)
  }, []);

  const handleEdit = (index, field, value) => {
    const updatedTeam = [...team];
    updatedTeam[index] = { ...updatedTeam[index], [field]: value };
    setTeam(updatedTeam);
  };

  const handleSubmit = () => {
    updateTeam(Id, JSON.stringify(team))
  }

  const getTotalWageBill = () => {
    return team.reduce((total, member) => parseInt(total) + parseInt(member.salary), 0);
  };

  return (
    <div className="page-container">
      <Typography variant="h2" className="over-title" style={{ marginBottom: '20px' }}>
        Showing Team For "{Name}"
      </Typography>
      <TableContainer className="team-table">
        <Table aria-label="simple table">
          <TableHead className="head">
            <TableRow className="row">
              <TableCell className="cell-head">Email</TableCell>
              <TableCell className="cell-head">Position</TableCell>
              <TableCell className="cell-head">Salary</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {team.map((member, index) => (
              <TableRow className="row" key={index}>
                <TableCell className="cell">{member.email}</TableCell>
                <TableCell className="cell">{member.position}</TableCell>
                <TableCell className="cell">{member.salary}</TableCell>
              </TableRow>
            ))}

            <TableRow className="row">
              <TableCell className="cell"></TableCell>
              <TableCell className="cell">Total Wage Bill</TableCell>
              <TableCell className="cell">{getTotalWageBill()}</TableCell>
            </TableRow>
            
          </TableBody>
        </Table>
      <Button className="btn" variant="contained" onClick={handleOpen}>
        Edit Team
      </Button>
      </TableContainer>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4 }}>
          {team.map((member, index) => (
                   <div key={index}>
                   <Typography variant="h3">{'Member: ' + (index + 1)}</Typography>
                   <TextField
                     placeholder="Email"
                     value={member.email}
                     onChange={(e) => handleEdit(index, 'email', e.target.value)}
                   />
                   <TextField
                     placeholder="Position"
                     value={member.position}
                     onChange={(e) => handleEdit(index, 'position', e.target.value)}
                   />
                   <TextField
                     placeholder="Salary"
                     value={member.salary}
                     onChange={(e) => handleEdit(index, 'salary', e.target.value)}
                   />
                 </div>
          ))}
            <Button onClick={() => handleSubmit()}>Edit</Button>
        </Box>
      </Modal>
    </div>
  );
}

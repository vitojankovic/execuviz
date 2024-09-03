import { useEffect, useState } from 'react';
import { getCompany } from '../../FirebaseConfig';
import { useParams } from 'react-router-dom';
import { Typography, Dialog, TextField } from '@mui/material';

export default function Planning() {
 const {companyid, companyname} = useParams()
 const [plan, setPlan] = useState(null);
 const [loading, setLoading] = useState(true);
 const [open, setOpen] = useState(false);
 const [formData, setFormData] = useState({
  goals: '',
  objectives: '',
  strategies: '',
  milestones: ''
 });

 useEffect(() => {
  const fetchPlan = async () => {
    try {
      const data = await getCompany(companyid)
      const planData = data.plan
      console.log(planData)
      if (planData.exists) {
        setPlan(planData.data());
      }
      else{
        setPlan(null);
      }
    } catch (error) {
      console.error('Error fetching plan data:', error);
    } finally {
      setLoading(false);
    }
  };

  fetchPlan();
 }, []);

 const handleOpen = () => {
  setOpen(true);
 };

 const handleClose = () => {
  setOpen(false);
 };

 const handleChange = (event) => {
  const { name, value } = event.target;
  setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
 };

 const handleSubmit = (event) => {
  event.preventDefault();
  // Save the plan data here
  setOpen(false);
 };

 return (
  <div className="page-container">
    <Typography></Typography>
    {!plan && <button onClick={handleOpen}>Create Plan</button>}
    <Dialog open={open} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <TextField name="goals" value={formData.goals} onChange={handleChange} />
        <TextField name="objectives" value={formData.objectives} onChange={handleChange} />
        <TextField name="strategies" value={formData.strategies} onChange={handleChange} />
        <TextField name="milestones" value={formData.milestones} onChange={handleChange} />
        <button type="submit">Save</button>
      </form>
    </Dialog>
    {plan && <PlanDisplay plan={plan} />}
  </div>
 );
}
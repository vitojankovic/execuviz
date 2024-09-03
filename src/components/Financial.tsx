import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { useParams } from 'react-router-dom'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import {
  parseMonthlyData,
  calculateMonthlyProfit,
  calculateMonthlyNetProfit,
  calculateMonthlyNetProfitMargin,
} from './monthlyDataUtils';
import { useSelector } from 'react-redux';




export default function Financial() {

  const { companyid, companyname } = useParams()

  const [cashFlow, setCashFlow] = useState("");
  const [kfr, setKfr] = useState("");
  const [monthlyData, setMonthlyData] = useState("");
  const [revenue, setRevenue] = useState("")
 
  const [monthlyExpenses, setMonthlyExpenses] = useState("")
  const [monthlyCashReserve, setMonthlyCashReserve] = useState("")
  const [monthlyCashFlow, setMonthlyCashFlow] = useState("")
  const [monthlyRevenue, setMonthlyRevenue] = useState("")
  const [monthlyProfit, setMonthlyProfit] = useState("")
  const [monthlyNetProfit, setMonthlyNetProfit] = useState("")
  const [monthlyNetProfitMargin, setMonthlyNetProfitMargin] = useState("") 
 
  const Id = companyid ?? '';
  const Name = companyname ?? '';
 
  const company = useSelector((state) => state.companyData.find((company) => company.id === Id));
 
  const fetchData = () => {
    if (company) {

      //! NEEDS TO BE CALCULATED
      setKfr(company.kfr);
      setMonthlyData(company.monthlyData);
      setCashFlow(company.cash_flow);
 
      const monthlyData: MonthlyDataEntry[] = parseMonthlyData(company.monthlyData);
      console.log(monthlyData);

      
      monthlyData.map((data) => {
        setRevenue(parseInt(revenue)+parseInt(data.revenue))
      })
 
      setMonthlyExpenses(monthlyData.map((entry) => ({ month: entry.month, expense: entry.expenses })));
      setMonthlyCashFlow(monthlyData.map((entry) => ({ month: entry.month, cash_flow: entry.cash_flow})))
      setMonthlyRevenue(monthlyData.map((entry) => ({ month: entry.month, revenue: entry.revenue })));
      setMonthlyProfit(calculateMonthlyProfit(monthlyData));
      setMonthlyNetProfit(calculateMonthlyNetProfit(monthlyData));
      setMonthlyNetProfitMargin(calculateMonthlyNetProfitMargin(monthlyData));
      setMonthlyCashReserve(monthlyData.map((entry) => ({ month: entry.month, cash_reserve: entry.cash_reserve})))
    }
  };
  
    useEffect(() => {
      fetchData();
    }, [company]);



  return (
    <div className="page-container">

      <Typography variant="h2" className="over-title" style={{ marginBottom: '20px' }}>
        Showing Financial Analysis For { Name }
      </Typography>

      {/* Placeholder for Revenue Analysis */}
      <Typography variant="h3" className="over-title">
        Revenue Analysis
      </Typography>

      <Typography variant="body1" className="over-title">
        Total Revenue: {revenue} $
      </Typography>
      <LineChart width={600} height={300} data={monthlyRevenue}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
      </LineChart>


      <Typography variant="body1" className="over-title">
        Total kfr: {kfr} $
      </Typography>
      <Typography variant="body1" className="over-title">
        Total cashflow: {cashFlow} $
      </Typography>

      {/* Placeholder for Profit Analysis */}
      <LineChart width={600} height={300} data={monthlyProfit}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="profit" stroke="#8884d8" />
      </LineChart>

      {/* Placeholder for Gross Profit Margin */}

      {/* Placeholder for Net Profit */}
      <LineChart width={600} height={300} data={monthlyNetProfit}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="netProfit" stroke="#8884d8" />
      </LineChart>

      {/* Placeholder for Net Profit Margin */}
      <LineChart width={600} height={300} data={monthlyNetProfitMargin}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="netProfitMargin" stroke="#8884d8" />
      </LineChart>

      {/* Placeholder for Expenses Analysis */}
      <LineChart width={600} height={300} data={monthlyExpenses}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="expense" stroke="#8884d8" />
      </LineChart>
      
      {/* Placeholder for Cash Flow Analysis */}
      <LineChart width={600} height={300} data={monthlyCashFlow}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="cash_flow" stroke="#8884d8" />
      </LineChart>

      {/* Placeholder for Cash Reserve */}
      <LineChart width={600} height={300} data={monthlyCashReserve}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="cash_reserve" stroke="#8884d8" />
      </LineChart>


      {/* Placeholder for Balance Sheet */}

      {/* Placeholder for Balance Sheet */}

      {/* Placeholder for Current Ratio */}

      {/* Placeholder for Debt-to-Equity Ratio */}       
    </div>
  );
}

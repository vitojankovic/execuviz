import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { LineChart, Line, Tooltip, Legend, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';


export default function Efficiency() {
  const { companyid } = useParams();
  const Id = companyid || '';

  const [efficiency, setEfficiency] = useState([]);
  /*const [inventoryTurnover, setInventoryTurnover] = useState([]);
  const [productionCycleTime, setProductionCycleTime] = useState([]);
  const [supplyChainEfficiency, setSupplyChainEfficiency] = useState([]);
  const [cashConversionCycle, setCashConversionCycle] = useState([])
  const [operationalKpi, setOperationalKpi] = useState([])*/

  const company = useSelector((state) => state.companyData.find((company) => company.id === Id));

  useEffect(() => {
    const fetchData = async () => {
      if (company) {
        setEfficiency(JSON.parse(company.efficiency));
      }
    };

    fetchData();

    /*const updateState = (stateSetter, dataExtractor) => {
      const updatedData = efficiency.map(data => dataExtractor(data));
      stateSetter(updatedData);
    };

    updateState(setInventoryTurnover, data => data.inventoryTurnover);
    updateState(setProductionCycleTime, data => data.productionCycleTime);
    updateState(setSupplyChainEfficiency, data => data.supplyChainEfficiency);
    updateState(setCashConversionCycle, data => data.cashConversionCycle);
    updateState(setOperationalKpi, data => data.operationalKpi);*/

  }, [company]);

  return (
    <div className="page-container">
        <h2>Inventory Turnover</h2>
        <LineChart width={600} height={300} data={efficiency}>
          <Line type="monotone" dataKey="inventoryTurnover" stroke="#8884d8" />
          <Legend />
          <Tooltip />
        </LineChart>

        <h2>Production Cycle Time</h2>
        <BarChart width={600} height={300} data={efficiency}>
          <Bar dataKey="productionCycleTime" fill="#82ca9d" />
          <Legend />
          <Tooltip />
        </BarChart>

        <h2>Supply Chain Efficiency</h2>
        <RadarChart outerRadius={150} width={600} height={300} data={efficiency}>
          <PolarGrid />
          <PolarAngleAxis dataKey="name" />
          <PolarRadiusAxis />
          <Legend />
          <Tooltip />
          <Line type="monotone" dataKey="supplyChainEfficiency" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
        </RadarChart>

        <h2>Cash Conversion Cycle</h2>
        <LineChart width={600} height={300} data={efficiency}>
          <Line type="monotone" dataKey="cashConversionCycle" stroke="#8884d8" />
          <Legend />
          <Tooltip />
        </LineChart>
    </div>
  );
}

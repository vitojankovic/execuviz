import React, { useEffect, useState } from 'react';
import { getCompany } from '../../FirebaseConfig';
import { useParams } from 'react-router-dom';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import {
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from 'recharts';
import { useSelector } from 'react-redux';

export default function Sales() {

  const { companyid } = useParams();
  const Id = companyid ?? '';
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');

  const company = useSelector((state) => state.companyData.find((company) => company.id === Id));

  const fetchData = async () => {
    if (company) {
      setProducts(JSON.parse(company.products));
      setSelectedProduct(JSON.parse(company.products)[0]?.name || '');
    }
  };

  useEffect(() => {
    fetchData();
  }, [company]);

  const handleProductChange = (event) => {
    setSelectedProduct(event.target.value);
  };

  const selectedProductData = products.find((product) => product.name === selectedProduct);

  return (
    <div className="page-container">
      <Typography variant="h2">Sales and Marketing</Typography>
      <FormControl className="select-product">
        <InputLabel id="product-select-label">Select Product</InputLabel>
        <Select
          labelId="product-select-label"
          id="product-select"
          value={selectedProduct}
          onChange={handleProductChange}
        >
          {products.map((product, index) => (
            <MenuItem key={index} value={product.name}>
              {product.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {selectedProductData && (
        <div>
          <Typography variant="h4">Charts for {selectedProductData.name}</Typography>

          {/* Create an array of sequential numbers for x-axis */}
          <React.Fragment>
            {/* Chart for Unit Price */}
            <LineChart width={600} height={300} data={selectedProductData.monthlyData}>
              <XAxis dataKey="month" tickFormatter={(value) => value + 1} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="unit_price" stroke="#8884d8" />
            </LineChart>

            {/* Chart for Times Sold */}
            <LineChart width={600} height={300} data={selectedProductData.monthlyData}>
              <XAxis dataKey="month" tickFormatter={(value) => value + 1} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="times_sold" stroke="#82ca9d" />
            </LineChart>

            {/* Chart for Production Cost */}
            <LineChart width={600} height={300} data={selectedProductData.monthlyData}>
              <XAxis dataKey="month" tickFormatter={(value) => value + 1} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="production_cost" stroke="#ffc658" />
            </LineChart>
          </React.Fragment>
        </div>
      )}
    </div>
  );
}

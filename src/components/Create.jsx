import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { addCompany, getUserByEmail } from '../../FirebaseConfig';
import Button from '@mui/material/Button';
import decode from './decodeToken';
import { Typography } from '@mui/material';

export default function Create() {

  const [userId, setUserId] = useState("")

  const fetchData = async () => {
    const decodedToken = localStorage.getItem('token');
    if (decodedToken) {
      const decoded = decode();
      if (decoded) {
        const user = await getUserByEmail(decoded.email);
        if (user) {
          const { uid } = user;
          setUserId(uid)
        }
      }
    }
  };

  useEffect(() => {
    fetchData();
  },[])




  // TODO: ADD VARIABLES FOR USESTATE GLOBAL AND USESTATE LOCAL AND ASSIGN LOCAL TO GLOBAL LATER

  //? STEPS PART
  const steps = [
    { title: 'Basic Information', component: BasicInformation },
    { title: 'Finance / Months', component: FinancialData },
    { title: 'Operational Efficiency', component: Efficiency },
    { title: 'Employees Info', component: Team },
    { title: 'Services', component: Services },
   ];

   const [currentStep, setCurrentStep] = useState(0);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("")
  const [desc, setDesc] = useState("");
  const [industry, setIndustry] = useState("");
  const [location, setLocation] = useState("");

  //? PRODUCTS DATA
  const [products, setProducts] = useState([
    { name: '', category: '', id: '', monthlyData: [{ unit_price: '', cost_price: '', times_sold: '' }] },
  ]);

  const handleAddProduct = () => {
    setProducts((prev) => [
      ...prev,
      { name: '', category: '', id: '', monthlyData: [{ unit_price: '', cost_price: '', times_sold: '' }] },
    ]);
  };

  const handleAddMonthlyData = (productIndex) => {
    setProducts((prev) => {
      const newProducts = [...prev];
      newProducts[productIndex].monthlyData.push({ unit_price: '', cost_price: '', times_sold: '' });
      return newProducts;
    });
  };

  const handleChange = (productIndex, field, value) => {
    setProducts((prev) => {
      const newProducts = [...prev];
      newProducts[productIndex][field] = value;
      return newProducts;
    });
  };

  const handleMonthlyDataChange = (productIndex, dataIndex, field, value) => {
    setProducts((prev) => {
      const newProducts = [...prev];
      newProducts[productIndex].monthlyData[dataIndex][field] = value;
      return newProducts;
    });
  };

  //? Efficiency data
  const [operationalData, setOperationalData] = useState([]);

  const handleOperationalDataChange = (index, field, event) => {
    const updatedData = [...operationalData];
    updatedData[index] = {
      ...updatedData[index],
      [field]: event.target.value,
    };
    setOperationalData(updatedData);
    console.log(operationalData);
  };

  const handleAddOperationalField = () => {
    setOperationalData([...operationalData, ""]);
  };
  


  //? Revenue data
  const [monthData, setMonthData] = useState([]);

  const handleMonthDataChange = (index, field, event) => {
    const updatedData = [...monthData];
    updatedData[index] = {
      ...updatedData[index],
      [field]: event.target.value,
    };
    setMonthData(updatedData);
    console.log(monthData)
  };

  const handleAddRevenueField = () => {
    setMonthData([...monthData, ""]);
  };


  

  const [teamMembers, setTeamMembers] = useState([
    { email: '', position: '', salary: [{ amount: '' }] },
  ]);
  
  const handleAddMember = () => {
    setTeamMembers((prev) => [
      ...prev,
      { email: '', position: '', salary: [{ amount: '' }] },
    ]);
  };
  
  const handleAddSalary = (memberIndex) => {
    setTeamMembers((prev) => {
      const newTeamMembers = [...prev];
      newTeamMembers[memberIndex].salary.push({ amount: '' });
      return newTeamMembers;
    });
  };
  
  const handleSalaryChange = (memberIndex, salaryIndex, value) => {
    setTeamMembers((prev) => {
      const newTeamMembers = [...prev];
      newTeamMembers[memberIndex].salary[salaryIndex].amount = value;
      return newTeamMembers;
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(operationalData)
    addCompany(userId, name, password, desc, industry, location, JSON.stringify(teamMembers), JSON.stringify(products), JSON.stringify(monthData), JSON.stringify(operationalData));
    setName("");
    setPassword("")
    setDesc("");
    setIndustry("");
    setLocation("");
  };

  function BasicInformation(){


    

    return(
      <>
      <Typography variant="h2">Basic Information</Typography>
      <TextField
        label="Company Name"
        variant="outlined"
        fullWidth
        margin="normal"
        className="login-input"
        value={name}
        onChange={(e) => setName(e.target.value)}
        InputProps={{
          style: {
            color: 'white',
          },
          classes: {
            input: 'login-input',
          },
        }}
        InputLabelProps={{
          style: {
            color: 'white',
          },
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'white',
            },
            '&:hover fieldset': {
              borderColor: 'white',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'white',
            },
          },
        }}
      />
      <TextField
        label="Company Password"
        variant="outlined"
        fullWidth
        type="password"
        margin="normal"
        className="login-input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        InputProps={{
          style: {
            color: 'white',
          },
          classes: {
            input: 'login-input',
          },
        }}
        InputLabelProps={{
          style: {
            color: 'white',
          },
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'white',
            },
            '&:hover fieldset': {
              borderColor: 'white',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'white',
            },
          },
        }}
      />
      <TextField
        label="Description"
        variant="outlined"
        fullWidth
        margin="normal"
        className="login-input"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        InputProps={{
          style: {
            color: 'white',
          },
          classes: {
            input: 'login-input',
          },
        }}
        InputLabelProps={{
          style: {
            color: 'white',
          },
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'white',
            },
            '&:hover fieldset': {
              borderColor: 'white',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'white',
            },
          },
        }}
      />
      <TextField
        label="Industry"
        variant="outlined"
        fullWidth
        margin="normal"
        className="login-input"
        value={industry}
        onChange={(e) => setIndustry(e.target.value)}
        InputProps={{
          style: {
            color: 'white',
          },
          classes: {
            input: 'login-input',
          },
        }}
        InputLabelProps={{
          style: {
            color: 'white',
          },
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'white',
            },
            '&:hover fieldset': {
              borderColor: 'white',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'white',
            },
          },
        }}
      />
      <TextField
        label="Location"
        variant="outlined"
        fullWidth
        margin="normal"
        className="login-input"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        InputProps={{
          style: {
            color: 'white',
          },
          classes: {
            input: 'login-input',
          },
        }}
        InputLabelProps={{
          style: {
            color: 'white',
          },
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'white',
            },
            '&:hover fieldset': {
              borderColor: 'white',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'white',
            },
          },
        }}
      />
    </>
    )
  }

  function FinancialData(){
    return(
      <>
              {/* Revenue data input fields */}
              <Typography variant="h3">
          Finance / Months
        </Typography>

        {monthData.map((data, index) => (
  <div className="top" key={index}>
    <TextField
      className="login-input"
      label={`Revenue for Month ${index + 1}`}
      variant="outlined"
      fullWidth
      margin="normal"
      value={data.revenue} // assuming data is an object with the properties revenue, cashFlow, profit, grossMargin, and fullDebt
      onChange={(event) => handleMonthDataChange(index, 'revenue', event)}
      InputProps={{
        style: {
          color: 'white',
        },
        classes: {
          input: 'login-input',
        },
      }}
      InputLabelProps={{
        style: {
          color: 'white',
        },
      }}
      sx={{
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'white',
          },
          '&:hover fieldset': {
            borderColor: 'white',
          },
          '&.Mui-focused fieldset': {
            borderColor: 'white',
          },
        },
      }}
    />
    <TextField
      className="login-input"
      label={`Cash Flow for Month ${index + 1}`}
      variant="outlined"
      fullWidth
      margin="normal"
      value={data.cashFlow}
      onChange={(event) => handleMonthDataChange(index, 'cashFlow', event)}
      InputProps={{
        style: {
          color: 'white',
        },
        classes: {
          input: 'login-input',
        },
      }}
      InputLabelProps={{
        style: {
          color: 'white',
        },
      }}
      sx={{
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'white',
          },
          '&:hover fieldset': {
            borderColor: 'white',
          },
          '&.Mui-focused fieldset': {
            borderColor: 'white',
          },
        },
      }}
    />
    <TextField
      className="login-input"
      label={`Profit for Month ${index + 1}`}
      variant="outlined"
      fullWidth
      margin="normal"
      value={data.profit}
      onChange={(event) => handleMonthDataChange(index, 'profit', event)}
      InputProps={{
        style: {
          color: 'white',
        },
        classes: {
          input: 'login-input',
        },
      }}
      InputLabelProps={{
        style: {
          color: 'white',
        },
      }}
      sx={{
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'white',
          },
          '&:hover fieldset': {
            borderColor: 'white',
          },
          '&.Mui-focused fieldset': {
            borderColor: 'white',
          },
        },
      }}
    />
    <TextField
      className="login-input"
      label={`Gross Margin for Month ${index + 1}`}
      variant="outlined"
      fullWidth
      margin="normal"
      value={data.grossMargin}
      onChange={(event) => handleMonthDataChange(index, 'grossMargin', event)}
      InputProps={{
        style: {
          color: 'white',
        },
        classes: {
          input: 'login-input',
        },
      }}
      InputLabelProps={{
        style: {
          color: 'white',
        },
      }}
      sx={{
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'white',
          },
          '&:hover fieldset': {
            borderColor: 'white',
          },
          '&.Mui-focused fieldset': {
            borderColor: 'white',
          },
        },
      }}
    />
      <TextField
      className="login-input"
      label={`Full Debt for Month ${index + 1}`}
      variant="outlined"
      fullWidth
      margin="normal"
      value={data.fullDebt}
      onChange={(event) => handleMonthDataChange(index, 'fullDebt', event)}
      InputProps={{
        style: {
          color: 'white',
        },
        classes: {
          input: 'login-input',
        },
      }}
      InputLabelProps={{
        style: {
          color: 'white',
        },
      }}
      sx={{
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'white',
          },
          '&:hover fieldset': {
            borderColor: 'white',
          },
          '&.Mui-focused fieldset': {
            borderColor: 'white',
          },
        },
      }}
      />
       <TextField
      className="login-input"
      label={`Cash Reserve for Month ${index + 1} ( total )`}
      variant="outlined"
      fullWidth
      margin="normal"
      value={data.cash_reserve}
      onChange={(event) => handleMonthDataChange(index, 'cash_reserve', event)}
      InputProps={{
        style: {
          color: 'white',
        },
        classes: {
          input: 'login-input',
        },
      }}
      InputLabelProps={{
        style: {
          color: 'white',
        },
      }}
      sx={{
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'white',
          },
          '&:hover fieldset': {
            borderColor: 'white',
          },
          '&.Mui-focused fieldset': {
            borderColor: 'white',
          },
        },
      }}
    />
      <TextField
      className="login-input"
      label={`Total Expenses for Month ${index + 1}`}
      variant="outlined"
      fullWidth
      margin="normal"
      value={data.expenses} // assuming data is an object with the properties expenses, cashFlow, profit, grossMargin, and fullDebt
      onChange={(event) => handleMonthDataChange(index, 'expenses', event)}
      InputProps={{
        style: {
          color: 'white',
        },
        classes: {
          input: 'login-input',
        },
      }}
      InputLabelProps={{
        style: {
          color: 'white',
        },
      }}
      sx={{
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'white',
          },
          '&:hover fieldset': {
            borderColor: 'white',
          },
          '&.Mui-focused fieldset': {
            borderColor: 'white',
          },
        },
      }}
    />
        </div>
      ))}
        <Button className="login-btn" type="button" onClick={handleAddRevenueField}>
          Add Month
        </Button>
      </>
    )
  }

  function Efficiency(){
    return(
      <>
            <Typography variant="h3">
              Operational Efficiency
            </Typography>

          {operationalData.map((data, index) => (
            <div className="top" key={index}>
              <TextField
                className="login-input"
                label={`Inventory Turnover for Month ${index + 1}`}
                variant="outlined"
                fullWidth
                margin="normal"
                value={data.inventoryTurnover}
                onChange={(event) => handleOperationalDataChange(index, 'inventoryTurnover', event)}
                InputProps={{
                  style: {
                    color: 'white',
                  },
                  classes: {
                    input: 'login-input',
                  },
                }}
                InputLabelProps={{
                  style: {
                    color: 'white',
                  },
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'white',
                    },
                    '&:hover fieldset': {
                      borderColor: 'white',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'white',
                    },
                  },
                }}
              />
              <TextField
                className="login-input"
                label={`Production Cycle Time for Month ${index + 1}`}
                variant="outlined"
                fullWidth
                margin="normal"
                value={data.productionCycleTime}
                onChange={(event) => handleOperationalDataChange(index, 'productionCycleTime', event)}
                InputProps={{
                  style: {
                    color: 'white',
                  },
                  classes: {
                    input: 'login-input',
                  },
                }}
                InputLabelProps={{
                  style: {
                    color: 'white',
                  },
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'white',
                    },
                    '&:hover fieldset': {
                      borderColor: 'white',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'white',
                    },
                  },
                }}
              />
              <TextField
                className="login-input"
                label={`Supply Chain Efficiency for Month ${index + 1}`}
                variant="outlined"
                fullWidth
                margin="normal"
                value={data.supplyChainEfficiency}
                onChange={(event) => handleOperationalDataChange(index, 'supplyChainEfficiency', event)}
                InputProps={{
                  style: {
                    color: 'white',
                  },
                  classes: {
                    input: 'login-input',
                  },
                }}
                InputLabelProps={{
                  style: {
                    color: 'white',
                  },
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'white',
                    },
                    '&:hover fieldset': {
                      borderColor: 'white',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'white',
                    },
                  },
                }}
              />
              <TextField
                className="login-input"
                label={`Cash Conversion Cycle for Month ${index + 1}`}
                variant="outlined"
                fullWidth
                margin="normal"
                value={data.cashConversionCycle}
                onChange={(event) => handleOperationalDataChange(index, 'cashConversionCycle', event)}
                InputProps={{
                  style: {
                    color: 'white',
                  },
                  classes: {
                    input: 'login-input',
                  },
                }}
                InputLabelProps={{
                  style: {
                    color: 'white',
                  },
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'white',
                    },
                    '&:hover fieldset': {
                      borderColor: 'white',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'white',
                    },
                  },
                }}
              />
              <TextField
                className="login-input"
                label={`Operational KPIs for Month ${index + 1}`}
                variant="outlined"
                fullWidth
                margin="normal"
                value={data.operationalKPIs}
                onChange={(event) => handleOperationalDataChange(index, 'operationalKPIs', event)}
                InputProps={{
                  style: {
                    color: 'white',
                  },
                  classes: {
                    input: 'login-input',
                  },
                }}
                InputLabelProps={{
                  style: {
                    color: 'white',
                  },
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'white',
                    },
                    '&:hover fieldset': {
                      borderColor: 'white',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'white',
                    },
                  },
                }}
              />
            </div>
          ))}
          <Button className="login-btn" type="button" onClick={handleAddOperationalField}>
            Add Month
          </Button>
      </>
    )
  }

  function Team(){
    return(
      <>
            <Typography variant="h2">Employees Info</Typography>
            {teamMembers.map((member, index) => (
            <div key={index}>
              <Typography>Employee #{index+1}</Typography>
              <TextField
                label="Email"
                variant="outlined"
                margin="normal"
                className="login-input"
                value={member.email}
                onChange={(e) =>
                  setTeamMembers((prev) => [
                    ...prev.slice(0, index),
                    { ...prev[index], email: e.target.value },
                    ...prev.slice(index + 1),
                  ])
                }
                InputProps={{
                  style: {
                    color: 'white',
                  },
                  classes: {
                    input: 'login-input',
                  },
                }}
                InputLabelProps={{
                  style: {
                    color: 'white',
                  },
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'white',
                    },
                    '&:hover fieldset': {
                      borderColor: 'white',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'white',
                    },
                  },
                }}
              />
              <TextField
                label="Position"
                variant="outlined"
                margin="normal"
                className="login-input"
                value={member.position}
                onChange={(e) =>
                  setTeamMembers((prev) => [
                    ...prev.slice(0, index),
                    { ...prev[index], position: e.target.value },
                    ...prev.slice(index + 1),
                  ])
                }
                InputProps={{
                  style: {
                    color: 'white',
                  },
                  classes: {
                    input: 'login-input',
                  },
                }}
                InputLabelProps={{
                  style: {
                    color: 'white',
                  },
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'white',
                    },
                    '&:hover fieldset': {
                      borderColor: 'white',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'white',
                    },
                  },
                }}
              />
            {member.salary.map((salary, salaryIndex) => (
              <div key={salaryIndex}>
              <Typography variant="subtitle1">Month #{salaryIndex + 1}</Typography>
              <TextField
                label="Monthly Salary"
                variant="outlined"
                margin="normal"
                className="login-input"
                value={salary.amount}
                onChange={(e) => handleSalaryChange(index, salaryIndex, e.target.value)}
                // ... (Your other TextField props)
              />
            </div>
            ))}
        <Button type="button" onClick={() => handleAddSalary(index)}>
          Add Month
        </Button>
            </div>
          ))}
          <Button className="login-btn" type="button" onClick={handleAddMember}>
            Add Member
          </Button>
      </>
    )
  }

  function Services(){
    return(
      <>
       <Typography variant="h2">Services</Typography>
      {products.map((product, productIndex) => (
        <div key={productIndex}>
          <Typography variant="h6">Product #{productIndex + 1}</Typography>
          <TextField
            label="Name"
            variant="outlined"
            margin="normal"
            className="login-input"
            value={product.name}
            onChange={(e) => handleChange(productIndex, 'name', e.target.value)}
            InputProps={{
              style: {
                color: 'white',
              },
              classes: {
                input: 'login-input',
              },
            }}
            InputLabelProps={{
              style: {
                color: 'white',
              },
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'white',
                },
                '&:hover fieldset': {
                  borderColor: 'white',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'white',
                },
              },
            }}
          />
          <TextField
            label="Id"
            variant="outlined"
            margin="normal"
            className="login-input"
            value={product.id}
            onChange={(e) => handleChange(productIndex, 'id', e.target.value)}
            InputProps={{
              style: {
                color: 'white',
              },
              classes: {
                input: 'login-input',
              },
            }}
            InputLabelProps={{
              style: {
                color: 'white',
              },
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'white',
                },
                '&:hover fieldset': {
                  borderColor: 'white',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'white',
                },
              },
            }}
          />
          <TextField
            label="Category"
            variant="outlined"
            margin="normal"
            className="login-input"
            value={product.category}
            onChange={(e) => handleChange(productIndex, 'category', e.target.value)}
            InputProps={{
              style: {
                color: 'white',
              },
              classes: {
                input: 'login-input',
              },
            }}
            InputLabelProps={{
              style: {
                color: 'white',
              },
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'white',
                },
                '&:hover fieldset': {
                  borderColor: 'white',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'white',
                },
              },
            }}
          />
          {/* Other fields for id and category */}
          {product.monthlyData.map((data, dataIndex) => (
            <div key={dataIndex}>
              <Typography variant="subtitle1">Month #{dataIndex + 1}</Typography>
              <TextField
                label="Unit Price"
                variant="outlined"
                margin="normal"
                className="login-input"
                value={data.unit_price}
                onChange={(e) => handleMonthlyDataChange(productIndex, dataIndex, 'unit_price', e.target.value)}
                InputProps={{
                  style: {
                    color: 'white',
                  },
                  classes: {
                    input: 'login-input',
                  },
                }}
                InputLabelProps={{
                  style: {
                    color: 'white',
                  },
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'white',
                    },
                    '&:hover fieldset': {
                      borderColor: 'white',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'white',
                    },
                  },
                }}
              />
              <TextField
                label="Production Cost"
                variant="outlined"
                margin="normal"
                className="login-input"
                value={data.production_cost}
                onChange={(e) => handleMonthlyDataChange(productIndex, dataIndex, 'production_cost', e.target.value)}
                InputProps={{
                  style: {
                    color: 'white',
                  },
                  classes: {
                    input: 'login-input',
                  },
                }}
                InputLabelProps={{
                  style: {
                    color: 'white',
                  },
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'white',
                    },
                    '&:hover fieldset': {
                      borderColor: 'white',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'white',
                    },
                  },
                }}
              />
              <TextField
                label="Quantity Sold"
                variant="outlined"
                margin="normal"
                className="login-input"
                value={data.times_sold}
                onChange={(e) => handleMonthlyDataChange(productIndex, dataIndex, 'times_sold', e.target.value)}
                InputProps={{
                  style: {
                    color: 'white',
                  },
                  classes: {
                    input: 'login-input',
                  },
                }}
                InputLabelProps={{
                  style: {
                    color: 'white',
                  },
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'white',
                    },
                    '&:hover fieldset': {
                      borderColor: 'white',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'white',
                    },
                  },
                }}
              />
              <TextField
                label="Cost Price"
                variant="outlined"
                margin="normal"
                className="login-input"
                value={data.cost_price}
                onChange={(e) => handleMonthlyDataChange(productIndex, dataIndex, 'cost_price', e.target.value)}
                InputProps={{
                  style: {
                    color: 'white',
                  },
                  classes: {
                    input: 'login-input',
                  },
                }}
                InputLabelProps={{
                  style: {
                    color: 'white',
                  },
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'white',
                    },
                    '&:hover fieldset': {
                      borderColor: 'white',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'white',
                    },
                  },
                }}
              />
              {/* Add other fields for cost_price and times_sold */}
            </div>
          ))}
          <Button type="button" onClick={() => handleAddMonthlyData(productIndex)}>
            Add Month
          </Button>
        </div>
      ))}
      {/* Button to add new product */}
      <Button className="login-btn" type="button" onClick={handleAddProduct}>
        Add Product
      </Button>
      </>
    )
  }


  const ComponentToRender = steps[currentStep].component;
   
  return (
    <div className="login-container-view">
      <form className="form imp" onSubmit={handleSubmit}>

      {currentStep === 0 && <BasicInformation />}
      {currentStep === 1 && <FinancialData />}
      {currentStep === 2 && <Efficiency />}
      {currentStep === 3 && <Team />}
      {currentStep === 4 && <Services />}

        {currentStep === steps.length && (
            <Button className="login-btn" type="submit">
            Submit
          </Button>
        )}

        {currentStep > 0 && (
        <Button onClick={() => setCurrentStep(currentStep - 1)}>Back</Button>
      )}

      {currentStep < steps.length - 1 && (
        <Button onClick={() => setCurrentStep(currentStep + 1)}>Next</Button>
      )}
      </form>
    </div>
  );
}

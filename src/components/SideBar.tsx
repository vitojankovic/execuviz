import { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, useTheme, IconButton, Box } from '@mui/material';
import { AccountBalance, InsertChart, Storefront, Brightness4, Brightness7, AccountCircle, Speed, Notes, Add, Login, Group, Security } from '@mui/icons-material';

export default function NavBar() {


  const [darkMode, setDarkMode] = useState(true);
  const theme = useTheme();

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Drawer
        className="sidebar"
        variant="permanent"
        sx={{
          width: 100,
          flexShrink: 0,
          overflowX: 'hidden',
          [`& .MuiDrawer-paper`]: {
            width: 100,
            boxSizing: 'border-box',
            background: '#1E1E1E',
            color: darkMode ? theme.palette.common.white : theme.palette.text.primary,
            minWidth: '56px',
            overflowX: 'hidden',
            marginTop: '64px',
          },
        }}
      >
      <List className="sidebar">
        <ListItem button component="a" href="/dashboard" style={{ flexDirection: 'column', alignItems: 'center' }}>
          <ListItemIcon style={{ display: 'flex', justifyContent: 'center' }}>
            <AccountBalance style={{ color: darkMode ? '#A9A9A9' : 'inherit' }} />
          </ListItemIcon>
          <ListItemText className="icon-text" primary="Overview" style={{ textAlign: 'center', fontSize: '8px' }} />
        </ListItem>
        <ListItem button style={{ flexDirection: 'column', alignItems: 'center' }}>
          <ListItemIcon style={{ display: 'flex', justifyContent: 'center' }}>
            <InsertChart style={{ color: darkMode ? '#A9A9A9' : 'inherit' }} />
          </ListItemIcon>
          <ListItemText className="icon-text" primary="Analytics" style={{ textAlign: 'center', fontSize: '8px' }} />
        </ListItem>
        <ListItem button style={{ flexDirection: 'column', alignItems: 'center' }}>
          <ListItemIcon style={{ display: 'flex', justifyContent: 'center' }}>
            <Storefront style={{ color: darkMode ? '#A9A9A9' : 'inherit' }} />
          </ListItemIcon>
          <ListItemText className="icon-text" primary="Sales" style={{ textAlign: 'center', fontSize: '8px' }} />
        </ListItem>
        <ListItem button style={{ flexDirection: 'column', alignItems: 'center' }}>
          <ListItemIcon style={{ display: 'flex', justifyContent: 'center' }}>
            <Speed style={{ color: darkMode ? '#A9A9A9' : 'inherit' }} />
          </ListItemIcon>
          <ListItemText className="icon-text" primary="Efficiency" style={{ textAlign: 'center', fontSize: '8px' }} />
        </ListItem>
        <ListItem button style={{ flexDirection: 'column', alignItems: 'center' }}>
          <ListItemIcon style={{ display: 'flex', justifyContent: 'center' }}>
            <Security style={{ color: darkMode ? '#A9A9A9' : 'inherit' }} />
          </ListItemIcon>
          <ListItemText className="icon-text" primary="Risk Managment" style={{ textAlign: 'center', fontSize: '8px' }} />
        </ListItem>
        <ListItem button style={{ flexDirection: 'column', alignItems: 'center' }}>
          <ListItemIcon style={{ display: 'flex', justifyContent: 'center' }}>
            <Notes style={{ color: darkMode ? '#A9A9A9' : 'inherit' }} />
          </ListItemIcon>
          <ListItemText className="icon-text" primary="Planning" style={{ textAlign: 'center', fontSize: '8px' }} />
        </ListItem>
        <ListItem button component="a" style={{ flexDirection: 'column', alignItems: 'center' }}>
          <ListItemIcon style={{ display: 'flex', justifyContent: 'center' }}>
            <Group style={{ color: darkMode ? '#A9A9A9' : 'inherit' }} />
          </ListItemIcon>
          <ListItemText className="icon-text" primary="Team" style={{ textAlign: 'center', fontSize: '8px' }} />
        </ListItem>
        <ListItem button style={{ flexDirection: 'column', alignItems: 'center' }}>
          <ListItemIcon style={{ display: 'flex', justifyContent: 'center' }}>
            <Storefront style={{ color: darkMode ? '#A9A9A9' : 'inherit' }} />
          </ListItemIcon>
          <ListItemText className="icon-text" primary="Market Analysis" style={{ textAlign: 'center', fontSize: '8px' }} />
        </ListItem>
        <ListItem component="a" href="/create" button style={{ flexDirection: 'column', alignItems: 'center' }}>
          <ListItemIcon style={{ display: 'flex', justifyContent: 'center' }}>
            <Add style={{ color: darkMode ? '#A9A9A9' : 'inherit' }} />
          </ListItemIcon>
          <ListItemText className="icon-text" primary="Add Company" style={{ textAlign: 'center', fontSize: '8px' }} />
        </ListItem>
      </List>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 'auto' }}>
        <IconButton style={{ color: darkMode ? '#A9A9A9' : 'inherit' }} onClick={handleDarkModeToggle}>
          {darkMode ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </Box>
    </Drawer>
  );
}

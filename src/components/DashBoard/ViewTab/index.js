import  React,{useState} from 'react';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { ThemeProvider,createTheme } from '@mui/material';
import Grid from '../Grid';
import './style.css';
import List from '../List';

export default function Tabs({coins}) {
  const [value, setValue] = useState('1');

  const newTheme = createTheme({
    palette:{
        primary:{
            main:"#3A80E9"
        }
    }
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const obj = {
    color:"var(--grey)",
    fontSize:"1.1rem",
    fontWeight:600,
    textTransform:"capitalize"
  };

  return (
    <div>
        <ThemeProvider theme={newTheme}>
            <TabContext value={value}>
                <TabList onChange={handleChange} variant="fullWidth">
                    <Tab label="Grid View" value="1" sx={obj} />
                    <Tab label="list view" value="2" sx={obj} />
                </TabList>
                
                <TabPanel value="1">
                  <div className='grid'>
                    {coins.map((item,idx)=>{
                      return <Grid coin={item} key={idx} />
                      
                    })}
                  </div>
                  
                </TabPanel>
                <TabPanel value="2">
                  <table className='tableView'>
                    <tbody>
                      {coins.map((item,idx)=>{
                        return <List coin={item} key={idx}/>
                        
                      })}
                    </tbody>
                  </table>
                </TabPanel>
            </TabContext>
      </ThemeProvider>
    </div>
  );
}
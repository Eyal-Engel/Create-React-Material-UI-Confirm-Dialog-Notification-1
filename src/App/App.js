import React from 'react';
import './App.css';
import SideMenu from "../components/SideMenu";
import { makeStyles, CssBaseline, createMuiTheme, ThemeProvider } from '@material-ui/core';
import Header from "../components/Header";
import PageHeader from '../components/PageHeader';

import Employees from "../pages/Employees/Employees";
import Sites from "../pages/Sites/Sites";
import FileUploader from "../components/FileUploader";
import SitesForm from "../pages/Sites/SitesForm";
import AudioUploader from "../components/AudioUploader";
import ImageUploader from "../components/ImageUploader";




const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#333996",
      light: '#3c44b126'
    },
    secondary: {
      main: "#f83245",
      light: '#f8324526'
    },
    background: {
      default: "#f4f5fd"
    },
  },
  overrides:{
    MuiAppBar:{
      root:{
        transform:'translateZ(0)'
      }
    }
  },
  props:{
    MuiIconButton:{
      disableRipple:true
    }
  }
})


const useStyles = makeStyles({
  appMain: {
    paddingLeft: '320px',
    width: '100%'
  }
})

function App() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <SideMenu />
      <div className={classes.appMain}>
        <Header />
        
        <Employees />
        <Sites />
        {/* <FileUploader />
        <br></br>
        <br></br>
        <AudioUploder></AudioUploder>
        <br></br>
        <br></br> */}
        {/* <SitesForm style={{background:"Red", width: "100%"}}></SitesForm> */}
        <AudioUploader></AudioUploader>
        <br></br>
        <br></br>
        <ImageUploader></ImageUploader>
        <br></br>
        <br></br>
      </div>
      <CssBaseline />
    </ThemeProvider>
  );
}

export default App;

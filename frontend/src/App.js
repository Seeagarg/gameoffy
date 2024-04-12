
import './App.css';
import React,{useState} from 'react'
import CategoryPage from './components/CategoryPage';
import HomePage from "./components/HomePage";
import GameDetails from './components/GameDetails';
import { BrowserRouter as Router ,Routes,Route } from 'react-router-dom';
import SearchBox from './components/SearchBox';
import Login from './components/Login';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import LanguageIcon from '@mui/icons-material/Language';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import {useDispatch,useSelector} from 'react-redux';
import { changeLang } from './components/store/langSlice';

function App() {

  const dispatch = useDispatch();

  let lang = useSelector((state)=>state.langSlice)
  lang = lang.langSlice.lang



  const actions = [
    { icon: <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTB9ki9Qe0Qd4aBrj0_vGTqa4c3P8xkhO7tUqyWufhBmw&s" alt="" className="rounded-full" />, name: 'Swahilli',language:1 },
    { icon: <img src="https://cdn.countryflags.com/thumbs/england/flag-button-square-250.png" alt="" className="rounded-full" /> , name: 'English',language:0 },
    
  ];

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);

  const handleClick=(lang_key)=>{
    dispatch(changeLang(lang_key))
    setOpen(false);
  }
  const handleClose = () => {
    setOpen(false);
  }



  return (
    <div className="relative">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path="/games/:gameid" element={<GameDetails/>} />
          <Route path="/category/:categoryName" element={<CategoryPage/>} /> 
          <Route path="/search" element={<SearchBox/>}/>
        </Routes>
      </Router>

      <div className="fixed bottom-2 right-4 z-50">
     
      <Box sx={{ transform: 'translateZ(0px)', flexGrow: 1,position: 'absolute', bottom: 16, right: 16, }}>
      <SpeedDial
        ariaLabel="SpeedDial controlled open example"
       
        // sx={{ position: 'absolute', bottom: 16, right: 16, }}
        icon={<LanguageIcon fontSize="large" />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={()=>{handleClick(action.language)}}
          />
        ))}
      </SpeedDial>
      <p className='text-white bg-[#1976d2]  px-4 py-1 mt-1 rounded-md'>{lang==0?'English':'Swahilli'}</p>
    </Box>
   
      </div>
    </div>
  );
}

export default App;

  
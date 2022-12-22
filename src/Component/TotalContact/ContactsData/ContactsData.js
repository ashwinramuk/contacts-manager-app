import {useState , useEffect} from "react"
import axios from 'axios';
import ContactCard from './ContactCard/ContactCard';
import FilterListIcon from '@mui/icons-material/FilterList';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import './ContactsData.css'
const ContactsData = ()=>{
    const [contactsArr , setcontactsArr] = useState([]);
    // axios.get('https://contact-manager-app-backend.onrender.com/api/users/get')
    //   .then(function (response) {
    //     // handle success
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     // handle error
    //     console.log(error);
    //   })
      //https://contact-manager-app-backend.onrender.com/api/contacts


// GET all contacts list 
    useEffect(() => {
        const config = {
                    headers:{
                        Authorization : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NzE3NDM4MDgsImRhdGEiOiI2M2E0NjYzMDY0NGVlMjJjNGIyZDgwYjMiLCJpYXQiOjE2NzE3NDAyMDh9.gEUlX2BYn-Gsm4ymlSqgo_M29Uxog3tA1aF2Y60pRtQ"
                    }
                  };
        axios.get("https://contact-manager-app-backend.onrender.com/api/contacts",config)
          .then(res => {
            console.log(res.data.allcontact)
            setcontactsArr(res.data.allcontact)
          })
          .catch(err => console.log(err));
      }, []);


    return (
        <div id='contacts-data-container'>
        <nav>
            {/* <select name='Select Date'>
                <option value='Select Date'>  <CalendarMonthOutlinedIcon/> Select Date</option>
            </select>
            <select name='filters'>
                <option value='filters'> <FilterListIcon/> filters</option>
            </select> */}
           <div id="button-d-f-container"> 
            <button id="s-date-button">
                <CalendarMonthOutlinedIcon/>
                 Select Date 
                 <ExpandMoreIcon/>
            </button>
            <button id="filter-button">
                <FilterListIcon/> 
                Filter
                <div id="vartical-line"></div>
                <ExpandMoreIcon/>
                </button></div>
            <div id="button-d-i-e-container">
                <button id="delete-button"><DeleteOutlineOutlinedIcon/>Delete</button>
                <button id="import-button"><ImportExportIcon/>Import</button>
                <button id="export-button"><FileUploadOutlinedIcon/> Export</button>
            </div>
        </nav>
        <div>
            <table>
                <thead>
                <tr>
                    <th> <input type='checkbox'/> Name</th>
                    <th>Designation</th>
                    <th>Company</th>
                    <th>Industry</th>
                    <th>Email</th>
                    <th>Phone number</th>
                    <th>Country</th>
                    <th>Action</th>
                </tr>
                </thead>
                    {/* <ContactCard/> */}
            
            </table>            
        </div>
        
        </div>
    )
}
export default ContactsData;
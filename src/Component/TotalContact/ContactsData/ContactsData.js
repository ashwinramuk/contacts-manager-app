import {useState , useEffect} from "react"
import axios from 'axios';
import ContactCard from './ContactCard/ContactCard';
import FilterListIcon from '@mui/icons-material/FilterList';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import UnfoldMoreOutlinedIcon from '@mui/icons-material/UnfoldMoreOutlined';
import Pagination from '@mui/material/Pagination'
import {useContext} from 'react'
import { contextProvider } from "../../../App";
import { selectContactsContext } from "../../../App";

import './ContactsData.css'
let pagesize = 5;
const ContactsData = (props)=>{
    const [contactsArr , setContactsArr] = useContext(contextProvider);
    const [pagination , setpagination ]= useState ({
        count: 0,
        from :0 ,
        from: pagesize
    })

    useEffect(() => {
        const config = {
                    headers:{
                        Authorization : localStorage.getItem("token"),
                    }
                  };
        axios.get("https://contact-manager-app-backend.onrender.com/api/contacts",config)
          .then(res => {
            // console.log(res.data.allcontact)
            setContactsArr(res.data.allcontact)
          })
          .catch(err => console.log(err));
      }, []);

    return (
        <div id='contacts-data-container'>
        <nav id="nav-abr-contact-page">
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
                <button onClick={()=>{props.setTrigger((previous)=>({...previous,deletePopUp:true}))}} id="delete-button"><DeleteOutlineOutlinedIcon/>Delete</button>
                <button onClick={()=>{props.setTrigger((previous)=>({...previous,importPopUp:true}))}} id="import-button"><ImportExportIcon/>Import</button>
                <button id="export-button"><FileUploadOutlinedIcon/> Export</button>
            </div>
        </nav>
        <div>
            <table>
                <thead>
                <tr>
                    <th id="name">
                         <input type='checkbox' /> 
                         Name
                         <div className="end-varticalline"></div>
                         </th>
                    <th id="Designation">
                        <button>Designation <UnfoldMoreOutlinedIcon/></button>
                        <div className="end-varticalline"></div>
                    </th>
                    <th id="Company">
                        <button>Company <UnfoldMoreOutlinedIcon/> </button>
                        <div className="end-varticalline"></div>
                     </th>
                    <th id="Industry">
                        <button>Industry <UnfoldMoreOutlinedIcon/> </button>
                        <div className="end-varticalline"></div>
                    </th>
                    <th id="Email">
                        Email
                        <div className="end-varticalline"></div>
                    </th>
                    <th id="Phone">
                        Phone number
                        <div className="end-varticalline"></div>
                    </th>
                    <th id="Country">
                        country
                        <div className="end-varticalline"></div>
                    </th>
                    <th id="Action">Action</th>
                </tr>
                </thead>                   
             </table>       
             {contactsArr.map((obj,i)=>{
            return  (
                <>              
                <ContactCard data={{obj,i}} id='dual-tone'/>                
                </>
            )
        })}
             {/* <ContactCard />
             <ContactCard /> */}
        </div>
             <Pagination count={10} onClick={(e)=>{console.log(e.target.value,'pagination')}}/>        
        </div>
    )
}
export default ContactsData;
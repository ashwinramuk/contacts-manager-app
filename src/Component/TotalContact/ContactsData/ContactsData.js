import {useState , useEffect} from "react"                                          // HAVE TO ADD ATHE TOKEN  IN 2 Use effects 
import React, { Component }  from 'react';
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
import './ContactsData.css'

const ContactsData = ({searchData})=>{
    const [contactsArr , setcontactsArr] = useState([]); //
    const [currentpage, setcurrentpage]= useState(1);
    const [postsPerPage] = useState(11);
    const [searchContactArr, setSearchContactArr] = useState([])

    // use state for innisialy render the data in the page //When 1st render 
    useEffect(() => {
        const config = {
                    headers:{
                        Authorization : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NzE4MzkwODIsImRhdGEiOiI2M2EzNTFhNmI2Y2I2Mjc4NmJkYzYyYWUiLCJpYXQiOjE2NzE4MzU0ODJ9.pNMZhF0Yj3nfNemAlxAWltPaP3klrcKVHV9SCLCbQa0"
                    }
                  };
        
        axios.get("https://contact-manager-app-backend.onrender.com/api/contacts",config)
          .then(res => {
            // console.log(res.data.allcontact)
            setcontactsArr(res.data.allcontact)
          
          })
          .catch(err => console.log(err));
      }, [postsPerPage]);

// useeffect for serchcontacts
    useEffect(() => {
        const config = {
                    headers:{
                        Authorization : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NzE4MzkwODIsImRhdGEiOiI2M2EzNTFhNmI2Y2I2Mjc4NmJkYzYyYWUiLCJpYXQiOjE2NzE4MzU0ODJ9.pNMZhF0Yj3nfNemAlxAWltPaP3klrcKVHV9SCLCbQa0"
                    }
                };
        
        axios.get(`https://contact-manager-app-backend.onrender.com/api/contacts/search/${searchData}`,config)
        .then(res => {
            console.log(res.data.allcontact,'serch data from contact data')
            setSearchContactArr(res.data.allcontact)
        
        })
        .catch(err => console.log(err));
    }, [searchData]);

    // paginattion 
      const indexofLastPost = currentpage * postsPerPage;
      const indexofFirstPost = indexofLastPost - postsPerPage;
      //CONDITION FOR USER IF USER CLICK ON THE CONTACT SUGGSTION 
      // THEN THIS WILL COMPARE THE SUGGSTION ARRAY AND PREVIOUS ARRAY (OF CONTACTS)
      let currentPost;
      if(searchContactArr === undefined){
            currentPost = contactsArr.slice(indexofFirstPost, indexofLastPost);
            console.log('NOTcommmmm.......................')
      }else{
            currentPost = searchContactArr.slice(indexofFirstPost, indexofLastPost)
            console.log('commmmm.......................')
      }

    // function for change page 
    const paginate = (numbr)=> setcurrentpage(numbr)

    //for metarial ui       //For loop not needed only lenth is needed. count ++ 
    //HAVE TO MODIFY
    const PageNoumbers = [];
    for(let i=1; i<= Math.ceil(contactsArr.length/postsPerPage);i++){
        PageNoumbers.push(i)        
    }    
    
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
                <button id="delete-button"><DeleteOutlineOutlinedIcon/>Delete</button>
                <button id="import-button"><ImportExportIcon/>Import</button>
                <button id="export-button"><FileUploadOutlinedIcon/> Export</button>
            </div>
        </nav>
        <div>
            <table>
                <thead>
                <tr>
                    <th id="name">
                         <input type='checkbox'/> 
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
             {currentPost.map((obj,i)=>{
            return  (
                <>              
                <ContactCard data={{obj,i}} id='dual-tone'/>                
                </>
            )
        })}
        </div>
             <Pagination count={PageNoumbers.length} onChange={(event, value)=>{paginate(value)}}/>        
        </div>
    )
}
export default ContactsData;
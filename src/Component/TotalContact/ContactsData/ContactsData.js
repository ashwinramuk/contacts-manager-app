import { useState, useEffect } from "react"                                          // HAVE TO ADD ATHE TOKEN  IN 2 Use effects 
import React, { Component } from 'react';
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
import { useContext } from 'react'
import { contextProvider } from "../../../App";
import { selectContactsContext } from "../../../App";

import './ContactsData.css'
const ContactsData = ({ searchData, setTrigger }) => {
    const [loader, setLoader] = useState(false)
    const [selectAll, setSelectAll] = useState(false)
    const [contactsArr, setContactsArr] = useContext(contextProvider);
    const [selectContacts, setSelectContacts] = useContext(selectContactsContext)
    const [currentpage, setcurrentpage] = useState(1);
    const [postsPerPage] = useState(11);
    const [searchContactArr, setSearchContactArr] = useState([])
    useEffect(() => {
        const config = {
            headers: {
                Authorization: localStorage.getItem("token"),
            }
        };
        setLoader(true)
        axios.get("https://contact-manager-app-backend.onrender.com/api/contacts", config)
            .then(res => {
                console.log(res.data)
                if (res.data.status == "Success") {
                    setContactsArr(res.data.allcontact)
                } else {
                    console.log("get fetch error message", res.data.message)
                }
            })
            .catch(err => {
                if (err) {
                    console.log(err)

                }

            }).finally(() => { setLoader(false) })
    }, [postsPerPage]);

    // useeffect for serchcontacts
    useEffect(() => {
        const config = {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        };

        axios.get(`https://contact-manager-app-backend.onrender.com/api/contacts/search/${searchData}`, config)
            .then(res => {
                console.log(res.data.allcontact, 'serch data from contact data')
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
    if (searchContactArr === undefined) {
        currentPost = contactsArr.slice(indexofFirstPost, indexofLastPost);
        // console.log('NOTcommmmm.......................')
    } else {
        currentPost = searchContactArr.slice(indexofFirstPost, indexofLastPost)
        // console.log('commmmm.......................')
    }

    // function for change page 
    const paginate = (numbr) => setcurrentpage(numbr)

    //for metarial ui       //For loop not needed only lenth is needed. count ++ 
    //HAVE TO MODIFY
    const PageNoumbers = [];
    for (let i = 1; i <= Math.ceil(contactsArr.length / postsPerPage); i++) {
        PageNoumbers.push(i)
    }
    // handling select all checkbox
    const handleSelectAll=(e)=>{
        setSelectAll(!selectAll);
        if(!selectAll){
            setSelectContacts(contactsArr.slice((currentpage-1)*postsPerPage,(currentpage*postsPerPage)>contactsArr.length?contactsArr.length:(currentpage*postsPerPage)))
        
        }else{
            setSelectContacts([])
        }
    }
    return (
        <div id='contacts-data-container'>
            <nav id="nav-abr-contact-page">
                <div id="button-d-f-container">
                    <button id="s-date-button">
                        < CalendarMonthOutlinedIcon id='calander-icon'/>
                        <p>Select Date</p>
                        <ExpandMoreIcon id='expand-more-date' />
                    </button>

                    <button id="filter-button">
                        <FilterListIcon  id='filter-list-filter-button'/>
                        <p>Filter</p>
                        <div id="vartical-line"></div>
                        <ExpandMoreIcon id='dropdown-symble' />
                    </button></div>
                <div id="button-d-i-e-container">
                    <button 
                    onClick={() => { setTrigger((previous) => ({ ...previous, deletePopUp: true })) }} 
                        id="delete-button">
                            <DeleteOutlineOutlinedIcon id='deelt-icon'/>
                            <p>Delete</p>
                            </button>
                    <button onClick={() => { setTrigger((previous) => ({ ...previous, importPopUp: true })) }} 
                    id="import-button">
                        <ImportExportIcon />
                        <p>Import</p>
                        </button>
                    <button id="export-button">
                        <FileUploadOutlinedIcon id='export-icon' />
                        <p>Export</p>
                        </button>
                </div>
            </nav>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th id="name">
                                <input type='checkbox' onChange={handleSelectAll} checked={selectAll}/>
                                    <p>Name</p>
                                <div className="end-varticalline"></div>
                            </th>
                            <th id="Designation">
                                <button> 
                                    <p>Designation </p>
                                     <UnfoldMoreOutlinedIcon id ='dropdon-for-disitaton-logo'/>
                                     </button>
                                <div className="end-varticalline"></div>
                            </th>
                            <th id="Company">
                                <button>
                                    <p>Company </p> 
                                    <UnfoldMoreOutlinedIcon id='company-dropdown-icon' /> 
                                    </button>
                                <div className="end-varticalline"></div>
                            </th>
                            <th id="Industry">
                                <button>
                                    <p>Industry </p>
                                    <UnfoldMoreOutlinedIcon id='industry-dropdown-icon' /> 
                                    </button>
                                <div className="end-varticalline"></div>
                            </th>
                            <th id="Email">
                             <p>Email </p>
                                <div className="end-varticalline"></div>
                            </th>
                            <th id="Phone">
                                <p>Phone number </p>
                                <div className="end-varticalline"></div>
                            </th>
                            <th id="Country">
                                <p> Country </p>
                                <div className="end-varticalline"></div>
                            </th>
                            <th id="Action"><p>Action</p></th>
                        </tr>
                    </thead>
                </table>
                {loader && <div className="loader-div"><img src="./images/Loading_icon.gif" /></div>}
                {currentPost.map((obj, i) => {
                    return (
                        <div key={obj._id}>
                            <ContactCard data={{ obj, i }} id='dual-tone' selectAll={[selectAll, setSelectAll]}/>
                        </div>
                    )
                })}
            </div>
            <Pagination 
            id="pagination-met-ui"
            count={PageNoumbers.length} 
            onChange={(event, value) => { paginate(value);setSelectAll(false);setSelectContacts([]) }} 
            />
        </div>
    )
}
export default ContactsData;
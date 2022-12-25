// import React, { Component }  from 'react';
import {useState } from "react"
import './ContactCard.css'
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Tooltip from '@mui/material/Tooltip';
import {useContext} from 'react'
import { contextProvider } from "../../../../App";
import { selectContactsContext } from '../../../../App';
const ContactCard = (props)=>{
    // console.log(props.data.obj)
    let dualId = '';
    if(props.data.i % 2 === 0){
        dualId = 'dual-tone'
    }
    const [checked, setChecked] = useState(false)
    const [contactsArr, setContactsArr] = useContext(contextProvider)
    const [selectContacts,setSelectContacts] = useContext(selectContactsContext)
    const {_id, name,designation,company,industry,email,phoneNumber, country} = props.data.obj
    // console.log(name,_id)
    const handleSelect=(event)=>{
        setChecked(prev=>!prev) 
        if(!checked){
            setSelectContacts((prev)=>{console.log(prev);return [...prev,_id]})
        }else{
            setSelectContacts((prev)=>{console.log(prev);return prev.filter((e)=>e!==_id)})
        }
    }
    console.log("selectContacts",selectContacts)
    // useEffect(()=>{
    //     setChecked(false)
    // },[])
    return (
        <tbody id={dualId}>   
            <tr id="tabledata-card">
                <td id='namefild'> 
                    <input type='checkbox' 
                    onClick={handleSelect} 
                    defaultChecked={checked} 
                    /><p className="for-incrise-the-padding-of-data">{name}</p>
                </td>
                <td id='desiggnationfild'>
                    <p>{designation}</p>
                </td>
                <td id='companyfild'>
                    <p>{company}</p>
                </td>
                <td id='industryfild'>
                    <p>{industry}</p>
                </td>
                <Tooltip 
                id="tooltio-text"
                title={`${email}`} 
                arrow style={{"colur":"#ffff"}}>
                <td id='email'>
                
                    <p >{email}</p>
                    <button></button>
                
                </td>
                </Tooltip>
                <td id='phonenofild'>
                    <p>{phoneNumber}</p>
                    </td>
                <td id='countryfild'>
                    <p>{country}</p>
                    </td>
                <td id='actionfild'>
                    <button><ModeEditOutlineOutlinedIcon/></button>
                    <button><DeleteOutlineOutlinedIcon style={{ color: "red" }}/></button>
                </td>
            </tr>        
        </tbody>      
        
    )
}
export default ContactCard;

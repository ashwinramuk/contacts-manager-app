// import {useState , useEffect} from "react"
import './ContactCard.css'
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Tooltip from '@mui/material/Tooltip';
const ContactCard = (props)=>{
    // console.log(props.data.obj)
    let dualId = '';
    if(props.data.i % 2 === 0){
        dualId = 'dual-tone'
    }
    const {name,designation,company,industry,email,phoneNumber, country} = props.data.obj
    // console.log(name)
    return (
        <tbody id={dualId}>   
        {/* <Tooltip title={{email}} arrow>    */}
            <tr >
                <td id='namefild'> <input type='checkbox'/>{name}</td>
                <td id='desiggnationfild'>{designation}</td>
                <td id='companyfild'>{company}</td>
                <td id='industryfild'>{industry}</td>
                <Tooltip title={`${email}`} arrow style={{"colur":"#ffff"}}>
                <td id='email'>
                
                    {email}
                    <button></button>
                
                </td>
                </Tooltip>
                <td id='phonenofild'>{phoneNumber}</td>
                <td id='countryfild'>{country}</td>
                <td id='actionfild'>
                    <button><ModeEditOutlineOutlinedIcon/></button>
                    <button><DeleteOutlineOutlinedIcon/></button>
                </td>
            </tr>
        {/* </Tooltip>            */}
        
        </tbody>      
        
    )
}
export default ContactCard;

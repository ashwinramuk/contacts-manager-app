// import {useState , useEffect} from "react"
import ContactCard from './ContactCard/ContactCard';
import './ContactsData.css'
const ContactsData = (props)=>{
    return (
        <div id='contacts-data-container'>
        <nav>
            <select name='Select Date'>
                <option value='Select Date'>* Select Date</option>
            </select>
            <select name='filters'>
                <option value='filters'>* filters</option>
            </select>
            {/* <button>Select Date</button> */}
            {/* <button>filters </button> */}
            <button onClick={()=>{props.setTrigger((previous)=>({...previous,deletePopUp:true}))}}>* Delete</button>
            <button onClick={()=>{props.setTrigger((previous)=>({...previous,importPopUp:true}))}}>* Import</button>
            <button>* Export</button>
        </nav>
        <div>
            <table>
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
                <tr>
                    <ContactCard/>
                </tr>
            </table>
            
        </div>
        
        </div>
    )
}
export default ContactsData;
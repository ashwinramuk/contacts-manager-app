import {useState , useEffect} from "react"
import SideBar from "./SideBar/SideBar";
import PageHead from "./PageHead/PageHead";
import ContactsData from "./ContactsData/ContactsData";
import PopUp from "../PopUp/PopUp";

const TotalContact = ()=>{
    const [popUp, setPopUp] = useState({importPopUp:false,deletePopUp:false})
    return (
        <>
        <SideBar/>
        <PageHead/>
        <ContactsData trigger={popUp} setTrigger={setPopUp}/>
        <PopUp trigger={popUp} setTrigger={setPopUp}/>
        </>
    )
}
export default TotalContact;
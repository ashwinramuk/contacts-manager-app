// import {useState , useEffect} from "react"
import ContactsIcon from '@mui/icons-material/Contacts';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import './SideBar.css'
const SideBar = ()=>{
    return (
        <aside id="sidebar-container">
            <div id='logo-sidebar-container'>
                Logo
                {/* <img id='img-logo-sidebar' src ="" alt='logo'/> */}
            </div>

            <div id='dashbord-icon'>

                <h3 id='dashbord-text'>
                    <span><DashboardOutlinedIcon/></span>
                    Dashbord
                </h3>
            </div>
            <div id='total-contact-sidebar'>
                <ContactsIcon/><h3>Total Contact</h3>
            </div>

            <div id='logout-button'>
                <button>
                   <span id='logout-icon'><LogoutIcon/></span>
                    Log out
                </button>
            </div>

        </aside>
    )
}
export default SideBar;
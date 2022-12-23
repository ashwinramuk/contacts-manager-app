import { Link } from "react-router-dom";
import "./Login.css"
import {useState,useContext} from 'react'
import { contextProvider } from "../../../src/App"
import { useNavigate } from "react-router-dom";
// import axios from "axios";


const LogIn = () => {
    const [token,setToken] = useContext(contextProvider)

    const [error, setError] = useState({emailError: "", passwordError: ""})
    const [userDetails, setUserDetails] = useState({
        email: "",
        password: ""
    })

    const navigate = useNavigate()
    const submitHandler = async (e) =>{
        e.preventDefault();

        // email varification
        if (userDetails.email.indexOf("@") === -1) {
            console.log(userDetails.email)
             setError((oldData) => ({ ...oldData, emailError: "email should contain @ symbole" }))
        } else {
             setError((oldData) => ({ ...oldData, emailError: "" }))
        }
        //password error
        if (userDetails.password.length < 6 || userDetails.password.length > 16 ) {
            console.log(userDetails.password)
            setError((oldData) => ({ ...oldData, passwordError: "password should contain atleast 6 characteristics and atmax 16 characteristics"}))
        } else {
            setError((oldData) => ({ ...oldData, passwordError: "" }))
        }             
        console.log(error)
        fetch("http://localhost:4000/api/users/login",{
            method:"POST",
            body:JSON.stringify(userDetails),
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
        }).then((res)=>{
            return res.json()
        }).then((data)=>{
            console.log(data)
            console.log(data.token)
            setToken(data.token)
            if(!token){
                alert(data.message)
            }
            if(token){
                navigate('/dashBoard')
            }

        }).catch((err)=>{
            console.log(err)
        })

        // if(token){
        //     navigate('/dashBoard')
        // }

    }


  
    return (
        <>
            <div className="mainDiv">
                <img className="EllipseLeft" src="../images/Ellipse-31.png" alt="Ellipse-31" />
                <div className="insideDiv">
                    <img className="dotsRight" src="./images/Dots-Group.png" alt="Dots-Group" />
                    <center className="errorMessage">
                        {error.emailError && <h5>{error.emailError}</h5>|| error.passwordError && <h5>{error.passwordError}</h5>}
                    </center>
                    <h1 className="logo" >Logo</h1>
                    <p className="para">Enter your credentials to access your account</p>
                    <form method="POST"  onSubmit={submitHandler}>
                        <input className="userId" type="text" name="email"  onChange={(event) => {setUserDetails({ ...userDetails, email: event.target.value })}} placeholder="Email Id"></input>
                        <input className="password" type="password" name="password" onChange={(event)=>{setUserDetails({ ...userDetails, password: event.target.value })}} placeholder="Password"></input>
                        {/* <button className="signIn">Sign In</button> */}
                        <input type="submit" className="signIn" value="Sign In" /><br />
                    </form>
                        <Link to="/register"><button className="signUp">Sign Up</button></Link>
                    
                    <img className="dotsLeft" src="./images/Dots-Group.png" alt="Dots-Group" />

                </div>
                <img className="ellipse32" src="../images/Ellipse-32.png" />
            </div>
        </>
    )
}

export default LogIn
/*
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@500&display=swap" rel="stylesheet">
*/
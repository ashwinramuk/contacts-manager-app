import React from "react";

import "./loginpage.css"

const LoginPage = () => {
    return (
        <>
            <div className="mainDiv">
                <img className="EllipseLeft" src="../images/Ellipse-31.png" alt="Ellipse-31"/>
                <div className="insideDiv">
                    <img className="dotsRight" src="./images/Dots-Group.png" alt="Dots-Group"/>
                    <h1 className="logo" >Logo</h1>
                    <p className="para">Enter your credentials to access your account</p>
                    <form>
                        <input className="userId" type="text" placeholder="User Id"></input>
                        <input className="password" type="password" placeholder="Password"></input>
                        <button className="signIn">Sign In</button>
                    </form>
                    <button className="signUp">Sign Up</button>
                    <img className="dotsLeft" src="./images/Dots-Group.png" alt="Dots-Group"/>
               
                </div>
                <img  className="ellipse32" src="../images/Ellipse-32.png"/>
            </div>
        </>
    )
}

export default LoginPage
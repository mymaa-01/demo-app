import React, { useState } from "react";
import { Card } from "primereact/card";
import "./Login.css";
import login from "../Assets/Login.jpg";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  // const Navigate = useNavigate();

  // const location = useLocation();
  const initial_state = {
    email: "",
    password: "",
  };
  const [userDetails, SetUserDetails] = useState(initial_state);

  const handleChange = (e) => {
    const value = e.target.value;
    SetUserDetails({ ...userDetails, [e.target.name]: value });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log(userDetails)

    // await LibraryApi.authenticateUser(userDetails)
    //   .then((res) => {
    //     alert("User Logged in Successfully");
    //     console.log(res.data.access_token);
    //     const token_details = jwtDecode(res.data.access_token);
    //     localStorage.setItem("Bearer Token", res.data.access_token);
    //     localStorage.setItem("Refresh Token",res.data.refresh_token);
    //     SetUserDetails(initial_state);
    //     console.log(token_details.role);
    //     SetUserDetails(initial_state);
    //     if (token_details.role === "ROLE_ADMIN") {
    //       Navigate("/adminDashboard");
    //     }else{
    //       Navigate("/allBooks");
    //     }
    //   })
    //   .catch((err) => {
    //     alert("Error occured");
    //     console.log(err);
    //   });
  };

  return (
    <div className="al_01 mx-8 my-8 flex align-items-center justify-content-center ">
      <Card className="al_card mx-auto shadow-5 ">
        <div className="flex flex-row ">
          <div className="flex flex-1  justify-content-center align-items-center">
            <img src={login} alt="login Image" className="lg_img"></img>
          </div>
          <div className="flex-1 flex flex-column  justify-content-center gap-3">
            <span>
              <h1>Login!</h1>
            </span>

            <div className="flex flex-column gap-2  lg_ue_01">
              <label htmlFor="useremail">Email</label>
              <InputText
                id="useremail"
                type="text"
                name="email"
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className="flex flex-column gap-2 lg_pw_01">
              <label htmlFor="userpassword">Password</label>
              <InputText
                id="userpassword"
                type="password"
                name="password"
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className="lg_btn flex justify-content-between">
              <span>
                <Link to="/Signup" style={{ textDecoration: "none" }}>
                  <p style={{ color: "#2196f3" }}>Create an account?</p>
                </Link>
              </span>
              <span className="lg_btn_id02 flex justify-content-center align-items-center">
                <Button label="Login" icon="pi pi-sign-in"  iconPos="right" onClick={handleLogin} />
              </span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Login;

import React, { useState } from "react";
import "../component/Signup.css";
import { Card } from "primereact/card";
import signupimg from "../Assets/Signup.jpg";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Dialog } from "primereact/dialog";
// import { InputOtp } from "primereact/inputotp";

const Signup = () => {
  // const navigate = useNavigate();

  const [visible, setVisible] = useState(false);

  const [bearertoken, setBearerToken] = useState("");
  // const [otp, setOtp] = useState();
  const [selectedRole, setselectedRole] = useState(null);
  const roles = [
    { name: "BUYER" },
    { name: "SELLER" },
  ];

  const initial_state = {
    firstname: "",
    lastname: "",
    email: "",
    role: "",
    password: "",
    confirmPassword: "",
  };

  const [confirmPassword, SetConfirmPassword] = useState("");

  const [user, setUser] = useState(initial_state);

  const handleChange = (e) => {
    const value = e.target.value;
    setUser({ ...user, [e.target.name]: value });
  };

  const handleSignup = async (event) => {
    const { confirmPassword, ...payload } = user;

    event.preventDefault();
    if (user.password === confirmPassword) {
      console.log("success");
      console.log(user);
      setUser(initial_state);
    } else {
      alert("Password must be same");
    }
  };

  return (
    <div className="su_main mx-8 my-8 flex align-items-center justify-content-center ">
      <Card className="su_card shadow-3">
        <div className="flex flex-row">
          <div className="flex-1">
            <img className="su_img" src={signupimg} alt="signup-img"></img>
          </div>
          <div className="flex-1 flex flex-column  justify-content-center ">
            <span>
              <h1>Sign Up</h1>
            </span>
            <div className="su_inp_main ">
              <div className="su_name_01 flex flex-row gap-3 mb-3">
                <div className="flex-1 flex flex-column gap-2">
                  <label htmlFor="userFirstName">First Name</label>
                  <InputText
                    id="userFirstName"
                    type="text"
                    name="firstname"
                    value={user.firstname}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className=" flex-1 flex flex-column gap-2">
                  <label htmlFor="userLastName">Last Name</label>
                  <InputText
                    id="userLastName"
                    type="text"
                    name="lastname"
                    value={user.lastname}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </div>

              <div className="su_email_01  flex flex-row gap-3 mb-3">
                <div className="su_email_inp flex-1 flex flex-column gap-2">
                  <label htmlFor="useremail">Email</label>
                  <InputText
                    id="useremail"
                    type="text"
                    name="email"
                    value={user.email}
                    className="su_email_inp_02"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="card  flex flex-column gap-2 justify-content-end">
                  <Dropdown
                    name="role"
                    value={user.role}
                    onChange={(e) => handleChange(e)}
                    options={roles}
                    optionLabel="name"
                    placeholder="I am a ..."
                    className="w-full md:w-14rem"
                  />
                </div>
              </div>

              <div className="flex flex-column gap-2 mb-3">
                <label htmlFor="userpassword">Password</label>
                <InputText
                  id="userpassword"
                  type="password"
                  name="password"
                  value={user.password}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              
              <div className="flex flex-column gap-2 mb-3">
                <label htmlFor="confirmPassword">Confirm password</label>
                <InputText
                  id="confirmPassword"
                  type="password"
                  value={user.confirmPassword}
                  name="confirmPassword"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="su_verify_btn flex flex-row flex justify-content-between">
                <span>
                  <Link to="/Login" style={{ textDecoration: "none" }}>
                  
                  <p style={{ color: "#2196f3" }}>Already have an account?</p>
                  </Link>
                </span>
                <span className="su_verify_btn_02 flex justify-content-center align-items-center">
                  <Button
                    label="Sign Up"
                    icon="pi pi-user-plus"
                    onClick={handleSignup}
                  ></Button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Signup;

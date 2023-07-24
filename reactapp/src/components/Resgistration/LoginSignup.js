import React, { useState } from "react";
import "./LoginSignup.css"
import { FaTwitter, FaFacebook, FaGoogle, FaLinkedinIn, FaUserCircle, FaLock } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
import { IoDocumentText } from 'react-icons/io5'
import { BsCalendarHeart } from "react-icons/bs";
import registerImage from "../../assets/chef.png"
import logImage from "../../assets/female-chef.png"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';

const LoginSignup = () => {
  const username = "ben";
  const password = "12345";
  const authHeader = `Basic ${btoa(`${username}:${password}`)}`;

  const headers = {
    Authorization: authHeader,
    "Content-Type": "application/json",
  };

  const [signIn, setSignIn] = useState(true);
  const [containerClass, setContainerClass] = useState("");
  const [selectedRole, setSelectedRole] = useState('admin');
  const navigate = useNavigate();

  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  const [signupUsername, setsignupUserName] = useState("");
  const [signupPassword, setsignupPassword] = useState("");
  const [role, setRole] = useState("FOH Staff");
  const [email, setEmail] = useState("");
  
  const handleLogin = async(e) => {
    e.preventDefault(); // Prevents the form from automatically submitting
    const login={"email":signInEmail,"password":signInPassword};
    const result =await axios.post("http://localhost:8080/auth/login",login,{headers});
    console.log(result.data);

    if (result.data === "kitchen-staff") {

      toast.success('Login Successful !', {
          position: "bottom-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
      });
      // const role = (await axios.post("http://localhost:8080/auth/login/role",{"email":email},{headers})).data;
      // console.log(role);
      setTimeout(() => {
      
          navigate('/dash2');
      }, 1500);

  } else if(result.data === "FOH Staff" ) {

      toast.success('Login Successful !', {
          position: "bottom-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
      });
      // const role = (await axios.post("http://localhost:8080/auth/login/role",{"email":email},{headers})).data;
      // console.log(role);
      setTimeout(() => {
      
          navigate('/dash1');
      }, 1500);

  } 
  else if (result.data === "Invalid Password") {
      toast.error('Invalid password!', {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
      });
  } else {
      toast.error('Invalid Email ID !', {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
      });
      }
  }

  const handleS = async(e) => {
    e.preventDefault(); 
    const reg={"role":role,"name":signupUsername,"email":email, "password":signupPassword};
    // console.log(reg);
    const result = await axios.post("http://localhost:8080/add",reg,{headers})
    console.log(result.data);
    
      
      if (result.data === "Signup Successful !") {
        toast.success('Signup Successful !', {
          position: "bottom-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setTimeout(() => {
          setContainerClass("");
        }, 1500);
          
        
      } else if (result.data === "Email ID Already Exists") {
        toast.error('Email ID Already Exists', {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true, progress: undefined,
          theme: "dark",
        });
        setTimeout(() => {
          navigate('/login');
        }, 1500);
          
        
      } else if (result.data === "Email ID Already Exists") {
        toast.error('Email ID Already Exists', {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      
      
    } else {
      console.log(result.data);
      }
  }


  const handleSignUp = () => {
    setContainerClass("sign-up-mode");
  };

  const handleSignIn = () => {
    setContainerClass("");
  };
  const LoginIn = () => {
    setContainerClass("");
    navigate("/login");
  };

  return (
    <div className={`container ${containerClass}`}>
      <div className="forms-container">
        <div className="signin-signup">
          <form action="#" className="sign-in-form"onSubmit={handleLogin} >
            <h2 className="title">Sign in</h2>
            <div className="input-field">
              <i className="user"> <FaUserCircle /> </i>
              <input type="email" placeholder="Email" required value={signInEmail} onChange={(e) => {setSignInEmail(e.target.value)}}/>
            </div>
            <div className="input-field">
              <i className="fas fa-lock"><FaLock /></i>
              <input type="password" placeholder="Password" pattern=".{8,}" required title="8 characters minimum" value={signInPassword} onChange={(e) => {setSignInPassword(e.target.value)}}/>
            </div>
           
            <button  type="Submit" value="Login" className="btn">Login</button>
            <p className="social-text">Or Sign in with social platforms</p>
            <div className="social-media">
              <a href="#" className="social-icon">
                <i className="fab fa-facebook-f">
                  <FaFacebook />
                </i>
              </a>
              <a href="#" className="social-icon">

                <i className="fab fa-twitter">
                  <FaTwitter />
                </i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-google">
                  <FaGoogle />
                </i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-linkedin-in">
                  <FaLinkedinIn />
                </i>
              </a>
            </div>
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />
          </form>
          <form action="#" className="sign-up-form" onSubmit={handleS}>
            <h2 className="title">Sign up</h2>
            <div className="input-field">
              <i className="fas fa-user"><FaUserCircle /></i>
              <input type="text" placeholder="Username" required value={signupUsername} onChange={(e) => {setsignupUserName(e.target.value)}}/>
            </div>
            <div className="input-field">
              <i className="fas fa-lock"><FaLock /></i>
              <select name="cars" id="cars" value={role} onChange={(e) => {setRole(e.target.value)}}>
                <option value="foh-staff">FOH Staff</option>
                <option value="kitchen-staff">Kitchen Staff</option>
              </select>
            </div>
            <div className="input-field">
              <i className="fas fa-envelope"><BiLogoGmail /></i>
              <input type="email" placeholder="Email" required value={email} onChange={(e) => {setEmail(e.target.value)}}/>
            </div>
            <div className="input-field">
              <i className="fas fa-lock"><FaLock /></i>
              <input type="password" placeholder="Password" pattern=".{8,}" value={signupPassword} required title="8 characters minimum" onChange={(e) => {setsignupPassword(e.target.value)}}/>
            </div>
            {/* <div className="input-field">
              <i className="fas fa-lock"><FaLock /></i>
              <input type="password" placeholder="Confirm Password" pattern=".{8,}" required title="8 characters minimum" />
            </div> */}
            <button type="submit" className="btnm" onSubmit={handleS} value="Sign up">Sign up</button>
            <p className="social-text">Or Sign up with social platforms</p>
            <div className="social-media">
              <a href="#" className="social-icon">
                <i className="fab fa-twitter">
                  <FaFacebook />
                </i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-twitter">
                  <FaTwitter />
                </i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-google">
                  <FaGoogle />
                </i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-linkedin-in">
                  <FaLinkedinIn />
                </i>
              </a>
            </div>
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />
          </form>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>Are You New ?</h3>

            <button className="btn transparent" onClick={handleSignUp}>
              Sign up
            </button>
          </div>
          <img src={logImage} className="image" alt="" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>Already Have an Account ?</h3>

            <button className="btn transparent" onClick={handleSignIn}>
              Sign in
            </button>
          </div>
          <img src={registerImage} className="image" alt="" />
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
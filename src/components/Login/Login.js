import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { GoCheck, GoX, GoAlert } from "react-icons/go";
import axios from "axios";
import Loader from "../Loader/Loader";

export default function Login(props) {
    const emailAddress = useRef();
    const password = useRef();
    const [isLoading, setIsLoading] = useState(false);
    const [flashMessage, setFlashMessage] = useState('');

    const handleLogin = () => {
        if (emailAddress.current.value === '' || password.current.value === '') {
            setFlashMessage('Enter all the fields');
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailAddress.current.value)) {
            setFlashMessage('Invalid email Id');
            return;
        }
        setIsLoading(true);
        axios
        .post("https://user-authentication-system-ecc2.vercel.app/login", {
          username: emailAddress.current.value,
          password: password.current.value
        })
        .then((response) => {
          if (response.data.status === 'success') {
            props.setFullName(response.data.name);
            props.setUserLogin(true);
            props.setUsername(emailAddress.current.value);
            setFlashMessage('User logged in successfully');
          } else {
            props.setUserLogin(false);
            setFlashMessage('Username or password is incorrect');
          }
          setIsLoading(false);
        });
    };

    return (
        <>
        {isLoading && <Loader />}
        {
        !props.userLogin && 
        (<div className="container-sm">
            <h3 className="mb-5">Login </h3>
            <form>
                <div className="form-outline mb-4">
                    <input type="email" className="form-control" placeholder="Enter email address" ref={emailAddress}/>
                </div>

                <div className="form-outline mb-4">
                    <input type="password" className="form-control" placeholder="Enter password" ref={password}/>
                </div>

                <button type="button" className="btn btn-primary btn-block mb-4" onClick={() => handleLogin()}>Sign in</button>

                <div className="">
                    <p>Not a member? <Link to="/register">Register</Link></p>
                </div>
            </form>
        </div>
        ) }
        {flashMessage === 'User logged in successfully' && (
            <div className="alert alert-success d-flex align-items-center" role="alert">
               <GoCheck size={35} color="green" />
                <div style={{paddingLeft: '10px'}}>
                    {flashMessage}
                </div>
            </div>
        ) 
        }
        {flashMessage === 'Username or password is incorrect' && (
            <div className="alert alert-danger d-flex align-items-center" role="alert">
               <GoX size={35} color="red" />
                <div style={{paddingLeft: '10px'}}>
                    {flashMessage}
                </div>
            </div>
        ) 
        }
        {flashMessage === 'Enter all the fields' && (
            <div className="alert alert-secondary d-flex align-items-center" role="alert">
               <GoAlert size={35} color="red" />
                <div style={{paddingLeft: '10px'}}>
                    {flashMessage}
                </div>
            </div>
        ) 
        }
        {flashMessage === 'Invalid email Id' && (
            <div className="alert alert-secondary d-flex align-items-center" role="alert">
               <GoAlert size={35} color="red" />
                <div style={{paddingLeft: '10px'}}>
                    {flashMessage}
                </div>
            </div>
        ) 
        }
      </>
    )
};
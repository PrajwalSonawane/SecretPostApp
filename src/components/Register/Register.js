import { useState, useRef } from "react";
import { GoCheck, GoAlert } from "react-icons/go";
import axios from "axios";
import Loader from "../Loader/Loader";

export default function Register() {
    const fullName = useRef();
    const emailAddress = useRef();
    const password = useRef();
    const passwordConfirm = useRef();
    const [messageAddStatus, setMessageAddStatus] = useState(false);
    const [flashMessage, setFlashMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleRegisterButtonClick = () => {
        if (fullName.current.value === '' || emailAddress.current.value === '' || 
        password.current.value === '' || passwordConfirm.current.value === '') {
            setMessageAddStatus(true);
            setFlashMessage('Fill all the fields');
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailAddress.current.value)) {
            setMessageAddStatus(true);
            setFlashMessage('Invalid email Id');
            return;
        }
        if (password.current.value !== passwordConfirm.current.value) {
            setMessageAddStatus(true);
            setFlashMessage('Passwords does not match');
            return;
        }
        if (password.current.value.length <= 5) {
            setMessageAddStatus(true);
            setFlashMessage('Password too short');
            return;
        }
        
        setIsLoading(true);
        axios.post("https://user-authentication-system-ecc2.vercel.app/register", {
          name: fullName.current.value,
          username: emailAddress.current.value,
          password: password.current.value,
          gender: "NA",
          location: "NA"
        })
        .then((response) => {
          setIsLoading(false);
          if (response.data.statusCode === 1) {
            setMessageAddStatus(true);
            setFlashMessage('Congratulations! You are successfully registered');
          } else {
            setMessageAddStatus(true);
            setFlashMessage('User already exists!');
          }
        });
    }
    return (
        <>
        <div className="container-sm">
            <h3 className="mb-5">Register </h3>
            {isLoading && <Loader />}
            {messageAddStatus ? (
                flashMessage === 'Congratulations! You are successfully registered' ?
                <div className="alert alert-success d-flex align-items-center" role="alert">
                    <GoCheck size={35} color="green" />
                    <div style={{paddingLeft: '10px'}}>
                        {flashMessage}
                    </div>
                </div> :
                (<div className="alert alert-secondary d-flex align-items-center" role="alert">
                    <GoAlert size={35} color="red" />
                    <div style={{paddingLeft: '10px'}}>
                        {flashMessage}
                    </div>
                </div>
                )) : null}
            <form>
                <div className="form-outline mb-4">
                    <input type="text" className="form-control" placeholder="Enter full name" ref={fullName}/>
                </div>
                <div className="form-outline mb-4">
                    <input type="email" className="form-control" placeholder="Enter email address" ref={emailAddress}/>
                </div>

                <div className="form-outline mb-4">
                    <input type="password" className="form-control" placeholder="Enter password" ref={password}/>
                </div>

                <div className="form-outline mb-4">
                    <input type="password" className="form-control" placeholder="Confirm password" ref={passwordConfirm}/>
                </div>

                <button type="button" className="btn btn-primary btn-block mb-4" onClick={(e) => handleRegisterButtonClick()}>Register</button>
            </form>
        </div>
        </>
    )
}
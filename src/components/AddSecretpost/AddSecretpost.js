import { useState } from "react";
import { GoAlert, GoCheck } from "react-icons/go";
import axios from "axios";
import Loader from "../Loader/Loader";

 export default function AddSecretpost(props) {
    const [secretMessageInput, setSecretMessageInput] = useState('');
    const [messageAddStatus, setMessageAddStatus] = useState(false);
    const [flashMessage, setFlashMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleInputFocus = (e) => {
        setMessageAddStatus(false);
    };
    const handleInputChange = (e) => {
        setSecretMessageInput(e.target.value);
    };
    const handleFormSubmit = (e) => {
        e.preventDefault();
        if(secretMessageInput==="") {
            setMessageAddStatus(true);
            setFlashMessage("Secret message cannot be empty!");
            return;
        }
        if (!props.userLogin) {
            setMessageAddStatus(true);
            setFlashMessage("Please login to add a post");
            return;
        }
        setIsLoading(true);
        axios.post("https://user-authentication-system-ecc2.vercel.app/checkmessage", {
            username: props.username
          })
          .then((response) => {
            if (response.data.message) {
                setMessageAddStatus(true);
                setFlashMessage("One user is only allowed to post 1 secret message");
            } else {
                props.setPostList((prevPost) => [...prevPost, {message: secretMessageInput}]);
                axios.post("https://user-authentication-system-ecc2.vercel.app/message", {
                  username: props.username,
                  message: secretMessageInput
                })
                .then((response) => {
                });
                setMessageAddStatus(true);
                setFlashMessage("Your secret Message was added successfully");
            }
            setIsLoading(false);
        });
    };
    return (
        <>
            {isLoading && <Loader />}
            <form>
                <div className="form-group">
                    <textarea className="form-control h-100"
                    id="exampleFormControlTextarea1" rows="3"
                    placeholder="Enter your secret message"
                    onChange={(e) => handleInputChange(e)}
                    onFocus={(e) => handleInputFocus(e)}
                    ></textarea>
                    <button type="submit" className="btn btn-primary mt-5" onClick={(e) => handleFormSubmit(e)}>Add Secret Post</button>
                </div>
            </form>
            <br></br>
            {messageAddStatus ? (
                flashMessage === 'Your secret Message was added successfully' ?
                <div className="alert alert-success d-flex align-items-center" role="alert">
                    <GoCheck size={35} color="green" />
                    <div style={{paddingLeft: '10px'}}>
                        {flashMessage}
                    </div>
                </div> :
                (<div className="alert alert-secondary d-flex align-items-center" role="alert">
                    <GoAlert size={35} color="yellow" />
                    <div style={{paddingLeft: '10px'}}>
                        {flashMessage}
                    </div>
                </div>
                )) : null}
        </>
    )
 }
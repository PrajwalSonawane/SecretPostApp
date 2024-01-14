import { useState } from "react";

 export default function AddSecretpost(props) {
    const [secretMessageInput, setSecretMessageInput] = useState('');
    const [messageAddStatus, setMessageAddStatus] = useState(false);
    const handleInputFocus = (e) => {
        setMessageAddStatus(false);
    };
    const handleInputChange = (e) => {
        setSecretMessageInput(e.target.value);
    };
    const handleFormSubmit = (e) => {
        e.preventDefault();
        props.postList.push({message: secretMessageInput});
        setMessageAddStatus(true);
    };
    return (
        <>
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
            {messageAddStatus && <div class="alert alert-success d-flex align-items-center" role="alert">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48">
                <path fill="#43A047" d="M40.6 12.1L17 35.7 7.4 26.1 4.6 29 17 41.3 43.4 14.9z"></path>
                </svg>
                <div style={{paddingLeft: '5px'}}>
                    Your secret Message was added successfully
                </div>
            </div>}
        </>
    )
 }
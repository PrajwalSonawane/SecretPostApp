import { GoCheck } from "react-icons/go";

export default function Logout() {
    return (
        <div className="alert alert-success d-flex align-items-center" role="alert">
        <GoCheck size={35} color="green" />
        <div style={{paddingLeft: '10px'}}>
            User logged out successfully
        </div>
    </div>
    );
}
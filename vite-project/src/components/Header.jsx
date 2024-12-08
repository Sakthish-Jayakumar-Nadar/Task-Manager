import { IoMdAdd } from "react-icons/io";
import "./Header.css"
import { Link } from "react-router-dom";
export default function Header() {
    return (
        <div className="header"> 
            <Link to="/" className="link">Task Manager</Link>
            <Link to="/add"><button><IoMdAdd/></button></Link>
        </div>
    )
}
import { FaTrashAlt } from "react-icons/fa";
import { LiaUndoAltSolid } from "react-icons/lia";
import { MdDone, MdModeEdit } from "react-icons/md";
import "./Task.css"
import { completed, low, medium, pending } from "../../utils/variables";
import { useContext, useState } from "react";
import taskContext from "../../utils/taskContext";
import { data } from "../../utils/data";
import filterContext from "../../utils/filterContext";
import { Link } from "react-router-dom";
export default function Task({id,title,status,priority,dueDate}) {
    const {tasks, setTasks} = useContext(taskContext);
    const {status : s, priority : p} = useContext(filterContext);
    const [statusVar, setStatusVar] = useState(status); 
    function handleFilter(){
        if(s !== "" && p !== ""){
            setTasks(data.filter((task)=>(task.status === s && task.priority === p)))
        }
        else if(s !== ""){
            setTasks(data.filter((task)=>task.status === s))
        }
        else if(p !== ""){
            setTasks(data.filter((task)=>task.priority === p))
        }
        else{
            setTasks(data)
        }
    }
    function handleComplete() {
        for(let i=0; i < data.length; i++){
            if(data[i].id === id){
                data[i].status = completed;
                setStatusVar(completed);
                handleFilter();
                break;
            } 
        }
    }
    function handleUndo(){
        for(let i=0; i < data.length; i++){
            if(data[i].id === id){
                data[i].status = pending;
                setStatusVar(pending);
                handleFilter();
                break;
            } 
        }
    }
    function handleDelete(id){
        setTasks(tasks.filter((task)=>task.id !== id))
    }
    return (
        <tr>
            <td style={{minWidth:"24rem"}}>{title}</td>
            <td style={{minWidth:"6rem", color:(statusVar === pending)?"red":"green"}}>{statusVar}</td>
            <td style={{minWidth:"6rem", color:(priority === low)?"green":((priority === medium)?"gold":"red")}}>{priority}</td>
            <td style={{minWidth:"6rem"}}>{dueDate}</td>
            <td style={{minWidth:"6rem"}}>
                <div className="action-container">
                    <a style={{color: "red"}} onClick={()=>{handleDelete(id)}}><FaTrashAlt/></a>
                    <Link to={`/edit/${id}`} style={{color: "gold"}}><MdModeEdit/></Link>
                    {(statusVar === pending) 
                    ? <a style={{color: "green"}} onClick={handleComplete}><MdDone/></a> 
                    : <a style={{color: "green"}} onClick={handleUndo}><LiaUndoAltSolid/></a>}
                </div>
            </td>
        </tr>
    )
}
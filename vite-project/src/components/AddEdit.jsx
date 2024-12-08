import { useContext, useEffect, useRef, useState } from "react";
import { completed, high, low, medium, pending } from "../../utils/variables";
import "./AddEdit.css";
import { data } from "../../utils/data";
import { useNavigate, useParams } from "react-router-dom";
export default function AddEdit(){
    const {id} = useParams();
    const [titleError, setTitleError] = useState(false);
    const [statusError, setStatusError] = useState(false);
    const [priorityError, setPriorityError] = useState(false);
    const [dateError, setDateError] = useState(false);
    const [titleValue, setTitleValue] = useState("");
    const [statusValue, setStatusValue] = useState("");
    const [priorityValue, setPriorityValue] = useState("");
    const [dateValue, setDateValue] = useState("");
    const navigate = useNavigate()

    useEffect(()=>{
        if(id){
            for(let i = 0; i < data.length; i++){
                if(data[i].id == id){
                    setTitleValue(data[i].title);
                    setStatusValue(data[i].status);
                    setPriorityValue(data[i].priority);
                    setDateValue(data[i].dueDate);
                    break;
                }
            }
        }
        else{
            setTitleValue("");
            setStatusValue("");
            setPriorityValue("");
            setDateValue("");
        }
    },[id])

    function getToday(){
        const day = new Date().toLocaleDateString().split("/");
        return day[2]+"-"+day[0]+"-"+((day[1]).padStart(2,'0'));
    }

    function Validate(){
        let isValid = true;
        if(titleValue.trim() === ""){
            isValid = false;
            setTitleError(true);
        }
        if(statusValue === ""){
            isValid = false;
            setStatusError(true);
        }
        if(priorityValue === ""){
            isValid = false;
            setPriorityError(true);
        }
        if(new Date(dateValue) < new Date(getToday()) || dateValue === ""){
            isValid = false;
            setDateError(true);
        }
        if(isValid && id){
            for(let i = 0; i < data.length; i++){
                if(data[i].id == id){
                    data[i].title = titleValue;
                    data[i].status = statusValue;
                    data[i].priority = priorityValue;
                    data[i].dueDate = dateValue;
                    break;
                }
            }
            navigate("/");
        }
        else if(isValid){
            data.push({
                "id" : (data[data.length - 1].id) + 1,
                "title" : titleValue,
                "status" : statusValue,
                "priority" : priorityValue,
                "dueDate" : dateValue,
            })
            navigate("/");
        }
    }
    return (
        <form>
            <h2 style={{color:"#9f7aea", textAlign: "center"}}>{(id) ? "Edit Task Form" : "Add Task Form"}</h2>
            <div>
                {titleError && <span style={{fontSize:"small", color:"red"}}>*Required</span>}
                <input placeholder="Title" onFocus={()=>setTitleError(false)} value={titleValue} onChange={(event)=>setTitleValue(event.target.value)}/>
            </div>
            <div>    
                {statusError && <span style={{fontSize:"small", color:"red"}}>*Required</span>}
                <select name="status" id="status" onFocus={()=>setStatusError(false)} value={statusValue} onChange={(event)=>setStatusValue(event.target.value)}>
                    <option value="">Select status</option>
                    <option value={pending}>Pendig</option>
                    <option value={completed}>Completed</option>
                </select>
            </div>
            <div>
                {priorityError && <span style={{fontSize:"small", color:"red"}}>*Required</span>}
                <select name="priority" id="priority" onFocus={()=>setPriorityError(false)} value={priorityValue} onChange={(event)=>setPriorityValue(event.target.value)}>
                    <option value="">Select priority</option>
                    <option value={low}>Low</option>
                    <option value={medium}>Medium</option>
                    <option value={high}>High</option>
                </select>
            </div>
            <div>
                {dateError && <span style={{fontSize:"small", color:"red"}}>*Required proper date</span>}
                <input type="date" min={getToday()} onFocus={()=>setDateError(false)} value={dateValue} onChange={(event)=>setDateValue(event.target.value)}/>
            </div>
            <input type="button" value={(id) ? "Edit" : "Add"} style={{backgroundColor: "#9f7aea", color: "#e9d8fd"}} onClick={Validate}/>
        </form>
    )
}
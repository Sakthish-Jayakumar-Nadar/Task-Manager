import { CiFilter } from "react-icons/ci"
import { completed, high, low, medium, pending } from "../../utils/variables"
import "./Filter.css"
import { useContext, useRef } from "react"
import taskContext from "../../utils/taskContext"
import { data } from "../../utils/data"
import filterContext from "../../utils/filterContext"
export default function Filter() {
    const {setTasks} = useContext(taskContext);
    const {setStatus, setPriority} = useContext(filterContext)
    const status = useRef(null);
    const priority = useRef(null);
    function handleFilter(){
        const s = status.current.value;
        const p = priority.current.value;
        setStatus(s)
        setPriority(p)
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
    return (
        <div className="filter-container"> 
            <select name="status" id="status" ref={status}>
                <option value="">Select status</option>
                <option value={pending}>Pendig</option>
                <option value={completed}>Completed</option>
            </select>
            <select name="priority" id="priority" ref={priority}>
                <option value="">Select priority</option>
                <option value={low}>Low</option>
                <option value={medium}>Medium</option>
                <option value={high}>High</option>
            </select>
            <button onClick={handleFilter}><CiFilter /></button>
        </div>
    )
}
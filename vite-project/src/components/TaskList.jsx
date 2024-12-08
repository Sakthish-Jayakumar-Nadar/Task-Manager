import Task from "./Task";
import { useContext, useEffect, useState } from "react";
import "./TaskList.css";
import taskContext from "../../utils/taskContext";
import {data} from "../../utils/data"
import { priorityOrder } from "../../utils/variables";

export default function TaskList() {
    const {tasks, setTasks} = useContext(taskContext);
    const [LowToHigh, setLowToHigh] = useState(true);
    const [dateAsc, setDateAsc] = useState(true);
    useEffect(()=>{
        setTasks(data);
    },[])
    function SortByPriority(){
        const sortedArr = (LowToHigh) ? [...tasks.sort((a,b)=>(priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority)))] : [...tasks.sort((a,b)=>(priorityOrder.indexOf(b.priority) - priorityOrder.indexOf(a.priority)))];
        setLowToHigh(pre => !pre);
        setTasks(sortedArr);
    }
    function SortByDueDate(){
        const sortedArr = (dateAsc) ? [...tasks.sort((a,b)=>(new Date(a.dueDate) - new Date(b.dueDate)))] : [...tasks.sort((a,b)=>(new Date(b.dueDate) - new Date(a.dueDate)))];
        setDateAsc(pre => !pre);
        setTasks(sortedArr);
    }
    return (
        <div className="taskList-container">
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Status</th>
                        <th style={{cursor:"pointer"}} onClick={SortByPriority}>Priority</th>
                        <th style={{cursor:"pointer"}} onClick={SortByDueDate}>Due Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    { tasks.map((task)=>(<Task key={task.id} id={task.id} title={task.title} status={task.status} priority={task.priority} dueDate={task.dueDate}/>))}
                </tbody>
            </table>
        </div>
    )
}
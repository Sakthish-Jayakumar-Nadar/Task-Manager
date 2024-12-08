import Filter from "./filter";
import TaskList from "./taskList";
import "./Home.css"

export default function Home(){
    return (
        <div className="home-container">
            <Filter />
            <TaskList />
        </div>
    )
}
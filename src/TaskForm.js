import { useState } from "react";

const TaskForm = ({ onAdd }) => {
    const [taskName, setTaskName] = useState('');
    function handleSubmit(ev) {
        ev.preventDefault();
        onAdd(taskName);
        setTaskName("");
    }
    return (
        <form onSubmit={handleSubmit}>
            <button>
                <i className="fa-solid fa-plus"></i>
            </button>
            <input type="text"
                placeholder="Your next task..."
                value={taskName}
                onChange={ev => setTaskName(ev.target.value)} />
        </form>
    )

}

export default TaskForm;
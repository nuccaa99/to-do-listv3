import { useState } from "react";
import Checkbox from "./Checkbox";
const Task = ({ name, done, onToggle, onDelete, onRename }) => {

    const [editMode, setEditMode] = useState(false);

    return (
        <div className={'task ' + (done ? 'done' : "")}>
            <Checkbox checked={done} onClick={() => onToggle(!done,)} />


            {!editMode && (
                <div className="task_name" onClick={() =>
                    setEditMode(prev => !prev)}>
                    <span>{name}</span>
                </div>
            )}

            {editMode && (
                <form onSubmit={ev => {
                    ev.preventDefault();
                    setEditMode(false)
                }}>
                    <input type="text" value={name}
                        onChange={ev => onRename(ev.target.value)} />
                </form>
            )}


            <button className="trash_btn" onClick={onDelete}>
                <i className="fa-solid fa-trash"></i>
            </button>
        </div>
    )
}

export default Task;
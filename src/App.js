import React, { useEffect, useState } from "react";
import "./css/styles.css"
import TaskForm from "./TaskForm";
import Task from "./Task";

const App = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        if (tasks.length === 0) return;
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    useEffect(() => {

        const tasks = JSON.parse(localStorage.getItem('tasks'));
        setTasks(tasks);
    }, [])

    function addTask(name) {
        if (name) {
            setTasks(prev => {
                return [...prev, { name: name, done: false }];
            })
        }
    }

    function updateTaskDone(taskIndex, newDone) {
        setTasks(prev => {
            const newTasks = [...prev];
            newTasks[taskIndex].done = newDone;
            return newTasks;
        })
    }

    function removeTask(indexToRemove) {
        setTasks(prev => {
            return prev.filter((taskObject, index) => index !== indexToRemove);
        })

    }



    const complete = tasks.filter(t => t.done).length;
    const total = tasks.length;


    function getMessage() {
        const perc = complete / total * 100;
        if (perc === 0) {
            return "try to do at least 1"
        }
        if (perc === 100) {
            return "congrats"
        }
        return "keep it going"
    }

    function renameTask(index, newName) {
        setTasks(prev => {
            const newTask = [...prev];
            newTask[index].name = newName;
            return newTask;
        })
    }

    return (
        <main>
            <h1>{complete}/{total} complete</h1>
            <h2>{getMessage()}</h2>
            <TaskForm onAdd={addTask} />
            {tasks.map((task, index) => (
                <Task {...task}
                    onToggle={done => updateTaskDone(index, done)} onDelete={() => removeTask(index)}
                    onRename={newName => renameTask(index, newName)} />
            ))}
        </main>
    )
}

export default App;
import { useReducer, useState } from "react"
const nextId = 3;
export const initialTasks = [
    {
        id: 1,
        title: "task1",
        complete: false
    },
    {
        id: 2,
        title: "task2",
        complete: false
    }
]


// =================ACTIONS================
export const TODO_ACTIONS = {
    COMPLETE: 'COMPLETE',
    ADD: 'ADD',
    DELETE: 'DELETE',
    UPDATE: 'UPDATE'
}

//=================REDUCER TODO=============
const tasksReducer = (state = initialTasks, action) => {
    // action ={type, id, text }
    switch (action.type) {
        case TODO_ACTIONS.COMPLETE:
            return state.map(task => {
                if (task.id === action.id)
                    return {
                        ...task,
                        complete: !task.complete
                    }
                else {
                    return task;
                }
            });
        case TODO_ACTIONS.DELETE:
            return state.filter(task => task.id !== action.id);
        case TODO_ACTIONS.ADD:
            return [...state,
            { id: state.length+1, title: action.text, complete: false }];
        default:
            return state;

    }
}

export default function ToDoTasks() {
    const [text, setText] = useState("");
    //using reducer
    const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);
    const handleComplete = (task) => {
        dispatch({ type: TODO_ACTIONS.COMPLETE, id: task.id })
        // console.log(task);

    }
    const handleDelete = (task) => {
        dispatch({ type: TODO_ACTIONS.DELETE, id: task.id })
        // console.log(task);
    }

    const handleAdd = () => {

        dispatch({ type: TODO_ACTIONS.ADD, text })
    }
    return (
        <>
            <div>
                <label>
                    <input value={text} onChange={(e) => setText(e.target.value)} />
                    <button onClick={handleAdd}>Add task</button>
                </label>
            </div>

            {tasks.map(task => (
                <div key={task.id}>
                    <input type="checkbox" checked={task.complete} onChange={() => handleComplete(task)} />
                    {task.title}
                    <input type="button" value="DELETE" onClick={() => handleDelete(task)} />
                </div>
            ))}
        </>
    )
}



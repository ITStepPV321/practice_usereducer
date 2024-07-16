import { useReducer } from "react"

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
        default:
            return state;

    }
}

export default function ToDoTasks() {
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
    return (
        <>
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



import React, {Reducer, useReducer} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import ButtonAppBar from "./ButtonAppBar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {
    addTodolistAC,
    changeFilterAC,
    removeTodolistAC, TodolistsActionType,
    todolistsReducer,
    updateTodolistAC
} from "./state/todolists-reducer";
import {
    addTaskAC,
    changeTaskStatusAC,
    removeTaskAC, TasksActionType,
    tasksReducer,
    updateTaskAC
} from "./state/tasks-reducer";

export type FilterValuesType = "all" | "active" | "completed"

export type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TaskAssocType = {
    [key: string]: TaskType[]
}

function AppWithReducer(): JSX.Element {

    let todolistID1=v1();
    let todolistID2=v1();

    let [todolists, dispatchTodolists] = useReducer<Reducer<TodolistsType[], TodolistsActionType>>(todolistsReducer,[
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, dispatchTasks] = useReducer<Reducer<TaskAssocType, TasksActionType>>(tasksReducer, {
        [todolistID1]:[
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]:[
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });



    const removeTask = (todolistID: string, taskId: string): void => {
        dispatchTasks(removeTaskAC(todolistID, taskId))
    }

    const addTask = (todolistID: string, title: string) => {
        dispatchTasks(addTaskAC(todolistID, title))
    }

    const changeTaskStatus = (todolistID: string, taskID: string, isDone: boolean) => {
        dispatchTasks(changeTaskStatusAC(todolistID, taskID, isDone))
    }


    const changeFilter = (todolistID: string, value: FilterValuesType) => {
        dispatchTodolists(changeFilterAC(todolistID, value))
    }

    const removeTodolist = (todolistID: string) => {
        const action = removeTodolistAC(todolistID)
        dispatchTodolists(action)
        dispatchTasks(action)
    }

    const addTodolist = (title: string) => {
        const action = addTodolistAC(title)
        dispatchTodolists(action)
        dispatchTasks(action)
    }

    const updateTask = (todolistID: string, taskID:string, title: string) => {
        dispatchTasks(updateTaskAC(todolistID, taskID, title))
    }

    const updateTodolist = (todolistID: string, title: string) => {
        dispatchTodolists(updateTodolistAC(todolistID, title))
    }

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{padding: "15px"}}>
            <AddItemForm callback={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
            {todolists.map(t => {
                let tasksForTodolist = tasks[t.id]
                if (t.filter === "active") tasksForTodolist = tasks[t.id].filter(t => !t.isDone)

                if (t.filter === "completed") tasksForTodolist = tasks[t.id].filter(t => t.isDone)

                return <Grid item>
                    <Paper style={{padding: "25px"}} elevation={5}>
                    <TodoList key={t.id}
                              todolistID={t.id}
                              tasks={tasksForTodolist}
                              title={t.title}
                              removeTask={removeTask}
                              changeFilter={changeFilter}
                              addTask={addTask}
                              changeTaskStatus={changeTaskStatus}
                              filter={t.filter}
                              removeTodolist={removeTodolist}
                              updateTask={updateTask}
                              updateTodolist={updateTodolist}/>
                    </Paper>
                </Grid>
            })}
                </Grid>
        </Container>
        </div>
    );
}

export default AppWithReducer;

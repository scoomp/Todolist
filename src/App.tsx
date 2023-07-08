import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import ButtonAppBar from "./ButtonAppBar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";


export type FilterValuesType = "all" | "active" | "completed"

export type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TaskAssocType = {
    [key: string]: TaskType[]
}

function App(): JSX.Element {

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<TodolistsType[]>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TaskAssocType>({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });

    const removeTask = (todolistID: string, taskId: string): void => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(t => t.id !== taskId)})
    }

    const addTask = (todolistID: string, title: string) => {
        const newTask = {id: v1(), title: title, isDone: false}
        setTasks({...tasks, [todolistID]: [newTask, ...tasks[todolistID]]})
    }

    const changeTaskStatus = (todolistID: string, taskID: string, isDone: boolean) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(t => t.id === taskID ? {...t, isDone} : t)})
    }


    const changeFilter = (todolistID: string, value: FilterValuesType) => {
        setTodolists(todolists.map(t => t.id === todolistID ? {...t, filter: value} : t))
    }

    const removeTodolist = (todolistID: string) => {
        setTodolists(todolists.filter(t => t.id !== todolistID))
        delete tasks[todolistID]
    }

    const addTodolist = (title: string) => {
        const todolistId = v1()
        const newTodo = {id: todolistId, title, filter: "all"} as TodolistsType
        setTodolists([...todolists, newTodo])
        setTasks({...tasks, [todolistId]: []})
    }

    const updateTask = (todolistID: string, taskID: string, title: string) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(t => t.id === taskID ? {...t, title} : t)})
    }

    const updateTodolist = (todolistID: string, title: string) => {
        setTodolists(todolists.map(t => t.id === todolistID ? {...t, title} : t))
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

export default App;

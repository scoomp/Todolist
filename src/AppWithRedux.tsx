import React, {useCallback} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {AddItemForm} from "./AddItemForm";
import ButtonAppBar from "./ButtonAppBar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {
    addTodolistAC,
    changeFilterAC,
    removeTodolistAC,
    updateTodolistAC
} from "./state/todolists-reducer";
import {
    addTaskAC,
    changeTaskStatusAC,
    removeTaskAC,
    updateTaskAC
} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type FilterValuesType = "all" | "active" | "completed"

export type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TaskAssocType = {
    [key: string]: TaskType[]
}

function AppWithRedux(): JSX.Element {
    const todolists = useSelector<AppRootStateType, TodolistsType[]>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TaskAssocType>( state => state.tasks)
    const dispatch = useDispatch();

    const removeTask = useCallback((todolistID: string, taskId: string): void => {
        dispatch(removeTaskAC(todolistID, taskId))
    },[dispatch])

    const addTask = useCallback((todolistID: string, title: string) => {
        dispatch(addTaskAC(todolistID, title))
    },[dispatch])

    const changeTaskStatus = useCallback((todolistID: string, taskID: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(todolistID, taskID, isDone))
    },[dispatch])


    const changeFilter = useCallback((todolistID: string, value: FilterValuesType) => {
        dispatch(changeFilterAC(todolistID, value))
    },[dispatch])

    const removeTodolist = useCallback((todolistID: string) => {
        const action = removeTodolistAC(todolistID)
        dispatch(action)
    },[dispatch])
//диспатч создается 1 раз , смысла писать его нет, но чтобы не было ворнинга в консоли надо добавить диспатч в []
    const addTodolist = useCallback((title: string) => {
        const action = addTodolistAC(title)
        dispatch(action)
    }, [dispatch])

    const updateTask = useCallback((todolistID: string, taskID:string, title: string) => {
        dispatch(updateTaskAC(todolistID, taskID, title))
    },[dispatch])

    const updateTodolist = useCallback((todolistID: string, title: string) => {
        dispatch(updateTodolistAC(todolistID, title))
    },[dispatch])
    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{padding: "15px"}}>
            <AddItemForm callback={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
            {todolists.map(t => {
                return <Grid item>
                    <Paper style={{padding: "25px"}} elevation={5}>
                    <TodoList key={t.id}
                              todolistID={t.id}
                              tasks={tasks[t.id]}
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

export default AppWithRedux;

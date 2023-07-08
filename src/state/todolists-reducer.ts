import {FilterValuesType, TodolistsType} from "../App";
import {v1} from "uuid";

const initialState: TodolistsType[] = []

export const todolistsReducer = (state: TodolistsType[] = initialState, action: TodolistsActionType): TodolistsType[] => {
    switch (action.type) {
        case "CHANGE-FILTER":
            return state.map(t => t.id === action.payload.todolistID ? {...t, filter: action.payload.value} : t)
        case "REMOVE-TODOLIST":
            return state.filter(t => t.id !== action.payload.todolistID)
        case "ADD-TODOLIST":
            return [...state, {id: action.payload.todolistID, title: action.payload.title, filter: "all"}]
        case "UPDATE-TODOLIST":
            return state.map(t => t.id === action.payload.todolistID ? {...t, title: action.payload.title} : t)
        default:
            return state
    }
}

//const {payload} = action деструктурирование, деструктурузацция создает новый объект

export type TodolistsActionType = ChangeFilterType | RemoveTodolistType | UpdateTodolistType | AddTodolistType
type ChangeFilterType = ReturnType<typeof changeFilterAC>
export type RemoveTodolistType = ReturnType<typeof removeTodolistAC>
type UpdateTodolistType = ReturnType<typeof updateTodolistAC>
export type AddTodolistType = ReturnType<typeof addTodolistAC>

export const changeFilterAC = (todolistID: string, value: FilterValuesType) => ({
    type: "CHANGE-FILTER",
    payload: {
        todolistID,
        value
    }
}as const)

export const removeTodolistAC = (todolistID: string) => ({
    type: "REMOVE-TODOLIST",
    payload: {
        todolistID
    }
}as const)

export const updateTodolistAC = (todolistID: string, title: string) => ({
 type: "UPDATE-TODOLIST",
    payload: {
     todolistID,
        title
    }
}as const)

export const addTodolistAC = (title: string) => ({
    type: "ADD-TODOLIST",
    payload: {
        todolistID: v1(),
        title
    }
}as const)
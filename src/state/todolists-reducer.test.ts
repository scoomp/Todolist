import {addTodolistAC, changeFilterAC, removeTodolistAC, todolistsReducer, updateTodolistAC} from './todolists-reducer';
import {v1} from 'uuid';
import {FilterValuesType, TodolistsType} from '../App';
//модульная область видимости
let todolistId1: string
let todolistId2: string
let startState: TodolistsType[]
let newTodolistTitle: string
beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();
    newTodolistTitle = "New Todolist"

    startState = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]
})

test('correct todolist should be removed', () => {


    // const endState = todolistsReducer(startState, { type: 'REMOVE-TODOLIST', payload: {todolistID:  todolistId1}})
    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {


    //const endState = todolistsReducer(startState, { type: 'ADD-TODOLIST', payload: {todolistID: v1(), title: newTodolistTitle}})
    const endState = todolistsReducer(startState, addTodolistAC( newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
});

test('correct todolist should change its name', () => {

    const action = {
        type: 'UPDATE-TODOLIST',
        payload: {
            todolistID: todolistId2,
            title: newTodolistTitle
        }
    } as const;

    // const endState = todolistsReducer(startState, action);
    const endState = todolistsReducer(startState, updateTodolistAC(todolistId2, newTodolistTitle))

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
    let newFilter: FilterValuesType = "completed";

    const action = {
        type: "CHANGE-FILTER",
        payload: {
    todolistID: todolistId2,
        value: newFilter}
    } as const;

    //const endState = todolistsReducer(startState, action);
    const endState = todolistsReducer(startState, changeFilterAC(todolistId2, newFilter));

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});
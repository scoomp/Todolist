import React, {ChangeEvent, FC, KeyboardEvent, memo, useState} from 'react';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

type AddItemFormType = {
    callback: ( titleInput: string)=>void

}

export const AddItemForm:FC<AddItemFormType> = memo(({callback}) => {
    const [titleInput, setTitleInput] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    const onClickButtonHandler = () => {
        if (titleInput.trim() !== "") {
            callback(titleInput)
            setTitleInput('')
        } else {
            setError("Title is required")
        }
    }

    const inputOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTitleInput(e.currentTarget.value)

//добавили проверку на наличие ошибки чтобы не было лишнего рендера
    const inputOnKeyHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error) setError(null)
        e.key === "Enter" && onClickButtonHandler()
    }

    const buttonStyles={
        maxWidth: '38px',
        maxHeight: '38px',
        minWidth: '38px',
        minHeight: '38px',
        backgroundColor:'greenyellow'
    }
//!! превращаем строку в false, а второй раз превращаем в true
    return (
        <div>
            <TextField
                error={!!error}
                value={titleInput}
                id="outlined-basic"
                label={error ? "Title is required" : "Type something"}
                variant="outlined"
                size="small"
                onChange={inputOnChangeHandler}
                onKeyPress={inputOnKeyHandler}
                />
            <Button style={buttonStyles} variant="contained" onClick={onClickButtonHandler}>+</Button>
        </div>
    );
});


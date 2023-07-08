import React, {ChangeEvent, FC, memo, useState} from 'react';

type EditableSpanType = {
    title: string
    callback:(title: string)=>void
}
export const EditableSpan: FC<EditableSpanType> = memo(({callback, title}) => {
    const [newTitle, setNewTitle] = useState(title)
    const [edit, setEdit] = useState(false)
    const editHandler = () => {
        setEdit(!edit)
        if (edit) {
            addTaskHandler()
        }
    }

    const inputOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setNewTitle(e.currentTarget.value)


    const addTaskHandler = () => callback(newTitle)


    return (
        edit ? <input value={newTitle} onBlur={editHandler} onChange={inputOnChangeHandler} autoFocus/>
            : <span onDoubleClick={editHandler}>{title}</span>
    );
})


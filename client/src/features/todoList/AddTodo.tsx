import React from 'react'
import { addTodo } from './todoSlice';
import { useAppDispatch } from 'app/store';

export default function AddTodo(): JSX.Element {
    const dispatch = useAppDispatch();
    const [text, setText] = React.useState('');

    function handleChange(e: { target: HTMLInputElement; }) {
        setText(e.target.value);
    }

    function handleSubmit(e: any) {
        e.preventDefault()

        if (!text.trim()) {
            return
        }
        dispatch(addTodo(text))

        setText('');
    }

    return (
        <form onSubmit={handleSubmit}>
            <input value={text} onChange={handleChange} />
            <button type="submit">Add Todo</button>
        </form>
    )
}
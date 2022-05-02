import PropTypes from 'prop-types';
import React, { useEffect } from 'react';

export interface Todo{
    id: number;
    text: string;
    completed: boolean;
}

interface TodoElementProps {
    todo: Todo;
    actions: {
        toggleCompleted: (id: number) => void;
        deleteTodo: (id: number) => void;
        editTodo: (id: number) => void;
    }
}

const customStyles = {
    completed: [
        'bg-green-500',
        'hover:bg-green-300',
    ],
    notCompleted: [
        'bg-blue-500',
        'hover:bg-blue-400',
    ]
}

const setClasses = (isCompleted: boolean) : string[] => {
    return isCompleted ?  customStyles.completed: customStyles.notCompleted;
}

const defaultClassList = [
    "w-96",
    "m-3 p-3",
    "border-2 border-blue-600 rounded-lg",
    "cursor-pointer",
    "text-white text-l",
];

const deleteButtonClassList = [
    "mx-1",
    "p-2",
    "text-center text-white",
    "rounded-xl",
    "bg-red-600 hover:bg-red-400",
    "hover:cursor-pointer"
]

const editButtonClassList = [
    "mx-1",
    "p-2",
    "text-center text-white",
    "rounded-xl",
    "bg-purple-600 hover:bg-purple-400",
    "hover:cursor-pointer"
]

const TodoElement = React.memo(function({ todo, actions }: TodoElementProps) {
    const liClassList = [...defaultClassList, ...setClasses(todo.completed)];

    return (
        <div className='flex justify-center items-center mt-2'>
            <li className={liClassList.join(' ')} onClick={() => actions.toggleCompleted(todo.id)}>
                {todo.text}
            </li>
            <button className={editButtonClassList.join(' ')} onClick={() => actions.editTodo(todo.id)}>
                EDIT
            </button>
            <button className={deleteButtonClassList.join(' ')} onClick={() => actions.deleteTodo(todo.id)}>
                DELETE
            </button>
        </div>
    );
})

export default TodoElement;
import React, { createContext, useEffect, useReducer, useState } from 'react';
import { todoReducer } from '../utils/reducer';
import { todoList } from '../utils/data';

interface TodoContextI {
  state: any;
  dispatch: React.Dispatch<any>;
  setItems: any;
}

export const todoContext = createContext<TodoContextI>({
  state: todoList,
  dispatch: () => {},
  setItems: () => {},
});
export const TodoCotextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(todoReducer, todoList);

  useEffect(() => {
    if (window.localStorage.getItem('todo') === null) {
      window.localStorage.setItem('todo', JSON.stringify(todoList));
    } else {
      const storedTodoList = JSON.parse(
        window.localStorage.getItem('todo') || ''
      );
      dispatch({ type: 'reorder', payload: storedTodoList });
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('todo', JSON.stringify(state));
  }, [state]);

  const setItems = (newItems) => {
    dispatch({ type: 'reorder', payload: newItems });
  };

  return (
    <todoContext.Provider value={{ state, dispatch, setItems }}>
      {children}
    </todoContext.Provider>
  );
};

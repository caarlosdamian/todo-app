import React, { createContext, useReducer, useState } from 'react';
import { todoReducer } from '../utils/reducer';
import { todoList } from '../utils/data';

interface TodoContextI {
  state: any;
  dispatch: React.Dispatch<any>;
}

export const todoContext = createContext<TodoContextI>({
  state: todoList,
  dispatch: () => {},
});

export const TodoCotextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(todoReducer, todoList);

  return (
    <todoContext.Provider value={{ state, dispatch }}>
      {children}
    </todoContext.Provider>
  );
};

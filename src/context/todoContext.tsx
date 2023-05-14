import React, { createContext, useReducer } from 'react';
import { todoReducer } from '../utils/reducer';
import { todoList } from '../utils/data';

interface TodoContextI {
  state: any;
  dispatch: React.Dispatch<any>;
}

export const todoContext = createContext<TodoContextI>({
  state: todoList,
  // @ts-ignore
  dispatch: () => {},
});
export const TodoCotextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(
    todoReducer,
     // @ts-ignore
    JSON.parse(localStorage.getItem('todo')) || todoList
  );

  return (
    <todoContext.Provider value={{ state, dispatch }}>
      {children}
    </todoContext.Provider>
  );
};

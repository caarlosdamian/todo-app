import React, { createContext, useReducer, useState } from 'react';
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
  const [items, setItems] = useState(todoList); // Store the IDs of the items

  const [state, dispatch] = useReducer(todoReducer, items);

  return (
    <todoContext.Provider value={{ state, dispatch, setItems }}>
      {children}
    </todoContext.Provider>
  );
};

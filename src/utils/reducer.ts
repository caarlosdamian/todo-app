import { TodoListI } from './data';

export const todoReducer = (
  state: TodoListI[],
  action: { type: string; payload: any }
) => {
  const { payload, type } = action;
  let newItems;
  switch (type) {
    case 'addTodo':
      return [...state, payload];
    case 'deleteTodo':
      newItems = state.filter((item) => item.id !== payload);
      window.localStorage.setItem('todo', JSON.stringify(newItems));
      return newItems;
    case 'completedTodo':
      newItems = state.map((item) =>
        item.id === payload
          ? {
              ...item,
              status: !item.status,
            }
          : item
      );
      window.localStorage.setItem('todo', JSON.stringify(newItems));
      return newItems;
    case 'reorder':
      return payload;
    default:
      return state;
  }
};

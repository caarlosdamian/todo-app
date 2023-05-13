import { TodoListI } from './data';

export const todoReducer = (
  state: TodoListI[],
  action: { type: string; payload: any }
) => {
  const { payload, type } = action;
  switch (type) {
    case 'addTodo':
      return [...state, payload];
    case 'deleteTodo':
      return state.filter((item) => item.id !== payload);
    case 'completedTodo':
      return state.map((item) =>
        item.id === payload ? { ...item, status: 'completed' } : item
      );
    case 'reorder':
      return payload;
    default:
      return state;
  }
};

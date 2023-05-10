export interface TodoListI {
  id: number;
  title: string;
  status: 'active' | 'completed';
}

export const todoList:TodoListI[] = [
  {
    id: 1,
    title: 'Firts Todo',
    status: 'active',
  },
  {
    id: 2,
    title: 'Second Todo',
    status: 'completed',
  },
];

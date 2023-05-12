export interface TodoListI {
  id: number;
  title: string;
  status: boolean;
}

export const todoList:TodoListI[] = [
  {
    id: 1,
    title: 'Firts Todo',
    status: false,
  },
  {
    id: 2,
    title: 'Second Todo',
    status: true,
  },
];

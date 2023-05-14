export interface TodoListI {
  id: number;
  title: string;
  status: boolean;
}

export const todoList: TodoListI[] = [
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
  {
    id: 3,
    title: '3 Todo',
    status: true,
  },
  {
    id: 4,
    title: '4 Todo',
    status: true,
  },
];

export const todoActions = [
  {
    id: '2a',
    label: 'All',
    value: 'all',
  },
  {
    id: '2b',
    label: 'Active',
    value: 'active',
  },
  {
    id: '2c',

    label: 'Completed',
    value: 'completed',
  },
];

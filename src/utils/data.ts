export interface TodoListI {
  id: number;
  title: string;
  status: boolean;
}

export const todoList: TodoListI[] = [
  {
    id: 1,
    title: '💻 Learn Reactjs',
    status: true,
  },
  {
    id: 2,
    title: '🛁 Take a Bath',
    status: false,
  },
  {
    id: 3,
    title: '📝 Study Math',
    status: true,
  },
  {
    id: 4,
    title: '🧽 Wash Dishes',
    status: false,
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

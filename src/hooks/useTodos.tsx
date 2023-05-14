import { useContext, useMemo, useState } from 'react';
import { todoContext } from '../context/todoContext';
import { TodoListI } from '../utils/data';
import { themeContext } from '../context/themeContext';

export const useTodos = () => {
    // @ts-ignore
  const { dispatch, state, setItems } = useContext(todoContext);
  const { isDarkmodeActive, darkmode, setDarkmode } = useContext(themeContext);
  const initState = {
    title: '',
    status: false,
  };
  const [showCaseList, setShowCaseList] = useState('all');
  const [todo, setTodo] = useState(initState);

  const activeTodos = useMemo(
    () => state.filter((todo: TodoListI) => todo.status !== true),
    [state]
  );
  const completedTodos = useMemo(
    () => state.filter((todo: TodoListI) => todo.status === true),
    [state]
  );

  const listToShow = useMemo(
    () =>
      showCaseList === 'all'
        ? state
        : showCaseList === 'completed'
        ? completedTodos
        : activeTodos,
    [showCaseList, state]
  );

  const handleChange = (name: string, value: any) => {
    setTodo((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch({
      type: 'addTodo',
      payload: {
        id: state.length + 1,
        ...todo,
      },
    });
    setTodo(initState);
  };

  const handleDragEnd = (newOrder: any) => {
    const reorderedList = newOrder.map((id: number) =>
      state.find((item: TodoListI) => item.id === id)
    );
    dispatch({ type: 'reorder', payload: reorderedList });
  };
  return {
    handleDragEnd,
    handleSubmit,
    listToShow,
    dispatch,
    state,
    isDarkmodeActive,
    darkmode,
    setDarkmode,
    handleChange,
    setShowCaseList,
    setItems,
    todo,
    showCaseList,
    activeTodos
  };
};

import { useContext, useMemo, useState } from 'react';
import { todoContext } from './context/todoContext';
import { TodoListI } from './utils/data';
import { themeContext } from './context/themeContext';
import { logo, moon, sun } from './assets';

export const App = () => {
  const { dispatch, state } = useContext(todoContext);
  const { isDarkmodeActive, darkmode, setDarkmode } = useContext(themeContext);
  const [showCaseList, setShowCaseList] = useState('all');
  const activeTodos = useMemo(
    () => state.filter((todo: TodoListI) => todo.status !== 'completed'),
    [state]
  );
  const completedTodos = useMemo(
    () => state.filter((todo: TodoListI) => todo.status === 'completed'),
    [state]
  );
  const listToShow =
    showCaseList === 'all'
      ? state
      : showCaseList === 'completed'
      ? completedTodos
      : activeTodos;

  return (
    <main className="app">
      <div className={`header ${isDarkmodeActive}`}>
        <div className="header__logo">
          <img src={logo} alt="logo" />
          <img
            src={darkmode ? sun : moon}
            alt="theme"
            onClick={() => setDarkmode(!darkmode)}
            className="theme__icon"
          />
        </div>
        <div className="header__input"></div>
      </div>
      <div className="info"></div>
      {/* <button
        onClick={() =>
          dispatch({
            type: 'addTodo',
            payload: {
              id: state.length + 1,
              title: 'third Todo',
              status: 'active',
            },
          })
        }
      >
        AddTodo
      </button>
      {listToShow?.map((item: TodoListI) => (
        <div className="todo" key={item.id}>
          <span>{item.title}</span>
          <hr />
          <span>{item.status}</span>
          <button
            onClick={() =>
              dispatch({
                type: 'completedTodo',
                payload: item.id,
              })
            }
          >
            Complete
          </button>
          <button
            onClick={() =>
              dispatch({
                type: 'deleteTodo',
                payload: item.id,
              })
            }
          >
            Delete
          </button>
        </div>
      ))}
      <button onClick={() => setShowCaseList('all')}>All</button>
      <button onClick={() => setShowCaseList('active')}>Active</button>
      <button onClick={() => setShowCaseList('completed')}>completed</button> */}
    </main>
  );
};

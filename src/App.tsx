import { ChangeEvent, useContext, useMemo, useRef, useState } from 'react';
import { todoContext } from './context/todoContext';
import { TodoListI } from './utils/data';
import { themeContext } from './context/themeContext';
import { check, logo, moon, sun } from './assets';

export const App = () => {
  const { dispatch, state } = useContext(todoContext);
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
  const listToShow =
    showCaseList === 'all'
      ? state
      : showCaseList === 'completed'
      ? completedTodos
      : activeTodos;

  const handleChange = (name: string, value: any) => {
    setTodo((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log('submit');
    dispatch({
      type: 'addTodo',
      payload: {
        id: state.length + 1,
        ...todo,
      },
    });
    setTodo(initState);
  };

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
        <form
          className={`header__input ${isDarkmodeActive}`}
          onSubmit={handleSubmit}
        >
          <div
            className={`header__input--bubble ${isDarkmodeActive} ${
              todo.status && 'active'
            }`}
            onClick={() => handleChange('status', !todo.status)}
          >
            {todo.status && <img src={check} alt="check" />}
          </div>
          <input
            type="text"
            className={`header__input--text ${isDarkmodeActive} ${
              todo.status && 'active'
            }`}
            placeholder="Create a new todo…"
            name="title"
            value={todo.title}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              handleChange(event.target.name, event.target.value)
            }
          />
        </form>
      </div>
      <div className="info"></div>
      {/* <button
        onClick={() =>
          
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

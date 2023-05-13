import {
  ChangeEvent,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { todoContext } from './context/todoContext';
import { TodoListI } from './utils/data';
import { themeContext } from './context/themeContext';
import { check, logo, moon, sun } from './assets';
import { Reorder } from 'framer-motion';

export const App = () => {
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
      <div className="info">
        <div className="info__todo">
          <div className="info__todo--wrapper">
            <Reorder.Group
              axis="y"
              values={listToShow.map((item: TodoListI) => item.id)}
              onReorder={(newOrder) => handleDragEnd(newOrder)}
              className="info__todo--container"
            >
              {listToShow.map((item: TodoListI) => {
                return (
                  <Reorder.Item
                    key={item.id}
                    value={item.id}
                    className="todo__item"
                  >
                    <div
                      className={`header__input--bubble ${isDarkmodeActive} ${
                        item.status && 'active'
                      }`}
                      onClick={() => handleChange('status', !item.status)}
                    >
                      {item.status && <img src={check} alt="check" />}
                    </div>
                    <span>{item.title}</span>
                  </Reorder.Item>
                );
              })}
            </Reorder.Group>
            <span className="info__todo--subtitle">
              Drag and drop to reorder list
            </span>
          </div>
        </div>
      </div>
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

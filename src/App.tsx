import { ChangeEvent } from 'react';
import { TodoListI, todoActions } from './utils/data';
import { check, cross, logo, moon, sun } from './assets';
import { Reorder } from 'framer-motion';
import { useTodos } from './hooks/useTodos';
import { Bubble } from './components/bubble/Bubble';

export const App = () => {
  const {
    darkmode,
    dispatch,
    handleChange,
    handleDragEnd,
    handleSubmit,
    isDarkmodeActive,
    listToShow,
    setDarkmode,
    setItems,
    setShowCaseList,
    state,
    showCaseList,
    todo,
  } = useTodos();

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
          <Bubble
            item={todo}
            handleChange={() => handleChange('status', !todo.status)}
            isDarkmodeActive={isDarkmodeActive}
          />
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
      <div className={`info ${isDarkmodeActive}`}>
        { listToShow.length !== 0 &&  <div className="info__todo">
          <div className={`info__todo--wrapper ${isDarkmodeActive}`}>
            <Reorder.Group
              axis="y"
              values={listToShow.map((item: TodoListI) => item.id)}
              onReorder={(newOrder) => {
                showCaseList === 'all' ? handleDragEnd(newOrder) : '';
              }}
              className="info__todo--container"
            >
              {listToShow.map((item: TodoListI) => {
                return (
                  <Reorder.Item
                    key={item.id}
                    value={item.id}
                    className={`todo__item ${isDarkmodeActive}`}
                  >
                    <Bubble
                      item={item}
                      handleChange={() =>
                        dispatch({
                          type: 'completedTodo',
                          payload: item.id,
                        })
                      }
                      isDarkmodeActive={isDarkmodeActive}
                    />

                    <span
                      className={`item__title ${
                        item.status && 'active'
                      } ${isDarkmodeActive}`}
                    >
                      {item.title}
                    </span>

                    <img
                      src={cross}
                      alt="cross"
                      className="todo__delete"
                      onClick={() =>
                        dispatch({
                          type: 'deleteTodo',
                          payload: item.id,
                        })
                      }
                    />
                  </Reorder.Item>
                );
              })}
            </Reorder.Group>
          </div>

          <div className={`info__todo--actions ${isDarkmodeActive}`}>
            <span className={`todo__info ${isDarkmodeActive}`}>
              5 items left
            </span>
            <div className="todo__actions">
              {todoActions.map((item) => (
                <span
                  className={`actions__title ${
                    showCaseList === item.value && 'active'
                  }`}
                  onClick={() => setShowCaseList(item.value)}
                >
                  {item.label}
                </span>
              ))}
            </div>
            <span className={`todo__info ${isDarkmodeActive}`}>
              Clear Completed
            </span>
          </div>
          {showCaseList === 'all' && (
            <span className={`info__todo--subtitle ${isDarkmodeActive}`}>
              Drag and drop to reorder list
            </span>
          )}
        </div>}
      </div>
    </main>
  );
};

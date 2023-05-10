import { useContext } from 'react';
import { todoContext } from './context/todoContext';
import { TodoListI } from './utils/data';

export const App = () => {
  const { dispatch, state } = useContext(todoContext);
  return (
    <main>
      <button
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
      {state?.map((item: TodoListI) => (
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
    </main>
  );
};

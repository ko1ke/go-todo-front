import type { NextPage } from 'next';
import { useAuth } from '../hooks/useAuth';
import useTodos from '../hooks/useTodos';

const Todos: NextPage = () => {
  const { user } = useAuth();
  const { todos, error, todoItem, handleTodoItemChange, submitTodo } =
    useTodos();

  if (error) return <p>An error has occurred.</p>;
  if (!todos) return <p>Loading...</p>;

  return (
    <div>
      {todos.map((todo, i) => {
        return (
          <div key={i}>
            <p>ID: {todo.id}</p>
            <p>UserID: {todo.userId}</p>
            <p>Title: {todo.title}</p>
            <p>Content: {todo.content}</p>
            <hr />
          </div>
        );
      })}

      {user.id !== 0 && (
        <>
          <p>Create Todo</p>
          <div>
            <div>
              <label>
                Title:
                <input
                  type="text"
                  value={todoItem.title}
                  onChange={handleTodoItemChange('title')}
                />
              </label>
            </div>
            <div>
              <label>
                Content
                <input
                  type="text"
                  value={todoItem.content}
                  onChange={handleTodoItemChange('content')}
                />
              </label>
            </div>
            <button type="submit" onClick={submitTodo}>
              Submit
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Todos;

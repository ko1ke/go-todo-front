import type { NextPage } from 'next';
import { useAuth } from '../hooks/useAuth';
import useTodos from '../hooks/useTodos';
import Link from 'next/link';

const Todos: NextPage = () => {
  const { user } = useAuth();
  const {
    todos,
    error,
    todoItem,
    handleTodoItemChange,
    submitTodo,
    deleteTodo,
  } = useTodos();

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
            <Link href={`/todos/${todo.id}`}>
              <a>
                <button disabled={todo.userId !== user.id}>EDIT</button>
              </a>
            </Link>
            <span> </span>
            <button
              disabled={todo.userId !== user.id}
              onClick={() => deleteTodo(todo.id)}
            >
              DELETE
            </button>
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

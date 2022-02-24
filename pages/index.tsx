import type { NextPage } from 'next';
import useTodos from '../hooks/useTodos';
import Link from 'next/link';
import { useSelector } from './../store';
import { idSelector } from '../selectors/auth';

const Todos: NextPage = () => {
  const id = useSelector(idSelector);

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
                <button disabled={todo.userId !== id}>EDIT</button>
              </a>
            </Link>
            <span> </span>
            <button
              disabled={todo.userId !== id}
              onClick={() => deleteTodo(todo.id)}
            >
              DELETE
            </button>
            <hr />
          </div>
        );
      })}

      {id && (
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

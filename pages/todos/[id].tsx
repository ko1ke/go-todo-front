import type { NextPage } from 'next';
import useTodo from '../../hooks/useTodo';

const Todo: NextPage = () => {
  const { todo, todoItem, error, handleTodoItemChange, updateTodo } = useTodo();

  if (error) return <p>An error has occurred.</p>;
  if (!todo) return <p>Loading...</p>;

  return (
    <>
      <p>Update Todo</p>
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
        <button type="submit" onClick={updateTodo}>
          Submit
        </button>
      </div>
    </>
  );
};

export default Todo;

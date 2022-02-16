import type { NextPage } from 'next';
import { useAuth } from '../hooks/useAuth';
import useTodos from '../hooks/useTodos';
import { Todo } from '../types/Todo';

const fetcher = (url: string) =>
  fetch(url).then((res) => res.json() as Promise<Todo[]>);

const Todos: NextPage = () => {
  const { user } = useAuth();
  const { data, error } = useTodos();

  if (error) return <p>An error has occurred.</p>;
  if (!data) return <p>Loading...</p>;

  return (
    <div>
      {data.map((todo) => {
        return (
          <div>
            <p>ID: {todo.id}</p>
            <p>UserID: {todo.userId}</p>
            <p>Title: {todo.title}</p>
            <p>Content: {todo.content}</p>
            <hr />
          </div>
        );
      })}
      
    </div>
  );
};

export default Todos;

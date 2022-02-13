import type { NextPage } from 'next';
import useSWR from 'swr';
import { Todo } from '../typing/Todo';

const fetcher = (url: string) =>
  fetch(url).then((res) => res.json() as Promise<Todo[]>);

const Todos: NextPage = () => {
  const { data, error } = useSWR('http://localhost:4000/todos', fetcher);

  if (error) return <>'An error has occurred.'</>;
  if (!data) return <>'Loading...'</>;

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

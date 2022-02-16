import useSWR from 'swr';
import { Todo } from '../types/Todo';

const fetcher = (url: string) =>
  fetch(url).then((res) => res.json() as Promise<Todo[]>);

const useTodos = () => {
  const { data, error } = useSWR('http://localhost:4000/todos', fetcher);
  return { data, error };
};

export default useTodos;

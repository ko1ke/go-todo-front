import useSWR from 'swr';
import { Todo } from '../types/Todo';
import { useCallback, useState, ChangeEvent } from 'react';

const fetcher = (url: string) =>
  fetch(url).then((res) => res.json() as Promise<Todo[]>);

const useTodos = () => {
  const {
    data: todos,
    error,
    mutate,
  } = useSWR('http://localhost:4000/todos', fetcher);

  const [todoItem, setTodoItem] = useState({
    title: '',
    content: '',
  });

  const handleTodoItemChange = useCallback(
    (name: string) =>
      ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
        setTodoItem({ ...todoItem, [name]: value });
      },
    [todoItem]
  );

  const submitTodo = useCallback(() => {
    const f = async () => {
      const method = 'POST';
      const accessToken = localStorage.getItem('accessToken');
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      };
      const body = JSON.stringify(todoItem);

      const res = await fetch('http://localhost:4000/todos', {
        method,
        headers,
        body,
      });

      if (res.status === 201 && todos) {
        const j = (await res.json()) as Todo;
        mutate([...todos, j]);
      }
    };

    f();
  }, [todoItem]);

  return { todos, error, todoItem, handleTodoItemChange, submitTodo };
};

export default useTodos;

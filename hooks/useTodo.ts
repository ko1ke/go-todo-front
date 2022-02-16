import useSWR from 'swr';
import { Todo } from '../types/Todo';
import { useRouter } from 'next/router';
import { useCallback, useState, ChangeEvent, useEffect } from 'react';

const fetcher = (url: string, accessToken: string) =>
  fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  }).then((res) => res.json() as Promise<Todo>);

const useTodo = () => {
  const router = useRouter();
  const { id } = router.query;
  const accessToken = localStorage.getItem('accessToken');

  const { data: todo, error } = useSWR(
    [`http://localhost:4000/todos/${id}`, accessToken],
    fetcher
  );

  const [todoItem, setTodoItem] = useState({
    title: '',
    content: '',
  });

  useEffect(() => {
    if (todo) {
      setTodoItem({ title: todo.title, content: todo.content });
    }
  }, [todo]);

  const handleTodoItemChange = useCallback(
    (name: string) =>
      ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
        setTodoItem({ ...todoItem, [name]: value });
      },
    [todoItem]
  );

  const updateTodo = useCallback(() => {
    const f = async () => {
      const method = 'PUT';
      const accessToken = localStorage.getItem('accessToken');
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      };
      const body = JSON.stringify(todoItem);

      const res = await fetch(`http://localhost:4000/todos/${id}`, {
        method,
        headers,
        body,
      });

      if (res.status === 200) {
        router.push('/');
      }
    };

    f();
  }, [todoItem]);

  return {
    todo,
    error,
    todoItem,
    handleTodoItemChange,
    updateTodo,
  };
};

export default useTodo;

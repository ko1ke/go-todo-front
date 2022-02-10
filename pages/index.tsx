import type { NextPage } from 'next';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Home: NextPage = () => {
  const { data, error } = useSWR('http://localhost:4000/todos', fetcher);

  if (error) return <>'An error has occurred.'</>;
  if (!data) return <>'Loading...'</>;
  console.log(data);

  return <div>Hello</div>;
};

export default Home;

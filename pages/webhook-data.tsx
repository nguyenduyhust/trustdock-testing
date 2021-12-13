import { useCallback, useEffect, useState } from 'react';
import { NextPage } from 'next'
import dynamic from 'next/dynamic';
const DynamicReactJson = dynamic(import('react-json-view'), { ssr: false });

const Home: NextPage = (props) => {
  const [data, setData] = useState([]);
  const fetchData = useCallback(async () => {
    const res = await fetch('https://495b-14-180-113-154.ngrok.io/api/webhook-data');
    const json = await res.json();

    setData(json);
  }, [setData]);

  useEffect(() => {
    const timer = setInterval(() => {
      fetchData();
    }, 1000);

    return () => clearInterval(timer);
  }, [fetchData]);

  return (
    <div>
      <DynamicReactJson src={data} />
    </div>
  )
}

export default Home

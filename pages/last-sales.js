import React, { useEffect, useState } from 'react';
import useSWR from 'swr';

const LastSalesPage = (props) => {
  const [sales, setSales] = useState(props.sales);

  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR(
    'https://nextjs-38701-default-rtdb.firebaseio.com/sales.json',
    fetcher
  );

  useEffect(() => {
    if (data) {
      const transformedSales = [];

      for (const key in data) {
        transformedSales.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }

      setSales(transformedSales);
    }
  }, [data]);

  if (error) {
    return <p>Failed to load.</p>;
  }

  if (!data && !sales) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <ul>
        {sales.map((sale) => (
          <li key={sale.id}>
            {sale.username} - ${sale.volume}
          </li>
        ))}
      </ul>
    </div>
  );
};

export async function getStaticProps() {
  const res = await fetch(
    'https://nextjs-38701-default-rtdb.firebaseio.com/sales.json'
  );

  const data = await res.json();

  const transformedSales = [];

  for (const key in data) {
    transformedSales.push({
      id: key,
      username: data[key].username,
      volume: data[key].volume,
    });
  }

  return {
    props: {
      sales: transformedSales,
    },
    revalidate: 10,
  };
}

export default LastSalesPage;

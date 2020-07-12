import React from 'react';

import { useQuery, gql } from '@apollo/client';

const EXCHANGE_RATES = gql`
  query rates {
    recipes {
      title
    }
  }
`;

export default () => {
  const { loading, error, data } = useQuery(EXCHANGE_RATES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.recipes.map(({ title }) => (
    <div key={title}>
      <p>
        {title}
      </p>
    </div>
  ));
}


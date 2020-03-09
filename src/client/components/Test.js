import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const USERNAME = gql`
  query User($id: ID!) {
    user(id: $id) {
      username
    }
  }
`;

const Test = () => {
  const id = '5e0151cb3f1bec1c69990667';
  const { loading, error, data } = useQuery(USERNAME, {
    variables: { id },
  });

  if (loading && !data) return <h3>Loading...</h3>;

  return (
    <div>
      <h3>{data.user.username}</h3>
    </div>
  );
};

export default Test;

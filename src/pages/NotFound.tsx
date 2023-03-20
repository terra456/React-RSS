import React from 'react';

class NotFound extends React.Component {
  constructor(props: string) {
    super(props);
  }

  render() {
    return (
      <>
        <h1>404 Not Found</h1>
        <p>There is no such page.</p>
      </>
    );
  }
}

export default NotFound;

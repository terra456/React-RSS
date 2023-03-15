import React from 'react';

class AboutUs extends React.Component {
  constructor(props: string) {
    super(props);
  }

  render() {
    return (
      <div className="mx-auto max-w-2xl py-5 px-4 sm:py-4 sm:px-6 lg:max-w-7xl lg:px-8 lg:py-8">
        <h1>About Us</h1>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex quis ullam accusantium
          molestias deleniti culpa cum perspiciatis dolorem quod nisi incidunt tenetur ducimus
          voluptas quaerat totam eveniet, esse tempore at.
        </p>
      </div>
    );
  }
}

export default AboutUs;

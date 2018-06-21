import React, { Component } from 'react';

class ContactList extends React.Component {
  render() {
    const people = [
      { name: 'Mike' },
      { name: 'Alex' },
      { name: 'Candy' }
    ]

    return <ol>
      {people.map( person => (
        <li key={person.name}>{person.name}</li>
      ))}
    </ol>
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <ContactList/>
      </div>
    );
  }
}

export default App;

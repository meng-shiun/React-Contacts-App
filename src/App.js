import React, { Component } from 'react'
import ListContacts from './ListContacts'
import * as ContactsAPI from './utils/ContactsAPI'

class App extends Component {
  state = {
    contacts: []
  }

  componentDidMount() {
    ContactsAPI.getAll().then( contacts => {
      this.setState({ contacts })
    })
  }

  // This syntax ensures `this` is bound within handleClick.
  removeContact = (contact) => {
    this.setState((state) => ({
      contacts: state.contacts.filter( c => c.id !== contact.id)
    }))

    // Remove contact from database
    ContactsAPI.remove(contact)
  }

  render() {
    return (
      <div>
        <ListContacts
          onDeleteContact={this.removeContact}
          contacts={this.state.contacts}
        />
      </div>
    )
  }
}

export default App

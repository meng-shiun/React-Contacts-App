import React, { Component } from 'react'
import ListContacts from './ListContacts'
import CreateContact from './CreateContact'
import * as ContactsAPI from './utils/ContactsAPI'

class App extends Component {
  state = {
    screen: 'list', // list, create
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
        {this.state.screen == 'list' && (
          <ListContacts
            onDeleteContact={this.removeContact}
            contacts={this.state.contacts}
            onNavigate={() => {
              this.setState({ screen: 'create' })
            }}
          />
        )}

        {this.state.screen == 'create' && (
          <CreateContact />
        )}
      </div>
    )
  }
}

export default App

import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import ListContacts from './ListContacts'
import CreateContact from './CreateContact'
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

  createContact = (contact) => {
    ContactsAPI.create(contact).then(c => {
      this.setState(state => ({
        contacts: state.contacts.concat([c])
      }))
    })
  }

  render() {
    return (
      <div>
        <Route exact path='/' render={() => (
            <ListContacts
              onDeleteContact={this.removeContact}
              contacts={this.state.contacts}
            />
        )}/>
      <Route path='/create' render={({ history }) => (
          <CreateContact
            onCreateContact={(contact) => {
              this.createContact(contact)
              history.push('/')
            }}
          />
        )}/>
      </div>
    )
  }
}

export default App

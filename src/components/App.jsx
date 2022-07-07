import { useState, useEffect, useRef } from "react";

import s from "./ContactList/ContactList.module.css";

import { v4 as uuidv4 } from "uuid";
import ContactList from "./ContactList/ContactList";
import Filter from "./Filter/Filter";
import ContactForm from "./ContactForm/ContactForm";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  const firstRender = useRef(true);

   const addContact = ({ name, number }) => {
    const searchName = contacts
      .map((contact) => contact.name)
      .includes(name);

    if (searchName) {
      alert(`${name} is already in contacts`);
    } else if (name.length === 0) {
      alert("Fields must be filled!");
    } else {
      const contact = {
      id: uuidv4(),
      name,
      number,
    };

      setContacts(prevState => [ ...prevState, contact]);
    }
  };

  const removeContact = contactId => {
    setContacts(contacts.filter(({ id }) => id !== contactId));
   };
  
  const changeFilter = ({ target }) => setFilter(target.value);
  
  const getVisibleContacts = () => {

    if (!filter) {
      return contacts;
    }

    return contacts.filter((contacts) =>
      contacts.name.toLowerCase().includes(filter.toLowerCase())
    );
  }

  useEffect(() => {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts?.length) {
      setContacts(parsedContacts);
    }
  }, []);

  useEffect(() => {
    if (!firstRender.current) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    } else {
      firstRender.current = false;
    }
  }, [contacts]);

    const visibleContacts = getVisibleContacts();

  return (
      <div className={s.container}>
        <h1 className={s.title}>Phonebook</h1>

        <ContactForm onSubmit={addContact} />
        <h2 className={s.title}>Contacts</h2>
          <Filter value={filter} onChangeFilter={changeFilter} />
          <ContactList
            contacts={visibleContacts}
            onRemoveContact={removeContact}
          />
      </div>
    );
}

export default App;

// export default class App extends Component {
//   state = {
//     contacts: [
//       { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
//       { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
//       { id: "id-3", name: "Eden Clements", number: "645-17-79" },
//       { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
//     ],
//     filter: "",
//   };

//   addContact = (el) => {
//     const searchName = this.state.contacts
//       .map((contact) => contact.name)
//       .includes(el.name);

//     if (searchName) {
//       alert(`${el.name} is already in contacts`);
//     } else if (el.name.length === 0) {
//       alert("Fields must be filled!");
//     } else {
//       const contact = {
//         ...el,
//         id: uuidv4(),
//       };

//       this.setState((prevState) => ({
//         contacts: [...prevState.contacts, contact],
//       }));
//     }
//   };

//   changeFilter = (filter) => {
//     this.setState({ filter });
//   };

//   getVisibleContacts = () => {
//     const { contacts, filter } = this.state;

//     if (!filter) {
//       return contacts;
//     }

//     return contacts.filter((contacts) =>
//       contacts.name.toLowerCase().includes(filter.toLowerCase())
//     );
//   };

//   removeContact = (contactId) => {
//     this.setState((prevState) => {
//       return {
//         contacts: prevState.contacts.filter(({ id }) => id !== contactId),
//       };
//     });
//   };

//   componentDidMount() {
//     const contacts = localStorage.getItem('contacts');
//     const parsedContacts = JSON.parse(contacts);

//     if (parsedContacts) {
//       this.setState({ contacts: parsedContacts });
//     }

    
//   }

//   componentDidUpdate(prevProps, prevState) {
    
//     if (this.state.contacts !== prevState.contacts) {
//       localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
//     }
//   }

//   render() {
//     const { filter, contacts } = this.state;

//     const visibleContacts = this.getVisibleContacts();

//     return (
//       <div className={s.container}>
//         <h1 className={s.title}>Phonebook</h1>

//         <ContactForm onSubmit={this.addContact} />
//         <h2 className={s.title}>Contacts</h2>
//         {contacts.length > 1 && (
//           <Filter value={filter} onChangeFilter={this.changeFilter} />
//         )}
//         {contacts.length > 0 && (
//           <ContactList
//             contacts={visibleContacts}
//             onRemoveContact={this.removeContact}
//           />
//         )}
//       </div>
//     );
//   }
// }

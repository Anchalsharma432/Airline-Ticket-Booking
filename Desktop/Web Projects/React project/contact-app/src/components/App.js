import React, {useState, useEffect } from 'react';
import { uuid } from 'uuidv4';
import './App.css';
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";



// class App extends React.Component {
  
  // render(){
    // const contacts = [
    //   {
    //     id: "1",
    //     name: "Anchal",
    //     email: "sharmavatts@gmail.com", 
    //   },
    //   {
    //     id: "2",
    //     name: "Aarti",
    //     email: "artisharma@gmail.com", 
    //   }
    // ];
    function App() {
      const LOCAL_STORAGE_KEY = "contacts";
      const [contacts, setContacts] = useState([]);

      const addContactHandler = (contact) => {
        console.log(contact);
        setContacts([...contacts, { id : uuid(), ...contact}]);
      }

      const removeContactHandler = (id) => {
        const newContactList = contacts.filter((contact) => {
          return contact.id !== id;
        });
        setContacts(newContactList);
      }

      useEffect(() => {
        const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
        if(retriveContacts) setContacts(retriveContacts);
      }, []);

      useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
      }, [contacts]);

      return (
        <div className="ui container">
          {/* <h1>hello</h1> */}
          <Header />
          <AddContact addContactHandler={addContactHandler} />
          {/*  react - props pass data from parent to child  */}
          <ContactList contacts={contacts} getContactID={removeContactHandler}/>  
        </div>
      );
      
    }
  // }
 
// }

 
export default App;
 
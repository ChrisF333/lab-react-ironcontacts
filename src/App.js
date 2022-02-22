import './App.css';
import React from 'react'
import contacts from './contacts.json'
import { useState } from 'react'

function App() {
  const [contactList, setContacts] = useState(topFive);

    function topFive(){
      return contacts.slice(0,5);
    }

    function getRandomContact() {
      return contacts[Math.floor(Math.random() * contacts.length)];
    }

    function addRandomContact() {
      setContacts(contactList.concat(getRandomContact()));
    }

    function sortContacts(list) {
      return list.sort(function (a,b) {
        var nameA = a.name.toUpperCase(); // ignore upper and lowercase
        var nameB = b.name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }      
        // names must be equal
        return 0;
      })
    } 

    function sortByName() {
     /* setContacts(
        contactList.sort(function (a,b) {
          var nameA = a.name.toUpperCase(); // ignore upper and lowercase
          var nameB = b.name.toUpperCase(); // ignore upper and lowercase
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }      
          // names must be equal
          return 0;
        })
      );      */
      setContacts(sortContacts(contactList));
    }

    function sortByPopularity() {
      setContacts(
        contactList.sort(function (a,b) {
        return b.popularity - a.popularity
        })
      );
    }

      function deleteContact(removeId) {
        const filteredContacts = contactList.filter(x => {
          return x.id !== removeId;
        })
        setContacts(filteredContacts);
      }
   
  return (
    <div className="App">
      <h1> Iron Contacts </h1>
      <button onClick={addRandomContact}>Add Random Contact</button>
      <button onClick={sortByPopularity}>Sort by Popularity</button>
      <button onClick={sortByName}>Sort by Name</button>
      <table>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won Oscar</th>
            <th>Won Emmy</th>
          </tr>
        </thead>
        <tbody>
        {contactList.map(contact => {
        return (          
            <tr key={contact.id}>
              <td><img src={contact.pictureUrl} width={30} alt="contact_picture" /></td>
              <td>{contact.name}</td>
              <td>{contact.popularity}</td>
              <td>{contact.wonOscar ? "🏆" : "" }</td>
              <td>{contact.wonEmmy ? "🏆" : "" }</td>
              {<button onClick={() => deleteContact(contact.id)}>Delete</button>}
            </tr>          
          )
        })}
        </tbody>
      </table>
    </div>
  );
}

export default App;

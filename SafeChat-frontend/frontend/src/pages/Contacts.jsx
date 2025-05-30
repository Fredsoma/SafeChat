
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Contacts.css';

export default function Contacts() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/contacts') 
      .then(res => setContacts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="contacts-container">
      <h2>Emergency Contacts</h2>
      <ul className="contacts-list">
        {contacts.map(contact => (
          <li key={contact.id} className="contact-item">
            <span className="contact-name">{contact.name}:</span>
            <span className="contact-phone">{contact.phone}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

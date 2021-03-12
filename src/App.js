import React, { useState } from "react";

const Filter = ({ searchName, onSearch }) => {
  return (
    <div>
      <span>
        search contact:{" "}
        <input type="text" value={searchName} onChange={onSearch} />
      </span>
    </div>
  );
};

const PersonForm = ({
  submit,
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange,
}) => {
  return (
    <form onSubmit={submit}>
      <div>
        name:{" "}
        <input
          type="text"
          value={newName}
          onChange={handleNameChange}
          required
        />
      </div>
      <div>
        number:{" "}
        <input
          type="text"
          value={newNumber}
          onChange={handleNumberChange}
          required
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Persons = ({ persons }) => {
  return (
    <ul>
      {persons.map((person) => (
        <li key={person.name}>
          {person.name} {person.number}
        </li>
      ))}
    </ul>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchName, setSearchName] = useState("");

  const submit = (event) => {
    event.preventDefault();
    if (persons.map((person) => person.name).includes(newName)) {
      alert(`${newName} is already in the phonebook`);
    } else {
      const nameObject = {
        name: newName,
        number: newNumber,
      };
      setPersons(persons.concat(nameObject));
      setNewName("");
      setNewNumber("");
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const onSearch = (event) => {
    setSearchName(event.target.value);
  };

  const searchedNames = persons.filter((person) =>
    person.name.toLowerCase().includes(searchName.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchName={searchName} onSearch={onSearch} />
      <h3>Add a new contact</h3>
      <PersonForm
        submit={submit}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={searchedNames} />
    </div>
  );
};

export default App;

import { v4 as uuidv4 } from 'uuid';
import sqlite from 'sqlite3';
const db = new sqlite.Database('data.db');

let users = [];
 
db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, firstName TEXT VARCHAR(255) NOT NULL, surName TEXT NOT NULL, age INTEGER NOT NULL)");

export const getUsers = (req, res) => {
  res.send(users);
}

export const createUser = (req, res) => {
  let name = req.body["firstName"]
  let surname = req.body["surName"]
  let age = req.body["age"]
  console.log(name, surname, age)
  
  db.run("INSERT INTO users(firstName,surName, age) VALUES(?,?,?)", name, surname, age)
  res.send(JSON.stringify({message: 'success'}))



    // const user = req.body;

  //  const userId = uuidv4();   
  //  const userWithId = { ...user, id: userId }
  // user.push(userWithId);

    //  users.push({ ...user, id: uuidv4() });

    //  res.send(`User with the name ${user.firstName} added to the database!`);
}

export const getUser = (req, res) => {
  const { id } = req.params;

  const foundUser = users.find((user) => user.id === id);
    res.send(foundUser);
}
 
export const deleteUser =(req, res) => {
  const { id } = req.params;
  
  users = users.filter((user) => user.id !== id);
  res.send(`User with the id ${id} deleted from the database`);
}


export const updateUser = (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, age } = req.body;

  const user = users.find((user) => user.id === id);

      if (firstName) user.firstName = firstName;
      
      if (lastName) user.lastName = lastName;
      
      if (age) user.age = age;
      
  res.send(`User with the id ${id} has been updated`);
}
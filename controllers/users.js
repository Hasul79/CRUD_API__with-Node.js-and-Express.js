// import { v4 as uuidv4 } from 'uuid';
import sqlite from 'sqlite3';
const db = new sqlite.Database('data.db');

let users = [];
 
db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, firstName TEXT VARCHAR(50) NOT NULL, surName TEXT NOT NULL, age INTEGER NOT NULL,  salary INTEGER NOT NULL)");

export const getUsers = (req, res) => {
 db.all("SELECT * FROM users", function(err, rows){
   console.log(rows)
   res.send(rows);
})
}

export const createUser = (req, res) => {
  let name = req.body["firstName"]
  let surname = req.body["surName"]
  let age = req.body["age"]
  let salary = req.body["salary"]
  console.log(name, surname, age, salary)
  
  db.run("INSERT INTO users(firstName,surName, age, salary) VALUES(?,?,?,?)", name, surname, age, salary)
  res.send(JSON.stringify({message: 'success'}))
};

export const getUser = (req, res) => {
  const id = req.params.id
  db.all("SELECT * FROM users WHERE id = ?",[id],  function(err, rows){
    console.log(rows);
    res.send(rows);
 }
 )};
    
 export const updateUser = (req, res) => {
  const id = req.params.id
  let firstName = req.body["firstName"];
  let surname = req.body["surName"];
  let age = req.body["age"];
  let salary = req.body["salary"];

  let sqlite =`UPDATE users SET firstName = ?, surName = ?, age = ? , salary = ?  WHERE id = ${id}`
  db.run(sqlite,firstName,surname,age, salary)
  res.send(`User with the ${id} has been updated`)
}
   
  export const deleteUser =(req, res) => {
    const id = req.params.id
  
    db.run("DELETE FROM  users WHERE id=?",[id], function(err){
    db.all("SELECT * FROM users WHERE id = ?",[id],  function(err, rows){
      console.log(rows);
      res.send(rows);
    })
  })
  };
  
    
    



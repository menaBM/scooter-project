const User = require('./User')
const Scooter = require('./Scooter')

class ScooterApp {
  constructor(){
    this.stations = {}
    this.registeredUsers = {}
  }
  register(user){
    if (Object.keys(this.registeredUsers).includes(user.username)){
      console.log("already registered")
    }else if(user.age <17){
      console.log("too young to register!")
    }else{
      this.registeredUsers[user.username] = {
        password: user.password,
        age: user.age,
        loggedIn: false,
        accountCharge: 0
      }
      console.log("user has been registered")
    }
  }
  logIn(username, password){
    if (Object.keys(this.registeredUsers).includes(username)){
      if (this.registeredUsers[username].password === password){
        this.registeredUsers[username].loggedIn = true;
        console.log("logged in")
        return;
      }
    }
    throw new Error("Username or password is incorrect.")
  }
  addScooter(scooter, location){
    scooter.station = location
    if (!Object.keys(this.stations).includes("location")){
      this.stations[location] = {}
    }
    this.stations[location][scooter.serial] = scooter
  }
  removeScooter(scooterToRemove){
    if (this.stations[scooterToRemove.station] != undefined){
      if (Object.keys(this.stations[scooterToRemove.station]).includes(scooterToRemove.serial.toString())){
        delete this.stations[scooterToRemove.station][scooterToRemove.serial]
        console.log("scooter removed successfully")
      }else{
        throw new Error("this scooter is not in the list")
      }
    }else{
      throw new Error("this scooter is not in the list")
    }
  }
}

module.exports = ScooterApp

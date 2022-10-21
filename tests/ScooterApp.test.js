const Scooter = require('../src/Scooter')
const User = require('../src/User')
const ScooterApp = require('../src/ScooterApp')
const { TestWatcher } = require('jest/build/jest')

// ScooterApp tests here
describe("testing the user class interactions with the scooter app class", ()=>{
// register user
    beforeEach(()=>{
        user = new User("alex19","superStrongPassword", 32);
        app = new ScooterApp()
    })
    test("a user can be registered", ()=>{
        app.register(user)
        expect(Object.keys(app.registeredUsers)).toContain(user.username)
    })
    test("a user cannot register if they are already registered", ()=>{
        app.register(user)
        let log = jest.spyOn(console,"log")
        app.register(user)
        expect(log).toHaveBeenCalledWith("already registered")
        log.mockRestore()
    })
    test("a user must be over 17 to register", ()=>{
        let log = jest.spyOn(console,"log")
        app.register(new User("lawrence", "aProperlyHashedPassword", 14))
        expect(log).toHaveBeenCalledWith("too young to register!")
        log.mockRestore()
    })
// log in
    test("a user can log in", ()=>{
        app.register(user)
        app.logIn(user.username, user.password)
        expect(app.registeredUsers[user.username].loggedIn).toEqual(true)
    })
    test("a user with an incorrect username or password cannot log in",()=>{
        app.register(user)
        expect(()=>{app.logIn(user.username, "abcdefg")}).toThrow("Username or password is incorrect.")
        expect(() =>{app.logIn("not_a_user", "abcdefghijk")}).toThrow("Username or password is incorrect.")
    })
})
describe("testing the scooter class interactions with the scooter app class",()=>{
    beforeEach(()=>{
        scooter = new Scooter("initalCity", "thomas")
        app = new ScooterApp()
    })
// add scooter
    test('adding a scooter', ()=>{
        app.addScooter(scooter, "city")
        expect(scooter.station).toBe("city")
        expect(app.stations["city"][scooter.serial]).toEqual(scooter)
    })
// remove scooter
    test("removing a scooter", ()=>{
        app.addScooter(scooter, "city")
        let log = jest.spyOn(console,"log")
        app.removeScooter(scooter)
        expect(log.mock.calls.pop().toString()).toBe("scooter removed successfully")
    })
    test("removing a scooter that is not currently in the list",()=>{
        expect(() =>{app.removeScooter(scooter)}).toThrow("this scooter is not in the list")
    })
})
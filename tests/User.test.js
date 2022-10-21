const User = require('../src/User')

// User tests here
describe("creating an instance of user", ()=> {
    beforeEach(() => {user = new User("Jane","securePassword!", 21)})
// test username
    test("checking the username", ()=>{
        expect(user.username).toBe("Jane")
    }),
// test password
    test("checking the password property",()=>{
        expect(user.password).toBe("securePassword!")
    })
// test age
    test("checking the age property", ()=>{
        expect(user.age).toBe(21)
    })
})
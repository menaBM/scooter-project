const Scooter = require('../src/Scooter')
const User = require('../src/User')

//typeof scooter === object
describe('scooter object', () => {
  test('all properties are correctly initialised', () => {
    scooter = new Scooter("city", "alice")
    expect(scooter.station).toEqual("city");
    expect(scooter.user).toEqual("alice");
    expect(scooter.isBroken).toEqual(false);
    expect(scooter.docked).toEqual(true);
  }
)
})

//Method tests
describe('scooter methods', () => {
  beforeEach(()=>{scooter = new Scooter("city", "alice")})
  //rent method
  test("renting a scooter",()=>{
    scooter.charge = 46
    scooter.rent()
    expect(scooter.docked).toBe(false)
  })
  test("renting a scooter with low charge",()=>{
    scooter.charge = 2
    expect(() =>{scooter.rent()}).toThrow("Scooter low on battery, please charge.")
  })
  test("renting a broken scooter",()=>{
    scooter.isBroken  = true
    expect(() =>{scooter.rent()}).toThrow("Scooter is broken, please send a repair request.")
  })
  //dock method
  test("docking a scooter", ()=>{
    scooter.dock("newCity")
    expect(scooter.station).toBe("newCity")
  })
  test("docking a scooter without giving location", ()=>{
    expect(() =>{scooter.dock()}).toThrow("Docking station required!")
  })
  //requestRepair method
  test("repairing scooter", async()=>{
    scooter.isBroken = true
    await scooter.requestRepair()
    expect(scooter.isBroken).toBe(false)
  })
  //charge method
  test("charge the scooter", async()=>{
    await scooter.recharge();
    expect(scooter.charge).toBe(100)
  })
})
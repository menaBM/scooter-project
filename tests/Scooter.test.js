const Scooter = require('../src/Scooter')
const User = require('../src/User')

//typeof scooter === object
describe('scooter object', () => {
  test('all properties are correctly initialised', () => {
    scooter = new Scooter("city", "alice", 836, 46)
    expect(scooter.station).toEqual("city");
    expect(scooter.user).toEqual("alice");
    expect(scooter.serial).toEqual(836);
    expect(scooter.charge).toEqual(46);
    expect(scooter.isBroken).toEqual(false);
    expect(scooter.docked).toEqual(true);
  }
)
})

//Method tests
describe('scooter methods', () => {
  beforeEach(()=>{scooter = new Scooter("city", "alice", 836, 46)})
  //rent method
  test("renting a scooter",()=>{
    scooter.rent()
    expect(scooter.docked).toBe(false)
  })
  test("renting a scooter with low charge",()=>{
    scooter2 = new Scooter("city", "jane", 245 ,2)
    expect(scooter2.rent()).toThrow("Scooter low on battery, please charge.")
  })
  test("renting a broken scooter",()=>{
    scooter.isBroken  = true
    expect(scooter.rent()).toThrow("Scooter is broken, please send a repair request.")
  })
  //dock method
  test("docking a scooter", ()=>{
    scooter.dock("newCity")
    expect(scooter.station).toBe("newCity")
  })
  test("docking a scooter without giving location", ()=>{
    expect(scooter.dock()).toThrow("Docking station required!")
  })
  //requestRepair method
  test("repairing scooter", ()=>{
    scooter.requestRepair()
    expect(scooter.isBroken).toBe(false)
  })
  //charge method
  test("charge the scooter", ()=>{
    scooter.recharge()
    expect(scooter.charge).toBe(100)
  })

})

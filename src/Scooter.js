class Scooter{
  constructor(station, user){
    this.station = station
    this.user = user
    this.serial = Math.floor(Math.random()*1000)+1
    this.charge = Math.floor(Math.random()* 100) + 1
    this.isBroken = false
    this.docked = true
  }
  rent(){
    if (this.isBroken === true){
      throw new Error( "Scooter is broken, please send a repair request.")
    }
    else if (this.charge<=20 ) {
        throw new Error( "Scooter low on battery, please charge.")
      }
    this.docked = false
    console.log("Enjoy the ride!")
  }
  dock(station){
    if (station === undefined){
      throw new Error("Docking station required!")
    }
    this.station = station
    this.docked = true
    this.user = ""
  }
  async recharge(){
    console.log('Charging scooter...');
    await new Promise(resolve => setTimeout(resolve, 1500));
    this.charge = 100;
    console.log('Fully charged.');   
  }
    async requestRepair(){
      console.log("sending scooter for repairs")
      await new Promise(resolve => setTimeout(resolve, 2000))
      console.log("scooter repaired")
      this.isBroken = false
    }

}


module.exports = Scooter

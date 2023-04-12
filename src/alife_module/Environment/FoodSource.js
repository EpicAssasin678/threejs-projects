class FoodSource {

    x;
    y;

    constructor(totalEnergy, currentEnergy, decayRate = 0) {
        this.totalEnergy = totalEnergy;
        this.currentEnergy = currentEnergy;
        this.decayRate = decayRate;

        //generate unique id
        this.id = Math.floor(Math.random() * (totalEnergy * Math.random()) * 100);
    }

    setCoords(x, y) {
        this.x = x;
        this.y = y;
    }

    setCurrentEnergy(amount) {
        this.currentEnergy = amount;
    }

    setTotalEnergy(amount) {
        this.totalEnergy = amount;
    }

    setDecayRate(amount) {
        this.decayRate = amount;
    }

    deplete(amount) {
        this.currentEnergy -= amount;
    }

    increase(amount) {
        this.currentEnergy += amount;
    }

    getEnergy() {
        return this.currentEnergy;
    }

    getTotalEnergy() {
        return this.totalEnergy;
    }

    getDecayRate() {
        return this.decayRate;
    }
    

}

export default FoodSource;
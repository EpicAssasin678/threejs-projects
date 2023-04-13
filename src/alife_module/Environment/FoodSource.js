class FoodSource {

    constructor(totalEnergy, currentEnergy, decayRate = 0, coords) {
        this.totalEnergy = totalEnergy;
        this.currentEnergy = currentEnergy;
        this.decayRate = decayRate;
        [this.x, this.y] = coords || [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
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
    
    decay () {
        this.currentEnergy -= this.decayRate;
    }

}

export default FoodSource;
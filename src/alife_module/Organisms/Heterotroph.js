import Organism from "./Organism";

class Heterotroph extends Organism {

    constructor(bodyMass, currentEnergy, size, currentCords, consumptionRate) {
        super(bodyMass, currentEnergy, size, currentCords);
        this.consumptionRate = consumptionRate;
    }

    
}
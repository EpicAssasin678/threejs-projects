import { EventDispatcher } from "three";
import Environment from "./Environment";


/**
 * The simulation class is the main class that manages the environment and the organisms and creates updates dependant on 
 * that.
 * 
 */
class Simulation extends EventDispatcher {

    /**
     * 
     * @param {Environment} environment 
     */
    constructor(environment) {
        super();
        this.environment = environment;
        
    }

    /**
     * Completes one day which is a cycle of the environment and the organisms.
     */
    completeDayCycle() {
        //import day cycle from environment 
        let cycle = this.environment.dayCycle;
        let organisms = this.environment.objects.organisms;
        let foodsources = this.environment.objects.foodSources;
        //make every organism decide their action 
        
        organisms.forEach(organism => {
            organism.decideAction();
        });
        //update every food source 
        foodsources.forEach(foodsource => {
            foodsource.decay();
        });
        //check for environment conditions

        this.dispatchEvent({type: 'update', message: 'Day cycle completed'});
    }
}

export default Simulation;
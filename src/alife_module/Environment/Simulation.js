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
        this.simulationTime = 0; //in unit time of environment 
        
        this.died = {
            organisms: [],
            foodSources: []
        };

        this.config = {
            fdecay: true,

            

        }
    }

    /**
     * Completes one day which is a cycle of the environment and the organisms.
     * 
     * Decay should happen every constant of n intervals in environemnt's respective time unit. Suggestion, create a enumerable 
     * which contains all static constants for the simulation.
     * 
     */
    completeDayCycle() {
        //import day cycle from environment 
        let cycle = this.environment.dayCycle;
        let organisms = this.environment.objects.organisms;
        let foodsources = this.environment.objects.foodSources;
        //make every organism decide their action 
        
        organisms.forEach(organism => {
            if (organism.STATE.ALIVE) {
                //refill movement 
                organism.refillMovement();
                organism.executeAction();
            } else {
                this.died.organisms.push(organism.id);

                //if dead, remove from environment
            }

        });

        //update every food source 
        foodsources.forEach(foodsource => {

            if ( this.config.fdecay && foodsource.currentEnergy - foodsource.decayRate >= 0 ) foodsource.decay();
            if ( foodsource.isDepleted() ) {
                
                this.died.foodSources.push(foodsource.id);

            }

        });
        //check for environment conditions

        
    }


    removeDead () {


       this.died.organisms.forEach(id => {
            this.environment.removeOrganism(this.environment.objects.organisms.get(id));
       });

       this.died.foodSources.forEach(id => {
            this.environment.removeFoodSource(this.environment.objects.foodSources.get(id));
       });

       this.died = {
            organisms: [],
            foodSources: []
        };


    }


}

export default Simulation;
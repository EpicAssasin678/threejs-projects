import AnimalStates, {STATES} from "./AnimalStates.js";
import Organism from "./Organism.js";
import Environment from "../Environment/Environment.js";
import FoodSource from "../Environment/FoodSource.js";

/**
 * @todo implement organism size detection (in detecting especially)
 */
class Herbivore extends Organism {
    
    

    /**
     * @extends Organism
     * @param {Number} consumptionRate amount of energy in respective units that the organism consumes per feeding
     * @param {Number} speed amount of units the organism moves in one instance of movement
     * @param {Number} vision amount of units the organism can see in all directions
     */

    constructor (bodyMass, consumptionRate, speed, vision, currentEnergy, size, currentCords, environment) {
        super(bodyMass, currentEnergy, size, speed, currentCords, environment);
        
        this.vision = vision;
        this.consumptionRate = consumptionRate;
        this.currentEnergy = currentEnergy;

        //identification properties 
        
        

    }

    initializeState (...stateArgs) {

    }

    /**
     * Feeding for herbivores depletes foodSource by consumptionRate of the organism.
     * @param {FoodSource} foodSource 
     */
    feed (foodSource) {
        console.log(`Organism ${this.id} is feeding`);
        foodSource.deplete(this.consumptionRate);
    }

    checkIfTravelled (x,y) {
        return this.memory.traveledPositions.indexOf([x,y]);
    }

    
    wander () {

        // get a random x between the x coord and the moveable distance
        let x = this.x + ((Math.floor(Math.random() * 100) % this.speed) );
        let y = this.y + ((Math.floor(Math.random() * 100) % this.speed) );


        
        console.log(x, y);
        
        let traveled = this.checkIfTravelled(x, y);
        if (traveled < 1) {
            //check if we are over memory
            if (this.memory.traveledPositions.length > 200) {
                this.memory.traveledPositions.shift();
            }
            this.memory.traveledPositions.push([x, y]);
            this.move(x, y);
        } else {
            this.wander();
        }

        console.log(`Organism ${this.id} is wandering to ${x}, ${y}`);
    }
    
    /**
     * Movement function which wraps the moveTo function of an organism. Checks 
     * for certain triggers and conditions before moving.
     * 
     * If the coords move outside of the environment, the organism will wrap around. Uses modulo.
     * Also prevents movement farther than the organism's remaining movement.
     * 
     * @param {*} x 
     * @param {*} y 
     */
    move (x, y) {
        //! might want to check if the movement is diagonal, in which case it would be counted as 1 movement
        let movementLength = Math.sqrt(Math.pow((x - this.x), 2) + Math.pow((y - this.y), 2)); //equation should work
        //see if we move the whole amount, or just part of it
        //todo track diagonals 
        
        //check if coords are diagonal to our current position
        this.moveTo(x, y);
        this.remainingMovement -= movementLength;
    }

    moveToObject (object) {
        this.move(object.x, object.y);
    }

    distanceToObject (object) {
        return Math.sqrt(Math.pow(object.x - this.x, 2) + Math.pow(object.y - this.y, 2));
    }

    metabolize (metabolismMod) {
        this.currentEnergy -= this.bodyMass * metabolismMod;
    }
    

    
    /**
     * Detects objects in the vision range of the organism.
     * @param {Array} environment - reference of the Environment object
     * @returns {Array} of objects in vision range
     * 
     * 
     */
    detectSurroundings (environment) {
        console.log(`Organism ${this.id} is detecting surroundings, vision: ${this.vision}`);
        let objects = [];
        //radial sweep for vision
        for (let i = 0; i < this.vision; i++) {
            for (let j = 0; j < this.vision; j++) {
                //check if object is in range
                if (Math.sqrt(Math.pow(i, 2) + Math.pow(j, 2)) < this.vision) {
                    //todo implement check for size 
                    //let sweep = [ environment.objectMap[this.cordX + i, this.cordY + j], environment.objectMap[this.cordX + i, this.cordY - j], environment.objectMap[this.cordX - i, this.cordY + j], environment.objectMap[this.cordX - i, this.cordY - j]];
                    console.log(
                        [this.x + i, this.y + j], 
                        [this.x + i, this.y - j],
                        [this.x - i, this.y + j],
                        [this.x - i, this.y - j]
                        );
                    let sweep = [];
                    
                    /**
                     * Current method for sweeping leads to a bug where the organism will flutter around all four of these coordinates.
                     * Essentially this issue creates three 'phantom' organisms moving the same as the real
                     * 
                     */
                    if (environment.objectMap.get([this.x + i, this.y + j]) ) sweep.push(environment.objectMap.get([this.x + i, this.y + j]) );
                    if (environment.objectMap.get([this.x + i, this.y - j]) ) sweep.push(environment.objectMap.get([this.x + i, this.y - j]) );
                    if (environment.objectMap.get([this.x - i, this.y + j]) ) sweep.push(environment.objectMap.get([this.x - i, this.y + j]) );
                    if (environment.objectMap.get([this.x - i, this.y - j]) ) sweep.push(environment.objectMap.get([this.x - i, this.y - j]) );
                    
                    //adds all swept entries to known objects without duplicates 
                    sweep.forEach((entry) => {

                        //check to see if we have already added this object to the array
                        entry.objects.forEach((object) => {
                            if (!objects.includes(object.id)) {
                                objects.push(object.id);
                                console.log(`Organism ${this.id} detected object ${object.id}`);
                            }
                        });

                    });
                    //adds all information to an array of objects 
                }
            }
        }
        console.log(objects);
        return objects;
    }

    /**
     * Evaluates the organisms environment and alters the state of the organism accordingly.
     * 
     * TODO once traits implemented, remove bodyMassMod and instead use the instance field bodyMass
     */
    evaluateState (bodyMassMod) {
        //check if hungry or starving
        console.log(`Organism ${this.id} is evaluating state`);

        if (this.currentEnergy < (this.bodyMass *  bodyMassMod)) {
            this.STATE.HUNGER = ( this.currentEnergy < 0 ) ? Organism.HUNGER_STATES.STARVING : Organism.HUNGER_STATES.HUNGRY;
        } else {
            if (this.currentEnergy > (this.bodyMass * bodyMassMod)) {
                this.STATE.HUNGER = Organism.HUNGER_STATES.FULL;
            }
        }
        //todo check for predators

        //todo check for age parameters 
        
    }


    //FOR ORIENTING CONTROLS
    decideAction (calorieConversion=13) {
        console.log(`Organism ${this.id} is deciding an action`);
        
        //check surroundings for objects 
        let objects = this.detectSurroundings(this.environment);
        this.evaluateState(calorieConversion);
        //configure state for decision making 
        console.log(this.STATE);


        if (this.STATE.HUNGER == Organism.HUNGER_STATES.HUNGRY || Organism.HUNGER_STATES.STARVING) {
            console.log(`Organism ${this.id} is ${this.STATE.HUNGER}`);

            //check if there is a food source nearby
            let foodSources = [];
            objects.forEach((object) => {
                if (object.type == FoodSource) {
                    foodSources.push(object);
                }
            });

            //if there is a food source nearby, move to it
            if (foodSources.length > 0) {
                console.log(`Organism ${this.id} found a food source`);
                //find nearest food source
                let nearestFoodSource = foodSources[0];
                for (let i = 0; i < foodSources.length; i++) {
                    if (this.distanceToObject(foodSources[i]) < this.distanceToObject(nearestFoodSource)) {
                        nearestFoodSource = foodSources[i];
                    }
                }
                
                this.moveToObject(nearestFoodSource);
                if (this.distanceToObject(nearestFoodSource) < 1) this.feed(nearestFoodSource); //if we are close enough, feed
                
            } else {
                //if there is no food source nearby, wander
                console.log(`Organism ${this.id} decided to wander`);
                this.wander();
                //this.moveToObject(this.environment.objects.foodSources[0]);
            }
        }
        


        //metabolize energy
        this.metabolize(calorieConversion);
    }



}


export default Herbivore;


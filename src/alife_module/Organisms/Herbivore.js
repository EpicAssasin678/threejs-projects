import AnimalStates, {STATES} from "./AnimalStates.js";
import Organism from "./Organism.js";
import Environment from "../Environment/Environment.js";

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
        super(bodyMass, currentEnergy, size, currentCords, environment);
        this.speed = speed;
        this.vision = vision;
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
        foodSource.deplete(this.consumptionRate);
    }

    wander () {
        let x = Math.floor(Math.random() * this.width);
        let y = Math.floor(Math.random() * this.height);
        this.cordX = x;
        this.cordY = y;

        console.log(`Organism ${this.id} is wandering to ${x}, ${y}`);
    }

    moveTo (xMod, yMod) {
        this.cordX += xMod;
        this.cordY += yMod;
    }

    /**
     * Detects objects in the vision range of the organism.
     * @param {Array} environment - reference of the Environment object
     * @returns {Array} of objects in vision range
     * 
     * 
     */
    detectSurroundings (environment) {
        let objects = [];
        //radial sweep for vision
        for (let i = 0; i < this.vision; i++) {
            for (let j = 0; j < this.vision; j++) {
                //check if object is in range
                if (Math.sqrt(Math.pow(i, 2) + Math.pow(j, 2)) < this.vision) {
                    //todo implement check for size 
                    //let sweep = [ environment.objectMap[this.cordX + i, this.cordY + j], environment.objectMap[this.cordX + i, this.cordY - j], environment.objectMap[this.cordX - i, this.cordY + j], environment.objectMap[this.cordX - i, this.cordY - j]];
                    let sweep = [];
                    
                    if (environment.objectMap.get([this.cordX + i, this.cordY + j]) ) sweep.push(environment.objectMap.get([this.cordX + i, this.cordY + j]) );
                    if (environment.objectMap.get([this.cordX + i, this.cordY - j]) ) sweep.push(environment.objectMap.get([this.cordX + i, this.cordY - j]) );
                    if (environment.objectMap.get([this.cordX - i, this.cordY + j]) ) sweep.push(environment.objectMap.get([this.cordX - i, this.cordY + j]) );
                    if (environment.objectMap.get([this.cordX - i, this.cordY - j]) ) sweep.push(environment.objectMap.get([this.cordX - i, this.cordY - j]) );
                    
                    //adds all swept entries to known objects without duplicates 
                    sweep.forEach((entry) => {

                        //check to see if we have already added this object to the array
                        entry.objects.forEach((object) => {
                            if (!objects.includes(object.id)) objects.push(object.id);
                        });

                    });
                    //adds all information to an array of objects 
                    
                }
            }
        }
        console.log(objects);
        return objects;
    }


    //FOR ORIENTING CONTROLS
    decideAction (calorieConversion) {
        //check surroundings for objects 
        let objects = this.detectSurroundings(this.environment);

        let bodyMassMod = calorieConversion || 13;
        if (this.currentEnergy < (bodyMass *  bodyMassMod)) {
            
        }
    }



}


export default Herbivore;


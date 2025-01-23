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
     * 
     * We remove also the prey key within the organism's memory
     * 
     * ! Make speed at least greater than 4
     */

    constructor (bodyMass, consumptionRate, speed, vision, currentEnergy, size, currentCords, environment, traits=undefined) {
        super(bodyMass, currentEnergy, size, speed, currentCords, environment);
        
        this.vision = vision;
        this.consumptionRate = consumptionRate;
        this.currentEnergy = currentEnergy;

        //identification properties 

        //!BELOW IS JUST TO KEEP SIMULATION RUNNING, NOT RECOMMENDED FOR ACTUAL DIVERSITY 
        this.TRAITS = {
            HERDING: Organism.TRAIT_OPTIONS.HERDING,
            VISION: traits?.VISION || Organism.TRAIT_OPTIONS.VISION.RADIAL,

            VISION_RANGE: traits?.VISION_RANGE || Organism.TRAIT_OPTIONS.VISION_RANGE,

            METABOLISM: {
                RATE: traits?.METABOLISM.RATE || Organism.TRAIT_OPTIONS.METABOLISM.RATE,
                FAT_ENERGY_DENSITY: traits?.METABOLISM.FAT_ENERGY_DENSITY || Organism.TRAIT_OPTIONS.METABOLISM.FAT_ENERGY_DENSITY,
            },

            //STOMACH_SIZE: traits?.STOMACH_SIZE || Organism.METABOLISM.STOMACH_SIZE,
            


        }
        

        this.STAGES = {

        }

        this.FLAGS = {
            DEAD: bodyMass * 0.50,
            
        }

        this.memory.remove('prey');
        


        console.log(this.FLAGS);
    }

    configureDefaultTraits () {

    }

    initializeState (...stateArgs) {

    }



    initializeStages () {

    }

    /**
     * Feeding for herbivores depletes foodSource by consumptionRate of the organism.
     * 
     * todo add belly modification for larger consumption of calories per feeding
     * 
     * @param {FoodSource} foodSource 
     */
    feed (foodSource) {
        console.log(`Organism ${this.id} is feeding`);
        foodSource.deplete(this.consumptionRate);
        this.currentEnergy += this.consumptionRate * this.size;
        console.log(`${this.consumptionRate * this.size }`)
    }

    checkIfTravelled (x,y) {
        
        return this.memory.traveledPositions.indexOf(`${x},${y}`);
    }

    
    wander () {

        // get a random x between the x coord and the moveable distance

        // make it random wether it goes forward or backward
        let xChange =  ( (Math.floor(Math.random() * 100) % this.speed) );
        let yChange = ( (Math.floor(Math.random() * 100) % this.speed) );

        if (Math.random() > 0.5 ) xChange*= -1;
        if (Math.random() > 0.5 ) yChange*= -1;

        
        console.log(xChange, yChange);
        console.log(this.memory);        
        //const desiredcords = [this.x + xChange, this.y + yChange];
        const [x, y] = [this.x + xChange, this.y + yChange];

        if (!this.memory.traveledPositions.includes(`${x},${y}`)) {
            //check if we are over memory

            console.log(`Organism ${this.id} is wandering to ${x}, ${y}`);
            this.move(x, y);

        } else {
            console.log(`Organism ${this.id} has already traveled to ${x}, ${y}`);
            this.wander();
        }

    }

    wander3() {
        // get a random x between the x coord and the moveable distance

        // make it random wether it goes forward or backward
        let x =  ( (Math.floor(Math.random() * 100) % this.speed) );
        let y = ( (Math.floor(Math.random() * 100) % this.speed) );

        if (Math.random() > 0.5 ) x*= -1;
        if (Math.random() > 0.5 ) y*= -1;

        
        console.log(x, y);
        
        let traveled = this.checkIfTravelled(x, y);
        if (traveled < 1) {
            
            //check if we are over memory
            if (this.memory.traveledPositions.length > 500) {
                this.memory.traveledPositions.shift();
            }
            this.memory.traveledPositions.push([this.x + x, y]);
            this.move(this.x + x, this.y + y);

        } else {
            console.log(`Organism ${this.id} has already traveled to ${x}, ${y}`);
            this.wander();
        }

        console.log(`Organism ${this.id} is wandering to ${x}, ${y}`);
    }


    /**
     * With memory, without sporatic
     * Wanders diagonally, but only in random positive slope.
     */
    wander2 () {
        // get a random x between the x coord and the moveable distance

        // make it random wether it goes forward or backward
        let x =  this.x + ( (Math.floor(Math.random() * 100) % this.speed) );
        let y = this.y + ( (Math.floor(Math.random() * 100) % this.speed) );
        
        console.log(x, y);
        
        let traveled = this.checkIfTravelled(x, y);
        if (traveled < 1) {
            
            //check if we are over memory
            if (this.memory.traveledPositions.length > 500) {
                this.memory.traveledPositions.shift();
            }
            this.memory.traveledPositions.push([x, y]);
            this.move(x, y);

        } else {
            console.log(`Organism ${this.id} has already traveled to ${x}, ${y}`);
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
        console.log(`Organism ${this.id} is moving ${movementLength} units to ${x}, ${y}`);
        //check if coords are diagonal to our current position
        this.moveTo(x, y);
        this.remainingMovement -= movementLength;
    }

    moveToObject (object) {
        
        let xDistance = object.x - this.x;
        let yDistance = object.y - this.y;
        //console.log(`Organism ${this.id} is moving in changes: ${xDistance}, ${yDistance} to object ${object.id} at ${object.x}, ${object.y}`);
        console.log(
        `Organism ${this.id} is moving to object: ${object.id}\n`,
        `Current position: (${this.x}, ${this.y})  Object position: (${object.x}, ${object.y})\n`,
        `Remaining movement: ${this.remainingMovement}\n`,
        `Distance: ${xDistance}, ${yDistance}\n`,
        `Modulo error check: ${xDistance / this.remainingMovement}\n`,
        `Coords sent to move: ${(xDistance % this.remainingMovement)+ this.x}, ${(yDistance % this.remainingMovement) + this.y} }`
        );

        //check if distance is equally divisible by remaining movement
        //if it is, we can move the whole distance
        const xChange = ((xDistance / this.remainingMovement) % 1 === 0) ? this.remainingMovement + this.x : (xDistance % this.remainingMovement) + this.x;
        const yChange = ((yDistance / this.remainingMovement) % 1 === 0) ? this.remainingMovement + this.y : (yDistance % this.remainingMovement) + this.y;

        this.move( xChange, yChange );
    }

    /**
     * Metabolizes the organism's energy based on its body mass.
     * 
     * If the organism has no energy in fat reserves, it begins to starve.
     * 
     * @param {Number} metabolismMod multiplicative modifier for metabolism
     */
    metabolize (metabolismMod = 13) {
        console.log(`Organism ${this.id} is metabolizing.`)
            
        //BME equation from Harris-Benedict revised by Cole equation 
        //see https://www.calculator.net/bmr-calculator.html
        const BME = 6.0767 * this.bodyMass + 12.18945 * this.size - 5.677 * this.age + 88.362
        this.currentEnergy -= this.bodyMass * metabolismMod;

        console.log(`Metabolized ${this.bodyMass * metabolismMod}cal Has ${this.currentEnergy}cal energy left.`);

        //check if we are starving
        if (this.currentEnergy < 0) {

            let starvedWeight = this.starve(metabolismMod);
            console.log(`Organism ${this.id} metabolized ${starvedWeight} lbs of fat. Current body mass is ${this.bodyMass} lbs.`)
        
        } else {
            
        }

        
    }

    // Returns the amount of energy the organism has in fat reserves per one unit of body mass
    starve (metabolismMod = 13 , fatEnergyDensity = 3500) {

        //todo implement starvation
        let unitWeightLoss = 0;
        while (this.currentEnergy < 0) {

            if ( this.bodyMass <= this.FLAGS.DEAD || this.bodyMass <= 0 ) {
                this.die();
                console.log(`Organism ${this.id} has died of starvation.`);
                break;
            }

            unitWeightLoss = Math.abs((1 / fatEnergyDensity) * this.currentEnergy);
            this.currentEnergy += unitWeightLoss * fatEnergyDensity;
            this.bodyMass -= unitWeightLoss;
        }
        
        return unitWeightLoss;

    }
    
    die () {
        this.STATE.ALIVE = false;
    }

    reproduce (mate) {
        const TRAITS = this.configureOffspringGenetics(mate, this.environment, {
            entropy: this.environment?.entropy || 1,
            MUTATION_RATE: this.environment?.mutationRate || this.TRAITS.MUTATION_RATE || 0.1,
        });

        //create parameters for new organism
        const bodyMass = Math.floor((Math.random() * 100 ) % (this.bodyMass + mate.bodyMass) / 2) ;
        const speed = (Math.random() > 0.5) ? this.speed : mate.speed;
        const vision = (Math.random() > 0.5) ? this.vision : mate.vision;
        
        const longerLife = (this.age > mate.age) ? this: mate;
        const consumptionRate = (Math.random() > 0.5) ? longerLife.consumptionRate + (this.consumptionRate + mate.consumptionRate / 2) * Math.random() :
            longerLife.consumptionRate - (this.consumptionRate + mate.consumptionRate / 2) * Math.random();
        
        const size = (Math.random() > 0.5) ? this.size : mate.size;
        
        
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
        for (let i = 1; i < this.vision; i++) {
            for (let j = 1; j < this.vision; j++) {
                //check if object is in range
                if (Math.sqrt(Math.pow(i, 2) + Math.pow(j, 2)) < this.vision) {
                    //todo implement check for size 
                    //let sweep = [ environment.objectMap[this.cordX + i, this.cordY + j], environment.objectMap[this.cordX + i, this.cordY - j], environment.objectMap[this.cordX - i, this.cordY + j], environment.objectMap[this.cordX - i, this.cordY - j]];
                    let sweep = [];
                    
                    /**
                     * Current method for sweeping leads to a bug where the organism will flutter around all four of these coordinates.
                     * Essentially this issue creates three 'phantom' organisms moving the same as the real
                     * 
                     */
                    if (environment.objectMap.get(`${this.x + i},${this.y + i}`) ) sweep.push(environment.objectMap.get(`${this.x + i},${this.y + i}`) );
                    if (environment.objectMap.get(`${this.x + i},${this.y - j}`) ) sweep.push(environment.objectMap.get(`${this.x + i},${this.y - j}`) );
                    if (environment.objectMap.get(`${this.x - i},${this.y + j}`) ) sweep.push(environment.objectMap.get(`${this.x - i},${this.y + j}`) );
                    if (environment.objectMap.get(`${this.x - i},${this.y - j}`) ) sweep.push(environment.objectMap.get(`${this.x - i},${this.y - j}`) );
                    
                    if (sweep.length > 0) console.log(`Swept ${sweep}`);

                    //adds all swept entries to known objects without duplicates 
                    sweep.forEach((entry) => {
                        entry.objects.forEach( id => {
                          objects.includes(id) ? null : objects.push(id);  
                        })
                    });
                    
                }
            }
        }

        console.log(objects);
        return objects;

    }

    /**
     * Evaluates the organisms environment and alters the state of the organism accordingly.
     * 
     * Body mass mod for now is only a constant, but will be a trait in the future. Used for cal conversion.
     * TODO once traits implemented, remove bodyMassMod and instead use the instance field bodyMass
     */
    evaluateState () {
        //check if hungry or starving
        console.log(`Organism ${this.id} is evaluating state`);

        //checkHunger
        if (this.currentEnergy < (this.bodyMass *  this.TRAITS.METABOLISM.RATE)) {
            this.STATE.HUNGER = ( this.currentEnergy < 0 ) ? Organism.HUNGER_STATES.STARVING : Organism.HUNGER_STATES.HUNGRY;
        } else if (this.currentEnergy > (this.bodyMass * this.TRAITS.METABOLISM.RATE)) {
            this.STATE.HUNGER = Organism.HUNGER_STATES.FULL;
        }
        //todo check for predators

        //todo check for age parameters 
        
    }


    /**
     * Configures the STATE.ACTION field for the turn 
     * 
     * 
     * @param {Number} calorieConversion 
     */
    decideAction () {
        console.log(`Organism ${this.id} is deciding an action`);
        
        
        //check surroundings for objects 
        let objects = this.detectSurroundings(this.environment);
        this.evaluateState();

        //configure state for decision making 
        console.log(this.STATE);

        //feed weights max == .50
        const feedWeight = this.sumWeights([
            this.weightCondition(this.STATE.HUNGER === 'HUNGRY', 0.15),
            this.weightCondition(this.STATE.HUNGER === 'STARVING', 0.25),
            this.weightCondition(this.STATE.HUNGER === 'FULL', 0),

        ]);

        const evadeWeight = this.sumWeights([

            this.weightCondition(this.memory.predators.length > 0, 0, 0, () => {
                return this.evaluateThreatLevel(this.memory.predators);
            }),

        ]);

        const reproduceWeight = this.sumWeights([
            this.weightCondition(feedWeight === 0, 0.25), 
            this.weightCondition(this.memory.mates.length > 0, 0.15, 0), //if there are mates, formula for each
            this.weightCondition(findNearestMate() > 0, .15,0),
            this.weightCondition(this.memory.intent.length > 0 && this.memory.intent[0] === 'REPRODUCTING', 0.25),
        ]);

        const wanderWeight = this.sumWeights([
            this.weightCondition(feedWeight === 0 && evadeWeight === 0 && reproduceWeight === 0, 1, 0),
        ]);

        //compare weights, sort array, return 0
        this.STATE.ACTION = [
            [feedWeight, Organism.ACTION_STATES.FORAGING],
            [evadeWeight, Organism.ACTION_STATES.EVADING],
            [reproduceWeight, Organism.ACTION_STATES.REPRODUCING],
            [wanderWeight, Organism.ACTION_STATES.WANDERING],
        ].sort( (a, b) => a - b)[0];


    }



    executeAction () {
        console.log(`Organism ${this.id} is deciding an action`);

        let calorieConversion = 0.1; //!TEMPORARY, ONLY TO KEEP SIM RUNNING FOR DBG 

        //check surroundings for objects 
        let objects = this.detectSurroundings(this.environment);
        this.evaluateState(calorieConversion);

        //configure state for decision making 
        console.log(this.STATE);


        if (this.STATE.HUNGER === Organism.HUNGER_STATES.HUNGRY || Organism.HUNGER_STATES.STARVING) {
            console.log(`Organism ${this.id} is ${this.STATE.HUNGER}`);

            //check if there is a food source nearby
            let foodSources = [];

            objects.forEach((object) => {
                if (this.environment.objects.foodSources.get(object)) {
                    console.log(`Organism ${this.id} found a food source`);
                    foodSources.push(this.environment.objects.foodSources.get(object));
                } 

                if (this.environment.objects.organisms.get(object)) {
                    
                }

            });

            //if there is a food source nearby and we haven't found another, move to it
            if (foodSources.length > 0 ) {
                //find nearest food source

                let nearestFoodSource = foodSources[0];
                if (this.memory.foodSource[0] == null) {

                    for (let i = 0; i < foodSources.length; i++) {
                        if (this.distanceToObject(foodSources[i]) < this.distanceToObject(nearestFoodSource)) {
    
                            nearestFoodSource = foodSources[i];
                            
                        }
                    }
                    this.memory.foodSource.push(nearestFoodSource);

                } else {
                    nearestFoodSource = this.memory.foodSource[0];
                }
                
                
                this.moveToObject(nearestFoodSource);

                if (this.distanceToObject(nearestFoodSource) < 1) {

                    console.log(`Organism ${this.id} is close enough to feed`);
                    this.feed(nearestFoodSource); //if we are close enough, feed
                    this.memory.foodSource.pop();

                }

            } else {
                //if there is no food source nearby, wander
                console.log(`Organism ${this.id} decided to wander`);
                this.wander();
                //this.moveToObject(this.environment.objects.foodSources[0]);
            }
        } else {
            //if not hungry, wander
            console.log(`Organism ${this.id} decided to wander`);
            this.wander();
        }
        


        //metabolize energy
        this.metabolize(this.TRAITS.METABOLISM.RATE);

        console.log(`Organism ${this.id} coords are ${this.x}, ${this.y}`);

    }



}


export default Herbivore;



/**
 * Organism class describes the basic properties of any intelligent object on the map.
 * Every organism will have to feed and reproduce to survive and inherit those methods from this class.
 * 
 * All organisms exhibit the following properties:
 * - body mass
 * - current energy
 * - size
 * - current coordinates
 * 
 * Also provides static enums for the organism's basic type, hunger state, movement state, and action state. Enums
 * are held in object literals.
 * 
 * Genes are held within each organism and are fundamental to the organism's constitution. 
 * Traits are means of speciation as well as genes, but aren't as specific.
 * 
 * @param {number} bodyMass - the mass of the organism in grams
 * @param {number} currentEnergy - the current energy of the organism in calories/energy units
 * 
 */
class Organism {


    static TRAIT_OPTIONS = {
        HERDING: false,
        
        VISION: {
            RADIAL: 'RADIAL',
            CONE: 'CONE',
            RECTANGULAR: 'RECTANGULAR'
        },

        VISION_RANGE: 4,
        
        METABOLISM: {
            RATE: 13, 
            FAT_ENERGY_DENSITY: 3500, //per one unit of fat  
        },
        STOMACH_SIZE: 10,
        BODYMASS: 100,
        
        REPRODUCTION_RATE: 1, 

        SPEED: 10,

        INTELLIGENCE: 5,

        LIFESPAN: 100,

        MUTATION_RATE: 0.1,
    }

    static MOVEMENT_STATES = {
        IDLE: 'IDLE',
        NORMAL: 'NORMAL',
        RUNNING: 'RUNNING'
    } ;  
    
    static ACTION_STATES = {
        EATING: 'EATING',
        FORAGING: 'FORAGING',
        WANDERING: 'WANDERING', 
        SLEEPING: 'SLEEPING',
        EVADING: 'EVADING',
        REPRODUCING: 'REPRODUCING',
        NONE: 'NONE'
    };

    static HUNGER_STATES = {
        STARVING:'STARVING', 
        HUNGRY:'HUNGRY',
        SATIATED:'SATIATED', 
        FULL:'FULL',
        OVERFED:'OVERFED'
    };

    static THREAT_STATES = {
        SAFE: 'SAFE',
        THREATENED: 'THREATENED'
    };

    static AGE_STATE = {
        JUVENILE: 'JUVENILE',
        ADULT: 'ADULT',
        OLD: 'OLD'
    }

    static STATES = {
        HUNGER_STATES: Organism.HUNGER_STATES,
        MOVEMENT_STATES: Organism.MOVEMENT_STATES,
        AGE_STATE : Organism.AGE_STATE,
        THREAT_STATES: Organism.THREAT_STATES,
        ACTION_STATES: Organism.ACTION_STATES
    };

    /**
     * Organism constructor
     * 
     * @param {Number} bodyMass amount of mass in respective units that the organism has
     * @param {Number} currentEnergy amount of energy in respective units that the organism currently has
     * @param {Number} size amount of units that the organism occupies in the environment
     * @param {[Number, Number]} currentCords the current coordinates of the organism in the environment
     * @param {Environment} environment reference to the environment object
     */
    constructor(bodyMass, currentEnergy, size, speed, currentCords, environment) {
        this.bodyMass = bodyMass;
        this.currentEnergy = currentEnergy;
        this.size = size;
        this.speed = speed;
        this.environment = environment;
        [this.x, this.y] = currentCords;

        this.remainingMovement = 0 + speed;

        this.id = this.generateOID(environment.objects.organisms);

        this.age = 1;

        //initial state map
        this.STATE = {
            ALIVE: true, 
            HUNGER: Organism.HUNGER_STATES.SATIATED,
            MOVEMENT: Organism.MOVEMENT_STATES.IDLE,
            AGE: Organism.AGE_STATE.JUVENILE,
            THREAT: Organism.THREAT_STATES.SAFE,
            ACTION: Organism.ACTION_STATES.WANDERING
        }

        
        this.memory = {
            traveledPositions: [],
            foodSource: new Array(1),
            foodSources: [],
            predators: [],
            prey: [],
            mates: [],
            intent: [], //intent is of form (ACTION, [x,y])

            history: {
                actions: [],
                previousMates: [],
            },

            previousPerformance: {
                lifeSpan: 0,
            },

            //create iterable method called 
            [Symbol.iterator]: function* () {
                yield* Object.values(this);
            },
            //add function to create new keys
            add: function (key, value) {
                this[key] = value;
            },
            //add function to remove keys
            remove: function (key) {
                delete this[key];
            }

            
            
        }


    }

    generateOID (ids) {
        const oid = Math.floor((Math.random() * 1000000000) * Math.random() ) ;
        return ( ids.get(oid) && ids.size > 0  ) ?   this.generateOID(ids) : oid;
    }

    
    /**
     * Moves the organism by the specified amount in the x and y directions.
     * 
     * @param {Number} xMod movement in the x direction to finish at 
     * @param {Number} yMod movement in the y direction to finish at
     */
    moveTo (xMod, yMod) {
        const [oldX, oldY] = [this.x, this.y];
        
        this.x = Math.abs(xMod % this.environment.width);
        this.y = Math.abs(yMod % this.environment.height);

        //update memory
        if (this.memory.traveledPositions.length > 500) {
            this.memory.traveledPositions.shift();
        }
        this.memory.traveledPositions.push(`${this.x},${this.y}`);

        //update the environment's map
        this.environment.updateObjectCoordinates(this, [oldX, oldY], [this.x, this.y]);
    }


    refillMovement (modifier=0) {
        this.remainingMovement = modifier + this.speed;
    }

    /**
     * Evaluates weights for simplifying the decision making process of an organism.
     * 
     * @param {Boolean} condition boolean condition to evaluate weight by
     * @param {Number} weight weight to return if condition is true
     * @param {Number} falseWeight weight to return if condition is false
     * @param {Function} formula function to apply to weight if condition is true
     * @returns weighted value
     * 
     * Note: To make the function more flexible, just don't use the callback parameters.
     */
    weightCondition (condition, weight, falseWeight=0, formula=undefined) {
        if (formula)  {
            return (condition) ? formula(condition, weight, falseWeight) : falseWeight;
        } else {
            return (condition) ? weight : falseWeight; 
        }
    }

    sumWeights (weights) {
        return weights.reduce((a, b) => a + b, 0);
    }

    evaluateThreatLevel (threats) {
        return threats.reduce( (acc, predator) => {
            return predator.speed / this.distanceToObject(predator) + acc;
        });
    }

    findPheremones () {

    }

    findNearestMate () {

    }

    distanceToObject (object) {
        return Math.sqrt(Math.pow(object.x - this.x, 2) + Math.pow(object.y - this.y, 2));
    }


    /**
     *
     * @param {Organism} mate the other organism to reproduce with
     * @param {Environ} environment the environment of the organism
     * @param {Map} config a map of config values: ENTROPY, MUTATION_RATE
     *
     *  Creates a new offspring with a combination of the following genetics. 
     * 
     */
    configureOffspringGenetics (mate, environment, config) {

        //create a new organism 
        let crossover = Math.random() * config.MUTATION_RATE; //for determining when parents change


        let GROUP_TRAITS = {
            HERDING: (this.crossover > 0.5 && this.crossover ),   
            
        }

         crossover = Math.random() * config.MUTATION_RATE;

        let PHYSICAL_TRAITS = {
            VISION: (this.age >= mate.age) ? this.TRAITS.VISION : mate.TRAITS.VISION,

            METABOLISM : {
                RATE: (this.age >= mate.age) ? this.consumptionRate * this.size : mate.consumptionRate * mate.size,  
                FAT_ENERGY_DENSITY: (this.age >= mate.age) ? this.TRAITS.METABOLISM.FAT_ENERGY_DENSITY : mate.TRAITS.METABOLISM.FAT_ENERGY_DENSITY,
            } ,

            REPRODUCTION_RATE: (this.age >= mate.age) ? this.TRAITS.REPRODUCTION_RATE : mate.TRAITS.REPRODUCTION_RATE,

            INTELLIGENCE:   (traits.INTELLIGENCE > 0.5) ? this.TRAITS.INTELLIGENCE : mate.TRAITS.INTELLIGENCE,
            
            MUTATION_RATE: (this.age >= mate.age) ? this.TRAITS.MUTATION_RATE : mate.TRAITS.MUTATION_RATE,
        }

        return {
            ...GROUP_TRAITS,
            ...PHYSICAL_TRAITS,
        }
    }

}



export default Organism;
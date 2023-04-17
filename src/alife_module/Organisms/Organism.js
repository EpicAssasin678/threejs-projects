
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
 * @param {number} bodyMass - the mass of the organism in grams
 * @param {number} currentEnergy - the current energy of the organism in calories/energy units
 * 
 */
class Organism {

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
        REPRODUCTING: 'REPRODUCTING',
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
            traveledPositions: []
        }
    }

    generateOID (ids) {
        const oid = Math.floor((Math.random() * 1000000000) * Math.random() ) ;
        return ( ids.get(oid) && ids.size > 0  ) ?   this.generateOID(ids) : oid;
    }

    
    /**
     * Moves the organism by the specified amount in the x and y directions.
     * 
     * 
     * @param {Number} xMod movement in the x direction to finish at 
     * @param {Number} yMod movement in the y direction to finish at
     */
    moveTo (xMod, yMod) {
        //check if the organism has any movement left 
        
        this.x = Math.abs(xMod % this.environment.width);
        this.y = Math.abs(yMod % this.environment.height);
    }
    
}



export default Organism;
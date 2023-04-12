
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
 * Also provides static enums for the organism's basic type, hunger state, movement state, and action state.
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
    }   
    
    static ACTION_STATES = {
        EATING: 'EATING',
        WANDERING: 'WANDERING', 
        SLEEPING: 'SLEEPING',
        REPRODUCTING: 'REPRODUCTING',
        NONE: 'NONE'
    }

    static HUNGER_STATES = {
        STARVING:'STARVING', 
        HUNGRY:'HUNGRY',
        SATIATED:'SATIATED', 
        FULL:'FULL',
        OVERFED:'OVERFED'
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
    constructor(bodyMass, currentEnergy, size, currentCords, environment) {
        this.bodyMass = bodyMass;
        this.currentEnergy = currentEnergy;
        this.size = size;
        this.environment = environment;
        [this.cordX, this.cordY] = currentCords;

        this.id = this.generateOID(environment.organisms);

        this.STATE = {
            ALIVE: true, 
            HUNGER: Organism.HUNGER_STATES.SATIATED,
            MOVEMENT: Organism.MOVEMENT_STATES.IDLE,
            ACTION: Organism.ACTION_STATES.WANDERING
        }
    }

    generateOID (ids) {
        const oid = Math.floor((Math.random() * 1000000000) * Math.random() ) ;
        return (ids.get(oid)  ) ? this.generateOID(ids) : oid;
    }

    
}



export default Organism;
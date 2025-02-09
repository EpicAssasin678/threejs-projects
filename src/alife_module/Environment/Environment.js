import { EventDispatcher } from "three";
import Organism from "../Organisms/Organism";
import FoodSource from "./FoodSource.js";

class Environment extends EventDispatcher {
    
    static reference;
     
    /**
     * @param {number} width
     * @param {number} height
     * 
     * Creates a new Environment with a width and height and a map of tiles with whatever needed 
     * Only supports rectangular shaped environments
     * 
     * ObjectMap: object with the following pair stricutre: string(x,y) : object
     * 
     */
    constructor (width=1920, height=1080, carryingCapacity=10000, dayCycle=24) {

        super();

        this.width = width;
        this.height = height;
        this.carryingCapacity = carryingCapacity;
        this.dayCycle = dayCycle;

        //create two dimensional array of tiles
        this.map = new Array(height);
        for (let i = 0; i < height; i++) {
            this.map[i] = new Array(width);
        }

        //create an empy mapping of objects within the environment
        this.objectMap = new Map();
        this.objects = {
            organisms: new Map(), 
            foodSources: new Map(),
        };
        
        Environment.reference = this; //!trick to get a reference to the environment object, might change later

        console.log(`[ENVIRONMENT] Environment created with map ${this.objects}.`)
    }

    setDayCycle (hours) {
        this.dayCycle = hours;
        
    }

    setObjectMap (objectMap) {
        this.objectMap = objectMap;
    }

    /**
     * Objects should be added in the form of [cordX, cordY] : object
     * @param {Organism} object - the object to be added to the map
     * 
     */
    addToEnvironment (...objects) {
        //see if any objects are already at the location
        objects.forEach(object => {

            try{

                if (this.objectMap.has(`${object.x},${object.y}`)) {
                    //add the object to the object map
                    this.objectMap?.get(`${object.x},${object.y}`)?.objects.push(object.id);
                    (object instanceof Organism) ? this.objects.organisms.set(object.id, object) : this.objects.foodSources.set(object.id, object);
                    //add the object to the other tiles of the array that the 
                } else {
                    this.objectMap.set(`${object.x},${object.y}`, { objects : [object.id] });
                    (object instanceof Organism) ? this.objects.organisms.set(object.id, object) : this.objects.foodSources.set(object.id, object);
                }
                console.log(`[ENVIRONMENT] Object map updated. Added ${typeof object} at ${object.x}, ${object.y}.`);
                return true;


            } catch (e) {
                console.log(`[ENVIRONMENT] Error adding object to environment. ${e}`);
                return false;
            }
        });
    }


    /**
     * Initializes food sources and adds them to the environment map.
     * 
     * @param {Map} foodSourceMap a map of food sources which are objects and their locations respectively 
     *  
     * Note: carryingCapacity determines the maximum amount of energy that can be stored in the environment 
     */
    initializeFoodSources (foodSourceMap) {
        console.log(`[ENVIRONMENT] Initializing food sources...`);
        console.log(foodSourceMap);
        let energyAdded = 0;

        foodSourceMap.forEach( (value, key) => {
            //console.log(value, key);
            if (energyAdded < this.carryingCapacity) {
                energyAdded += value.currentEnergy;
                this.addToEnvironment(value);
            }
        });
        
    }

    //random food source generator
    generateRandomFoodSources () {
        console.log(`[ENVIRONMENT] Generating random food sources...`);
        
        let energyAdded = 0;
        while (energyAdded < this.carryingCapacity) {
            
            let x = Math.floor(Math.random() * this.width) % this.width;
            let y = Math.floor(Math.random() * this.height) % this.height;

            let energyAmount = Math.floor(Math.random() * 100);
            energyAdded += energyAmount;

            if (energyAdded > this.carryingCapacity) break;

            //add to env
            const coords = [Math.floor(Math.random() * 1000) % this.width, Math.floor(Math.random() * 1000) % this.height];
            let foodSource = new FoodSource(energyAmount, energyAmount, 1 / Math.ceil(Math.random() * 100), [x,y]);
            this.addToEnvironment(foodSource);
                
            
            //this.map[x][y] = foodSource; <-- we aren't going to assign anything in this map to an object, possibly do a soil simulation eventually
        }
    }


    /**
     * Getter for objects at coords
     * @param {Number} x position of the object
     * @param {Number} y position
     * @returns reference from the object Map
     */
    getObjectAtCords (x, y) {
        return this.objectMap.get(`${x},${y}`);
    }

    getOrganisms () {
        return this.objects.organisms;
    }

    getFoodSources () {
        return this.objects.foodSources;
    }

    //create day cycle clock 
    completeDayCycle () {

    }
    //create carrying capacity monitor 

    //create food and source monitoring 

    removeOrganism (organism) {

        console.log(`[ENVIRONMENT] Removing organism at ${organism.x}, ${organism.y}`);

        this.objects.organisms.delete(organism.id);
        
        let object = this.objectMap.get(`${organism.x},${organism.y}`);
        if (object.objects.length > 1) { 
            //remove the organism from the object map
            object.objects = object.objects.filter( (id) => id !== organism.id);
        } else {
            this.objectMap.delete(`${organism.x},${organism.y}`);
        }
        
    }

    removeFoodSource (foodSource) {

        console.log(`[ENVIRONMENT] Removing food source at ${foodSource.x}, ${foodSource.y}`);

        this.objects.foodSources.delete(foodSource.id);

        //check if any other object is at the same coordinates
        let object = this.objectMap.get(`${foodSource.x},${foodSource.y}`);
        if (object.objects.length > 1) {
            //remove the food source from the object map
            object.objects = object.objects.filter( (id) => id !== foodSource.id);
        } else {
            this.objectMap.delete(`${foodSource.x},${foodSource.y}`);
        }
        
    }

    removeObject (object) {

        if (object instanceof Organism) {
            this.removeOrganism(object);
        } else if (object instanceof FoodSource) {
            this.removeFoodSource(object);
        }

    }

    /**
     * Updates the object map with the new coordinates of the object
     * Note: Do this before updating the object's coordinates in other places
     * 
     * @param {Organism} organism - the object to be updated
     * @param {Array} oldCords - the old coordinates of the object
     * @param {Array} newCords - the new coordinates of the object
     * 
     */
    updateObjectCoordinates (organism, oldCords, newCords) {

        //remove the object from the old coordinates in the object map
        let object = this.objectMap.get(`${oldCords[0]},${oldCords[1]}`);

        //remove the object from the old coordinates
        object.objects = object.objects.filter( (id) => id !== organism.id);

        //if there are no more objects at the old coordinates, remove the key
        if (object.objects.length === 0)  this.objectMap.delete(`${oldCords[0]},${oldCords[1]}`);

        let res = this.objectMap.get(`${newCords[0]},${newCords[1]}`);
        (res) ? res.objects.push(organism.id) : this.objectMap.set(`${newCords[0]},${newCords[1]}`, { objects: [organism.id] });
        
    }


    
}

export default Environment;



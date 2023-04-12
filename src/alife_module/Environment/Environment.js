import Organism from "../Organisms/Organism";
import FoodSource from "./FoodSource.js";
class Environment {
    

    static reference;
     
    /**
     * @param {number} width
     * @param {number} height
     * 
     * Creates a new Environment with a width and height and a map of tiles with whatever needed 
     * Only supports rectangular shaped environments
     */
    constructor (width=1920, height=1080, carryingCapacity=10000, dayCycle=24) {
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
            foodSources: new Map()
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
    addToEnvironment (object) {
        //see if any objects are already at the location
        try{
            if (this.objectMap.has([object.x, object.y])) {
                const value = this.objectMap.get([object.x, object.y]);
                //add the object to the object map
                this.objectMap.set([object.x, object.y], {objects : [...value, object.id] });
                (object instanceof Organism) ? this.objects.organisms.push(object.id, object) : this.objects.foodSources.push(object.id, object);
                //add the object to the other tiles of the array that the 
            } else {
                this.objectMap.set([object.x, object.y], {objects : {[object.id] : object } });
                (object instanceof Organism) ? this.objects.organisms.set(object.id, object) : this.objects.foodSources.set(object.id, object);
            }
            console.log(`[ENVIRONMENT] Object map updated. Added ${object} at ${object.x}, ${object.y}.`)
            return true;
        } catch (e) {
            console.log(`[ENVIRONMENT] Error adding object to environment. ${e}`);
            return false;
        }
    }


    /**
     * Initializes food sources and adds them to the environment map.
     * 
     * 
     * 
     * @param {Map} foodSourceMap - a map of food sources which are objects and their locations respectively 
     *  
     * Note: carryingCapacity determines the maximum amount of energy that can be stored in the environment 
     */
    initializeFoodSources (foodSourceMap) {
        console.log(foodSourceMap);
        let energyAdded = 0;
        //check that the food sources don't exceed the carrying capacity of the environment
        while (energyAdded < this.carryingCapacity) {
            foodSourceMap.forEach(element => {
                //add food source to map
                let foodSource = new FoodSource(element.totalEnergy, element.currentEnergy, element.decayRate);
                foodSource.x = element.x;
                foodSource.y = element.y;
                
                //this.map[element.x][element.y] = foodSource; <-- we aren't going to assign anything in this map to an object, possibly do a soil simulation eventually
                energyAdded += foodSource.getTotalEnergy();
                console.log(foodSource);
                //add to map
                this.addToEnvironment(foodSource);
            });            
            for (const key in foodSourceMap) {
                console.log(key, foodSourceMap[key]);
                let foodSource = new FoodSource(foodSourceMap[key].totalEnergy, foodSourceMap[key].currentEnergy, foodSourceMap[key].decayRate);
                foodSource.setCoords(key[0], key[1]);
                if (energyAdded < this.carryingCapacity) {
                    energyAdded += foodSource.getTotalEnergy();
                    console.log(foodSource);
                    this.addToEnvironment(foodSource);
                }

            }
        }

        

        
        
    }

    //random food source generator
    initializeFoodSources () {
        let energyAdded = 0;
        while (energyAdded < this.carryingCapacity) {
            let x = Math.floor(Math.random() * this.width);
            let y = Math.floor(Math.random() * this.height);

            let energyAmount = Math.floor(Math.random() * 100);
            
            let foodSource = new FoodSource(100, Math.floor(Math.random), 0);
            foodSource.x = x;
            foodSource.y = y;

            //this.map[x][y] = foodSource; <-- we aren't going to assign anything in this map to an object, possibly do a soil simulation eventually
            energyAdded += foodSource.getTotalEnergy();
        }
    }

    //create day cycle clock 
    completeDayCycle () {

    }
    //create carrying capacity monitor 

    //create food and source monitoring 

    
}

export default Environment;
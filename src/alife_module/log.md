# Dev Log

## 4/17/23 

Optomizing and testing. 

So far, there were a LOT of issues with my recent code, one namely being that the method for storing objects in the environment's mapping with respect for coordinates was 
not functional, and as a result didn't work or serve a purpose. 

Within JS, object literal arrays, when passed as a parameter are, like everything in JS, passed by reference. Therefore when retrieving based on position,
the actual implementation faulters and doesn't work. 

Additionally, the wandering method had to change as it was nice, but didn't serve any legitimate purpose since the organism would wander in an ever increasing 
hypotenuse mode of travel. This could work in theory, but is highly inefficient and unlikely to find things in ever-changing environments. Additionally, a 
new method of travelling has been made for wandering which is far more random with memory to prevent backtracking. 

Currently wandering is moving to a random position within the bounds of remaining movement. Change is randomly x or y. Additionally, memory is an n long array full
of coords previously travelled and is checked before moving to a new coord to prevent a certain amount of backtracking.


Vision needs to be optomized, right now, the average vision of a creature is far 
too low and needs to be increased for environments.

> Update 
I fixed the entirety of my vision, detection, and simulation issues. Although right now this codebase has become quite spaghetti-ish. 

Outlining the general decision making processes for the organisms (disregarding special exceptions), I came up with the following <a src="https://lh3.googleusercontent.com/QIJEfu1ghjZWpAEAb8cudv8SzyZTAjmPsXdXeeqCkcDGfGpFm2CMynrJW5G2SqCQDT8FQjbYXH1qLI03I1eECU-WWfEm_joljeocXnWClwX-WXdBMjUFe79VuPCQzeKNcYXrYRFAJq9aBMlU-VYJ1YTPM2j8uG3hQS7WIrreuN12vHVhOtTVKkx3uD69luMiciUd9zDLPpogikNyll6wVZGoQS6qXjEqxdCMk1UFSemHERA8trCgnTxZsKSpSQcaqJw-43aX0okbJicpU-VpYggkbyW0rsbVkUn6sNN-zumS9-BPP67WRhaj5Uam_JoqZwbdlpEKQ_la3S04HYurMt69UAPDDmRs1DOnv6cTdugfeezSs-NLTmLWH9mNsPLGgIaq-LYhGnP_QD7xMkNKY372BWY45ezt1vuTsndHHJYLrP3lJFt0lUJtrV57x9kQ3exh_7uSQOFnXfOCg6UC0oh5euuB9gpQPs1lLSH5ufBCsnym7IRPu2xhd2vpghwmxov_ng8CZ9al4TJwLNgfXu9jeu44ji7xbmmTP_QLShcEwCDEaUzGq2_GIsZEQxB_1fDppO4HVRo7IK0-GtYAO-Bz9W6RurmHFX1VCMdMySJnnF4VgFiRIYA4Jox4y0RQ7vEJ2DGvsplUkfv8u5V_6dZneKqt0yoXnzP1e6tMu90LjEzS2dPs503aVGBuiJa9KV5MjaKluKfuiK2UJk46gDxhEF6HN9MoTojhAqlZI2LpXeFbr9p-f28p3ioDzoHyz_22gwuR3A86F0j6O8EHa6_2R9x91s2L2BPjxaxkhXHyZab5G_ar6ae69-9g64f2_R2eo-TMR-xGHkTNKYUi08gdUWQEWZyfNG3hgZtKOAYpxJFoZH8HGAigcE3OszJjiuR_osy51XUYOh-1cn1298yoEiAuN2u_-pr62sPoH_WoinA=w607-h111-s-no?authuser=0">map</a>:

<img src="https://lh3.googleusercontent.com/QIJEfu1ghjZWpAEAb8cudv8SzyZTAjmPsXdXeeqCkcDGfGpFm2CMynrJW5G2SqCQDT8FQjbYXH1qLI03I1eECU-WWfEm_joljeocXnWClwX-WXdBMjUFe79VuPCQzeKNcYXrYRFAJq9aBMlU-VYJ1YTPM2j8uG3hQS7WIrreuN12vHVhOtTVKkx3uD69luMiciUd9zDLPpogikNyll6wVZGoQS6qXjEqxdCMk1UFSemHERA8trCgnTxZsKSpSQcaqJw-43aX0okbJicpU-VpYggkbyW0rsbVkUn6sNN-zumS9-BPP67WRhaj5Uam_JoqZwbdlpEKQ_la3S04HYurMt69UAPDDmRs1DOnv6cTdugfeezSs-NLTmLWH9mNsPLGgIaq-LYhGnP_QD7xMkNKY372BWY45ezt1vuTsndHHJYLrP3lJFt0lUJtrV57x9kQ3exh_7uSQOFnXfOCg6UC0oh5euuB9gpQPs1lLSH5ufBCsnym7IRPu2xhd2vpghwmxov_ng8CZ9al4TJwLNgfXu9jeu44ji7xbmmTP_QLShcEwCDEaUzGq2_GIsZEQxB_1fDppO4HVRo7IK0-GtYAO-Bz9W6RurmHFX1VCMdMySJnnF4VgFiRIYA4Jox4y0RQ7vEJ2DGvsplUkfv8u5V_6dZneKqt0yoXnzP1e6tMu90LjEzS2dPs503aVGBuiJa9KV5MjaKluKfuiK2UJk46gDxhEF6HN9MoTojhAqlZI2LpXeFbr9p-f28p3ioDzoHyz_22gwuR3A86F0j6O8EHa6_2R9x91s2L2BPjxaxkhXHyZab5G_ar6ae69-9g64f2_R2eo-TMR-xGHkTNKYUi08gdUWQEWZyfNG3hgZtKOAYpxJFoZH8HGAigcE3OszJjiuR_osy51XUYOh-1cn1298yoEiAuN2u_-pr62sPoH_WoinA=w607-h111-s-no?authuser=0" />


In the future, organisms with a certain level of intelligence should be allowed to think in a weighted fashion. Certain factors should increase or decrease the weights of various decision paths. Take for example if the decisions a herbivore can make come down to the following: FEED, FORAGE, WANDER, IDLE, EVADE, REPRODUCE. Then we may have a map or object literal looking something like this:

``` 
const ACTION_WEIGHTS: {
    FEED: 0.15,
    FORAGE: 0.24,
    WANDER: 0.10,
    IDLE: 0.05,
    EVADE: 0.05, 
    REPRODUCE: 0.85,
}
```
Then therefore, the creature will commit an action based on priority. Equations that 
generate wieghts can therefore be as complex as necessary and are most likely the best way to simulate a high 'believability' within this simulation. 

This adds the following to do:

1. Generate equations for weights
2. Generate action decision process 
3. Create modifiers related to traits



## Genes 


While it's a prototype, this is what the new constructor should look like. Yeah a bit of an eyesore, mostly due to the fact that traits isn't generically just { }. But I do want to remove the expansion of the parameter defualt eventually. For now though, I have to work on fixing the gridlock bug. 

```
constructor (bodyMass, consumptionRate, speed, vision, currentEnergy, size, currentCords, environment, traits={
        HERDING: Organism.TRAIT_OPTIONS.HERDING,

            METABOLISM: {
                RATE: Organism.TRAIT_OPTIONS.METABOLISM.RATE,
                FAT_ENERGY_DENSITY: Organism.TRAIT_OPTIONS.METABOLISM.FAT_ENERGY_DENSITY,
            },
            STOMACH_SIZE: consumptionRate * size,

            REPRODUCTION_RATE: 1,

            LIFESPAN: Organism.TRAIT_OPTIONS.LIFESPAN,

            INTELLIGENCE: Organism.TRAIT_OPTIONS.INTELLIGENCE,

            MUTATION_RATE: Organism.TRAIT_OPTIONS.MUTATION_RATE,
    }) {
        super(bodyMass, currentEnergy, size, speed, currentCords, environment);
        
        this.vision = vision;
        this.consumptionRate = consumptionRate;
        this.currentEnergy = currentEnergy;

        //identification properties 

        this.TRAITS = {
           
            VISION: traits?.VISION || Organism.TRAIT_OPTIONS.VISION.RADIAL,
            HERDING: traits?.HERDING || Organism.TRAIT_OPTIONS.HERDING,

            METABOLISM: {
                RATE: traits?.METABOLISM.RATE || Organism.TRAIT_OPTIONS.METABOLISM.RATE,
                FAT_ENERGY_DENSITY: traits?.METABOLISM.FAT_ENERGY_DENSITY || Organism.TRAIT_OPTIONS.METABOLISM.FAT_ENERGY_DENSITY,
            },
            STOMACH_SIZE: this.consumptionRate * this.size,

            REPRODUCTION_RATE: traits?.REPRODUCTION_RATE || 1,

            LIFESPAN: traits?.LIFESPAN || Organism.TRAIT_OPTIONS.LIFESPAN,

            INTELLIGENCE: traits?.INTELLIGENCE || Organism.TRAIT_OPTIONS.INTELLIGENCE,

            MUTATION_RATE: traits?.MUTATION_RATE || Organism.TRAIT_OPTIONS.MUTATION_RATE,
            
        }
```

## 4/20 Hehe (No but seriously)

### Improving the decision process with intents.

What will be an intent? An intent will be defined as the desired location or objective that an organism previously had. An intent could be *complicated*, but I'm not going to create a bloated system without any reasoning. The two options are as such: 

1) Create intents with two forms, one being the `intent` param within the organism's `memory` and the other being the `intent` with *overloads* from the `action` parameter also within `memory`.
2) Intents are just `intent` and are an object or coordinate within a stack of size **1**. 

Before I figure out how to do intents, let me model my option after the *real* decision making process and not the bloated decision making process I had before. 


Additionally, with the `memory` and decision making process I outline earlier, I think I could improve by encapsulating the functionality within an object called `Brain`. But that could lead to over-extending of teh object via differences in `Brain`'s function between `Herbivore` and `Carnivore`—not to mention other distinctions. I think I'll just normalize all the function aliases within the `Organism` subclasses. 

Methods should be (in orer) :

`detectSurroundings` -> `configureMemory` -> `configureState` -> `executeAction` -> (optional) `resolveTriggers`

We'll see though. 
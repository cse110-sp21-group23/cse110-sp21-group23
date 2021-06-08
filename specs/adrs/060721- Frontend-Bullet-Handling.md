# Frontend Bullet Handling 

## Context and Problem Statement

Our initial implementation of bullets and their creation was separated into two components: the "entry" and "entry-creator" components. This implementation only considered usage in the "Daily" page but now that we're reusing components in the "Weekly" page, we've found that this implementation has made modularizing a headache because the container the entries are placed in are quite literally built into the "entry-creator". Should we separate the entry container and entry creator? 

## Considered options
### Separate the entry container and entry creator 

* Good, because our components are far more modularized and we could simply place multiple "entry-creators" and "containers" on the weekly page. 
* Bad because we are on a limited time table and if any hiccups come up during the coding, we may not have time to debug. 

### Create a new "weekly-entry-creator" and simply tweak the existing functions to work on the weekly page. 

* Good, because there is a lot less work to do in relation to the previous option and we know that the code will work. 
* Bad because the "weekly-entry-creator" and "entry-creator" components are very similar and should probably be one component. (code bloat). 
* Bade because practically speaking, it makes sense to have a component for holding entries. So the code base becomes more convoluted and harder to understand.

## Decision Outcome 
Chosen option: "Create a new weekly-entry-creator" because,   
* With the current amount of time and limited man power we have right now, it seems unrealistic to implement an entirely new "container" component. 
* To make sure we ship a working app. 

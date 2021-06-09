/**
 * Function which will set default values for previousState and state
 */
function Store() {
    this.previousState = {}
    this.state = {
        route: { path: null },
        kendal: { counter: 0 }
    }
};

let subscribers = []

/**
 * Function which will add a subscriber (fn) to the list 
 * @param  {Object} fn
 */
Store.prototype.subscribe = function (fn) {
    subscribers.push(fn)
}

/**
 * Function which will remove a subscriber (fn) from the list
 * @param  {Object} fn
 */
Store.prototype.unsubscribe = function (fn) {
    subscribers.splice(subscribers.indexOf(fn), 1);
}

/**
 * Function which will return the current state
 * @returns The current state
 */
Store.prototype.getState = function () {
    return this.state
}

/**
 * Function which changes the previous and current state, and alerts the current subscribers of the change
 * @param  {Object} action
 */
Store.prototype.dispatch = function (action) {
    this.previousState = { ...this.state }
    this.state = {
        route: changeRoute(this.state.route, action),
        kendal: kendalCount(this.state.kendal, action)
    }
    subscribers.forEach(subscriber => subscriber(this.previousState, this.state))
}
/**
 * Function which will return a new route depending on the value of action.type
 * @param  {Object} route
 * @param  {Object} action
 * @returns A new route depending on the value of action.type
 */
function changeRoute(route, action) {
    switch (action.type) {
        case 'CHANGE_ROUTE':
            let newRoute = action.route
            return newRoute
        default:
            return route || { path: null }

    }
}

/**
 * Function which will increment the kendal.counter if action.type == 'INCREASE_KENDAL' and return a newState otherwise it just returns kendal
 * @param  {Object} kendal
 * @param  {Object} action
 * @returns newState if action.type == 'INCREASE_KENDAL' otherwise kendal
 */
function kendalCount(kendal, action) {
    switch (action.type) {
        case 'INCREASE_KENDAL':
            let newState = { counter: kendal.counter + 1 }
            return newState
        default:
            return kendal

    }
}

export const store = new Store()
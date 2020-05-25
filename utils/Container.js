const Container = class {
    constructor() {
        if(!Container.instance){
            this._cache = [];
            this.registrations = [];
            Container.instance = this;
        }
        return Container.instance;
    }
    register(name, deps, func) {
        this.registrations[name] = { deps, func }
    }
    get(name) {
        const registration = this.registrations[name];
        const deps = [];

        if (registration === undefined) { return undefined; }

        registration.deps.forEach(depName => {
            deps.push(this.get(depName))
        });

        return registration.func.apply(undefined, deps);
    }
}
module.exports = Container;

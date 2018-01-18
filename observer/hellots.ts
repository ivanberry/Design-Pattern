interface Observer {
    id: string;
    update(): void;
}

class ConcreteObserver {
    public id: string;
    constructor(id: string) {
        this.id = id;
    }
    update(): void {
        console.log(`${this.id} updates something...`);
    }
}

function findObserver(observer: Observer[], id: string) {
    let index = 0;
    const existed = observer.some((observer, idx) => {
        index = idx;
        return observer.id === id;
    });
    return {
        existed,
        index
    };
}

class Subject {
    private _observers: Observer[];
    constructor() {
        this._observers = [];
    }

    register(ob: Observer) {
        const id: string = ob.id;
        if (findObserver(this._observers, id)) {
            console.log(`observer ${id} had been observed the Subject`);
        }
        this._observers.push(ob);
        console.log(`observer ${id} is push to the list`);
    }

    remove(id: string) {
        const { existed, index } = findObserver(this._observers, id);
        if (existed) {
            this._observers.splice(index, 1);
            console.log(`observer ${id} pull out of the list`);
        } else {
            console.log(`observer ${id} did not in the list`);
        }
    }

    notify() {
        console.log(`Subject notify all observers`);
        this._observers.map(ob => {
            ob.update();
        });
    }
}

(function main() {
    const subject = new Subject();

    const obA = new ConcreteObserver("A");
    const obB = new ConcreteObserver("B");
    const obC = new ConcreteObserver("C");

    subject.register(obA);
    subject.register(obB);
    subject.register(obB);
    subject.register(obC);

    subject.notify();

})();

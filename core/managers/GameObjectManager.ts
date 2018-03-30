import IHashMap from '../../common/dataStructures/IHashMap';
import IGameObject from '../objects/interface/IGameObject';

export default class GameObjectManager {

    GameObjects: IHashMap<IGameObject>;
    GameObjectClasses: IHashMap<Array<IGameObject>>;

    constructor() {
        this.GameObjects = {};
        this.GameObjectClasses = {};
    }

    add(id: string, gameObject: IGameObject): void {
        if (id[0] === '.') {
            if (!this.GameObjectClasses[id]) {
                this.GameObjectClasses[id] = [gameObject];
            } else {
                this.GameObjectClasses[id].push(gameObject);
            }
        } else {
            if (this.GameObjects[id]) {
                throw new Error('Unique game object already exists');
            } else {
                this.GameObjects[id] = gameObject;
            }
        }
    }

    get(id: string): IGameObject | Array<IGameObject> {
        if (id[0] === '.') {
            if (!this.GameObjectClasses[id]) {
                throw new Error('Game object class does not exist');
            } else {
                return this.GameObjectClasses[id];
            }
        } else {
            if (!this.GameObjects[id]) {
                throw new Error('Game object does not exist');
            } else {
                return this.GameObjects[id];
            }
        }
    }

    unpackGameObjects(): Array<IGameObject> {
        let gameObjects: Array<IGameObject> = [];

        for (let index in this.GameObjects) {
            if (this.GameObjects[index] !== null) {
                gameObjects.push(this.GameObjects[index]);
            }
        }

        for (let index in this.GameObjectClasses) {
            if (this.GameObjectClasses[index] !== null) {
                for (let i = 0; i < this.GameObjectClasses[index].length; i++) {
                    gameObjects.push(this.GameObjectClasses[index][i]);
                }
            }
        }

        return gameObjects;
    }
}
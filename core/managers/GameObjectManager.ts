import IHashMap from '../../common/dataStructures/IHashMap';
import IGameObject from '../objects/interface/IGameObject';
// import Logger from '../../common/utils/Logger';

export default class GameObjectManager {

    GameObjects: IHashMap<IGameObject>;
    GameObjectClasses: IHashMap<Array<IGameObject>>;
    MovingObjects: Array<IGameObject>;
    AllObjects: Array<IGameObject>;

    constructor() {
        this.GameObjects = {};
        this.GameObjectClasses = {};
        this.MovingObjects = [];
        this.AllObjects = [];

        window.setInterval(() => { this.detectMovingObjects(); }, 100);
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
        this.AllObjects = gameObjects;
        return gameObjects;
    }

    detectMovingObjects(): void {
        this.MovingObjects = [];
        
        for (let i = 0; i < this.AllObjects.length; i++) {
            if (this.AllObjects[i].VelX !== 0 || this.AllObjects[i].VelY !== 0 || this.AllObjects[i].VelY !== 0) {
                this.MovingObjects.push(this.AllObjects[i]);
            }
        }

        this.MovingObjects = this.AllObjects;
    }

    update(): void {
        let gameObjects = this.MovingObjects;

        for (let i = 0; i < this.AllObjects.length; i++) {
            this.AllObjects[i].update();
        }

        for (let i = 0; i < gameObjects.length; i++) {
            gameObjects[i].detectCollisions(this.AllObjects);
        }

        for (let i = 0; i < gameObjects.length; i++) {
            gameObjects[i].move(
                gameObjects[i].VelX,
                gameObjects[i].VelY,
                gameObjects[i].VelZ
            );
        }  
    }
}
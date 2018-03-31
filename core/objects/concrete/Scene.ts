import GameObjectManager from './../../managers/GameObjectManager';
import * as Three from 'three';
import IGameObject from '../interface/IGameObject';
import IScene from '../interface/IScene';

export default class Scene implements IScene {
    
    GameObjectManager: GameObjectManager;
    WebGLScene: Three.Scene;

    constructor(showAxis: boolean = false) {
        this.GameObjectManager = new GameObjectManager();
        this.WebGLScene = new Three.Scene();
        if (showAxis) {
            this.WebGLScene.add(new Three.AxisHelper(20));
        }
    }

    add(id: string, gameObject: IGameObject): void {
        this.GameObjectManager.add(id, gameObject);
    }

    get(id: string): IGameObject | Array<IGameObject> {
        return this.GameObjectManager.get(id);
    }

    compile(): void {
        let gameObjects = this.GameObjectManager.unpackGameObjects();
        for (let i = 0; i < gameObjects.length; i++) {
            if (gameObjects[i].canRender()) {
                this.WebGLScene.add(gameObjects[i].getRenderObject());
            }
        }
    }

    update(): void {
        this.GameObjectManager.update();
    }
}
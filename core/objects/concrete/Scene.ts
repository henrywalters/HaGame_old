import GameObjectManager from './../../managers/GameObjectManager';
import * as Three from 'three';
import IGameObject from '../interface/IGameObject';
import IScene from '../interface/IScene';

export default class Scene implements IScene {
    
    GameObjectManager: GameObjectManager;
    WebGLScene: Three.Scene;

    constructor() {
        this.GameObjectManager = new GameObjectManager();
        this.WebGLScene = new Three.Scene();
    }

    add(id: string, gameObject: IGameObject): void {
        this.GameObjectManager.add(id, gameObject);
    }

    get(id: string): IGameObject | Array<IGameObject> {
        return this.GameObjectManager.get(id);
    }
}
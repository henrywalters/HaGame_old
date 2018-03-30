import IGameObject from './IGameObject';
import * as Three from 'three';

export default interface IScene {

    WebGLScene: Three.Scene;

    add(id: string, gameObject: IGameObject): void;
    get(id: string): IGameObject | Array<IGameObject>;
    compile(): void;
}
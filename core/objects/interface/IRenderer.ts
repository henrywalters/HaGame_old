import * as Three from 'three';
import IScene from './IScene';
import ICamera from './ICamera';
export default interface IRenderer {
    Height: number;
    Width: number;
    Container: HTMLElement;
    WebGLRenderer: Three.Renderer;
    render(scene: IScene, camera: ICamera): void;
}
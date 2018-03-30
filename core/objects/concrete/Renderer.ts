import IRenderer from '../interface/IRenderer';
import * as Three from 'three';
import ICamera from '../interface/ICamera';
import IScene from '../interface/IScene';
// import Logger from '../../../common/utils/Logger';

export default class Renderer implements IRenderer {
    Width: number;
    Height: number;
    Container: HTMLDivElement;
    WebGLRenderer: Three.WebGLRenderer;

    constructor(containerId: string, width: number, height: number) {
        this.WebGLRenderer = new Three.WebGLRenderer();
        this.WebGLRenderer.setSize(width, height);
        this.Width = width;
        this.Height = height;
        
        let container = document.createElement('div');
        container.id = containerId;
        container.style.height = height.toString() + 'px';
        container.style.width = width.toString() + 'px';
        
        this.Container = container;

        document.body.appendChild(this.Container);

        if (this.Container === null) {
            throw new Error('Container not defined');
        } else {
            this.Container.appendChild(this.WebGLRenderer.domElement);
            this.WebGLRenderer.setClearColor(0xEEEEEE, 1);
        }
    }

    render(scene: IScene, camera: ICamera): void {
        // Logger.log('scene', scene.WebGLScene.children.length.toString());
        this.WebGLRenderer.render(scene.WebGLScene, camera.WebGLCamera);
    }
}
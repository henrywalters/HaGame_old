import ICamera from '../interface/ICamera';
import * as Three from 'three';

export default class PerspectiveCamera implements ICamera {
    WebGLCamera: Three.Camera;
    X: number;
    Y: number;
    Z: number;

    constructor(fieldOfView: number, aspect: number, zMin: number, zMax: number) {
        this.WebGLCamera = new Three.PerspectiveCamera(fieldOfView, aspect, zMin, zMax);
    }

    position(x: number, y: number, z: number): void {
        this.X = x;
        this.Y = y;
        this.Z = z;

        this.updateCamera();
    }

    private updateCamera(): void {
        this.WebGLCamera.position.x = this.X;
        this.WebGLCamera.position.y = this.Y;
        this.WebGLCamera.position.z = this.Z;
    }
}
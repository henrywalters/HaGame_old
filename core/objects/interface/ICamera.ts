import * as Three from 'three';

export default interface ICamera {
    WebGLCamera: Three.Camera;

    X: number;
    Y: number;
    Z: number;

    position(x: number, y: number, z: number): void;
}
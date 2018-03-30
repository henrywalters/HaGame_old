import IGeometry from './../../interface/IGeometry';
import * as Three from 'three';

export default class Cube implements IGeometry {
    Cube: Three.BoxGeometry;

    constructor(width: number, height: number, depth: number) {
        this.Cube = new Three.BoxGeometry(width, height, depth);
    }

    getGeometry(): Three.BoxGeometry {
        return this.Cube;
    }
}
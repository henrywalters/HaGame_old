import IMaterial from '../../interface/IMaterial';
import * as Three from 'three';

export default class LambertMaterial implements IMaterial {

    Material: Three.MeshLambertMaterial;

    constructor(parameters: object) {
        this.Material = new Three.MeshLambertMaterial(parameters);
    }

    getMaterial(): Three.MeshLambertMaterial {
        return this.Material;
    }
}
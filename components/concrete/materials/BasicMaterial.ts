import IMaterial from '../../interface/IMaterial';
import * as Three from 'three';

export default class BasicMaterial implements IMaterial {

    Material: Three.MeshBasicMaterial;

    constructor(parameters: object) {
        this.Material = new Three.MeshBasicMaterial(parameters);
    }

    getMaterial(): Three.MeshBasicMaterial {
        return this.Material;
    }
}
import * as Three from 'three';

export default interface IMaterial {
    getMaterial(): Three.MeshBasicMaterial;
}
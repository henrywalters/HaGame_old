import IMaterial from './IMaterial';
import * as Three from 'three';
import IGeometry from './IGeometry';

export default interface IMesh {
    getObject(geometry: IGeometry, material: IMaterial): Three.Object3D;
}
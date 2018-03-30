import IMesh from '../../interface/IMesh';
import IGeometry from '../../interface/IGeometry';
import IMaterial from '../../interface/IMaterial';
import * as Three from 'three';

export default class BasicMesh implements IMesh {

    getObject(geometry: IGeometry, material: IMaterial): Three.Object3D {
        return new Three.Mesh(geometry.getGeometry(), material.getMaterial());
    }
}
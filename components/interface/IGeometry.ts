import * as Three from 'three';

export default interface IGeometry {
    getGeometry(): Three.BoxGeometry;
}
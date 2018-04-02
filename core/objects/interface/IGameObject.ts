import { CollisionType, ComponentType, IDirection } from '../concrete/GameObject';
import IHashMap from './../../../common/dataStructures/IHashMap';
import IGeometry from '../../../components/interface/IGeometry';
import IMesh from '../../../components/interface/IMesh';
import IScript from '../../../components/interface/IScript';
import IMaterial from '../../../components/interface/IMaterial';
import * as Three from 'three';
import IPhysics from '../../../components/interface/IPhysics';

export default interface IGameObject {

    BoundBox: Three.Box3;
    BoundSphere: Three.Sphere;
    CollisionType: CollisionType;
    CollisionDetectionActive: boolean;
    CollidingDirection: IDirection;

    CanCollide: boolean;

    Geometry: IGeometry | null;
    Mesh: IMesh | null;
    Material: IMaterial | null;
    Scripts: Array<IScript>;
    Physics: Array<IPhysics>;

    Parent: IGameObject | null;
    Children: IHashMap<IGameObject>;

    RenderObject: Three.Mesh | null;
    
    Width: number;
    Depth: number;
    Height: number;

    X: number;
    Y: number;
    Z: number;

    VelX: number;
    VelY: number;
    VelZ: number;

    ScaleX: number;
    ScaleY: number;
    ScaleZ: number;

    Pitch: number;
    Roll: number;
    Yaw: number;

    addChild(id: string, gameObject: IGameObject): void;
    addComponent(type: ComponentType, component: IGeometry | IMesh | IScript): void;

    canRender(): boolean;
    getRenderObject(): Three.Mesh;

    move(xVel: number, yVel: number, zVel: number): void;
    position(x: number, y: number, z: number): void;
    rotate(roll: number, pitch: number, yaw: number): void;
    scale(x: number, y: number, z: number): void;

    update(): void;
    detectCollisions(gameObjects: Array<IGameObject>): void;

    ComputeNextBoundBox(): Three.Box3;

}
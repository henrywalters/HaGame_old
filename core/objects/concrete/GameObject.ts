import { IDirection } from './GameObject';
import IPhysics from '../../../components/interface/IPhysics';
import IGameObject from '../interface/IGameObject';
import IGeometry from '../../../components/interface/IGeometry';
import IMesh from '../../../components/interface/IMesh';
import IScript from '../../../components/interface/IScript';
import IHashMap from '../../../common/dataStructures/IHashMap';
import IMaterial from '../../../components/interface/IMaterial';
import * as Three from 'three';
import CollisionDetector from '../../../common/algorithms/CollisionDetector';

export enum ComponentType {
    'Geometry',
    'Mesh',
    'Script',
    'Material',
    'Physics'
}

export function isGeometry(component: IGeometry | IMesh | IScript | IMaterial | IPhysics): component is IGeometry {
    return <IGeometry> component !== undefined;
}

export function isMesh(component: IGeometry | IMesh | IScript | IMaterial | IPhysics): component is IMesh {
    return <IMesh> component !== undefined;
}

export function isScript(component: IGeometry | IMesh | IScript | IMaterial | IPhysics): component is IScript {
    return <IScript> component !== undefined;
}

export function isMaterial(component: IGeometry | IMesh | IScript | IMaterial | IPhysics): component is IMaterial {
    return <IMaterial> component !== undefined;
}

export function isPhysics(component: IGeometry | IMesh | IScript | IMaterial | IPhysics): component is IPhysics {
    return <IPhysics> component !== undefined;
}

export function componentType(component: IGeometry | IMesh | IScript | IMaterial | IPhysics): ComponentType {
    if (isGeometry(component)) {
        return ComponentType.Geometry;
    } else if (isMesh(component)) {
        return ComponentType.Mesh;
    } else if (isScript(component)) {
        return ComponentType.Script;
    } else if (isMaterial(component)) {
        return ComponentType.Material;
    } else if (isPhysics(component)) {
        return ComponentType.Physics;
    } else {
        throw new Error('component type could not be determined');
    }
}

export enum CollisionType {
    'Box',
    'Sphere'
}

export interface IDirection {
    front: boolean;
    back: boolean;
    left: boolean;
    right: boolean;
    up: boolean;
    down: boolean;
}

export default class GameObject implements IGameObject {

    BoundBox: Three.Box3;
    BoundSphere: Three.Sphere;
    CollisionType: CollisionType;
    CollisionDetectionActive: boolean;
    CanCollide: boolean;
    CollidingDirection: IDirection;
    
    Geometry: IGeometry | null;
    Mesh: IMesh | null;
    Scripts: Array<IScript>;
    Material: IMaterial | null;
    Physics: Array<IPhysics>;

    RenderObject: Three.Mesh | null;

    Parent: IGameObject | null;
    Children: IHashMap<IGameObject>;

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

    constructor() {
        this.BoundBox = new Three.Box3(new Three.Vector3(), new Three.Vector3());
        this.BoundSphere = new Three.Sphere();
        this.CollisionDetectionActive = false;
        this.CollisionType = CollisionType.Box;
        this.CanCollide = false;
        this.CollidingDirection = {
            up: false,
            down: false,
            front: false,
            back: false,
            left: false,
            right: false
        };

        this.Geometry = null;
        this.Mesh = null;
        this.Material = null;
        this.Scripts = [];
        this.Physics = [];
        this.Parent = null;
        this.RenderObject = null;
        this.Children = {};

        this.X = 1;
        this.Y = 1;
        this.Z = 1;

        this.ScaleX = 1;
        this.ScaleY = 1;
        this.ScaleZ = 1;

        this.Roll = 0;
        this.Pitch = 0;
        this.Yaw = 0;
        
        this.Height = 0;
        this.Width = 0;
        this.Depth = 0;

        this.VelX = 0;
        this.VelY = 0;
        this.VelZ = 0;
    }

    addChild(id: string, gameObject: IGameObject): void {
        if (id[0] === '.') {
            throw new Error('Game object children must be unique');
        } else {
            if (this.Children[id]) {
                throw new Error('Game object child already exists');
            } else {
                this.Children[id] = gameObject;
            }
        }
    }

    addComponent(type: ComponentType, component: IGeometry | IMesh | IScript | IMaterial | IPhysics): void {
        if (type === ComponentType.Geometry) {
            this.Geometry = <IGeometry> component;
            let geo = this.Geometry.getGeometry();
            this.Width = geo.scale[0];
            this.Height = geo.scale[1];
            this.Depth = geo.scale[2];
        } else if (type === ComponentType.Mesh) {
            this.Mesh = <IMesh> component;
        } else if (type === ComponentType.Script) {
            this.Scripts.push(<IScript> component);
        } else if (type === ComponentType.Material) {
            this.Material = <IMaterial> component;
        } else if (type === ComponentType.Physics) {
            this.Physics.push(<IPhysics> component);
            this.Physics[this.Physics.length - 1].setBody(this);
        }

        // If its possible, create the render object automatically
        if (this.RenderObject === null) {
            if (this.Material !== null && this.Geometry !== null) {
                let material = this.Material.getMaterial();
                let geometry = this.Geometry.getGeometry();
                this.RenderObject = new Three.Mesh(geometry, material);
                this.computeBoundBox();
                this.CanCollide = true;
            }
        }
    }

    update(): void {
        for (let i = 0; i < this.Physics.length; i++) {
            this.Physics[i].applyPhysics();

            this.move(this.VelX, this.VelY, this.VelZ);
        }
    }

    detectCollisions(gameObjects: Array<IGameObject>): void {
        if (this.CollisionDetectionActive) {
            this.CollidingDirection = CollisionDetector.detect(this, gameObjects);
        }
    }

    canRender(): boolean {
        if (this.RenderObject !== null) {
            return true;
        } else {
            return false;
        }
    }

    getRenderObject(): Three.Mesh {
        if (this.RenderObject === null) {
            throw new Error('Can not get render object, check canRender');
        } else {
            return this.RenderObject;
        }
    }

    computeBoundBox(): void {
        if (this.RenderObject !== null) {
            this.BoundBox.setFromObject(this.RenderObject);
        }
    }

    computeBoundSphere(): void {
        if (this.RenderObject !== null) {
            this.BoundSphere = new Three.Sphere(
                this.RenderObject.position, 
                this.RenderObject.geometry.boundingSphere.radius
            );
        }
    }

    move(xVel: number, yVel: number, zVel: number): void {
        this.X += xVel;
        this.Y += yVel;
        this.Z += zVel;

        this.updateGameObject();
    }

    position(x: number, y: number, z: number): void {
        this.X = x;
        this.Y = y;
        this.Z = z;

        this.updateGameObject();
    }

    scale(x: number, y: number, z: number): void {
        this.ScaleX = x;
        this.ScaleY = y;
        this.ScaleZ = z;
        this.Width *= this.ScaleX;
        this.Height *= this.ScaleY;
        this.Depth *= this.ScaleZ;

        this.updateGameObject();
    }

    rotate(roll: number, pitch: number, yaw: number): void {
        this.Roll = roll;
        this.Pitch = pitch;
        this.Yaw = yaw;

        this.updateGameObject();
    }

    private updateGameObject(): void {
        if (this.RenderObject !== null) {
            this.RenderObject.position.set(this.X, this.Y, this.Z);
            this.RenderObject.scale.set(this.ScaleX, this.ScaleY, this.ScaleZ);
            this.RenderObject.rotation.set(this.Roll, this.Pitch, this.Yaw);
            /*this.RenderObject.scale.x = this.ScaleX;
            this.RenderObject.scale.y = this.ScaleY;
            this.RenderObject.scale.z = this.ScaleZ;

            this.RenderObject.rotation.x = this.Roll;
            this.RenderObject.rotation.y = this.Pitch;
            this.RenderObject.rotation.z = this.Yaw;
            */
        }
    } 
}
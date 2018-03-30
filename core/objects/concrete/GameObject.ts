import IGameObject from '../interface/IGameObject';
import IGeometry from '../../../components/interface/IGeometry';
import IMesh from '../../../components/interface/IMesh';
import IScript from '../../../components/interface/IScript';
import IHashMap from '../../../common/dataStructures/IHashMap';
import IMaterial from '../../../components/interface/IMaterial';
import * as Three from 'three';
import Logger from '../../../common/utils/Logger';

export enum ComponentType {
    'Geometry',
    'Mesh',
    'Script',
    'Material'
}

export function isGeometry(component: IGeometry | IMesh | IScript | IMaterial): component is IGeometry {
    return <IGeometry> component !== undefined;
}

export function isMesh(component: IGeometry | IMesh | IScript | IMaterial): component is IMesh {
    return <IMesh> component !== undefined;
}

export function isScript(component: IGeometry | IMesh | IScript | IMaterial): component is IScript {
    return <IScript> component !== undefined;
}

export function isMaterial(component: IGeometry | IMesh | IScript | IMaterial): component is IMaterial {
    return <IMaterial> component !== undefined;
}

export function componentType(component: IGeometry | IMesh | IScript | IMaterial): ComponentType {
    if (isGeometry(component)) {
        return ComponentType.Geometry;
    } else if (isMesh(component)) {
        return ComponentType.Mesh;
    } else if (isScript(component)) {
        return ComponentType.Script;
    } else if (isMaterial(component)) {
        return ComponentType.Material;
    } else {
        throw new Error('component type could not be determined');
    }
}

export default class GameObject implements IGameObject {

    Geometry: IGeometry | null;
    Mesh: IMesh | null;
    Scripts: Array<IScript>;
    Material: IMaterial | null;

    RenderObject: Three.Mesh | null;

    Parent: IGameObject | null;
    Children: IHashMap<IGameObject>;

    X: number;
    Y: number;
    Z: number;

    ScaleX: number;
    ScaleY: number;
    ScaleZ: number;

    Pitch: number;
    Roll: number;
    Yaw: number;

    constructor() {
        this.Geometry = null;
        this.Mesh = null;
        this.Material = null;
        this.Scripts = [];
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

    addComponent(type: ComponentType, component: IGeometry | IMesh | IScript | IMaterial): void {
        if (type === ComponentType.Geometry) {
            this.Geometry = <IGeometry> component;
        } else if (type === ComponentType.Mesh) {
            this.Mesh = <IMesh> component;
        } else if (type === ComponentType.Script) {
            this.Scripts.push(<IScript> component);
        } else if (type === ComponentType.Material) {
            this.Material = <IMaterial> component;
        }

        // If its possible, create the render object automatically
        if (this.RenderObject === null) {
            Logger.log('render object', 'null');
            if (this.Material !== null && this.Geometry !== null) {
                let material = this.Material.getMaterial();
                let geometry = this.Geometry.getGeometry();
                this.RenderObject = new Three.Mesh(geometry, material);
                // this.updateGameObject();
            }
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
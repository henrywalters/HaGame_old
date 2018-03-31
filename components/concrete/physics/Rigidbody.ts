import IPhysics from '../../interface/IPhysics';
import IGameObject from '../../../core/objects/interface/IGameObject';
import { CollisionType } from '../../../core/objects/concrete/GameObject';

export interface IRigidBodyDefinition {
    gravity?: number;
    mass?: number;
    // hasDrag?: boolean;
    // dragCoef?: number;
}

export default class Rigidbody implements IPhysics {
    
    GameObject: IGameObject | null;
    GameObjectSet: boolean;

    Gravity: number = .001;
    Mass: number = 1;
    HasDrag: boolean = true;
    DragCoef: number = 1;
    Density: number;

    Velocity = 0;
    Torque = 0;

    constructor(parameters?: IRigidBodyDefinition) {
        this.GameObject = null;
        this.GameObjectSet = false;
        if (parameters) {
            this.Gravity = (parameters.gravity === null) ? .01 : <number> parameters.gravity;
            this.Mass = (parameters.mass === null) ? 1 : <number> parameters.mass;
            // Worry about drag later

            // this.HasDrag = (parameters.hasDrag === null) ? true : <boolean> parameters.hasDrag;
            // this.DragCoef = (parameters.dragCoef === null) ? 1 : <number> parameters.dragCoef;
        }
    }

    applyPhysics(): void {
        this.Velocity += this.Gravity;
        let g = this.gameObject();
        g.move(0, -1 * this.Velocity, 0);
    }

    setBody(gameObject: IGameObject): void {
        if (!gameObject.canRender()) {
            throw new Error('Game object must be renderable to have a rigidbody');
        }
        this.GameObject = gameObject;
        this.GameObjectSet = true;
    }

    calcDrag(): number {
        let g = this.gameObject();
        let density = this.calcDensity();
        let area = g.Width * g.Depth;

        return this.DragCoef * area * ((density * Math.pow(this.Velocity, 2)) / 2); 
    }

    calcDensity(): number {
        if (this.GameObject === null) {
            throw Error('Game object must be defined');
        } else {
            return (this.Mass / this.calcVolume());
        }
    }

    calcVolume(): number {
        let g = this.gameObject();
        if (g.CollisionType === CollisionType.Box) {
            return g.Width * g.Height * g.Depth;
        } else if (g.CollisionType === CollisionType.Sphere) {
            return (4 * Math.PI * Math.pow(g.BoundSphere.radius, 3));
        } else {
            return 0;
        }
    }

    private gameObject(): IGameObject {
        if (this.GameObject === null) {
            throw new Error('Game object error not defined');
        } else {
            return this.GameObject;
        }
    }
}
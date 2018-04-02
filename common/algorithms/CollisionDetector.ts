import { IDirection } from '../../core/objects/concrete/GameObject';
import IGameObject from '../../core/objects/interface/IGameObject';
import * as Three from 'three';
// import Logger from '../utils/Logger';

// Box Vertex Notation
//    5____4
//  1/___0/|
//  | 6__|_7
//  2/___3/

//  __ 0 __ 
// |       |
// 3       1
// |       |
// |__ 2 __|

export enum CollisionDescription {
    'point',
    'edge',
    'plane',
    'subplane' // a sub set of the plane is colliding
}

export interface ICollision {
    description: CollisionDescription;
    direction: IDirection;
}

export default class CollisionDetector {

    static detect(gameObject: IGameObject, gameObjects: Array<IGameObject>): ICollision {
        let vertices = this.getVertices(gameObject);
        let collided = false;

        let details = {
            direction: {
                up: false,
                down: false,
                front: false,
                back: false,
                left: false,
                right: false
            },
            description: CollisionDescription.edge
        };

        gameObjects = this.getCollidingObjects(gameObject, gameObjects);

        for (let i = 0; i < gameObjects.length; i++) {
            let collisionPoints = 0;
            let directionCollisions = {
                up: 0,
                down: 0,
                front: 0,
                back: 0,
                left: 0,
                right: 0
            };
            for (let j = 0; j < vertices.length; j++) {
                if (gameObjects[i].CanCollide) {
                    if (
                        gameObjects[i].ComputeNextBoundBox().containsPoint(
                            new Three.Vector3(
                                vertices[j].x + gameObject.VelX,
                                vertices[j].y + gameObject.VelY,
                                vertices[j].z + gameObject.VelZ
                            )
                        ) 
                        && 
                        gameObjects[i].getRenderObject().id !== gameObject.getRenderObject().id
                    ) {
                        collided = true;
                        collisionPoints += 1;
                        if ([0, 1, 2, 3].indexOf(j) !== -1) {
                            directionCollisions.back += 1;
                        }
                        if ([4, 5, 6, 7].indexOf(j) !== -1) {
                            directionCollisions.front += 1;
                        }
                        if ([0, 3, 4, 7].indexOf(j) !== -1) {
                            directionCollisions.right += 1;
                        }
                        if ([1, 2, 5, 6].indexOf(j) !== -1) {
                            directionCollisions.left += 1;
                        }
                        if ([2, 3, 6, 7].indexOf(j) !== -1) {
                            directionCollisions.down += 1;
                        }
                        if ([0, 1, 4, 5].indexOf(j) !== -1) {
                            directionCollisions.up += 1;
                        }
                    }
                }
            }

            if (collisionPoints === 0) {
                details.description = CollisionDescription.subplane;
            } else if (collisionPoints === 1) {
                details.description = CollisionDescription.point;
            } else if (collisionPoints === 2) {
                details.description = CollisionDescription.edge;
            } else {
                details.description = CollisionDescription.plane;
            }

            if (directionCollisions.down >= details.description + 1) {
                gameObject.VelY = gameObject.VelY > 0 ? gameObject.VelY : 0;
            }
            if (directionCollisions.up >= details.description + 1) {
                gameObject.VelY = gameObject.VelY < 0 ? gameObject.VelY : 0;
            }
            if (directionCollisions.left >= details.description + 1) {
                gameObject.VelX = gameObject.VelX > 0 ? gameObject.VelX : 0;
            }
            if (directionCollisions.right >= details.description + 1) {
                gameObject.VelX = gameObject.VelX < 0 ? gameObject.VelX : 0;
            }
            if (directionCollisions.front >= details.description + 1) {
                gameObject.VelZ = gameObject.VelZ > 0 ? gameObject.VelZ : 0;
            }
            if (directionCollisions.back >= details.description + 1) {
                gameObject.VelZ = gameObject.VelZ < 0 ? gameObject.VelZ : 0;
            }

        }
        collided.valueOf();
        if (collided) {
            // Logger.log('collision', true);
        }

        return details;
    }

    static getCollidingObjects(gameObject: IGameObject, gameObjects: Array<IGameObject>): Array<IGameObject> {
        let objects: Array<IGameObject> = [];
        for (let i = 0; i < gameObjects.length; i++) {
            if (
                gameObjects[i].ComputeNextBoundBox().intersectsBox(gameObject.ComputeNextBoundBox())
                &&
                gameObject.getRenderObject().id !== gameObjects[i].getRenderObject().id
            ) {
                objects.push(gameObjects[i]);
            }
        }

        return objects;
    }

    static getVertices(gameObject: IGameObject): Array<Three.Vector3> {
        let vertices: Array<Three.Vector3> = [];
        var max = gameObject.ComputeNextBoundBox().max;
        var min = gameObject.ComputeNextBoundBox().min;
    
        vertices.push(new Three.Vector3(max.x, max.y, max.z));
        vertices.push(new Three.Vector3(min.x, max.y, max.z));
        vertices.push(new Three.Vector3(min.x, min.y, max.z));
        vertices.push(new Three.Vector3(max.x, min.y, max.z));
        vertices.push(new Three.Vector3(max.x, max.y, min.z));
        vertices.push(new Three.Vector3(min.x, max.y, min.z));
        vertices.push(new Three.Vector3(min.x, min.y, min.z));
        vertices.push(new Three.Vector3(max.x, min.y, min.z));
        return vertices;
    }
}

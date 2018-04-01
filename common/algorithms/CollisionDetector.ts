import { IDirection } from '../../core/objects/concrete/GameObject';
import IGameObject from '../../core/objects/interface/IGameObject';
import * as Three from 'three';
// import Logger from '../utils/Logger';

// Box Vertex
//    5____4
//  1/___0/|
//  | 6__|_7
//  2/___3/

export default class CollisionDetector {
    static detect(gameObject: IGameObject, gameObjects: Array<IGameObject>): IDirection {
        let vertices = this.getVertices(gameObject);
        let collided = false;

        let direction: IDirection = {
            up: false,
            down: false,
            front: false,
            back: false,
            left: false,
            right: false
        };

        gameObjects = this.getCollidingObjects(gameObject, gameObjects);

        for (let i = 0; i < gameObjects.length; i++) {
            for (let j = 0; j < vertices.length; j++) {
                if (gameObjects[i].CanCollide) {
                    if (
                        gameObjects[i].BoundBox.containsPoint(
                            new Three.Vector3(
                                vertices[j].x + gameObject.X + gameObject.VelX,
                                vertices[j].y + gameObject.Y + gameObject.VelY,
                                vertices[j].z + gameObject.Z + gameObject.VelZ
                            )
                        ) 
                        && 
                        gameObjects[i].getRenderObject().id !== gameObject.getRenderObject().id
                    ) {
                        collided = true;

                        if ([0, 1, 2, 3].indexOf(j) !== -1) {
                            direction.back = true;
                        }
                        if ([4, 5, 6, 7].indexOf(j) !== -1) {
                            direction.front = true;
                        }
                        if ([0, 3, 4, 7].indexOf(j) !== -1) {
                            direction.right = true;
                        }
                        if ([1, 2, 5, 6].indexOf(j) !== -1) {
                            direction.left = true;
                        }
                        if ([2, 3, 6, 7].indexOf(j) !== -1) {
                            direction.down = true;
                        }
                        if ([0, 1, 4, 5].indexOf(j) !== -1) {
                            direction.up = true;
                        }

                    }
                }
            }
        }
        collided.valueOf();

        return direction;
    }

    static getCollidingObjects(gameObject: IGameObject, gameObjects: Array<IGameObject>): Array<IGameObject> {
        let objects: Array<IGameObject> = [];
        for (let i = 0; i < gameObjects.length; i++) {
            if (gameObjects[i].BoundBox.intersectsBox(gameObject.BoundBox)) {
                objects.push(gameObjects[i]);
            }
        }

        return objects;
    }

    static getVertices(gameObject: IGameObject): Array<Three.Vector3> {
        let vertices: Array<Three.Vector3> = [];
        var max = gameObject.BoundBox.max;
        var min = gameObject.BoundBox.min;
    
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
import * as Three from 'three';
export default class Vector {
    x: number;
    y: number;
    z: number;

    constructor(x?: number, y?: number, z?: number) {
        if (x) {
            this.x = x;
        } else {
            this.x = 0;
        }
        if (y) {
            this.y = y;
        } else {
            this.y = 0;
        }
        if (z) {
            this.z = z;
        } else {
            this.z = 0;
        }
    }

    magnitude(): number {
        return Math.pow(Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2), .5);
    }

    normal(): Vector {
        let vector = new Vector();
        let mag = this.magnitude();
        vector.x = this.x / mag;
        vector.y = this.y / mag;
        vector.z = this.z / mag;
        return vector;
    }

    add(vector: Vector): Vector {
        let vec = new Vector(
            this.x + vector.x,
            this.y + vector.y,
            this.z + vector.z
        );
        return vec;
    }

    subtract(vector: Vector): Vector {
        return this.add(vector.multiply(-1));
    }

    dot(vector: Vector): Vector {
        return new Vector(
            this.x * vector.x,
            this.y * vector.y,
            this.z * vector.z
        );
    }

    multiply(scalar: number): Vector {
        return new Vector(
            this.x * scalar,
            this.y * scalar,
            this.z * scalar
        );
    }

    toThree(): Three.Vector3 {
        return new Three.Vector3(this.x, this.y, this.z);
    }

    toArray(): Array<number> {
        return [this.x, this.y, this.z];
    }

    toString(): string {
        return '[' + this.x + ', ' + this.y + ', ' + this.z + ']';
    }

}

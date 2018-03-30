import IGameObject from '../interface/IGameObject';
import IGeometry from '../../../components/interface/IGeometry';
import IMesh from '../../../components/interface/IMesh';
import IScript from '../../../components/interface/IScript';
import IHashMap from '../../../common/dataStructures/IHashMap';

export enum ComponentType {
    'Geometry',
    'Mesh',
    'Script'
}

export function isGeometry(component: IGeometry | IMesh | IScript): component is IGeometry {
    return <IGeometry> component !== undefined;
}

export function isMesh(component: IGeometry | IMesh | IScript): component is IMesh {
    return <IMesh> component !== undefined;
}

export function isScript(component: IGeometry | IMesh | IScript): component is IScript {
    return <IScript> component !== undefined;
}

export function componentType(component: IGeometry | IMesh | IScript): ComponentType {
    if (isGeometry(component)) {
        return ComponentType.Geometry;
    } else if (isMesh(component)) {
        return ComponentType.Mesh;
    } else if (isScript(component)) {
        return ComponentType.Script;
    } else {
        throw new Error('component type could not be determined');
    }
}

export default class GameObject implements IGameObject {
    Geometry: IGeometry | null;
    Mesh: IMesh | null;
    Scripts: Array<IScript>;

    Parent: IGameObject | null;
    Children: IHashMap<IGameObject>;

    constructor() {
        this.Geometry = null;
        this.Mesh = null;
        this.Scripts = [];
        this.Parent = null;
        this.Children = {};
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

    addComponent(component: IGeometry | IMesh | IScript): void {
        let type = componentType(component);

        if (type === ComponentType.Geometry) {
            this.Geometry = component;
        } else if (type === ComponentType.Mesh) {
            this.Mesh = component;
        } else if (type === ComponentType.Script) {
            this.Scripts.push(component);
        }
    }
}
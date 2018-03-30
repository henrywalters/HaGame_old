import IHashMap from './../../../common/dataStructures/IHashMap';
import IGeometry from '../../../components/interface/IGeometry';
import IMesh from '../../../components/interface/IMesh';
import IScript from '../../../components/interface/IScript';

export default interface IGameObject {

    Geometry: IGeometry | null;
    Mesh: IMesh | null;
    Scripts: Array<IScript>;

    Parent: IGameObject | null;
    Children: IHashMap<IGameObject>;

    addChild(id: string, gameObject: IGameObject): void;
    addComponent(component: IGeometry | IMesh | IScript): void;

}
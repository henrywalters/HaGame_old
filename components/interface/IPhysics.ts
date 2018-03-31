import { } from '../../core/objects/concrete/GameObject';
import IGameObject from '../../core/objects/interface/IGameObject';

export default interface IPhysics {
    GameObject: IGameObject | null;
    GameObjectSet: boolean;
    setBody(gameObject: IGameObject): void;
    applyPhysics(): void;
}
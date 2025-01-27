import { Debug } from './Debug';
import { GameConfig } from './GameConfig';
import { MobSpawner } from './MobSpawner';
import { XNetTable } from './xnet-table';
import { CameraControl } from './camera-control';
import { ItemSelection } from './item-selection';
import { MoveControl } from './moveControl';

declare global {
    interface CDOTAGameRules {
        // 声明所有的GameRules模块，这个主要是为了方便其他地方的引用（保证单例模式）
        XNetTable: XNetTable;

        MobSpawner: MobSpawner;
    }
}

/**
 * 这个方法会在game_mode实体生成之后调用，且仅调用一次
 * 因此在这里作为单例模式使用
 **/
export function ActivateModules() {
    print("start ActivateModules");
    if (GameRules.XNetTable == null) {
        // 初始化所有的GameRules模块
        GameRules.XNetTable = new XNetTable();
        // 添加相机控制
        new CameraControl();
        // 添加道具选择
        new ItemSelection();

        new MoveControl();
        // 如果某个模块不需要在其他地方使用，那么直接在这里使用即可
        new GameConfig();
        // 初始化测试模块xD
        new Debug();
    }

    GameRules.SetPreGameTime(5)
    GameRules.MobSpawner = new MobSpawner();
    GameRules.MobSpawner.Start();
}

import { reloadable } from '../utils/tstl-utils';

@reloadable
export class CameraControl {
    constructor() {
        print('[CameraControl] Activated');
        this._startCameraUpdate();
    }

    Reload() {
        print('[CameraControl] Reloaded');
    }

    private _startCameraUpdate() {
        Timers.CreateTimer(() => {
            // 遍历所有玩家
            for (let playerID = 0; playerID < DOTA_MAX_PLAYERS; playerID++) {
                const player = PlayerResource.GetPlayer(playerID as PlayerID);
                if (!player) continue;

                // 获取玩家的英雄
                const hero = player.GetAssignedHero();
                if (!hero) continue;

                // 获取英雄位置
                const heroPos = hero.GetAbsOrigin();
                
                // 设置相机位置到英雄位置
                // 第二个参数是相机过渡时间（秒）
                PlayerResource.SetCameraTarget(playerID as PlayerID, hero);
                // 或者使用这个来设置固定位置（如果你想要偏移或自定义位置）
                // player.SetCameraPosition(heroPos);
            }

            return 0.03; // 约30帧每秒
        });
    }
} 
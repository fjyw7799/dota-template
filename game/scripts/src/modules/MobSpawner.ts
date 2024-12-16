import { SpawnConfig } from "./SpawnConfig";

export class MobSpawner {
    wave: number = 0;
    constructor() {
        this.wave = 0
    }

    Start() {
        print("================MobSpawner start");
        GameRules.GetGameModeEntity().SetThink("OnThink", this, "MobSpawner", 2);
    }

    OnThink(): number {
        let now = GameRules.GetDOTATime(false, true);
        if (this.wave == 0 && now >= 10) {
            this.SpawnNextWave();
            return null;
        }

        return 1;
    }

    SpawnNextWave() {
        // this.wave++;
        let waveInfo = SpawnConfig.waves[this.wave]
        if (waveInfo) {
            print("=====spawn mob", waveInfo.name, waveInfo.location, waveInfo.level, waveInfo.path)
            this.SpawnMob(waveInfo.name, waveInfo.location, waveInfo.level, waveInfo.path);
        }
    }

    SpawnMob(name: string, location: string, level: number, path:string) {
        let ent = Entities.FindByName(null, location)
        let pos = ent.GetOrigin();
        let mob = CreateUnitByName(name, pos, true, null, null, DotaTeam.BADGUYS) as CDOTA_BaseNPC_Creature;
        mob.CreatureLevelUp(level);
        if (path) {
            mob.SetMustReachEachGoalEntity(true);
            let pathEnt = Entities.FindByName(null, path);
            mob.SetInitialGoalEntity(pathEnt);
        }
    }
}
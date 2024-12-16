export const SpawnConfig = {
    // 刷怪开始时间（秒）
    spawn_start_time: 10, // 直接初始化

    // 波次配置
    waves: [
        {
            // 怪物单位名称
            name: "npc_kv_generator_test",
            num: 5,                                  // 本波个数
            level: 1,                                // 怪物等级
            location: "path_mob_default",            // 刷怪点的名字
            path: "path_mob_default"                 // 怪物寻路的路径起始点
        }
    ]
};

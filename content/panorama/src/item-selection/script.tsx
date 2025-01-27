import 'panorama-polyfill-x/lib/console';
import 'panorama-polyfill-x/lib/timers';
import { AddKeyBind } from "../utils/lib";

import { useMemo, useEffect, useState, type FC } from 'react';
import { render } from 'react-panorama-x';
// import { useXNetTableKey } from '../hooks/useXNetTable';

const ItemSelection: FC = () => {
    const [isWindowVisible, setIsWindowVisible] = useState(false);
    // const data = useXNetTableKey(`test_table`, `test_key`, { data_1: `unknown` });
    // const string_data = data.data_1;

    // const OnKeyPress = (key: string, pressed: boolean) => {
    //     $.Msg(`Key ${key} ${pressed ? 'pressed' : 'released'}`);
    // };

    function OnKeyPress(key: string, pressed: 0|1) {
        $.Msg("Key pressed: " + key + " state: " + pressed);  // Debug line

        // isKeyDown[key] = pressed;

        GameEvents.SendCustomGameEventToServer("movement_input", {
            key: key,
            pressed: pressed,
            PlayerID: Players.GetLocalPlayer()
        });
    }

    function OnToggleWindow() {
        $.Msg("#####OnToggleWindow...", isWindowVisible);
        setIsWindowVisible((prev) => {
            const newValue = !prev;
            $.Msg("Updating visibility to:", newValue);
            return newValue;
        });
    }

    const SelectItem = (itemId: string) => {
        $.Msg(`Selected item: ${itemId}`);
    };

    useEffect(() => {
        const id = GameEvents.Subscribe('toggle_item_selection', (event)=>{
            $.Msg("#####toggle_item_selection");
            OnToggleWindow();
        });
        const itemSelectionCommand = `+ToggleItemSelection${Date.now()}`;
        Game.AddCommand(itemSelectionCommand, ()=> OnToggleWindow(), "", 0);
        Game.CreateCustomKeyBind('I', itemSelectionCommand);

        const wCommand = `w${Date.now()}`;
        Game.AddCommand(`+${wCommand}`, ()=> OnKeyPress('w', 1), "", 0);
        Game.AddCommand(`-${wCommand}`, ()=> OnKeyPress('w', 0), "", 0);
        Game.CreateCustomKeyBind('W', `+${wCommand}`);

        const aCommand = `a${Date.now()}`;
        Game.AddCommand(`+${aCommand}`, ()=> OnKeyPress('a', 1), "", 0);
        Game.AddCommand(`-${aCommand}`, ()=> OnKeyPress('a', 0), "", 0);
        Game.CreateCustomKeyBind('A', `+${aCommand}`);

        const sCommand = `s${Date.now()}`;
        Game.AddCommand(`+${sCommand}`, ()=> OnKeyPress('s', 1), "", 0);
        Game.AddCommand(`-${sCommand}`, ()=> OnKeyPress('s', 0), "", 0);
        Game.CreateCustomKeyBind('S', `+${sCommand}`);

        const dCommand = `d${Date.now()}`;
        Game.AddCommand(`+${dCommand}`, ()=> OnKeyPress('d', 1), "", 0);
        Game.AddCommand(`-${dCommand}`, ()=> OnKeyPress('d', 0), "", 0);
        Game.CreateCustomKeyBind('D', `+${dCommand}`);

        // AddKeyBind("W", () => OnKeyPress('w', 1), () => OnKeyPress('w', 0));
        // AddKeyBind("A", () => OnKeyPress('a', 1), () => OnKeyPress('a', 0));
        // AddKeyBind("S", () => OnKeyPress('s', 1), () => OnKeyPress('s', 0));
        // AddKeyBind("D", () => OnKeyPress('d', 1), () => OnKeyPress('d', 0));

        // 清理函数
        return () => {
            GameEvents.Unsubscribe(id);
            // Game.RemoveCommand("+ToggleItemSelection");
        };
    }, []); // 空依赖数组，只在组件挂载时执行一次

    return useMemo(() => (
        <Panel id="ItemSelectionWindow" className={`ItemSelectionWindow ${isWindowVisible ? '' : 'Hidden'}`}>
            <Label className="WindowTitle" text="选择一个道具" />
                <Panel className="ItemsContainer">
                     <Panel className="ItemChoice" id="item_1" onactivate={() => SelectItem('item_1')}>
                         <Image className="ItemIcon" src="file://{images}/items/blink.png"/>
                         <Label className="ItemName" text="闪烁匕首"/>
                         <Label className="ItemDesc" text="可以快速传送到目标位置"/>
                     </Panel>
                     <Panel className="ItemChoice" id="item_2" onactivate={() => SelectItem('item_2')}>
                         <Image className="ItemIcon" src="file://{images}/items/force_staff.png"/>
                         <Label className="ItemName" text="推推棒"/>
                         <Label className="ItemDesc" text="可以推动自己或队友"/>
                     </Panel>
                     <Panel className="ItemChoice" id="item_3" onactivate={() => SelectItem('item_3')}>
                         <Image className="ItemIcon" src="file://{images}/items/dagon.png"/>
                         <Label className="ItemName" text="达贡之神力"/>
                         <Label className="ItemDesc" text="对目标造成魔法伤害"/>
                     </Panel>
                 </Panel>
        </Panel>
    ), [isWindowVisible]);
    // return useMemo(() => (
    //     <Panel className="ItemSelectionRoot" hittest={false}>
    //         <Panel id="ItemSelectionWindow" className={`ItemSelectionWindow ${isWindowVisible ? '' : 'Hidden'}`}>
    //             <Label className="WindowTitle" text="选择一个道具" />
    //             <Panel className="ItemsContainer">
    //                 <Panel className="ItemChoice" id="item_1" onactivate={() => SelectItem('item_1')}>
    //                     <Image className="ItemIcon" src="file://{images}/items/blink.png"/>
    //                     <Label className="ItemName" text="闪烁匕首"/>
    //                     <Label className="ItemDesc" text="可以快速传送到目标位置"/>
    //                 </Panel>
    //                 <Panel className="ItemChoice" id="item_2" onactivate={() => SelectItem('item_2')}>
    //                     <Image className="ItemIcon" src="file://{images}/items/force_staff.png"/>
    //                     <Label className="ItemName" text="推推棒"/>
    //                     <Label className="ItemDesc" text="可以推动自己或队友"/>
    //                 </Panel>
    //                 <Panel className="ItemChoice" id="item_3" onactivate={() => SelectItem('item_3')}>
    //                     <Image className="ItemIcon" src="file://{images}/items/dagon.png"/>
    //                     <Label className="ItemName" text="达贡之神力"/>
    //                     <Label className="ItemDesc" text="对目标造成魔法伤害"/>
    //                 </Panel>
    //             </Panel>
    //         </Panel>
    //     </Panel>
    // ), [isWindowVisible]);
};

render(<ItemSelection />, $.GetContextPanel());

console.log(`item-select`);

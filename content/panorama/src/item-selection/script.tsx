import 'panorama-polyfill-x/lib/console';
import 'panorama-polyfill-x/lib/timers';

import { useMemo, useEffect, useState, type FC } from 'react';
import { render } from 'react-panorama-x';
// import { useXNetTableKey } from '../hooks/useXNetTable';

const ItemSelection: FC = () => {
    const [isWindowVisible, setIsWindowVisible] = useState(true);
    // const data = useXNetTableKey(`test_table`, `test_key`, { data_1: `unknown` });
    // const string_data = data.data_1;

    const OnKeyPress = (key: string, pressed: boolean) => {
        $.Msg(`Key ${key} ${pressed ? 'pressed' : 'released'}`);
    };

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
        console.log(`GameEvents.Subscribe('toggle_item_selection'`);
        const id = GameEvents.Subscribe('toggle_item_selection', (event)=>{
            $.Msg("#####toggle_item_selection");
            OnToggleWindow();
        });
        const itemSelectionCommand = `+ToggleItemSelection${Date.now()}`;
        Game.AddCommand(itemSelectionCommand, ()=> OnToggleWindow(), "", 0);

        $.Msg("Registering key bindings..."); // Debug line
        const command = `CustomForward${Date.now()}`;
        // Register WASD with custom names
        Game.CreateCustomKeyBind('W', `+${command}`);
        // Game.CreateCustomKeyBind('A', '+CustomLeft');
        // Game.CreateCustomKeyBind('S', '+CustomBack');
        // Game.CreateCustomKeyBind('D', '+CustomRight');

        Game.CreateCustomKeyBind('I', itemSelectionCommand);


        Game.AddCommand(`+${command}`, () => OnKeyPress('w', true), '', 0);
        // Game.AddCommand('-CustomForward1', () => OnKeyPress('w', false), '', 0);
        // Game.AddCommand('+CustomLeft', () => OnKeyPress('a', true), '', 0);
        // Game.AddCommand('-CustomLeft', () => OnKeyPress('a', false), '', 0);
        // Game.AddCommand('+CustomBack', () => OnKeyPress('s', true), '', 0);
        // Game.AddCommand('-CustomBack', () => OnKeyPress('s', false), '', 0);
        // Game.AddCommand('+CustomRight', () => OnKeyPress('d', true), '', 0);
        // Game.AddCommand('-CustomRight', () => OnKeyPress('d', false), '', 0);

        // 清理函数
        return () => {
            GameEvents.Unsubscribe(id);
            // Game.RemoveCommand("+ToggleItemSelection");
        };
    }, []); // 空依赖数组，只在组件挂载时执行一次

    useEffect(() => {
        $.Msg("isWindowVisible changed to:", isWindowVisible);
    }, [isWindowVisible]);

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

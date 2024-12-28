import { reloadable } from '../utils/tstl-utils';

@reloadable
export class ItemSelection {
   private itemMap: Record<string, string> = {
       'item_1': 'item_blink',
       'item_2': 'item_force_staff',
       'item_3': 'item_dagon'
   };
    constructor() {
       print('[ItemSelection] Initialized');
       this.registerEvents();
   }
    private registerEvents() {
       CustomGameEventManager.RegisterListener('item_selected', (_, event: { PlayerID: PlayerID; item_name: string }) => {
           const playerId = event.PlayerID;
           const itemName = this.itemMap[event.item_name];
           
           if (!itemName) return;
            const player = PlayerResource.GetPlayer(playerId);
           const hero = player?.GetAssignedHero();
           
           if (hero) {
               hero.AddItemByName(itemName);
           }
       });
   }
}

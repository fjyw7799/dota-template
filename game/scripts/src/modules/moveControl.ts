import { reloadable } from '../utils/tstl-utils';

@reloadable
export class MoveControl {
    constructor() {
       print('[MoveControl] Initialized');
       ListenToGameEvent(`player_connect_full`, keys => this.OnPlayerConnect(keys), this);
   }

    OnPlayerConnect(keys: { PlayerID: PlayerID }) {
        print("====MoveControl OnPlayerConnect")
        const player = PlayerResource.GetPlayer(keys.PlayerID)
        if (player) {
            // Enable custom input handling
            CustomGameEventManager.Send_ServerToAllClients("enable_custom_input", {} as never);
            // Set up key bindings
            CustomGameEventManager.RegisterListener("movement_input", (_, event:CustomGameEventDeclarations['movement_input']) => {
                const { PlayerID, key, pressed } = event;

                // Initialize the player's movement input record if it doesn't exist
                // if (!this.playerMovementInputs.has(PlayerID)) {
                //     this.playerMovementInputs.set(PlayerID, {});
                // }

                // // Update the player's movement input record
                // const playerInputs = this.playerMovementInputs.get(PlayerID);
                // playerInputs[key] = pressed;

                // Log the updated movement input for debugging
                print(`Player ${PlayerID} pressed ${key}: ${pressed}`);
                // print(`Player ${PlayerID} current inputs: ${JSON.stringify(playerInputs)}`);
            });
        }
    }
}

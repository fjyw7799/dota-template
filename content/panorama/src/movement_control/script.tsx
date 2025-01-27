// import { AddKeyBind } from "../utils/lib";

// let isKeyDown = {
//     'w': false,
//     'a': false,
//     's': false,
//     'd': false
// };

// function OnKeyPress(key: string, pressed: 0|1) {
//     $.Msg("Key pressed: " + key + " state: " + pressed);  // Debug line

//     // isKeyDown[key] = pressed;

//     GameEvents.SendCustomGameEventToServer("movement_input", {
//         key: key,
//         pressed: pressed,
//         PlayerID: Players.GetLocalPlayer()
//     });
// }

// (function RegisterKeyBinds() {
//     $.Msg("movement Registering key bindings..."); // Debug line
//     AddKeyBind("W", () => OnKeyPress('w', 1), () => OnKeyPress('w', 0));
//     AddKeyBind("A", () => OnKeyPress('a', 1), () => OnKeyPress('a', 0));
//     AddKeyBind("S", () => OnKeyPress('s', 1), () => OnKeyPress('s', 0));
//     AddKeyBind("D", () => OnKeyPress('d', 1), () => OnKeyPress('d', 0));
// })();

// $.Msg("Movement controls script loaded!");
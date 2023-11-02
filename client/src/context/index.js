import {createContext} from "react";

/**
 * Контекст позволяет передавать данные через дерево компонентов без необходимости передавать пропсы на промежуточных уровнях.
 * @type {React.Context<null>}
 */
export const AuthContext = createContext(null);
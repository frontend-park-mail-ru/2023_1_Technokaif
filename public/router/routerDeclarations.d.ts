import IStore from '@stores/IStore';

/** Function to call in Router to call */
export type FunctionRenderInRouter = () => void;

/** Path config in Router */
export interface PathConfig {
    path: string;
    render: FunctionRenderInRouter;
    store: IStore[];
}

/** Paths to take in Router */
export interface RegularPathToTake {
    state: object[];
    id: number|null;
    page: string|null;
}

/**
 *  Get User and its permissions to take path
 *  @description <b>isUser</b> Check if user authenticate or not
 *  <b>getPermittedPath</b> Check if user can be directed on path and what path to take<br>
 *  <b>getActionToTakeOnPop</b> Check if user can be directed on path and what actions to take<br>
 */
export interface PermissionUser {
    isUser: () => boolean;
    getPermittedPath: (string) => string;
    getActionToTakeOnPop: (string, string) => string;
}

import * as React from "react";

/**
 * Forces the rerender of a component independently of its internal state
 * @return {() => void}
 */
export const useForceUpdate = () => {
    const updateState = React.useState(0)[1];
    return React.useCallback(() => updateState(prevState => {
        const state = prevState === undefined ? 0 : prevState;
        if (state === 0) {
            return 1;
        } else {
            return 0;
        }
    }), [updateState]);
}
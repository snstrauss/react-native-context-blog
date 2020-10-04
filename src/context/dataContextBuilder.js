import React, { createContext, useMemo, useReducer } from 'react';

export default function createDateContextCopy(contextName, actions, initialState){

    function reducer(currState, { type, payload }){
        return (type in actions) ? actions[type](currState, payload) : currState;
    }

    const Context = createContext();

    function Provider({ children }){

        const [state, dispatch] = useReducer(reducer, initialState);

        const methods = useMemo(() => actionsToMethodss(actions, dispatch), [contextName]);

        const ctx = {
            state,
            methods
        };

        return (
            <Context.Provider value={ctx}>
                {children}
            </Context.Provider>
        )
    }

    return {
        Provider,
        Context
    };
}

function actionsToMethodss(actions, dispatch){

    return Object.keys(actions).reduce((methods, action) => {

        methods[action] = (payload) => dispatch({
            type,
            payload
        });

        return methods;
    }, {})

}
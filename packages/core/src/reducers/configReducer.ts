
interface ConfigActions {
    payload?: boolean | string;
    type: string;
}


export const INITIAL_CONFIG = {
    radio: false,
};

export const configReducer = (
    state = INITIAL_CONFIG,
    action: ConfigActions,
) => {
    switch (action.type) {
        case 'DEFAULT_SETUP':
            return {
                ...state,
                setup: action.payload,
            };
        case 'RADIO_MODE':
            return {
                ...state,
                radio: action.payload,
            };
        default:
            return state;
    }
};

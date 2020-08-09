const defaultState = {
    contractAddress: "",
    accountAddress: ""
};

function reducer(state = defaultState, action) {
    switch (action.type) {
        case "SET_ADDRESS":
            return {
                ...state,
                contractAddress: action.payload.contractAddress,
                accountAddress: action.payload.accountAddress
            }
        default: return state
    }
}

export default reducer;
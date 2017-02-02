export default function createParseReducer(type, convert) {
    return function(state, action) {
        if (action.type === type) {
            // Flow can't guarantee {type, list} is a valid action
            return (action).list.map(convert);
        }
        return state || [];
    }
}
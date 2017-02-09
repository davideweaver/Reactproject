import * as Types from "../actions/actionTypes"

const initialState = {
  image: {
    uri: null,
    width: 0,
    height: 0
  }
};

export default function handleActions(state = initialState, action = {}) {
  switch (action.type) {
    
    case Types.PROFILE_SAVE_IMAGE: {
      return Object.assign({}, state, {
        image: action.image
      });
    }

    default:
      return state;
  }
}



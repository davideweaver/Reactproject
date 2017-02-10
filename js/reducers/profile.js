import * as Types from "../actions/actionTypes"

const initialState = {
  avatar: {
    uri: null,
    width: 0,
    height: 0
  },
  firstName: "",
  lastName: "",
  email: "",
  gender: "",
  bio: "",
  instagramUsername: ""
};

export default function handleActions(state = initialState, action = {}) {
  switch (action.type) {
    
    case Types.PROFILE_SAVE_AVATAR: {
      return {...state, avatar: action.image};
    }

    case Types.PROFILE_SAVE_DETAILS: {
      return {...state, ...action.profile};
    }

    default:
      return state;
  }
}



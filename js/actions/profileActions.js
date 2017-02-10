import * as Types from "./actionTypes"

export function saveAvatar(uri, width, height) {
  return {
    type: Types.PROFILE_SAVE_AVATAR,
    image: {
      uri: uri,
      width: width,
      height: height
    }
  };
}

export function saveDetails(firstName, lastName, email, gender, bio, instagramUsername) {
  let profile = {}
  if (firstName) profile.firstName = firstName; 
  if (lastName) profile.lastName = lastName; 
  if (email) profile.email = email; 
  if (gender) profile.gender = gender; 
  if (bio) profile.bio = bio; 
  if (instagramUsername) profile.instagramUsername = instagramUsername; 
  return {
    type: Types.PROFILE_SAVE_DETAILS,
    profile: profile
  };
}


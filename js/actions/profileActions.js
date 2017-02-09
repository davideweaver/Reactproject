import * as Types from "./actionTypes"

export function saveImage(uri, width, height) {
  return {
    type: Types.PROFILE_SAVE_IMAGE,
    image: {
      uri: uri,
      width: width,
      height: height
    }
  };
}

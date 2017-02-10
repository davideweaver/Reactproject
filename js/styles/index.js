import { merge, mergeWith } from "ramda"
import { StyleSheet } from "react-native"
import { Color, Dims, TextSize } from "./theme"
import BaseStyles from "./base"
import OverrideStyles from "./overrides"

const styles = mergeWith(merge, BaseStyles, OverrideStyles)
 
export default StyleSheet.create(styles)
export { Color, Dims, TextSize }
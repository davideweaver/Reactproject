import { Color } from "./theme"

export default {
    screenTop: {
        flex: 1,
        backgroundColor: Color.background,
        paddingTop: 22
    },
    screen: {
        flex: 1,
        backgroundColor: Color.background
    },
    container: {
        flex: 1
    },

    cardContainer: {
        flex: 1,
        backgroundColor: "rgb(248, 247, 250)",
    },

    navbar: {
        backgroundColor: "white"
    },

    navbarButtonText: {
        color: Color.tint,
        paddingTop: 6,
        paddingBottom: 4,
        paddingLeft: 8,
        paddingRight: 16,
        fontSize: 16,
        fontWeight: "400"
    },

    navbarActiveButtonText: {
        color: Color.tint,
        paddingTop: 6,
        paddingBottom: 4,
        paddingLeft: 8,
        paddingRight: 16,
        fontSize: 16,
        fontWeight: "500"
    }
}
import { StyleSheet } from "react-native";

export const colors = {
    darkGray: '#2d2d2d',
    lightGray: '#9b9b9b',
    orange: '#ff9427',

    textPrimary: 'white',
    testSecondary: '#666666',
    background: '#000'
}

export const globalStyles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: colors.background
    },
    calculatorContainer: {
        flex: 1,
        padding: 20,
        justifyContent: 'flex-end'
    },
    row:{
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 18,
        paddingHorizontal: 10,
    },
    mainResult: {
        fontSize: 70,
        color: colors.textPrimary,
        marginBottom: 10,
        textAlign: 'right',
        fontWeight: '400'
    },
    subResult:{
        color: colors.testSecondary,
        fontSize: 40,
        textAlign: 'right',
        fontWeight: '300'
    },
    button:{
        width: 80,
        height: 80,
        backgroundColor: colors.darkGray,
        borderRadius: 100,
        justifyContent: 'center',
        marginHorizontal: 10
    },
    buttonText:{
        textAlign: 'center',
        padding: 10,
        fontSize: 30,
        color: 'white',
        fontWeight: '400'
    }
})
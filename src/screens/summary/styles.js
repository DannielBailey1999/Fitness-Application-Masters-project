import { StyleSheet } from "react-native";

const Styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff',
        borderColor: '#ccc',
        borderTopWidth: 1,
        padding: 20,
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000'
    },
    subHeading: {
        fontSize: 16, 
        color: '#aaaaaa'
    },
    textInputContainer: {
        borderBottomWidth: 1, 
        borderColor: '#ccc', 
        paddingBottom: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
        },
        textInput: {
            fontSize: 20, 
            fontWeight: 'bold'
        },
        milesValue: {
            fontSize: 80, 
            fontWeight: 'bold'
        },
        milesMetric:{
            fontSize: 20, 
            color: '#aaaaaa'
        },
        metricContainer: {
            marginTop: 12,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        metricValue: {
            fontSize: 24, 
            fontWeight: 'bold'
        },
        metric: {
            color: '#999999', 
            fontSize: 16
        },
        logoContainer: {
            flex: 1, 
            justifyContent: 'center', 
            alignItems: 'center',
        },
        logo: {
            height: 400, 
            width: 360,
        },
});

export default Styles;

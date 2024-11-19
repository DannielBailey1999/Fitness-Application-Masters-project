import { StyleSheet } from "react-native";

const Styles = StyleSheet.create({
    mainContainer: {flex:1, 
        backgroundColor: '#fff',
    },
     mapViewContainer: {
        height: '40%', 
        width: '100%'
    },
     metricContainer: {
        padding: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    milesandCaloriesContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    milesContainer: {
        alignItems: 'center',
    },
    caloriesContainer: {
        alignItems: 'center', 
        marginTop: 16,
    },
    timeandPaceContainer: {   
        justifyContent: 'space-between',
        alignItems: 'center',
        },
    metricValue: {
        fontSize: 32, 
        fontWeight: 'bold'
    },
    metric: {
        color: '#999999'
    },
    progressBarContainer: {
        padding: 40, 
        alignItems: 'center' 
    },
    startandStopButtonContainer: {
        justifyContent: 'center', 
        alignItems:'center', 
        flexDirection: 'row',
    },

        
});

export default Styles;
import { StyleSheet } from "react-native";
import colors from "@/constants/colors";
const Styles = StyleSheet.create({
    avatarTitle: {fontSize: 28, 
        color: 'white', 
        fontWeight: 'bold',
        fontSize: 50,
    },
    avatarContainer: {
        backgroundColor: colors.startButton},
    mainContainer: {flex: 1,
        paddingHorizontal: 32,
        paddingVertical: 24,
        backgroundColor: '#fe9836'
    },
    metricContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    },
    caloriesandPace: {
        justifyContent: 'center', 
        alignItems: 'center'
    },
    metricValue: {
        fontSize: 32,
    },
    metric: {
        fontSize: 20, 
        fontWeight: 'bold', 
        color: '#a96528',
    },
});

export default Styles;
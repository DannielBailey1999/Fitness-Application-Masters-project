import { StyleSheet } from "react-native";
import colors from "@/constants/colors";
const Styles = StyleSheet.create({
    mainContainer: {
        borderRadius: 12,
        backgroundColor: '#ffffff',
        marginVertical: 8,
        padding: 16,
        elevation: 1,
        },
        innerContainer: {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
        },
        image: {
            width: 40, 
            height: 40, 
            borderRadius: 8
        },
        metricContainer: {
            marginTop: 12,
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
        metricValue: {
            fontWeight: 'bold',
        },
        metric: {
            color: '#8d8d8d',
        },

});

export default Styles;
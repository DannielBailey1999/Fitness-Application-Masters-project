import { StyleSheet } from "react-native";
import colors from "@/constants/colors";
const Styles = StyleSheet.create({
    mainContainer: {
        height: '100%',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 48
     },
     metricValue: {
         fontSize: 52,
         fontWeight: 'bold',
         borderBottomWidth: 2,
         marginBottom: 4,
         alignSelf: 'center',
     },
     metric: {
         fontSize: 16,
         textAlign: 'center',
     },
     toggleContainer: {
         padding: 12,
         borderWidth: 2,
         borderRadius: 28,
         borderColor: '#ccc',
         marginTop: 28,
     },
     bottomContainer: {
         justifyContent: 'space-between',
         alignItems: 'center'
     },
     avatarTitle: {fontSize: 28, 
         color: '#000', 
         fontWeight: 'bold'
     },
     avatarContainer: {
         backgroundColor: colors.startButton
     },
     distance: {
        fontSize: 14
    },
    container: {
        height: '100%', 
        width: '100%'
    },
    mapView: {
        width: '100%',
        height: '100%',
        opacity: 0.7
        },

});

export default Styles;
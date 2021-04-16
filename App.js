import {createAppContainer} from "react-navigation"
import {createStackNavigator} from "react-navigation-stack"

import WeatherScreen from "./Component/Weather"
import SearchScreen from "./Component/Search"

const AppNavigator = createStackNavigator(
    {
        Search: {
            screen: SearchScreen, 
            navigationOptions: {headerShown: false}},
        Weather: {
            screen: WeatherScreen, 
            navigationOptions: {
                title:'Weather', 
                headerStyle: {backgroundColor: "#0E0F19"},
                headerTintColor: "#fff",
                headerTitleStyle: {fontWeight: "bold"}
            }
        }
    }
)

export default createAppContainer(AppNavigator);
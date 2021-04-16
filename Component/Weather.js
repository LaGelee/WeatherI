// Component/Weather.js

import React from "react"
import {StyleSheet, Text, View, Image, StatusBar} from "react-native"
import moment from "moment"
import 'moment/locale/fr'

moment.locale("fr")

class WeatherScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {report:this.props.navigation.state.params.report}
    }

    componentDidMount() {
        StatusBar.setHidden(true)
    }

    _day(time) {
        let day = moment(time * 1000).format("ddd")
        return (<Text>{day.toLocaleUpperCase()}</Text>)
    }

    _date(time) {
        let date = moment(time * 1000).format("DD/MM")
        return (<Text>{date}</Text>)
    }
    _getimage(icon) {
        let image
        switch (icon) {
            case "clouds":
                image = require("../assets/weather/cloudy.png")
                break;
            case "snow":
                image = require("../assets/weather/snow.png")
                break;
            case "rain":
                image = require("../assets/weather/rain.png")
                break;
            case "thunderstorm":
                image = require("../assets/weather/storm.png")
                break;
            default:
                image = require("../assets/weather/sun.png")
                break;
        }
        return (<Image source={image} style={{width:150, height:150, marginVertical: 10}}/>)
    }

    render() {
        const data = this.state.report
        return(
            <View style={styles.main_container}>
                {this._getimage(data.weather[0].main.toLowerCase())}
                <View style={styles.infos}>
                    <Text style={styles.name}>{data.name}</Text>
                    <View style={styles.sub}>
                        <Text style={styles.temp}>{data.sys.country}</Text>
                        <Text style={styles.temp}>{this._day(data.dt)} </Text>
                        <Text style={styles.temp}>{this._date(data.dt)}</Text>
                    </View>
                    <View style={styles.sub}>
                        <Text style={styles.temp}>{data.main.temp}°C</Text>
                        <Text style={styles.temp}>{data.main.humidity}%</Text>
                        <Text style={styles.temp}>{data.wind.speed}m/s</Text>
                    </View>
                    <View style={[styles.sub]}>
                        <Text style={[styles.desc, styles.test]}>{data.weather[0].description}</Text>
                    </View>
                </View>
            </View>
        )
    }

}

const styles =  StyleSheet.create({
    main_container: {
        backgroundColor: "#4F6D7A",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"
    },
    name: {
        color: '#FFFFFF',
        fontWeight: "bold",
        textTransform: "uppercase",
        fontSize: 40,
        textAlign: "center"
    },
    temp: {
        color: "#FFFFFF",
        fontSize: 17
    },
    sub: {
        flexDirection: "row",
        justifyContent: "space-evenly",
    },
    infos: {
        width: 325,
    },
    desc: {
        textTransform: "capitalize",
        color: "#FFFFFF",
        fontSize: 17,
        marginVertical: 10
    },
    test: {
        borderBottomWidth: 2,
        paddingBottom: 6,
        borderColor: '#DD6E42'
    }
})

export default WeatherScreen
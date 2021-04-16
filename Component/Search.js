// Component/Search.js

import React from "react"
import {StyleSheet, View, Text, SafeAreaView, TouchableOpacity, TextInput, ActivityIndicator} from "react-native"
import axios from "axios"

class SearchScreen extends React.Component {

    constructor(props){
        super(props)
        this.api = process.env.API_KEY
        this.state = {city:"", country:"", error:"", isLoading:false}

        this._searchCity = this._searchCity.bind(this)
        this._searchCountry = this._searchCountry.bind(this)
    }

    _inputCity(text) {
        if (this.state.error !== "") {
            this.setState({error: ""})
        }
        this.setState({city:text})
    }

    _inputCountry(text) {
        if (this.state.error !== "") {
            this.setState({error: ""})
        }
        this.setState({country:text})
    }

    _searchCity(){
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&lang=fr&units=metric&appid=${this.api}`)
        .then((response) => {
            this.setState({isLoading: false})
            this.props.navigation.navigate("Weather", {report: response.data})
        })
        .catch((error) => {
            if (error.response.status === 404){
                this.setState({error:"Erreur, city not found", isLoading:false})
            }else {
                this.setState({error:"Erreur dans le processus de récupération des données (network, API KEY...)", isLoading:false})
            }
        })
    }

    _searchCountry(){
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.city},${this.state.country.toUpperCase()}&lang=fr&units=metric&appid=${this.api}`)
        .then((response) => {
            this.setState({isLoading: false})
            this.props.navigation.navigate("Weather", {report: response.data})
        })
        .catch((error) => {
            if (error.response.status === 404){
                this.setState({error:"Erreur, city or country not found", isLoading:false})
            }else {
                this.setState({error:"Erreur dans le processus de récupération des données (network, API KEY...)", isLoading:false})
            }
        })
    }

    _search() {
        if (this.state.city !== "") {
            this.setState({isLoading: true})
            if (this.state.country !== "") {
                if (this.state.country.length !== 2){
                    this.setState({error: "Invalid country code !", isLoading:false})
                }else {
                    this._searchCountry()
                }
            }else {
                this._searchCity()
            }
        }

    }

    _error() {
        if (this.state.error !== "") {
            return(<Text style={styles.text_error}>{this.state.error}</Text>)
        }
    }

    _displayLoading() {
        if (this.state.isLoading) {
          return (<ActivityIndicator size="large" color="#04030F"/>)
        }
      }

    render() {
        return(
            <View style={styles.hop}>
                <SafeAreaView>
                    <View style={styles.main_container}>
                    {this._displayLoading()}
                        <View style={styles.input_container}>
                            <TextInput style={styles.textinput1} placeholder='Nom de Ville' onChangeText={(text) => this._inputCity(text)} />
                            <TextInput style={styles.textinput2} placeholder='Pays' onChangeText={(text) => this._inputCountry(text)}/>
                        </View>
                        <TouchableOpacity onPress={() => this._search()} style={styles.search_button}>
                            <Text style={styles.search_text}>Rechercher</Text>
                        </TouchableOpacity>
                        {this._error()}
                    </View>
                </SafeAreaView>
            </View>
            
        )
    }

}

const styles =  StyleSheet.create({
    main_container: {
        marginHorizontal: 25,
        marginVertical: 250,
    },
    search_button: {
        backgroundColor: "#FF928B",
        height: 40,
        display: 'flex',
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 15,
        marginVertical: 10,
        height: 50
    },
    search_text: {
        color:'#FAFAFF',
        fontWeight: "bold",
        textTransform: "uppercase"
    },
    textinput1: {
        paddingLeft:3,
        flex: 10,
        fontWeight: "bold",
        borderBottomWidth: 2,
        marginHorizontal: 4
      },
    textinput2: {
        paddingLeft: 3,
        flex: 3,
        fontWeight: "bold",
        borderBottomWidth: 2,
        marginHorizontal: 4
      },
      text_error:{
          textAlign: "center",
          fontWeight: "bold",
          color: "#FFFFFF",
          backgroundColor: "#E84855",
          marginVertical: 25,
          fontSize: 20,
          padding: 5 
      },
      hop: {
          backgroundColor: "#EAEAEA",
          flex: 1
      },
      input_container: {
          flexDirection: "row",
      }
})

export default SearchScreen

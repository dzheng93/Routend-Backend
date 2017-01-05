import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {
  ExponentLinksView,
} from '@exponent/samples';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import DatePicker from 'react-native-datepicker';
var {GooglePlacesAutocomplete} = require('react-native-google-places-autocomplete');
import Router from '../navigation/Router';
import { Kohana } from 'react-native-textinput-effects';
import {
  FontAwesome,
} from '@exponent/vector-icons';
import Button from 'apsl-react-native-button';

class FriendsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "2016-05-15",
      currentAddress: '',
      results: (<View>
        <Text></Text>
        </View>),
      currentCoordinates: 0,

    }
    // window.goBack = function() {
    //   this.props.navigator.pop();
    // }.bind(this);
  }



  static route = {
    navigationBar: {
      title: (<Text style={{color: 'white'}}>Track a Place</Text>),
      backgroundColor: '#175786',
    },
  }

  componentDidMount() {
    this.setState({
      results: (<View>
        <Text>{this.state.currentAddress}</Text>
        </View>)
    });
  }


  searchPressed() {
      console.log('props', this.props);
      this.props.fetchCoord();
  }

  // _goBack() {
  //   console.log('goBack was clicked', this)
  //   // this.props.navigator.pop();
  //   this.props.navigator.push(Router.getRoute('home'));
  // }

  render() {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={this.props.route.getContentContainerStyle()}>

        <View>
        <TouchableHighlight onPress={ () => this.searchPressed() }>
        <Text>Fetch</Text>
        </TouchableHighlight>
        </View>
        <View>
        <Text>Count: {this.props.AppState.recipeCount}</Text>
        <Text style={styles.title}>Search Location</Text>
        </View>
       <GooglePlacesAutocomplete
        // onChangeText={() => {this.setState({results: (<View></View>) })}}
        placeholder='Search'
        minLength={2} // minimum length of text to search
        autoFocus={false}
        listViewDisplayed='auto'    // true/false/undefined
        fetchDetails={true}
        // renderDescription={(row) => row.terms[0].value} // display street only
        onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
          console.log('data', data);
          console.log('details', details);
          // this.setState({
          //   currentAddress: details.name + ', Neighborhood: ' + details.address_components[2].short_name
          // });
          var currentLocation = '';
          if (data.description === undefined) {
            currentLocation = data.formatted_address;
          }
          if (data.description !== undefined) {
            currentLocation = data.description;
          }

          this.setState({
            results:
            (<View style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row', backgroundColor: '#fcfcfc', width: (Dimensions.get('window').width * 0.92), height: (Dimensions.get('window').height * 0.10), borderRadius: 1, left: (Dimensions.get('window').width * 0.04), borderWidth: 0.8, borderColor: '#d3d3d3', opacity: 1}}>
                <View style={{marginLeft: 20, marginRight: 15}}>
                  <Text style={{fontWeight: 'bold'}}>Location:</Text>
                  <Text>{currentLocation}</Text>
                </View>
             </View>)
    });
        }}
        getDefaultValue={() => {
          return ''; // text input default value
        }}
        query={{
          // available options: https://developers.google.com/places/web-service/autocomplete
          key: 'AIzaSyCQiHH0c64tBC6zOlwm7ViYpCulVVtSuSU',
          language: 'en', // language of the results
          // types: '(cities)', // default: 'geocode'
        }}
        styles={{
            textInputContainer: {
              // marginLeft: 1,
              // marginRight: 1,
              // borderRadius: 3,
            backgroundColor: '#fafafa',
            borderTopColor: '#fcfcfc',
            borderBottomColor: '#fcfcfc',
            // borderTopWidth: 0.1,
            // borderBottomWidth: 0.1,
          },
          textInput: {
            // marginLeft: 0,
            // marginRight: 0,
            // height: 50,
            // color: '#000',
            fontSize: 13,
            // fontStyle: 'italic',
          },
          description: {
            fontWeight: 'bold',
          },
          predefinedPlacesDescription: {
            color: '#1faadb',
          },
          poweredCountainer: {
            height: 0,
          },
          powered: {
            height: 0,
          }
        }}

        currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
        currentLocationLabel="Current location"
        nearbyPlacesAPI='GoogleReverseGeocoding' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
        GoogleReverseGeocodingQuery={{
          // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
          outputFormat: 'json',
        }}
        GooglePlacesSearchQuery={{
          // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
          rankby: 'distance',
          types: 'food',
        }}


        filterReverseGeocodingByTypes={['street_address']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities

        predefinedPlaces={[]}
      />

          <View>
            {this.state.results}
         </View>
      <View style={[styles.card2, { backgroundColor: '#fff' }]}>
          <Text style={styles.title}>Save Location</Text>
          <Kohana
            style={{ backgroundColor: '#f9f5ed' }}
            label={'Name'}
            iconClass={FontAwesome}
            iconName={'circle-o-notch'}
            iconColor={'#f4d29a'}
            labelStyle={{ color: '#91627b' }}
            inputStyle={{ color: '#91627b' }}
          />
          <Kohana
            style={[styles.input, { backgroundColor: '#f9f5ed' }]}
            label={'Category'}
            iconClass={FontAwesome}
            iconName={'archive'}
            iconColor={'#ddd'}
            iconColor={'#f4d29a'}
            labelStyle={{ color: '#91627b' }}
            inputStyle={{ color: '#91627b' }}
          />
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Button onPress={() => { this.props.navigator.push(Router.getRoute('home'))}}style={{backgroundColor: '#fafafa', top: 7, left: (Dimensions.get('window').width * 0.3), height: 35, width: 100, borderRadius: 1, borderColor: '#d3d3d3'}} textStyle={{fontSize: 10}}>
            SUBMIT
            </Button>
          </View>
        </View>

      </ScrollView>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    // backgroundColor: '#008ae6'
  },
  //   content: {
  //   // not cool but good enough to make all inputs visible when keyboard is active
  //   paddingBottom: 300,
  // },
  // card1: {
  //   paddingVertical: 16,
  // },
  card2: {
    padding: 16,
  },
  input: {
    marginTop: 4,
  },
  title: {
    paddingBottom: 16,
    textAlign: 'center',
    color: '#404d5b',
    fontSize: 14,
    fontWeight: 'bold',
    opacity: 0.8,
  },
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
    AppState: state
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendsList);
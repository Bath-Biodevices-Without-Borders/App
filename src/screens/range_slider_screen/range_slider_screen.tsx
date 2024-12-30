import React, {ReactElement, useState} from 'react';
import {View, Text, ScrollView, StyleSheet, PermissionsAndroid} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RangeSliderParamList} from '../../scripts/screen_params';
import Slider, { SliderProps } from '@react-native-community/slider';
import Geolocation, { GeoCoordinates, GeoPosition } from 'react-native-geolocation-service';
import Button from '../../components/button/button';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

type Props = NativeStackScreenProps<RangeSliderParamList, 'RangeSliderScreen'>;

const SliderExample = (props: SliderProps) => {

    const [value, setValue] = useState(props.value ?? 0);
    return (
      <View style={styles.sliderContainer}>
        <Text style ={{fontSize: 20}}>{value && +value.toFixed(3)}</Text>
        <Slider
          step={1}
          {...props}
          value={value}
          onValueChange={setValue}
          style={{width: '90%', height: '15%'}}
            minimumValue={0}
            maximumValue={10}
            minimumTrackTintColor="dodgerblue"
            maximumTrackTintColor="darkgray"
            thumbTintColor= "dodgerblue"
        />
      </View>
    );
  };

// Function to get permission for location
const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Geolocation Permission',
        message: 'Can we access your location?',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    console.log('granted', granted);
    if (granted === 'granted') {
      console.log('You can use Geolocation');
      return true;
    } else {
      console.log('You cannot use Geolocation');
      return false;
    }
  } catch (err) {
    return false;
  }
};

export default function RangeSliderScreen({navigation}: Props): ReactElement<Props>{
  // let emptyGeo: GeoCoordinates;

  // emptyGeo = {
  //   latitude: 0,
  //   longitude: 0,
  //   accuracy: 0,
  //   altitude: 0 ,
  //   heading: 0 ,
  //   speed: 0 ,
  // }

      // state to hold location
      const [location, setLocation] = useState<GeoPosition | null>(null);

      // function to check permissions and get Location
      const getLocation = () => {
        const permissionResponse = requestLocationPermission();
        permissionResponse.then(response =>{
          if(response){
            Geolocation.getCurrentPosition(
              position => {
                console.log(position);
                setLocation(position);
              },
              error => {
                // See error code charts below.
                console.log(error.code, error.message);
                setLocation(null);
              },
              {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
            );
          }
        })    
      };  

    return ( 
    <View style = {styles.container}>
      <View style = {[styles.container, {flex: 1} ]}>
        <SliderExample/>
      </View>
      <View style = {[styles.container, {flex: 2, justifyContent: 'flex-start',} ]}>
        <Text style = {styles.detailsText}>Latitude: {location ? location.coords.latitude : null}</Text>
        <Text style = {styles.detailsText}>Longitude:{location ? location.coords.longitude : null} </Text>
        <View style = {styles.buttonContainer}>
          <Button  onPress={getLocation}>
          <Text style = {styles.detailsText}>Get Location</Text>
          </Button> 
        </View>
      </View>
      
    </View>
    )
    

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  buttonContainer: {
    height: 50,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    marginBottom: 15,
  },
  sliderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 100,
  },
  detailsText: {
    fontSize: 20,
    width: '100%',
    textAlign: 'center',
    marginVertical: 5,
    paddingHorizontal: '5%',
  },
}
)


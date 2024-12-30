import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import React, {ReactElement, useCallback} from 'react';
import {RootTabParamList, RangeSliderParamList} from '../../scripts/screen_params';
import {useFocusEffect} from '@react-navigation/native';

import RangeSliderScreen from './range_slider_screen';

import {ColorContext} from '../../context/color_context';

import {useAppDispatch, useAppSelector} from '../../scripts/redux_hooks';
import {selectColor, selectLightColor} from '../../slices/colorSlice';
import {selectNavIndex, setFocusedNav} from '../../slices/rootNavSlice';

const Stack = createNativeStackNavigator<RangeSliderParamList>();
type Props = BottomTabScreenProps<RootTabParamList, 'RangeSliderStack'>;

export default function RangeSliderStackNavigator(): ReactElement<Props> {
  const dispatch = useAppDispatch();
  const index: number = useAppSelector(state =>
    selectNavIndex(state, {name: 'RangeSliderNav'}),
  );
  const color: string = useAppSelector(state => selectColor(state, {index}));
  const lightColor: string = useAppSelector(state =>
    selectLightColor(state, {index}),
  );
  useFocusEffect(
    useCallback(() => {
      dispatch(setFocusedNav(index));
    }, [dispatch, index]),
  );

  return (
    <ColorContext.Provider value={{color, lightColor}}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="RangeSliderScreen" component={RangeSliderScreen} />

      </Stack.Navigator>
    </ColorContext.Provider>
  );
}

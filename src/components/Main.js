import * as React from "react";
import {
  View,
  Pressable,
  Text,
  Alert,
} from 'react-native';
import LoginScreen from "./screens/LoginScreen";
import BcListScreen from "./screens/BcListScreen";
import BcScreen from "./screens/BcScreen";
import ShootSessionScreen from "./screens/ShootSessionScreen";
import ConfigScreen from "./screens/ConfigScreen";
import { toggleScanView, setBackurl, setUrl } from "../redux/actions";
import { useSelector, useDispatch } from "react-redux";  
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialIcons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
//import { MaterialCommunityIcons } from '@expo/vector-icons';


const Stack = createStackNavigator();


const Main = () => {

  const dispatch = useDispatch();
  
  const logged = useSelector((state) => state.tokenReducer.isLogged);
  const scanView = useSelector((state) => state.tokenReducer.scanView);
  const setbackurl = useSelector((state) => state.configReducer.backurl);
  const username = useSelector((state) => state.tokenReducer.username);
  const navigation = useNavigation();

  return (

    <Stack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: '#00334A',
      }, 
      title: "",
      headerLeft: null,
      }}>
    {logged ? 
      [<Stack.Screen
        name="BcList"
        component={BcListScreen}
        options={{
          title: "Bons de chargement",
          headerTintColor:'#fff',
          headerTitle: () => (
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 0 }}>
                <View style={{ justifyContent: 'center', flexBasis: '75%' }}><Text style={{ fontWeight: 'bold', color: 'white', fontSize: 20, textAlign: 'center' }}> </Text></View>
                <View style={{ flexBasis: '25%'}}>
                  {/* <MaterialCommunityIcons name="account" size={24} color="gray" /> */}<Text style={{color: 'gray'}}>{username}</Text>
              </View>
              </View>
          ),
        }}
        key="1"
      />,
      <Stack.Screen 
      name="Bc" 
      component={BcScreen} 
      options={({ navigation }) => ({
        headerTintColor: '#00334A',
        headerLeft: null,
        headerTitle: () => (
          <View  style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'stretch', width: '100%', marginTop: 0, zIndex: 4}}>
            <View style={{ flexBasis: '90%', alignItems: 'center' }}>
              <Pressable onPress={() => {dispatch(toggleScanView(scanView))}}>
                <MaterialIcons name="qr-code-scanner" size={40} color="#ffffff" />
              </Pressable>
            </View>
            <View style={{ flexBasis: '20%', alignItems: 'flex-end', justifyContent: "flex-end" }}>
                    {/* <MaterialCommunityIcons name="account" size={24} color="gray" /> */}<Text style={{color: 'gray'}}>{username}</Text>
            </View>
          </View>
        ),
      })}
      key="2"
    /> 
      ]
       : ( !setbackurl ? [
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={({}) => ({
          headerTintColor: '#fff',
          headerTitle: () => (
            <View  style={{ flex:1, flexDirection: 'row', justifyContent: 'space-between',  width: '85%', marginTop: 0}}>
              <View>
                <Pressable onPress={() => {dispatch(setBackurl());}}>
                  <Octicons name="gear" size={24} color="gray" />
                </Pressable>
              </View>
            </View>
          ),
          })
        }
        key="3"
      />,<Stack.Screen
        name="ShootSession"
        component={ShootSessionScreen}
        options={{
          title: "Session",
          headerTitle: () => (
            <View style={{flex:1}}>
              <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 0 }}></View>
            </View>
          ),
        }}
        key="4"
      />
    ] : [
      <Stack.Screen
        name="Config"
        component={ConfigScreen}
        options={({}) => ({
          title: "Configuration",
          headerTintColor: '#fff',
          headerTitle: () => (
            <View  style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', marginTop: 0}}>
              <View>
                <Pressable onPress={() => {dispatch(setBackurl());}}>
                  <Octicons name="gear" size={24} color="gray" />
                </Pressable>
              </View>
            </View>
          ),
          })
        }
        key="5"
      />
    ]
    )}
    </Stack.Navigator>
  );
  };

export default Main;
import Bc from '../Bc';
import ScanInput from "../ScanInput";
import CamInput from "../CamInput";
import { View, Text, Button, Modal, StyleSheet, Pressable} from "react-native";
import Message from "../Message";
import Footer from "../Footer";
import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { AntDesign } from '@expo/vector-icons';
//import { MaterialIcons } from '@expo/vector-icons';
//import { toggleScanView } from "../../redux/actions";
import { headerBcChangeFalse, pceAccChangeFalse } from "../../redux/actions";



const BcScreen = ({ route, navigation }) => {
  const { tabPces } = route.params;
  const isActionBeingExecuted = useSelector((state) => state.tokenReducer.isActionBeingPerformed);

  const scanView = useSelector((state) => state.tokenReducer.scanView);
  const scanZebraMode = useSelector((state) => state.configReducer.zebra);
  
  const headerHasChanged = useSelector((state) => state.bcReducer.headerHasChanged);
  const aPceOrAccHasChanged = useSelector((state) => state.pcesAccsReducer.aPceOrAccHasChanged);

  const [somethingHasChanged, setSomethingHasChanged] = React.useState(false);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(headerBcChangeFalse());
    dispatch(pceAccChangeFalse());
  }, []);

  React.useEffect(() => {
    if (headerHasChanged || aPceOrAccHasChanged) {
      setSomethingHasChanged(true);
    } else {
      setSomethingHasChanged(false);
    }
  }, [headerHasChanged, aPceOrAccHasChanged]);
 

  const [modalVisible, setModalVisible] = React.useState(false);
  

  React.useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        somethingHasChanged ? (<View style={{ paddingLeft:10 }}><Pressable onPress={() => setModalVisible(true)}>
          <AntDesign name="arrowleft" size={26} color="white" />
        </Pressable></View>) : (<View style={{ paddingLeft:10 }}><Pressable onPress={() => directGoBack()}>
          <AntDesign name="arrowleft" size={26} color="white" />
        </Pressable></View>)
      ),
    });
  }, [somethingHasChanged]);


  const handleCancel = () => {
    // Handle the cancel action here
    setModalVisible(false);
  };

  const handleConfirm = () => {
    // Handle the confirm action here
    setModalVisible(false);
    navigation.goBack();
  };

  const directGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={{flex:1}}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={somethingHasChanged && modalVisible}
        onRequestClose={handleCancel}
      >
      <View style={styles.centeredView}>
          <View style={styles.modalView}>
              <Text>{`ATTENTION !

Vous n'avez pas enregistré.
En poursuivant vous risquez de perdre les modifications effectuées.

Voulez-vous poursuivre ?`}
              </Text>
              <View style={styles.modalBtns}>
                          {/* <Button title="Confirmer" onPress={handleConfirm} style={{...styles.oneBtn}}/>
                          <Button title="Annuler" onPress={handleCancel} style={{...styles.oneBtn, ...styles.txtBtn}}/> */}
                <Pressable style={styles.oneBtn} onPress={handleConfirm}>
                  <Text style={styles.txtBtn}>OUI</Text>
                </Pressable>
                <Pressable style={styles.oneBtn} onPress={handleCancel}>
                  <Text style={styles.txtBtn}>NON</Text>
                </Pressable>
              </View>
          </View>
        </View>
      </Modal>
      <Message />
      <View style={styles.container}>
        {scanView? (scanZebraMode ? <ScanInput /> : <CamInput />): null}
        <Bc tabPces={ tabPces } />  
      </View>
      <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 55, backgroundColor: '#00334A'}}>
        {isActionBeingExecuted? null : <Footer/>}
      </View>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toolbar: {
    backgroundColor: "#3498db",
    color: "#fff",
    textAlign: "center",
    padding: 25,
    fontSize: 20,
  },
  content: {
    flex: 1,
    padding: 10,
  },
  preview: {
    backgroundColor: "#bdc3c7",
    flex: 1,
    height: 500,
  },
  input: {
    backgroundColor: "#ecf0f1",
    borderRadius: 3,
    height: 40,
    padding: 5,
    marginBottom: 10,
    flex: 1,
  },
  button: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 3,
    marginBottom: 30,
  },
  text1: {
    color: 'green',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text2: {
    color: 'blue',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text3: {
    color: 'grey',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  modalView: {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    alignItems: 'stretch',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  titleModalView: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  textModalView: {
    fontSize: 20,
  },
  modalBtns: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  oneBtn: {
    flex: 0.5,
    margin :2,
    padding : 20
  },
  txtBtn: {
    fontSize: 20,
    padding: 5,
    backgroundColor: '#007FA9',
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  pseudoBtn: {
      borderRadius: 5, 
      padding: 10,
      overflow: 'hidden',
      fontSize: 20,
      backgroundColor:'#00334A',
      color: '#ffffff',
      fontWeight: 'bold',
  }
});

export default BcScreen;
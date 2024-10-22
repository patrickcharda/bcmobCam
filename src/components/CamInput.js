import {
  View,
  Button,
  Text,
  Alert,
} from "react-native";
import { useDispatch } from "react-redux";
import { searchPceId } from "../redux/actions";
import * as React from "react";
import * as Cam from 'expo-camera';

const CamInput = () => {
  const [permission, requestPermission] = Cam.useCameraPermissions();

  const [scanned, setScanned] = React.useState(false);

  const cameraRef = React.useRef(null);

  const dispatch = useDispatch();

  const handleInputChange = (pce_num) => {
    setValue(pce_num);
    if (pce_num.length === 6) {
      //search pce
      dispatch(searchPceId(pce_num));
      setValue("");
    } else if (pce_num.length > 6) {
      //search #
      let regex = /#/g;
      let positionDiese = pce_num.search(regex);
      if (positionDiese != -1) {
          pce_num = pce_num.slice(
          positionDiese + 1,
          positionDiese + 7
        );
        if (pce_num.length === 6) {
          //search pce
          dispatch(searchPceId(pce_num));
          setValue("");
        }
      }
    }  
  };

  const handleBarCodeScanned = ({ type, data }) => {
    let pce_num = data;
    if (pce_num.length === 6) {
      //search pce
      dispatch(searchPceId(pce_num))
    } else if (pce_num.length > 6) {
      //search #
      let regex = /#/g;
      let positionDiese = pce_num.search(regex);
      if (positionDiese != -1) {
          pce_num = pce_num.slice(
          positionDiese + 1,
          positionDiese + 7
        );
        if (pce_num.length === 6) {
          //search pce
          dispatch(searchPceId(pce_num));
        }
      }
    }  
    setScanned(true);
  };

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Permission requise pour l'accès à la caméra</Text>
        <Button onPress={requestPermission} title="Accorder permission" />
      </View>
    );
  }

  return (
    <View style={{ flex: 0.6, position:'relative'}}>
      <Cam.CameraView 
        barcodeScannerSettings={{
          barcodeTypes: ["qr", "code39", "code93", "codabar", "code128", "upc_a", "ean13", "ean8"],
        }}
        onBarcodeScanned ={scanned ? undefined : handleBarCodeScanned}
        facing='back' 
        style={{ flex: 1}}
        ref={cameraRef}
      />
      {scanned && (
        <View style={{ position: 'absolute', bottom: 100, left: 0, right: 0, alignItems: 'center' }}>
          <Button title="Scanner" onPress={() => setScanned(false)} color='#007FA9'/>
        </View>
      )}
    </View>
  );
};

export default CamInput;
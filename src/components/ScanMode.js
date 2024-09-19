import * as React from 'react';
import { View, Text } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { unsetZebra } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";

const ScanMode = () => {
  //const [checked, setChecked] = React.useState(false);
  const scanZebraMode = useSelector((state) => state.configReducer.zebra);
  const dispatch = useDispatch();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Mode Caméra pour le scan ? (vs mode Zebra) </Text>
      <Checkbox
        status={scanZebraMode ? 'unchecked' : 'checked'}
        onPress={() => dispatch(unsetZebra())}
      />
    </View>
  );
};

export default ScanMode
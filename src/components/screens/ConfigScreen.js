import { View } from 'react-native';
import Message from "../Message";
import FooterLogin from "../FooterLogin";
import UrlInput from "../UrlInput";
import ResetKeyInput from "../ResetKeyInput";
import ScanMode from "../ScanMode";


const ConfigScreen = ({ navigation }) => {
    return (
        <View style={{flex:1, justifyContent: 'flex-start'}}>
            <Message />
            <UrlInput />
            <ScanMode />
            <ResetKeyInput />
            <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 55, backgroundColor: '#00334A'}}>
                <FooterLogin/>
            </View>
        </View>
    );
};

export default ConfigScreen;
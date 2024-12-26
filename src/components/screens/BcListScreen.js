import BcList from '../BcList';
import BcLast from '../BcLast';
import { View, ScrollView } from 'react-native';
import Message from "../Message";
import Footer from "../Footer";
import { useSelector, useDispatch } from "react-redux";
import * as React from "react";
import { chargeUnBC } from "../../redux/actions";


const BcListScreen = () => {

    const isActionBeingExecuted = useSelector((state) => state.tokenReducer.isActionBeingPerformed);

    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(chargeUnBC(false));
      }, []);
    
    return (
        <ScrollView contentContainerStyle={{flex:1}}>
            <Message />
            <ScrollView>
                <BcList key={Math.floor(Math.random() * ((Math.random()) * 10000))} />
            </ScrollView>
            {isActionBeingExecuted? null : <BcLast></BcLast>}
            <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 55, backgroundColor: '#00334A'}}>
            {isActionBeingExecuted? null : <Footer/>}
            </View>
        </ScrollView>
        
    );
};

export default BcListScreen;
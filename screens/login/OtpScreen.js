import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {BaseUrl} from '../../BaseUrl';
import axios from 'axios';
import {ThemeColor} from '../../ThemeColor';
import CustomModal from '../components/CustomModal';
import { strings } from '../../lng/LocalizedStrings';

const OtpScreen = ({navigation, route}) => {
  const [otp, setOtp] = React.useState('');
  const [signupDetails, setsignupDetails] = React.useState([]);
  const [spinner, setspinner] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [dynamicModalText, setDynamicModalText] = useState('');

  useEffect(() => {
    const data = route.params.signup;
    setsignupDetails(data);
    console.log('Signup details', data);
  }, []);

  const verify = async () => {
    const data = route.params.signup;

    const article = {
      fullname: data.fullname,
      address: data.address || '-',
      phonenumber: data.phonenumber || '-',
      email: data.email,
      password: data.password,
      voterid: data.voterid,
      accountstatus: data.accountstatus,
      otp: otp,
    };
    console.log(article);

    let config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
    try {
      const data = await axios.post(
        BaseUrl.BaseUrl + 'verify',
        article,
        config,
      );
      console.log('OTP vwrification data', data.data);
      if (data.data.status === 200) {
        console.log('created');
        setspinner(false);
        navigation.navigate('Login');
      }
      if (data.data.status === 401) {
        setspinner(false);
        console.log(data.data);
        // Alert.alert("User already exists")
        setModalVisible(true);
        setDynamicModalText('Invalid OTP.');
      }
      if (data.status === 400) {
        setspinner(false);
        console.log(data.data.data);
        // Alert.alert("User already exists")
        setModalVisible(true);
        setDynamicModalText('OTP Expired. Click on resend OTP.');
      }
    } catch (error) {
      console.log('Error', error.response.status);
      setspinner(false);
      setModalVisible(true);
      if (error.response.status === 400) {
        setDynamicModalText('OTP Expired.');
      }
      if (error.response.status === 401) {
        setDynamicModalText('Invalid OTP.');
      }
    }
  };

  const resendOtp = async () => {
  

    let config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    try {
      const data = await axios.post(
        BaseUrl.BaseUrl + 'signup',
        signupDetails,
        config,
      );
      console.log("data status",data.status);

      if (data.status === 200) {
        console.log('created');
        setspinner(false);
        setModalVisible(true);
        setDynamicModalText(strings.otpText);   
       }
      if (data.status === 201) {
        setspinner(false);
        console.log(data.data);
        // Alert.alert("User already exists")
        setModalVisible(true);
        setDynamicModalText('User already exists');
      }
    } catch (error) {
      console.log('Error', error);
      setspinner(false);
    }
  };

  const handleModal = () => {
    setModalVisible(!modalVisible);
  };
  return (
    <View>
      <CustomModal
        visible={modalVisible}
        modalText={dynamicModalText}
        onClose={handleModal}
      />

      <TouchableOpacity
        style={{
          marginBottom: 30,
          marginTop: Platform.OS === 'ios' ? 50 : 10,
          flexDirection: 'row',
          padding: 10,
          alignItems: 'center',
        }}
        onPress={() => navigation.navigate('SignUp')}>
        <FontAwesome5
          name="arrow-left"
          size={20}
          color="#000"
          style={{marginRight: 10}}
        />
        <Text style={{fontSize: 20, color: '#000', fontWeight: '900'}}>
          {strings.signup}
        </Text>
      </TouchableOpacity>

      <View style={{paddingHorizontal: 20, alignContent: 'center'}}>
        <Text style={{textAlign: 'center', fontSize: 25, fontWeight: 'bold'}}>
          Verification
        </Text>
        <Text style={{textAlign: 'center', marginTop: 10}}>
          {strings.otpText2} {signupDetails.phonenumber} {strings.otpText3}
        </Text>
        <TextInput
          style={styles.inputBox}
          keyboardType="number-pad"
          placeholder="Your OTP"
          maxLength={6}
          onChangeText={value => setOtp(value)}
        />

        <TouchableOpacity style={styles.button} onPress={() => verify()}>
          <Text style={styles.boxText2}>{strings.verify}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>resendOtp()} style={{marginTop: 20}}>
          <Text style={{textAlign: 'center'}}>{strings.resendOTP}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  inputBox: {
    backgroundColor: '#fff',
    borderWidth: Platform.OS === 'android' ? 0.1 : 0.3,
    borderRadius: Platform.OS === 'android' ? 4 : 8,
    height: 60,
    fontSize: 17,
    paddingHorizontal: 10,
    marginTop: 40,
    borderColor: '#fff',
  },
  button: {
    backgroundColor: ThemeColor.green,
    height: 50,
    marginTop: 30,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxText2: {
    fontSize: 17,
    color: '#fff',
    opacity: 0.8,
    fontWeight: '900',
  },
});

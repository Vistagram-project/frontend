import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../redux/action/userAction';
import customColor from '../../../android/app/src/utils/customColor';
import Snackbar from 'react-native-snackbar';
import {textConstant} from "../../redux/constant/globalConstant.js";
const SignUp = ({ navigation }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [file, setFile] = useState(null);
  const {loading , message , error} = useSelector((state) => state.user);

  const handleImagePick = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (!response.didCancel && !response.errorCode) {
        const pickedFile = response.assets[0];
        setFile(pickedFile);
      }
    });
  };
  const handleSignUp = async () => {

    if (!name || !email || !password || !file) {
      Alert.alert('Error', textConstant.please_fill_all_fields_text);
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append("file", {
          uri: file.uri,
          type: file.type,
          name: file.fileName,
        });

    dispatch(registerUser(formData));
    
  };

  useEffect(() => {
    if (!loading && (message || error)) {
      Snackbar.show({
        text: message || error,
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: error ? customColor.RED_70 : customColor.GREEN_70,
        textColor: customColor.Light,
      });
  
      dispatch({ type: 'CLEAR_MESSAGE' });
    }
  }, [loading, message, error]);
  


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      {file && (
        <Image
          source={{ uri: file.uri }}
          style={{ width: 100, height: 100, borderRadius: 50, alignSelf: 'center', marginVertical: 10 }}
        />
      )}
      <TouchableOpacity style={styles.imagePicker} onPress={handleImagePick}>
        <Text style={{ color: '#007bff' }}>{file ? 'Change Image' : 'Pick Profile Image'}</Text>
      </TouchableOpacity>
      <TextInput placeholder="Full Name" style={styles.input} value={name} onChangeText={setName} placeholderTextColor={customColor.GREY_40} />
      <TextInput placeholder="Email" style={styles.input} keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} placeholderTextColor={customColor.GREY_40} />
      <TextInput placeholder="Password" style={styles.input} secureTextEntry value={password} color={customColor.PRUSSIAN_80} onChangeText={setPassword} placeholderTextColor={customColor.GREY_40} />

      

      <TouchableOpacity
          style={[styles.button, loading && { backgroundColor: '#aaa' }]}
          onPress={handleSignUp}
          disabled={loading}>

        <Text style={styles.buttonText}>{loading ? 'Registring...' : textConstant.signUp}</Text>
      </TouchableOpacity>
      
            <Text style={styles.footerText}>  {textConstant.do_not_have_an_account}{'  '}
                  <Text style={styles.link} onPress={() => navigation.replace('Login')}>
                    Login
                  </Text>
            </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 32,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  imagePicker: {
    alignItems: 'center',
    marginBottom: 12,
  },
  imagePickerText: {
    color: '#007bff',
    fontSize: 16,
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  footerText: {
    marginTop: 24,
    textAlign: 'center',
    color: '#666',
  },
  link: {
    color: '#007bff',
    fontWeight: '600',
  },
});

export default SignUp;

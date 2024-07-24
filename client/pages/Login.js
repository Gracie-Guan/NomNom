import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, SafeAreaView, ImageBackground, Image, TouchableOpacity, TouchableWithoutFeedback, Keyboard} from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1 }}>
      <ImageBackground source={require('../assets/background.jpg')} style={styles.background}>
        <View style={styles.topSection}>
          <Image source={require('../assets/logo.jpg')} style={styles.logo}/>
          <Text style={styles.title}>Welcome back you've been missed !</Text>
        </View>

        <View style={styles.middleSection}>
          <TextInput style={styles.input} value={email} placeholder='Email' placeholderTextColor={'black'} onChangeText={setEmail} keyboardType="email-address"/>
          <TextInput style={styles.input} value={password} placeholder='Password' placeholderTextColor={'black'} onChangeText={setPassword} secureTextEntry/>
        </View>

        <View style={styles.middleSecond}>
          <View style={styles.forgetWord}>
          <TouchableOpacity>
            <Text style={styles.password}>
              Forget your password ?
            </Text>
          </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.signin} onPress={handleLogin}>
            <Text style={styles.textSign}>
              Sign in
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.createAc} onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.textAc}>
              Create a new account
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomSection}>
          <Text style={styles.textOr}>
            Or continue with
          </Text>
          <TouchableOpacity>
            <Image source={require('../assets/google.jpg')} style={styles.google}/>
          </TouchableOpacity>
        </View>
      </ImageBackground>
      </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  topSection:{
    alignItems: 'center'
  },
  logo:{
    width: 80,
    height: 80,
    borderRadius: 20,
    marginTop: 30,
    marginBottom: 5,
  },
  title: {
    fontSize: 15,
    fontWeight:'bold',
    color:'rgb(100,100,100)',
    marginTop: 20,
    maxWidth:'60%',
    textAlign: 'center'
  },
  middleSection:{
    alignItems:'center',
    marginTop: 25,
  },
  input:{
    fontSize:15,
    padding: 15,
    backgroundColor: 'rgb(250,250,250)',
    width: '80%',
    borderRadius: 5,
    color:'black',
    marginBottom: 15,
  },
  middleSecond:{
    paddingHorizontal: 35
  },
  forgetWord:{
    alignSelf:'flex-end',
  },
  password:{
    fontSize:13,
    color: 'black',
    fontWeight: '500',
  },
  signin:{
    padding: 15,
    backgroundColor: 'rgb(180, 180, 180)',
    marginVertical: 20,
    borderRadius: 5,
    shadowColor: 'rgb(100, 100, 100)',
    shadowOffset : {
        width: 0,
        height: 2
    },
    shadowOpacity: 0.8,
    shadowRadius: 3,
  },
  textSign: {
    fontSize: 16,
    fontWeight: '700',
    color: 'black',
    textAlign: 'center',
  },
  createAc: {
    alignItems: 'center',
    marginVertical: 10
  },
  textAc:{
    fontSize: 13,
    fontWeight: '500'
  },
  bottomSection:{
    alignItems: 'center',
    marginVertical: 40
  }, 
  textOr:{
    fontSize:13,
    fontWeight: '500'
  },
  google:{
    width: 35,
    height: 35,
    borderRadius: 10,
    marginTop: 20
  },

});

export default LoginScreen;

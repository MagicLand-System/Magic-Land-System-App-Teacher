import { View, Text, Image, TextInput, StyleSheet, ActivityIndicator, Alert, ScrollView, Dimensions, Button, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import MainButton from "../components/MainButton";
import { register } from "../api/auth";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useFonts, Inter_400Regular } from '@expo-google-fonts/inter';
import { Baloo2_700Bold } from '@expo-google-fonts/baloo-2';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { CheckBox } from "@rneui/themed";
import DateTimePicker from '@react-native-community/datetimepicker';
import LoadingModal from "../components/LoadingModal";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { format } from 'date-fns';
import { firebaseConfig } from "../firebase.config";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function FillInfoScreen() {
  const routes = useRoute();
  const phone = routes.params?.phone;

  const navigation = useNavigation()
  const [loading, setLoading] = useState(false)
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Baloo2_700Bold,
  })

  const [isShowDatePicker, setShowDatePicker] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState(new Date(new Date().getFullYear() - 3, new Date().getMonth(), new Date().getDate()))
  const [gender, setGender] = useState('Khác')
  const [address, setAddress] = useState(null)
  const [addressError, setAddressError] = useState(null)

  if (!fontsLoaded) {
    return null
  }
  const registerValidationSchema = Yup.object().shape({
    fullName: Yup.string().required("Vui lòng nhập họ và tên").matches(/(\w.+\s).+/, 'Vui lòng nhập ít nhất 2 từ'),
    email: Yup.string().email("Vui lòng nhập đúng email").required("Vui lòng nhập email"),
  })
  return (
    <KeyboardAwareScrollView keyboardShouldPersistTaps="always" contentContainerStyle={styles.container}>
      {loading && (<LoadingModal />)}
      <Formik
        initialValues={{
          fullName: '',
          email: '',
        }}
        onSubmit={async values => {
          try {
            if (address && address !== '') {
              setLoading(true)
              setAddressError(null)
              const data = await register({ ...values, phone, gender, dateOfBirth: dateOfBirth.toISOString(), address })
              if (data) {
                setLoading(false)
                Alert.alert("Đăng kí thành công")
                navigation.navigate('Login')
              }
            } else {
              setAddressError("Vui lòng nhập địa chỉ")
            }
          } catch (error) {
            setLoading(false)
            Alert.alert("Đăng kí thất bại")
            console.log(error)
          }
        }}
        validationSchema={registerValidationSchema}>
        {({
          handleChange,
          handleSubmit,
          handleBlur,
          values,
          errors,
          touched,
          isValid,
        }) => (
          <>
            <Text style={styles.title}>Thông tin</Text>
            <View style={styles.input}>
              <Text style={styles.inputTitle}> <Text style={{ color: 'red' }}>* </Text>Họ và tên</Text>
              <TextInput
                placeholder="Họ và tên"
                name='fullName'
                value={values.fullName}
                onChangeText={handleChange('fullName')}
                onBlur={handleBlur('fullName')}
                style={styles.textInput}
              />
              <View style={{ height: 25, width: '75%', justifyContent: 'center' }}>
                {errors.fullName && touched.fullName &&
                  <Text style={{ fontSize: 12, color: 'red' }}>{errors.fullName}</Text>
                }
              </View>
            </View>
            <View style={styles.input}>
              <Text style={styles.inputTitle}> <Text style={{ color: 'red' }}>* </Text>Email</Text>
              <TextInput
                placeholder="Email"
                name='email'
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                style={styles.textInput}
                keyboardType="email-address"
              />
              <View style={{ height: 25, width: '75%', justifyContent: 'center' }}>
                {errors.email && touched.email &&
                  <Text style={{ fontSize: 12, color: 'red' }}>{errors.email}</Text>
                }
              </View>
            </View>
            <View style={styles.input}>
              <Text style={styles.inputTitle}> <Text style={{ color: 'red' }}>* </Text>Ngày sinh</Text>
              <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateInput}>
                <Text style={styles.dateText}>{format(dateOfBirth, 'dd/MM/yyyy')}</Text>
              </TouchableOpacity>
              {isShowDatePicker && (
                <DateTimePicker
                  value={dateOfBirth}
                  maximumDate={new Date(new Date().getFullYear() - 3, new Date().getMonth(), new Date().getDate())}
                  onChange={(event, selectedDate) => {
                    setShowDatePicker(false)
                    setDateOfBirth(selectedDate)
                  }}
                  mode='date'
                />
              )}
            </View>
            <View style={styles.input}>
              <Text style={styles.inputTitle}> <Text style={{ color: 'red' }}>* </Text>Giới tính</Text>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <CheckBox
                    checked={gender === 'Nữ'}
                    onPress={() => setGender('Nữ')}
                    iconType="material-community"
                    checkedIcon="radiobox-marked"
                    uncheckedIcon="radiobox-blank"
                  />
                  <Text style={{ fontSize: 15, fontFamily: 'Inter_400Regular' }}>Nữ</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <CheckBox
                    checked={gender === 'Nam'}
                    onPress={() => setGender('Nam')}
                    iconType="material-community"
                    checkedIcon="radiobox-marked"
                    uncheckedIcon="radiobox-blank"
                  />
                  <Text style={{ fontSize: 15, fontFamily: 'Inter_400Regular' }}>Nam</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <CheckBox
                    checked={gender === 'Khác'}
                    onPress={() => setGender('Khác')}
                    iconType="material-community"
                    checkedIcon="radiobox-marked"
                    uncheckedIcon="radiobox-blank"
                  />
                  <Text style={{ fontSize: 15, fontFamily: 'Inter_400Regular', marginRight: 20 }}>Khác</Text>
                </View>
              </View>
            </View>
            <View style={styles.input}>
              <Text style={styles.inputTitle}> <Text style={{ color: 'red' }}>* </Text>Địa chỉ</Text>
              {/* <GooglePlacesAutocomplete
                styles={{
                  textInput: styles.textInput,
                  poweredContainer: {height: 0},
                  powered: {width: 0, height: 0}
                }}
                placeholder='Địa chỉ'
                onPress={(data, details = null) => {
                  setAddress(data.description)
                }}
                query={{
                  key: firebaseConfig.apiKey,
                  language: 'vi',
                  components: 'country:vn',
                }}
                onFail={error => console.log(error)}
              /> */}
              <TextInput
                placeholder="Địa chỉ"
                name='Địa chỉ'
                value={address}
                onChangeText={setAddress}
                styles={styles.textInput}
              />
              <View style={{ height: 25, width: '75%', justifyContent: 'center' }}>
                {addressError &&
                  <Text style={{ fontSize: 12, color: 'red' }}>{addressError}</Text>
                }
              </View>
            </View>
            <MainButton onPress={handleSubmit} title="Xác nhận" />
          </>
        )}
      </Formik>
      <Image source={require('./../assets/images/logo.png')} style={styles.logo} />
    </KeyboardAwareScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    minHeight: HEIGHT,
  },
  title: {
    color: '#3A0CA3',
    fontSize: 28,
    textAlign: 'center',
    fontFamily: "Baloo2_700Bold",
    marginBottom: 40,
    marginTop: 80,
  },
  input: {
    width: '75%'
  },
  inputTitle: {
    fontFamily: 'Inter_400Regular',
    marginBottom: 5,
    fontSize: 14,
  },
  textInput: {
    height: 40,
    borderColor: '#3A0CA3',
    borderStyle: 'solid',
    borderWidth: 0.5,
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    borderRadius: 5,
    paddingLeft: 10,
  },
  dateInput: {
    height: 40,
    borderColor: '#3A0CA3',
    borderStyle: 'solid',
    borderWidth: 0.5,
    borderRadius: 5,
    paddingLeft: 10,
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 14,
  },
  dateText: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
  },
  logo: {
    marginTop: 20,
    alignSelf: 'center',
    width: 120,
    height: 120,
    marginBottom: 10,
  },
})
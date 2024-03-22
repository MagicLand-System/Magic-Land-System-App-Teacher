import { View, Text, Image, StyleSheet, Dimensions, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../components/header/Header';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { getAttendanceList, getEvaluatesList, takeEvaluates } from '../../api/teacher';
import { checkCurrentDate } from '../../util/util';

// import unhappyIcon from "../../../assets/rateIcon/unhapppyIcon.png"
// import happyIcon from "../../../assets/rateIcon/happyIcon.png"
// import ContentedIcon from "../../../assets/rateIcon/ContentedIcon.png"

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function RateStudentScreen({ route, navigation }) {
  const classDetail = route.params.classDetail
  const noSession = route.params.noSession
  const date = route.params.date
  const [studentList, setStudentList] = useState([])
  const [studentTmpList, setStudentTmpList] = useState([])
  const [searchValue, setSearchValue] = useState("")
  const [editMode, setEditMode] = useState(false)

  useEffect(() => {
    loadStudentData()
  }, [route.params.classDetail])

  const loadStudentData = async () => {
    const response = await getEvaluatesList(classDetail.classId, noSession);
    if (response?.status === 200) {
      let data = response?.data;
      data[0].evaludateInfors = data[0].evaludateInfors.map(info => {
        return { ...info, level: info?.level === 0 ? 2 : info?.level };
      });
      setStudentList(data);
      setStudentTmpList(data);
    }
  }

  const handleClearAttend = () => {
    const updateArray = [...studentList]
    updateArray.forEach(item => item.status = false)
    setStudentList(updateArray)
  }

  const getAttendList = () => {
    const attendList = studentList.filter(obj => obj.status === true);
    return attendList
  }

  const changeRate = (id, rate) => {
    if (editMode) {
      const index = studentTmpList[0]?.evaludateInfors?.findIndex(obj => obj.studentId === id);
      const updateArray = JSON.parse(JSON.stringify(studentTmpList))
      updateArray[0].evaludateInfors[index].level = rate;
      setStudentTmpList(updateArray)
    }
  }

  const handleCompleteEditing = async () => {
    const data = {
      classId: classDetail.classId,
      studeEvaluateRequests: studentTmpList[0].evaludateInfors
    }
    const response = await takeEvaluates(data, noSession)
    if (response?.status === 200) {
      setStudentList(JSON.parse(JSON.stringify(studentTmpList)))
      setEditMode(false)
    } else {
      console.log("complete takeEvaluates");
    }
  }

  const handleClearEditing = () => {
    setStudentTmpList(JSON.parse(JSON.stringify(studentList)))
    setEditMode(false)
  }

  const handleSetEditing = () => {
    setStudentTmpList(JSON.parse(JSON.stringify(studentList)))
    setEditMode(true)
  }

  const filterByStudentName = (studentList, search) => {
    if (search === "") {
      return studentList[0]?.evaludateInfors
    } else {
      return studentList[0]?.evaludateInfors?.filter(student => student.studentName.toLowerCase().includes(search.toLowerCase()));
    }
  }

  return (
    <>
      <Header navigation={navigation} title={classDetail.title} goback={() => navigation.pop()} />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <View style={styles.titleView}>
          <Text style={styles.title}>Danh sách lớp:</Text>
        </View>
        <View style={styles.searchBar}>
          <Icon name={"search-web"} color={"#908484"} size={28} />
          <TextInput value={searchValue} onChangeText={setSearchValue} style={styles.searchField} placeholder={"Tìm kiếm học viên..."} placeholderTextColor="#B8B8D2" />
        </View>
        <View style={styles.studentList}>
          <View style={{ ...styles.tableColumn, backgroundColor: "#2414686B" }}>
            <Text style={styles.columnNumber}>STT</Text>
            <Text style={styles.columnName}>Tên học viên</Text>
            <Text style={styles.columnStatus}>Trạng thái</Text>
            <Text style={styles.columnNote}>Ghi chú</Text>
          </View>
          {
            filterByStudentName((editMode ? studentTmpList : studentList), searchValue)?.map((item, index) => {
              return (
                <TouchableOpacity
                  // onPress={() => handleCheckAttend(item.id)}
                  style={{ ...styles.tableColumn, borderBottomWidth: 1 }}
                  key={index}>
                  <View style={styles.columnNumber}>
                    <Text style={{ ...styles.boldText, marginHorizontal: 10, marginRight: 2 }}>{index + 1}</Text>
                    <Icon name={"account-circle"} color={"#908484"} size={WIDTH * 0.13} />
                  </View>
                  <Text style={styles.columnName}>{item?.studentName}</Text>
                  <View style={styles.columnStatus}>
                    <TouchableOpacity onPress={() => changeRate(item.studentId, 1)} style={{ marginRight: 10 }}>
                      {
                        item.level === 1 ?
                          <Icon name={"emoticon-sad-outline"} color={"#F86565"} size={25} />
                          :
                          <Icon name={"emoticon-sad-outline"} color={"#B6C8E2"} size={25} />
                      }
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => changeRate(item.studentId, 2)} style={{ marginRight: 10 }}>
                      {
                        item.level === 2 ?
                          <Icon name={"emoticon-neutral-outline"} color={"#7B61FF"} size={25} />
                          :
                          <Icon name={"emoticon-neutral-outline"} color={"#B6C8E2"} size={25} />
                      }
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => changeRate(item.studentId, 3)}>
                      {
                        item.level === 3 ?
                          <Icon name={"emoticon-happy-outline"} color={"#229A89"} size={25} />
                          :
                          <Icon name={"emoticon-happy-outline"} color={"#B6C8E2"} size={25} />
                      }
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.columnNote}>{item.note}</Text>
                </TouchableOpacity>
              )
            })
          }
        </View>
        {
          editMode &&
          <View style={styles.buttonPack}>
            <TouchableOpacity style={{ ...styles.buttonView, backgroundColor: "#DC4646" }} onPress={handleClearEditing}>
              <Text style={{ ...styles.boldText, width: "100%", color: "white" }}>Hủy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ ...styles.buttonView, backgroundColor: "#241468" }} onPress={handleCompleteEditing}>
              <Text style={{ ...styles.boldText, width: "100%", color: "white" }}>Lưu</Text>
            </TouchableOpacity>
          </View>
        }
        <View style={{ height: 40 }} />
      </ScrollView>
      {
        (!editMode && studentList[0] && checkCurrentDate(date)) &&
        <TouchableOpacity style={{ ...styles.editButton, bottom: editMode ? HEIGHT * 0.15 : HEIGHT * 0.05 }} onPress={handleSetEditing}>
          <Icon name={"circle-edit-outline"} color={"white"} size={28} />
        </TouchableOpacity>
      }
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    height: HEIGHT,
    flex: 1,
    backgroundColor: 'white',
  },
  titleView: {
    flexDirection: "row",
    marginHorizontal: 20,
    borderLeftWidth: 5,
    borderLeftColor: "#4582E6",
    marginVertical: 15,
    alignItems: "center"
  },
  title: {
    marginLeft: 5,
    color: "#4582E6",
    fontWeight: "600",
    fontSize: 18,
  },
  tableColumn: {
    flexDirection: "row",
    width: WIDTH,
    minHeight: 80,
    alignItems: "center",
  },
  columnNumber: {
    flexDirection: "row",
    width: "25%",
    paddingLeft: 20,
    alignItems: "center",
  },
  columnName: {
    width: "25%",
    paddingLeft: 5
  },
  columnStatus: {
    flexDirection: "row",
    width: "25%",
    paddingLeft: 5,
    alignItems: "center",
    marginRight: 10,
  },
  columnNote: {
    width: "25%",
    paddingLeft: 5
  },
  checkIcon: {
    padding: 2,
    borderRadius: 50,
    marginHorizontal: 5,
    backgroundColor: "#BFE3C6"
  },
  boldText: {
    width: "20%",
    fontWeight: "600"
  },
  buttonPack: {
    flexDirection: "row",
    marginVertical: 50,
    justifyContent: "space-around",
    alignItems: "center"
  },
  buttonView: {
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderWidth: 1,
    borderColor: "#241468",
    borderRadius: 10
  },
  editButton: {
    position: "absolute",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#4582E6",
    right: WIDTH * 0.05,
    bottom: HEIGHT * 0.05
  },

  searchBar: {
    width: WIDTH * 0.8,
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingRight: 25,
    borderWidth: 1,
    borderColor: "#000000",
    marginHorizontal: WIDTH * 0.1,
    marginBottom: 30,
    backgroundColor: '#FFFFFF',
    flexDirection: "row",
    alignItems: "center",
  },
  searchField: {
    width: "85%",
    paddingLeft: 10,
    marginVertical: 15,
  }
})
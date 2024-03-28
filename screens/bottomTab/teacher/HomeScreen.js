import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { useSelector } from 'react-redux';
import { userSelector } from '../../../store/selector';

import SearchBar from '../../../components/SearchBar';
import ClassCartCard from '../../../components/ClassCartCard';
import NofiticationCard from '../../../components/NofiticationCard';
import { getAllAttendanceClass } from '../../../api/teacher';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const noficationListDefault = [
  {
    title: "Nhắc nhở điểm danh:",
    message: "Bạn có lớp học TTD1 - Offline, Thứ 5-06/01/2024 vào lúc 19h30 - 21H chưa cập nhập điểm danh. Vui lòng cập nhật điểm danh.",
    time: "1 giờ trước"
  },
  {
    title: "Nhắc nhở chấm bài:",
    message: "Các bé lớp VCB1 - Offline, Thứ 5-06/01/2024 vào lúc 19h30 - 21H đã nộp đủ bài tập rồi. Hãy cùng xem và chấm đánh giá nào.",
    time: "1 giờ trước"
  },
]

export default function HomeScreen({ navigation }) {

  const [searchValue, setSearchValue] = useState("")
  const [classList, setClassList] = useState([])
  const [noficationList, setNoficationList] = useState(noficationListDefault)
  const [filterVisible, setFilterVisible] = useState(false)
  const [filterValue, setFilterValue] = useState({ type: undefined })
  const user = useSelector(userSelector);

  useEffect(() => {
    loadClassData()
  }, [])

  const loadClassData = async () => {
    const response = await getAllAttendanceClass()
    if (response?.status === 200) {
      setClassList(response?.data)
    } else {
      console.log("get class list fail");
    }
  }

  const handleSearch = (value) => {
    setSearchValue(value)
  }

  const hanldeViewWorkSchedule = (item) => {
    navigation.push("ClassOptionScreen", { classId: item?.classId, date: new Date(), slot: item?.slotOrder, noSession: item?.noSession })
  }

  const optionList = [
    {
      label: "Điểm danh",
      onPress: (item) => {
        navigation.push("AttendanceScreen", { classDetail: item, date: item?.date, slot: item?.slotOrder })
      }
    },
    {
      label: "Đánh giá",
      onPress: (item) => {
        navigation.push("RateStudentScreen", { classDetail: item, date: item?.date, noSession: item?.noSession })
      }
    },
  ]

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={{ ...styles.flexBetweenColumn, paddingHorizontal: 20 }}>
            <View style={styles.headerInforLeft}>
              <Text style={{ color: "white" }}>Xin chào!</Text>
              <Text style={{ fontWeight: "700", fontSize: 18, color: "white" }}>GV: {user.fullName}</Text>
            </View>
            <View style={styles.headerInforRight}>
              <View style={styles.flexBetweenColumn}>
                <TouchableOpacity style={styles.iconNavigate}>
                  <Icon name={"bell"} color={"#ffffff"} size={28} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.searchBar}>
            <SearchBar input={searchValue} setInput={handleSearch} setFilterModal={setFilterVisible} placeHolder={"Tìm kiếm khóa học..."} />
          </View>
        </View>
        <View style={styles.titleView}>
          <Text style={styles.title}>Lớp học hôm nay:</Text>
        </View>
        <ScrollView style={styles.classList}>
          {
            classList.map((item, key) => (
              <ClassCartCard
                cardDetail={item}
                index={key}
                check={false}
                priceHidden={true}
                timeType={"onDate"}
                onClick={() => hanldeViewWorkSchedule(item)}
                buttonList={optionList}
                key={key}
              />
            ))
          }
        </ScrollView>
        <View style={styles.titleView}>
          <Text style={styles.title}>Thông báo:</Text>
        </View>
        <ScrollView style={styles.noficationList}>
          {
            noficationList.map((item, key) => (
              <NofiticationCard notificationDetail={item} onClick={hanldeViewWorkSchedule} key={key} />
            ))
          }
        </ScrollView>
      </ScrollView>
    </View >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollView: {
    flex: 1
    // paddingBottom: 80,
    // marginBottom: 15,
  },
  title: {
    marginVertical: 10,
    marginHorizontal: WIDTH * 0.05,
    color: "#4582E6",
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center"
  },
  searchBar: {
    width: WIDTH * 0.9,
    marginHorizontal: WIDTH * 0.05,
    marginTop: 20,
  },
  courseList: {
    flex: 1
  },
  courseListHead: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  header: {
    backgroundColor: "#241468",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    paddingBottom: 20
  },
  headerInforLeft: {
    marginTop: 10,
  },
  iconNavigate: {
    marginHorizontal: 10
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
  classList: {
    maxHeight: HEIGHT * 0.45,
    paddingLeft: WIDTH * 0.05,
  },

  flexColumn: {
    flexDirection: "row",
    alignItems: "center",
  },
  flexBetweenColumn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  boldText: {
    fontWeight: "600",
  },
});
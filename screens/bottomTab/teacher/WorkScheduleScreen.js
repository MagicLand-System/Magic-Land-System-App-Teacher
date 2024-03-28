import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, Dimensions, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import StudentView from '../../../components/StudentView';
import { Agenda, Calendar, CalendarProvider, LocaleConfig, WeekCalendar } from 'react-native-calendars';
import Header from '../../../components/header/Header';
import { getWorkSchedule } from '../../../api/teacher';
import { formatTime, shortedTime } from '../../../util/util';
import ClassCartCard from '../../../components/ClassCartCard';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function WorkScheduleScreen({ navigation }) {

  const [dateList, setDateList] = useState([])
  const [dateSelected, setDateSelected] = useState(new Date);
  const [calendarType, setCalendarType] = useState("month")

  LocaleConfig.locales['fr'] = {
    // 'Tháng 1','Tháng 2','Tháng 3','Tháng 5','Tháng 7','Tháng 9','Tháng 11','Tháng 12'
    monthNames: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 5', 'Tháng 7', 'Tháng 9', 'Tháng 11', 'Tháng 12'],
    monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
    dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
    dayNamesShort: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
    today: 'Aujourd\'hui'
  };
  LocaleConfig.defaultLocale = 'fr';

  useEffect(() => {
    loadScheduleData()
  }, [])

  const loadScheduleData = async () => {
    const response = await getWorkSchedule()
    if (response?.status === 200) {
      const newDate = new Date().toISOString()
      setDateList(response?.data)
      setDateSelected(newDate)
    } else {
      console.log("loadScheduleData fail ", response?.response?.data);
    }
  }

  const handleClassNavigate = (classDetail) => {
    // console.log(classDetail);courseItem
    // navigation.push("ClassOptionScreen", { classId: classDetail?.classId, date: dateSelected, slot: classDetail?.slot?.slotOrder })
    // navigation.push("TeacherCourseSyllabus", { classId: classDetail?.classId, date: dateSelected, slot: classDetail?.slot?.slotOrder })
    navigation.push("TeacherCourseSyllabus", { courseDetail: classDetail })
    // console.log(classDetail);
  }

  const getCurrentDate = (date) => {
    const currentDate = dateList.filter(item => String(item.date).substring(0, 10) === date?.dateString?.substring(0, 10))
    // const currentDate = []
    // console.log(dateList.map(item => item.date));
    return currentDate
  }

  const formatDataAgenda = () => {
    const formattedAgendaData = {};

    dateList.forEach(item => {
      const agendaDate = item.date.split("T")[0];
      if (!formattedAgendaData[agendaDate]) {
        formattedAgendaData[agendaDate] = [];
      }
      formattedAgendaData[agendaDate].push(item);
    });
    return formattedAgendaData
  }

  function formatScheduleDate(inputDate) {
    const daysOfWeek = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
    const months = [
      'tháng 1', 'tháng 2', 'tháng 3', 'tháng 4', 'tháng 5', 'tháng 6',
      'tháng 7', 'tháng 8', 'tháng 9', 'tháng 10', 'tháng 11', 'tháng 12'
    ];

    const date = new Date(inputDate);
    const dayOfWeek = daysOfWeek[date.getDay()];
    const dayOfMonth = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${dayOfWeek}, ngày ${dayOfMonth} ${month} năm ${year}`;
  }

  const renderAttendanceStatus = (attendanceStatus) => {
    // switch (attendanceStatus) {
    //   case value:

    //     break;

    //   default:
    //     break;
    // }
    return (
      <Text style={{
        textTransform: "capitalize",
        color: "#888",
      }}>   {attendanceStatus}</Text>
    );
  };

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
    <>
      <Header navigation={navigation} title={"Lich Làm Việc"} goback={() => navigation.navigate("Root")} />
      <View showsVerticalScrollIndicator={false} style={styles.container}>
        <View style={styles.titleView}>
          <Text style={styles.title}>Lịch học:</Text>
        </View>
        <View style={styles.calendarView}>
          <View style={{ ...styles.flexColumnBetween, marginVertical: 20 }}>
            <Text style={{ ...styles.boldText, fontSize: 12 }}>{formatScheduleDate(dateSelected)}</Text>
            <View style={{ ...styles.flexColumn, borderWidth: 1, borderRadius: 10, overflow: "hidden" }}>
              <TouchableOpacity style={{ ...styles.changeTypeButton, backgroundColor: calendarType === "month" ? "#241468" : "white" }} onPress={() => { setCalendarType("month") }}>
                <Text style={{ ...styles.boldText, fontSize: 10, color: calendarType === "month" ? "white" : "#888888" }}>Tháng</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ ...styles.changeTypeButton, borderRightWidth: 0, backgroundColor: calendarType === "day" ? "#241468" : "white" }} onPress={() => { setCalendarType("day") }}>
                <Text style={{ ...styles.boldText, fontSize: 10, color: calendarType === "day" ? "white" : "#888888" }}>Ngày</Text>
              </TouchableOpacity>
            </View>
          </View>
          {
            calendarType === "month" &&
            <>
              <Agenda
                onDayPress={(date) => { setDateSelected(date.dateString) }}
                selected={dateSelected}
                items={
                  formatDataAgenda()
                }
                renderItem={(item) => (
                  <TouchableOpacity style={styles.item} onPress={() => { setDateSelected(item?.date); setCalendarType("day") }}>
                    <Text style={{ ...styles.boldText }}>{shortedTime(item?.slot?.startTime)} - {shortedTime(item?.slot?.endTime)}</Text>
                    <Text style={{ ...styles.boldText }}>{item?.className} - <Text style={{ textTransform: "capitalize" }}> {item?.method} </Text> {renderAttendanceStatus(item?.attendanceStatus)} </Text>
                    <Text style={{ ...styles.itemText }}>Phòng {item?.room?.name ? item.room.name : 'N/A'} - Lầu {item?.room?.floor ? item.room.floor : 'N/A'}</Text>
                  </TouchableOpacity>
                )}
              />
              <View style={styles.noteView}>
                <View style={{ ...styles.noteHaft, backgroundColor: "#F6F2E5" }}>
                  <Text style={styles.noteTitle}>Ngày nghỉ</Text>
                  <View style={styles.flexColumn}>
                    <Text style={{ ...styles.boldText, color: "#EAB756", marginRight: 10 }}>1/1</Text>
                    <Text >Tết Tây</Text>
                  </View>
                </View>
                <View style={{ ...styles.noteHaft, backgroundColor: "#F4F4F4" }}>
                  <Text style={styles.noteTitle}>Chú thích</Text>
                  <View style={styles.flexColumn}>
                    <View style={{ ...styles.exampleView, backgroundColor: "#52ACFF80" }} />
                    <Text >Sáng</Text>
                  </View>
                  <View style={styles.flexColumn}>
                    <View style={{ ...styles.exampleView, backgroundColor: "#FF95CE80" }} />
                    <Text >Chiều</Text>
                  </View>
                  <View style={styles.flexColumn}>
                    <View style={{ ...styles.exampleView, backgroundColor: "#92C88D80" }} />
                    <Text >Tối</Text>
                  </View>
                </View>
              </View>
            </>
          }

          {
            calendarType === "day" &&
            getCurrentDate({ dateString: dateSelected }).map((item, index) => {
              return (
                <ClassCartCard
                  cardDetail={item}
                  check={false}
                  index={index}
                  priceHidden={true}
                  timeType={"onDate"}
                  onClick={() => handleClassNavigate(item)}
                  background={"#C8A9F1"}
                  buttonList={optionList}
                  key={index}
                />
              )
            })
          }

        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  studentList: {
    padding: 20,
    paddingLeft: 20
  },
  studentView: {
    // width: WIDTH * 0.7,
    marginRight: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  studentImage: {
    position: "relative",
    width: WIDTH * 0.15,
    height: WIDTH * 0.15,
    borderWidth: 3,
    borderRadius: 150,
    borderColor: "#888888",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#D9D9D9",
  },
  studentCheck: {
    position: "absolute",
    right: 0,
    top: 0,
    padding: 2,
    borderRadius: 50,
    backgroundColor: "",
  },
  studentNameView: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 50,
    marginTop: 10,
    backgroundColor: "#C4C4C4"
  },
  studentName: {
    fontWeight: "600",
    fontSize: 12,
    color: "#888888"
  },
  statusCircle: {
    width: 12,
    height: 12,
    borderRadius: 50,
    marginRight: 2,
  },
  classColumn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  classTitle: {
    color: "#DA5742",
    fontWeight: "700",
    fontSize: 16,
  },
  classRoom: {
    color: "#8F9BB3"
  },
  circle: {
    padding: 3,
    borderWidth: 4,
    borderColor: "#0095FF",
    borderRadius: 50,
    marginRight: 10,
  },

  flexColumnBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  flexColumn: {
    flexDirection: "row",
    alignItems: "center"
  },

  calendarView: {
    width: WIDTH * 0.95,
    height: HEIGHT * 0.82,
    padding: 5,
    borderWidth: 1,
    borderColor: "#C2C2C2",
    borderRadius: 15,
    marginHorizontal: WIDTH * 0.025
  },
  changeTypeButton: {
    padding: 10,
    borderRightWidth: 1
  },
  customDate: {
    width: "95%",
    height: HEIGHT * 0.09,
    padding: 3,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#C2C2C2"
  },
  selectedDate: {
    backgroundColor: "rgba(0,0,0,0.1)"
  },
  scheduleItem: {
    backgroundColor: "#FF95CE80",
    paddingHorizontal: 1,
    borderRadius: 5,
    marginBottom: 3,
  },
  scheduleText: {
    color: "#F52798",
    fontWeight: "600"
  },
  classWeekCard: {
    padding: 20,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#FFCAE7",
    marginVertical: 5,
  },
  noteView: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10
  },
  noteHaft: {
    width: "49%",
    height: "100%",
    padding: 20,
    paddingVertical: 10,
    borderRadius: 15,
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },
  exampleView: {
    width: "8%",
    height: 10,
    borderRadius: 15,
    marginRight: 10
  },
  item: {
    backgroundColor: 'rgb(197,217,254)',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  itemText: {
    color: '#888',
    fontSize: 16,
  }
});

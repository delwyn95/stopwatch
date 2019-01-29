import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, ScrollView } from "react-native";
import moment from "moment";

const DATA = {
  timer: 1234567,
  laps: [12345, 2345, 34567, 98765]
};
// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android:
//     'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });
function Timer({ interval, style }) {
  const duration = moment.duration(interval);
  const centiseconds = Math.floor(duration.milliseconds() / 10);
  return (
    <Text style={style}>
      {duration.minutes()}:{duration.seconds()},{centiseconds}
    </Text>
  );
}
function RoundButton({ title, color, background }) {
  return (
    <View style={[styles.button, { backgroundColor: background }]}>
      <View style={[styles.buttonBorder]}>
        <Text style={[styles.buttonTitle, { color }]}>{title}</Text>
      </View>
    </View>
  );
}
function Lap({ number, interval, fastest, slowest }) {
  const lapStyle = [
    styles.lap,
    fastest && styles.fastest,
    slowest && styles.slowest,
  ]
  return (
    <View style={lapStyle}>
    {/* //links to the top */}
      <Text style={styles.lapText}>Lap {number}</Text>
      <Timer style={styles.lapText} interval={interval} />
    </View>
  );
}
function LapsTable({ laps }) {
  const finishedLaps = laps.slice(1);
  let min = Number.MAX_SAFE_INTEGER;
  let max = Number.MIN_SAFE_INTEGER;
  if(finishedLaps.length >= 2){
    finishedLaps.forEach(lap => {
      if (lap <min) min = lap;
      if (lap>max) max = lap;
    });
  }
  return (
    <ScrollView style={styles.scrollView}>
      {laps.map((lap, index) => (
        <Lap
          number={laps.length - index}
          key={laps.length - index}
          interval={lap}
          slowest = {lap == min}
        />
      ))}
    </ScrollView>
  );
}
function ButtonsRow({ children }) {
  return <View style={styles.buttonsRow}>{children}</View>;
}
export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Timer interval={DATA.timer} style={styles.timer} />
        <ButtonsRow>
          <RoundButton title="Reset" color="#FFFFFF" background="#3D3D3D" />
          <RoundButton title="Start" color="#50D167" background="#1B361F" />
        </ButtonsRow>
        <LapsTable laps={DATA.laps} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#0D0D0D",
    paddingTop: 130,
    paddingHorizontal: 20
  },
  timer: {
    color: "#FFFFFF",
    fontSize: 76,
    fontWeight: "200"
  },
  button: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonTitle: {
    fontSize: 18
  },
  buttonBorder: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonsRow: {
    flexDirection: "row",
    alignSelf: "stretch",
    justifyContent: "space-between",
    marginTop: 80,
    marginBottom:30,
  },
  lapText: {
    color: "#FFFFFF",
    fontSize:18,
  },
  lap: {
    flexDirection:'row',
    justifyContent: 'space-between',
    borderColor:'#151515',
    borderTopWidth: 1,
    paddingVertical: 10,
  },
  scrollView: {
    alignSelf: 'stretch',
  },
  fastest: {
    color:'#4BC05F'
  },
  slowest:{
    color:'#CC3531',
  }
});

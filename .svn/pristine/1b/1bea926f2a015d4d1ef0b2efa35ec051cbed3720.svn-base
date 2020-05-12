







export const timeFormatFilter = (time) => {
  // console.log('什么',time)
  if (!time || time === 0) return ''
  let date = new Date(time)
  let year = date.getFullYear();//年
  let month = date.getMonth() + 1;
  if (month < 10) {
    month = "0" + month;
  }
  let day = date.getDate();//日
  if (day < 10) {
    day = "0" + day;
  }

  let hours = date.getHours();//小时
  if (hours < 10) {
    hours = "0" + hours;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  let seconds = date.getSeconds();
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  //拼串
  var str = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
  return str;
}
//日期转化为 年-月-日 2019-11-12
export const dataFormat = (time) => {
  if (!time) return ''
  let date = new Date(time * 1000)
  let year = date.getFullYear();//年
  let month = date.getMonth() + 1;
  if (month < 10) {
    month = "0" + month;
  }
  let day = date.getDate();//日
  if (day < 10) {
    day = "0" + day;
  }
  var str = year + "-" + month + "-" + day;
  return str

}

// 
export const uuid =() =>{
  let s = [];
  let hexDigits = "0123456789abcdef";
  for (var i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = "";

  var uuid = s.join("");
  return uuid;
}
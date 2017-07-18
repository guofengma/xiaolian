 export let evalue = (param) => {
  if (param == "0"){
    return "非常满意"
  } else if (param == "1"){
    return "满意"
  } else if (param == "2"){
    return "不满意"
  }
};

 export function formatTime(date) {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()

    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()


    return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
 }

 function formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
 }


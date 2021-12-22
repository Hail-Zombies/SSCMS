function back_history() {
    history.back();
}

//转换时间格式
function parseDateTime(update_time) {
    var list = update_time.split(" ");
    var date = list[0].split("-");
    var time = list[1].split(":");
    var day = new Date(Date.parse(date[1] + "/" + date[2] + "/" + date[0]));
    var today = new Array('星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六');
    var week = today[day.getDay()];
    return date[0] + "年" + date[1] + "月" + date[2] + "日（" + week + "）" +
        time[0] + ":" + time[1];
}

function parseDate(update_time) {
    var list = update_time.split(" ");
    var date = list[0].split("-");
    return `[` + date[1] + `-` + date[2] + `]`;
}
/**
 *   0 ~ 5 || 18 ~ 24  晚上
 *   5 ~ 11 早上
 *  11 ~ 14 中午
 *  14 ~ 17 下午
 * @param date 时间
 */
export const getTimeZone = (date?: Date) => {
  let timeZone = "";
  let time = (date ? new Date(date) : new Date()).getHours();
  if (time < 11 && time >= 5) {
    timeZone = "早上";
  } else if (time >= 11 && time < 14) {
    timeZone = "中午";
  } else if (time >= 14 && time < 17) {
    timeZone = "下午";
  } else {
    timeZone = "晚上";
  }
  return timeZone;
};

export const getPromissionTabs = (promission: string[], tabs: Array<any>) =>
  tabs.filter((tab) => {
    let isPromission = true;
    for (let i = 0, l = tab.promission.length >> 0; i < l; i++) {
      if (!promission.includes(tab.promission[i])) {
        isPromission = false;
        break;
      }
    }
    return isPromission;
  });

/** UTC에서 날짜만 반환 */
export function dateFormat(date: string) {
  const splitDate = date.split("-");
  return splitDate[0] + "-" + splitDate[1] + "-" + splitDate[2].split("T")[0];
}

/** UTC에서 날짜와 시간 반환 */
export function timeFormat(date: string) {
  function timeSplit(time: string) {
    const splitTime = time.split(":");
    return splitTime[0] + ":" + splitTime[1];
  }
  const splitDate = date.split("-");
  return (
    splitDate[0].replace("20", "") +
    "." +
    splitDate[1] +
    "." +
    timeSplit(splitDate[2].replace("T", " ").replace("Z", ""))
  );
}

/** 문자열에서 숫자 추출 */
export function getIntFromString(string: string) {
  const regex = /[^0-9]/g;
  const result = string.replace(regex, "");
  return parseInt(result);
}

/** 마우스 클릭 시 줌인/아웃 이벤트 */
export function onMouseDown(
  e: React.MouseEvent,
  scale: number,
  enabled: boolean
) {
  const target = e.currentTarget as HTMLElement;
  if (target && enabled) {
    target.style.transition = "0.2s";
    if (scale) target.style.transform = `scale(${scale})`;
  }
}
export function onMouseUp(e: React.MouseEvent) {
  const target = e.currentTarget as HTMLElement;
  if (target) {
    target.style.transform = "scale(1)";
    target.style.transition = "0s";
  }
}
export function onMouseOut(e: React.MouseEvent) {
  const target = e.currentTarget as HTMLElement;
  if (target) {
    target.style.transform = "scale(1)";
    target.style.transition = "0s";
  }
}

/** 마우스 클릭 시 스타일 변경 - 사이드 메뉴 */
export function onSideMenuMouseDown(e: React.MouseEvent) {
  const target = e.currentTarget as HTMLElement;
  if (target) {
    target.classList.remove(
      "border-transparent",
      "lg:hover:bg-l-e",
      "lg:hover:dark:bg-d-4"
    );
    target.classList.add("border-h-1", "dark:border-f-8");
  }
}
export function onSideMenuMouseUp(e: React.MouseEvent) {
  const target = e.currentTarget as HTMLElement;
  if (target) {
    target.classList.remove("border-h-1", "dark:border-f-8");
    target.classList.add(
      "border-transparent",
      "lg:hover:bg-l-e",
      "lg:hover:dark:bg-d-4"
    );
  }
}

/** 배열 숨김 처리 */
export function hideUserName(name: string, lettersToShow: number) {
  let arr = name.slice(lettersToShow, name.length);
  let newName = name.slice(0, lettersToShow);
  for (let i = 0; i < arr.length; i++) newName += "*";
  return newName;
}

/** 시간 차이 */
export function timeDiff(time: string) {
  const currentTime = new Date();
  const createdTime = new Date(time);

  const diffTime = currentTime.getTime() - createdTime.getTime();
  const diffDay = diffTime / (24 * 60 * 60 * 1000);
  const diffHour = diffTime / (60 * 60 * 1000);

  return diffDay < 1
    ? Math.floor(diffHour) + "시간 전"
    : Math.floor(diffDay) + "일 전";
}

const ranges = [
  { divider: 1e6, suffix: "M" },
  { divider: 1e3, suffix: "k" },
];

/** 조회수 단위 변경 : 1000 => 1K */
export function changeNumberUnit(n: number | null) {
  if (n === null) {
    return "";
  } else {
    for (let i = 0; i < ranges.length; i++) {
      if (n >= ranges[i].divider) {
        return (n / ranges[i].divider).toFixed(1).toString() + ranges[i].suffix;
      }
    }
  }
  return n.toString();
}

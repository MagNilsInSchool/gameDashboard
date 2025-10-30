export const formatDateWeekdayDayMonthYear = (d: Date) => {
    const weekday = new Intl.DateTimeFormat("en-GB", { weekday: "long" }).format(d);
    const day = String(d.getDate()).padStart(2, "0");
    const month = new Intl.DateTimeFormat("en-GB", { month: "short" }).format(d);
    const year = d.getFullYear();
    return `${weekday}, ${day} ${month} ${year}`;
};

export const secondsToHMS = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return { hours, minutes, seconds };
};
export const secondsToMinutes = (totalSeconds: number) => {
    return Math.floor(totalSeconds / 60);
};

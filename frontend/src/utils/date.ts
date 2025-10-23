export const formatDateWeekdayDayMonthYear = (d: Date) => {
    const weekday = new Intl.DateTimeFormat("en-GB", { weekday: "long" }).format(d);
    const day = String(d.getDate()).padStart(2, "0");
    const month = new Intl.DateTimeFormat("en-GB", { month: "short" }).format(d);
    const year = d.getFullYear();
    return `${weekday}, ${day} ${month} ${year}`; // "Wednesday,15 Oct 2025"
};

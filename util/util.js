import { dayContrants } from "../constants/day";

export function truncateString(str, maxLength) {
    if (str?.length <= maxLength) {
        return str;
    } else {
        return str?.slice(0, maxLength - 3) + "...";
    }
}

export const formatPrice = (price) => {
    const numberString = String(price);
    const numberArray = numberString.split('');
    const dotPosition = numberArray.length % 3 || 3;
    for (let i = dotPosition; i < numberArray.length; i += 4) {
        numberArray.splice(i, 0, '.');
    }
    const formattedNumber = numberArray.join('');
    return formattedNumber;
}

export const formatDate = (date) => {
    const startDateString = date;
    const startDate = new Date(startDateString);

    const day = startDate.getDate().toString().padStart(2, '0');
    const month = (startDate.getMonth() + 1).toString().padStart(2, '0');
    const year = startDate.getFullYear();

    const formattedStartDate = `${day}/${month}/${year}`;
    return formattedStartDate;
}

export const formatDefaultSelectedDate = (date) => {
    const originalDate = new Date(date);
    const year = originalDate.getFullYear();
    const month = (originalDate.getMonth() + 1).toString().padStart(2, '0');
    const day = originalDate.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export const formatTime = (date) => {
    const startDateString = date;
    const startDate = new Date(startDateString);

    const hours = startDate.getHours().toString().padStart(2, '0');
    const minutes = startDate.getMinutes().toString().padStart(2, '0');

    const formattedStartTime = `${hours}:${minutes}`;
    return formattedStartTime;
}

export function getIndexById(array, id) {
    return array.findIndex(obj => obj.id === id);
}

export function getMinMaxPrice(courses) {
    if (!courses || courses.length === 0) {
        return { minPrice: undefined, maxPrice: undefined };
    }

    let minPrice = courses[0].price;
    let maxPrice = courses[0].price;

    for (let i = 1; i < courses.length; i++) {
        const currentPrice = courses[i].price;
        if (currentPrice < minPrice) {
            minPrice = currentPrice;
        }
        if (currentPrice > maxPrice) {
            maxPrice = currentPrice;
        }
    }

    return { minPrice, maxPrice };
}

export function compareDates(dateString1, dateString2) {
    const date1 = new Date(dateString1);
    const date2 = new Date(dateString2);

    // Extract date components (year, month, day) from the Date objects
    const year1 = date1.getFullYear();
    const month1 = date1.getMonth();
    const day1 = date1.getDate();

    const year2 = date2.getFullYear();
    const month2 = date2.getMonth();
    const day2 = date2.getDate();

    // Compare date components and return a boolean value
    return year1 === year2 && month1 === month2 && day1 === day2;
}

export function obfuscateEmail(email) {
    // Split the email into username and domain
    const [username, domain] = email.split('@');

    // Obfuscate the username
    const obfuscatedUsername = username.length > 2
        ? username[0] + username[1] + username[2] + '*'.repeat(username.length - 5) + username.slice(-3)
        : username + '*';

    // Return the obfuscated email
    return obfuscatedUsername + '@' + domain;
}

export function obfuscatePhoneNumber(phoneNumber) {
    // Convert the phoneNumber to a string
    const phoneNumberStr = phoneNumber.toString();

    // Obfuscate the phoneNumber
    const obfuscatedPhoneNumber = phoneNumberStr.length > 4
        ? phoneNumberStr.slice(0, 3) + '*'.repeat(phoneNumberStr.length - 6) + phoneNumberStr.slice(-3)
        : phoneNumberStr.slice(0, -4) + '*'.repeat(4);

    return obfuscatedPhoneNumber;
}

export const convertPhoneNumber = (phoneNumber) => {
    let convertedNumber = phoneNumber.replace(/[^\d]/g, '');
    if (phoneNumber.startsWith('+')) {
        convertedNumber = '0' + convertedNumber.slice(2);
    }
    return convertedNumber
}

export const mutilplePop = (navigate, time) => {
    for (let index = 0; index < time; index++) {
        navigate.pop()
    }
}

export const shortedTime = (time) => {
    const inputTime = time ? time : "00:00:00"
    var timeComponents = inputTime.split(":");
    return timeComponents[0] + ":" + timeComponents[1];
}

export const checkCurrentDate = (dateString) => {
    const givenDate = new Date(dateString);
    const currentDate = new Date();

    return givenDate.toDateString() === currentDate.toDateString();
}

export const getVnDay = (day) => {
    const lowerCaseDay = day.toLowerCase();
    return dayContrants[lowerCaseDay] ? dayContrants[lowerCaseDay].vn : "";
}

export const checkIsLink = (string) => {
    return string?.startsWith("http");
}

export function convertSchedulesToString(schedules) {
    // Group schedules by time slot
    const scheduleGroups = schedules?.reduce((groups, schedule) => {
        const slot = schedule?.slot;
        if (!groups[slot]) {
            groups[slot] = [];
        }
        groups[slot].push(schedule?.schedule === "Sunday" ? "CN" : schedule?.schedule);
        return groups;
    }, {});

    // Format the grouped schedules into an array of objects
    const formattedSchedules = Object.entries(scheduleGroups).map(([slot, schedules]) => {
        const scheduleString = schedules?.sort((a, b) => {
            if (a === 'Sunday') return 7;
            if (b === 'Sunday') return -7;
            return parseInt(a) - parseInt(b);
        }).join('-');
        const formattedSlot = slot === 'Sunday' ? 'CN' : slot;
        return {
            dates: scheduleString,
            time: formattedSlot
        };
    });

    // Sort the formatted schedules by time slot
    formattedSchedules.sort((a, b) => {
        const slotA = a.time;
        const slotB = b.time;
        if (slotA === slotB) {
            const dayA = a.dates.includes('CN') ? 7 : parseInt(a.dates.split('-')[0]);
            const dayB = b.dates.includes('CN') ? 7 : parseInt(b.dates.split('-')[0]);
            return dayA - dayB;
        }
        return new Date(`1970/01/01 ${slotA}`) - new Date(`1970/01/01 ${slotB}`);
    });

    return formattedSchedules;
}

export function getSessionInfoByDate(syllabusInformations) {
    const syllabus = syllabusInformations;
    const currentDate = new Date();

    // Iterate through topics
    for (const topic of syllabus?.topics) {
        // Iterate through sessions
        for (const session of topic.sessions) {
            const sessionDate = new Date(session.date);

            // Check if current date falls within session date
            if (
                currentDate.toDateString() === sessionDate.toDateString() &&
                currentDate.getTime() >= sessionDate.getTime()
            ) {
                // Return session info
                return {
                    orderTopic: topic.orderTopic,
                    topicName: topic.topicName,
                    sessions: [session]
                };
            }
        }
    }
}


const classStatus = {
    PROGRESSING: "Đang học",
    UPCOMING: "Sắp bắt đầu",
    COMPLETE: "Hoàn thành"
}

export const getStatus = (status) => {
    switch (status) {
        case "PROGRESSING":
            return classStatus.PROGRESSING;
        case "UPCOMING":
            return classStatus.UPCOMING;
        case "COMPLETE":
            return classStatus.COMPLETE;
        default:
            return "Chưa xác định";
    }
}
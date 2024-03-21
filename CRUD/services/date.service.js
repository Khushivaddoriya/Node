const startDate = (date) => {
    let startDate = new Date(
        new Date(date).setUTCHours(0, 0, 0, 0)
    ).toISOString();
    return startDate;
};

const endDate = (date) => {
    let endDate = new Date(
        new Date(date).setUTCHours(23, 59, 59, 999)
    ).toISOString();
    return endDate;
};

module.exports = { startDate, endDate };
const { has, extend } = require("./shortFunction.service");
const { startDate, endDate } = require("../services/date.service");

const getFilter = async (options) => {
    let filter = { where: { or: [] } };

    // manage pagination logic
    if (options.page && options.limit) {
        filter.skip = (options.page - 1) * options.limit;
        filter.limit = options.limit;
    }

    // sort by request
    if (options.sort) {
        filter.sort = options.sort;
    } else {
        filter.sort = { createdAt: -1, updatedAt: -1 };
    }

    if (has(options, "is_disable")) {
        filter.where.disable = options.disable;
    }

    if (has(options, "is_deleted")) {
        filter.where.is_deleted = options.is_deleted;
    }

    if (has(options, "plan_type")) {
        filter.where.plan_type = options.plan_type;
    }

    // filter by start with
    let or = [];
    if (
        options.startWith &&
        options.startWith.keys &&
        options.startWith.keyword
    ) {
        Object.keys(options.startWith.keys).forEach((key) => {
            if (key) {
                let orArray = {};
                orArray[key] = { $regex: `^${options.startWith.keyword}` };
                or.push(orArray);
                filter.where["$or"] = or;
            }
        });
    }

    if (options.search && options.search.keys && options.search.keyword) {
        Object.keys(options.search.keys).forEach((key) => {
            if (key) {
                let orArray = {};
                orArray[key] = { $regex: options.search.keyword, $options: "i" };
                or.push(orArray);
                filter.where["$or"] = or;
            }
        });
    }

    // NOTE:- keep this filter at end
    if (has(options, "id")) {
        filter = { where: { id: options.id } };
    }

    // Add date range filtering
    if (options.filter && options.filter.startDate && options.filter.endDate) {
        let dateType = options.filter.dateType
            ? options.filter.dateType
            : "createdAt";

        filter.where[dateType] = {
            $gte: startDate(options.filter.startDate),
            $lte: endDate(options.filter.endDate),
        };
    }
    delete options.filter.startDate;
    delete options.filter.endDate;
    delete options.filter.dateType;

    // projection by request
    if (options.project) {
        filter.select = options.project;
    }
    if (options.filter) {
        filter.where = extend(filter.where, options.filter);
    }

    if (filter.where.or && !filter.where.or.length) {
        delete filter.where.or;
    }

    return filter;
};

module.exports = { getFilter };
const { STATUS_SUCCESS, STATUS_CODE_OK, STATUS_ERROR, INTERNAL_SERVER_ERROR_MESSAGE, INTERNAL_SERVER_ERROR } = require("../../../constant/global.constants");
const { Order } = require("../../../schema/order.schema");
const { getFilter } = require("../../../services/common.service");

// get all order with searching,sorting and pagination

const getAllOrder = async (req, res) => {

    try {
        const data = req.body;
        const filterData = !data.filter
            ? { ...data, filter: { is_deleted: false, is_disable: false } }
            : data;

        const filter = await getFilter(filterData);

        const findOrder = await Order
            .find(filter.where)
            .skip(filter.skip)
            .limit(filter.limit)
            .sort(filter.sort)
            .populate('created_by', ['email', 'first_name', 'last_name']);

        const count = await Order.count(filter.where);

        if (findOrder.length > 0) {
            const responsePayload = {
                status: STATUS_SUCCESS,
                message: req.t("ORDER_FOUND_SUCCESS"),
                data: { data: findOrder, count: count },
                error: null,
            };
            return res.status(STATUS_CODE_OK).json(responsePayload);
        }
        else {
            const responsePayload = {
                status: STATUS_ERROR,
                message: null,
                data: {},
                error: req.t("ORDER_NOT_FOUND"),
            };
            return res.status(STATUS_CODE_OK).json(responsePayload);
        }
    }
    catch (err) {
        console.log("err", err);
        const responsePayload = {
            status: STATUS_ERROR,
            message: null,
            data: null,
            error: INTERNAL_SERVER_ERROR_MESSAGE,
        };
        return res.status(INTERNAL_SERVER_ERROR).json(responsePayload);
    }
}

module.exports = { getAllOrder };
const VALIDATION_TYPE = {
    UNIQUE: "unique",
    EXISTS: "exists",
};

const USER_TYPE = {
    ADMIN: 'admin',
    USER: 'user',
};

const PERMISSION = {
    USER_ADD: 'user-add',
    USER_UPDATE: 'user-update',
    USER_DELETE: 'user-delete',
    USER_VIEW: 'user-view',

    PLAN_ADD: 'plan-add',
    PLAN_UPDATE: 'plan-update',
    PLAN_DELETE: 'plan-delete',
    PLAN_DISABLE: 'plan-disable',
    PLAN_VIEW: 'plan-view',

    PLAN_FEATURES_ADD: 'planfeatures-add',
    PLAN_FEATURES_UPDATE: 'planfeatures-update',
    PLAN_FEATURES_DELETE: 'planfeatures-delete',
    PLAN_FEATURES_DISABLE: 'planfeatures-disable',
    PLAN_FEATURES_VIEW: 'planfeatures-view',

    PERMISSION_ADD: 'permission-add',
    PERMISSION_UPDATE: 'permission-update',
    PERMISSION_DELETE: 'permission-delete',
    PERMISSION_VIEW: 'permission-view',

    PAYMENT_HISTORY_VIEW: 'payment-history-view',
    PAYMENT_ADD: 'payment-add',
    PAYMENT_VIEW: 'payment-view',
    ORDER_VIEW: 'order-view',
};

const ENUMS = {
    VALIDATION_TYPE,
    USER_TYPE,
    PERMISSION
};

module.exports = { ENUMS };

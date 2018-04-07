module.exports = (context, options) => {
    if (context.Employees.length > 0 && context.PaySchedules.length > 0) {
        return options.fn(context);
    }

    return options.inverse(context);
};
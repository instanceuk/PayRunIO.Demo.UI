const FormUtils = require("./form-utils");

module.exports = class PayRunUtils {
    static parse(run, employerId) {
        let copy = JSON.parse(JSON.stringify(run));

        copy.PaySchedule = {
            "@href": `/Employer/${employerId}/PaySchedule/${copy.PaySchedule}`
        };

        return copy;
    }
}
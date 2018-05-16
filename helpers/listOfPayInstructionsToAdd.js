const path = require("path");
const fs = require("fs");
const Handlebars = require("handlebars");

module.exports = (ctx, options) => {
    const excludedFiles = ["AbsencePayInstruction.js", "BaseInstruction.js"];
    let folder = path.join(__dirname, "..", "services", "payInstructions");
    let cssClass = "dropdown-item launch-modal";

    let html = fs.readdirSync(folder).map(file => {
        if (excludedFiles.includes(file)) {
            return "";
        }

        let pi = require(path.join(folder, file));
        let instance = new pi();
        let name = instance.name;
        let type = file.replace(".js", "");

        return `<a class="${cssClass}" data-modal-size="modal-lg" data-modal-title="${name}" href="/employer/${ctx.EmployerId}/employee/${ctx.Id}/payInstruction/new?type=${type}">${name}</a>`;
    }).join("");

    return new Handlebars.SafeString(html);
};
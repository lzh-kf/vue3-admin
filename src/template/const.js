const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const templateMap = {
    "{{query}}": "Query",
    "{{create}}": "Create",
    "{{del}}": "Del",
    "{{update}}": "Update"
};

module.exports = {
    rl,
    templateMap
}
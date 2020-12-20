const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

for (let i = 0; i < 10; i++) {
    i * 5
}


// module.exports = function (questions) {
//     const returnReadLine = function* (questions) {
//         const length = questions.length
//         for (let i = 0; i < length; i++) {
//             const item = questions[i]
//             yield rl.question(item.title, (answer) => {
//                 if (answer) {
//                     item.callback && item.callback()
//                     item.value = answer
//                     item.success && item.success()
//                     if (length - 1 === i) {
//                         rl.close();
//                     } else {
//                         RL.next()
//                     }
//                 } else {
//                     rl.close();
//                 }
//             })
//         }
//         return true
//     }
//     var RL = returnReadLine(questions).next()
//     // RL.next()
// }


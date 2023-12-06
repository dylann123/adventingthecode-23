const input1 = require('fs').readFileSync('input1.txt', 'utf8')
const input2 = require('fs').readFileSync('input2.txt', 'utf8')

console.log(new Date().toLocaleString())
console.log("Part 1 Solution: \n" + require('./part1.js').getSolution(input1))
console.log("Part 2 Solution: \n" + require('./part2.js').getSolution(input2))
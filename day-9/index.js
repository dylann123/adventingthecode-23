const input = require('fs').readFileSync('input.txt', 'utf8')

console.log(new Date().toLocaleString())
console.log("Part 1 Solution: \n" + require('./part1.js').getSolution(input))
console.log("Part 2 Solution: \n" + require('./part2.js').getSolution(input))
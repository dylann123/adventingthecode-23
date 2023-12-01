exports.getSolution = function () {
	const input = require('fs').readFileSync('input.txt', 'utf8')

	const lines = input.split('\n')
	let sol = 0

	let letters = {
		"one": 1,
		"two": 2,
		"three": 3,
		"four": 4,
		"five": 5,
		"six": 6,
		"seven": 7,
		"eight": 8,
		"nine": 9
	}

	for(let line of lines){
		let arri = line.split("")
		let first,last

		let lowestIndex = 999
		for(let j in arri){
			if(!isNaN(parseInt(arri[j]))){
				first = arri[j]
				lowestIndex = j
				break
			}
		}
		
		for(let j in letters){
			if(line.indexOf(j) > -1 && lowestIndex > line.indexOf(j)){
				lowestIndex = line.indexOf(j)
				first = letters[j].toString()
			}
		}

		let highestIndex = -1
		for(let j = arri.length-1; j >= 0; j--){
			if (!isNaN(parseInt(arri[j]))) {
				last = arri[j]
				highestIndex = j
				break
			}
		}

		for(let j in letters){
			if(line.lastIndexOf(j) > -1 && highestIndex <= line.lastIndexOf(j)){
				highestIndex = line.lastIndexOf(j)
				last = letters[j]
			}
		}
		if (!isNaN(first)) {
			sol += parseInt(first + last)
		}
	}

	return sol
}
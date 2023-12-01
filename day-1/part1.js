exports.getSolution = function () {
	const input = require('fs').readFileSync('input.txt', 'utf8')

	const lines = input.split('\n')
	let sol = 0
	for(let i of lines){
		let arri = i.split("")
		let first,last
		for(let j of arri){
			if(!isNaN(parseInt(j))){
				first = j
				break
			}
		}
		for(let j = arri.length-1; j >= 0; j--){
			if (!isNaN(parseInt(arri[j]))) {
				last = arri[j]
				break
			}
		}
		if(!isNaN(first))
			sol += parseInt(first+last)
	}

	return sol
}
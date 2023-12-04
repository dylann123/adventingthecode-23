exports.getSolution = function (input = "") {
	const fixed = input.replace("\r","")
	const lines = fixed.split('\n')
	let solution = 0

	let count = 0
	for(let line of lines){
		count++
		let matching = 0
		let lineFixed = line.split(": ")[1]
		let winning = lineFixed.split(" | ")[0].split(" ")
		// let have = lineFixed.split(" | ")[1].split(" ")

		for(let num of winning){
			if(lineFixed.split("|")[1].includes(" " + num + " ") && !isNaN(parseInt(num))){
				if(matching == 0)
					matching = 1
				else
					matching *= 2
			}
		}

		solution += matching
	}


	return solution || "Incomplete"
}
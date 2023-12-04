exports.getSolution = function (input = "") {
	const fixed = input.replace("\r", "")
	const lines = fixed.split('\n')
	let solution = 0

	let cards = {
		'1': 1
	}

	let card = 1

	for (let line of lines) {
		if(!cards[card])
			cards[card] = 1
		console.log(cards[card]);
		let matching = 0
		let lineFixed = line.split(": ")[1]
		let winning = lineFixed.split(" | ")[0].split(" ")

		for (let num of winning) {
			if (lineFixed.split("|")[1].includes(" " + num + " ") && !isNaN(parseInt(num))) {
				matching += 1
			}
		}

		for (let i = 0; i < matching; i++){
			if(!cards[card + i + 1])
				cards[card + i + 1] = 1
			cards[card + i + 1] += cards[card]
		}

		card++
	}

	for (let card in cards) 
		solution += cards[card]

	return solution || "Incomplete"
}
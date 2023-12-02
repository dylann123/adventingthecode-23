exports.getSolution = function (input = "") {
	const lines = input.split('\n')
	let solution = 0

	for (let line of lines) {
		let id = parseInt(line.split(":")[0].split(" ")[1])
		let arr = line.split("; ")
		arr[0] = arr[0].split(": ")[1]
		let redMax = 0
		let blueMax = 0
		let greenMax = 0
		for (let hand of arr) {
			if (hand == undefined) break
			let handArr = hand.split(", ")
			for (let dice of handArr) {
				if (dice.indexOf("red") > -1) {
					let num = parseInt(dice.substring(0, dice.split(" ")[0]))
					if (num > redMax)
						redMax = num
				}
				if (dice.indexOf("blue") > -1) {
					let num = parseInt(dice.substring(0, dice.split(" ")[0]))
					if (num > blueMax)
						blueMax = num
				}
				if (dice.indexOf("green") > -1) {
					let num = parseInt(dice.substring(0, dice.split(" ")[0]))
					console.log(dice);
					if (num > greenMax)
						greenMax = num
				}
			}
		}
		console.log(line);
		console.log("red: "+redMax,"Blue: "+blueMax,"Green: "+greenMax);
		if (redMax <= 12 && greenMax <= 13 && blueMax <= 14) {
			solution += id
		}
	}


	return solution || "Incomplete"
}
exports.getSolution = function (input = "") {
	const fixed = input.replace("\r", "")
	const lines = fixed.split('\n')
	let solution = 1

	const directions = lines[0].split("")
	let map = {}

	for (let line of lines) {
		if (line.indexOf("=") < 0) continue
		let location = line.split(" ")[0]
		let left = line.split(" ")[2].substring(1, 4)
		let right = line.split(" ")[3].substring(0, 3)
		map[location] = [left, right]
	}

	let currentLocations = []
	let numbas = []
	let steps = 0
	let index = 0

	for (let i in map)
		if (i.endsWith("A")) {
			currentLocations.push(i)
		}
	for (let currentLocation = 0; currentLocation < currentLocations.length; currentLocation++) {
		steps = 0
		index = 0
		while (!currentLocations[currentLocation].endsWith("Z")) {
			let left = map[currentLocations[currentLocation]][0]
			let right = map[currentLocations[currentLocation]][1]

			if (directions[index] == "L")
				currentLocations[currentLocation] = left
			else if (directions[index] == "R")
				currentLocations[currentLocation] = right
			steps++
			index++
			if (index >= directions.length) index = 0
		}
		numbas.push(steps)
	}

	for (let i of numbas) {
		solution *= i
	}
	
	solution = solution / (gcd_more_than_two_numbers(numbas) ** (numbas.length-1))

	function gcd(a, b) {
		if (b == 0) {
			return a;
		}
		return gcd(b, a % b);
	}
	function gcd_more_than_two_numbers(a) {
		return a.reduce(gcd)
	}
	return solution || "Incomplete"
}

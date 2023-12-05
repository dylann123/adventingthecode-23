exports.getSolution = function (input = "") {
	const fixed = input.replace("\r", "")
	const sections = input.split("\r\n\r\n")
	let solution

	let seeds = []
	let conversions = {
		// dest start, source start, length
		// example: [[0,100000,10]],
		seedtosoil: [],
		soiltofert: [],
		ferttowater: [],
		watertolight: [],
		lighttotemp: [],
		temptohumid: [],
		humidtoloc: []
	}


	for (let i = 1; i < sections[0].split(" ").length; i++) {
		seeds.push(sections[0].split(" ")[i])
	}

	// 50 98 2
	// dest start, source start, length
	let index = 1
	for (let section in conversions) {
		console.log(section);
		let lines = sections[index].split("\r\n")
		for (let line in lines) {
			if (line == 0) continue
			let lineArr = lines[line].split(" ")
			let destRangeStart = parseInt(lineArr[0])
			let sourceRangeStart = parseInt(lineArr[1])
			let offset = parseInt(lineArr[2])
			conversions[section].push([destRangeStart, sourceRangeStart, offset])
		}

		index++
	}

	let lowestLoc = 999999999

	for (let seed of seeds) {

		let loc = seed

		for (let section in conversions) {
			for (let range of conversions[section]) {
				let destRangeStart = range[0]
				let sourceRangeStart = range[1]
				let offset = range[2]

				if (loc >= sourceRangeStart && loc < sourceRangeStart + offset) {
					loc = destRangeStart + (loc - sourceRangeStart)
					break
				}
			}
		}

		if (loc < lowestLoc) {
			lowestLoc = loc
			solution = loc
		}

	}

	return solution || "Incomplete"
}
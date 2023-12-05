exports.getSolution = function (input = "") {
	const { Worker, isMainThread, parentPort, workerData } = require("worker_threads")

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


	for (let i = 1; i < sections[0].split(" ").length; i += 2) {
		let start = sections[0].split(" ")[i]
		let range = sections[0].split(" ")[i + 1]

		seeds.push([start, range])
	}

	// 50 98 2
	// dest start, source start, length
	let index = 1
	for (let section in conversions) {
		let lines = sections[index].split("\r\n")
		for (let line in lines) {
			let lineArr = lines[line].split(" ")
			let destRangeStart = parseInt(lineArr[0])
			let sourceRangeStart = parseInt(lineArr[1])
			let offset = parseInt(lineArr[2])
			if (isNaN(destRangeStart) || isNaN(sourceRangeStart) || isNaN(offset)) continue
			conversions[section].push([destRangeStart, sourceRangeStart, offset])
		}

		index++
	}

	let lowestLoc = 999999999

	console.log(conversions);
	console.log(seeds);
	for (let range of seeds) {
		console.log(range);

		for (let seed = parseInt(range[0]); seed < parseInt(range[0]) + parseInt(range[1]); seed++) {
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


	}

	return solution || "Incomplete"
}
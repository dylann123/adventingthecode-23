exports.getSolution = function (input = "") {
	const fixed = input.replace("\r", "")
	const lines = fixed.split('\n')
	let solution = 1

	let times = lines[0].split(":")[1].trim().split(" ")
	for (let i = 0; i < times.length; i++) {
		if (times[i].trim() == "") {
			times.splice(i, 1)
			i--
		}
	}
	let distanceRecord = lines[1].split(":")[1].trim().split(" ")
	for (let i = 0; i < distanceRecord.length; i++) {
		if (distanceRecord[i].trim() == "") {
			distanceRecord.splice(i, 1)
			i--
		}

	}

	let possibleTimes = []

	for (let time = 0; time < times.length; time++) {
		let timeInt = parseInt(times[time].trim())
		let distanceRecordInt = parseInt(distanceRecord[time])
		let possibilities = 0

		for (let i = 1; i < timeInt; i++) {
			let distance = i * (timeInt - i)

			if (distance > distanceRecordInt) {
				possibilities++
			}
		}

		possibleTimes.push(possibilities)
	}

	for(let i = 0; i < possibleTimes.length; i++){
		solution *= possibleTimes[i]
	}

	return solution || "Incomplete"
}
const { truncate } = require("fs")

exports.getSolution = function (input = "string") {
	input.replace("\r", "")
	const lines = input.split('\n')
	let solution = 0

	for (let row = 0; row < lines.length; row++) {
		for (let col = 0; col < lines[0].length; col++) {
			if (lines[row][col] == "*") {
				let nums = getNearbyNumbers(row, col)
				if (nums.length == 2) {
					solution += parseInt(nums[0]) * parseInt(nums[1])
				}
			}
		}
	}

	function checkAdjacent(row, col) {
		let output = []

		if (lines[row - 1] && lines[row - 1][col - 1] && typeof parseInt(lines[row - 1][col - 1]) == "number" && !lines[row - 1][col - 1].includes(".")) // top left
			output.push([-1, -1])
		if (lines[row - 1] && lines[row - 1][col] && typeof parseInt(lines[row - 1][col]) == "number" && !lines[row - 1][col].includes(".")) // top middle
			output.push([-1, 0])
		if (lines[row - 1] && lines[row - 1][col + 1] && typeof parseInt(lines[row - 1][col + 1]) == "number" && !lines[row - 1][col + 1].includes(".")) // top right
			output.push([-1, 1])
		if (lines[row] && lines[row][col - 1] && typeof parseInt(lines[row][col - 1]) == "number" && !lines[row][col - 1].includes(".")) // left
			output.push([0, -1])
		if (lines[row] && lines[row][col + 1] && typeof parseInt(lines[row][col + 1]) == "number" && !lines[row][col + 1].includes(".")) // right
			output.push([0, 1])
		if (lines[row + 1] && lines[row + 1][col - 1] && typeof parseInt(lines[row + 1][col - 1]) == "number" && !lines[row + 1][col - 1].includes(".")) // bot left
			output.push([1, -1])
		if (lines[row + 1] && lines[row + 1][col] && typeof parseInt(lines[row + 1][col]) == "number" && !lines[row + 1][col].includes(".")) // bot mid
			output.push([1, 0])
		if (lines[row + 1] && lines[row + 1][col + 1] && typeof parseInt(lines[row + 1][col + 1]) == "number" && !lines[row + 1][col + 1].includes(".")) // bot right
			output.push([1, 1])
		return output
	}

	function getNearbyNumbers(row, col) {
		let adjacents = checkAdjacent(row, col)
		let numbers = {}
		for (let direction of adjacents) {
			let line = lines[row + direction[0]]
			let firstCol = col + direction[1]
			let lastCol = col + direction[1] + 1

			while(!line.substring(firstCol,lastCol).includes(".") && !isNaN(parseInt(line.substring(firstCol,lastCol))) && firstCol >= 0){
				firstCol--
			}
			firstCol++
			while(!line.substring(firstCol,lastCol).includes(".") && !isNaN(parseInt(line.substring(firstCol,lastCol))) && lastCol <= line.length){
				lastCol++
			}
			lastCol--
			let number = line.substring(firstCol,lastCol)
			numbers[number] = true
		}
		
		let output = []
		for(let key in numbers)
			output.push(key)
		console.log(output);
		return output
	}

	return solution
}
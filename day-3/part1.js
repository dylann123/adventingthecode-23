exports.getSolution = function (input = "string") {
	input.replace("\r", "")
	const lines = input.split('\n')
	let solution = 0

	for (let row = 0; row < lines.length; row++) {
		let number = 0
		let firstIndex = -1
		let lastIndex = -1
		for (let col = 0; col < lines[row].length; col++) {
			if (!isNaN(parseInt(lines[row][col]))) {
				if (firstIndex == -1)
					firstIndex = col
				lastIndex = col
			} else {
				if (firstIndex != -1) {
					let adjacent = false
					number = parseInt(lines[row].substring(firstIndex, lastIndex + 1))
					for (let num = firstIndex; num <= lastIndex; num++) {
						if (checkAdjacent(row, num) != 0) {
							adjacent = true
							break
						}
					}
					if (adjacent)
						solution += number
				}
				firstIndex = -1
				lastIndex = -1
			}
		}
	}

	function checkAdjacent(row, col) {
		let output = 0

		if (lines[row - 1] && lines[row - 1][col - 1] && lines[row - 1][col - 1] != "." && lines[row-1][col-1] != "\r" && isNaN(parseInt(lines[row - 1][col - 1]))) // top left
			output = 1
		if (lines[row - 1] && lines[row - 1][col] && lines[row - 1][col] != "." && lines[row-1][col] != "\r" && isNaN(parseInt(lines[row - 1][col]))) // top middle
			output = 2
		if (lines[row - 1] && lines[row - 1][col + 1] && lines[row - 1][col + 1] != "." && lines[row-1][col+1] != "\r" && isNaN(parseInt(lines[row - 1][col + 1]))) // top right
			output = 3
		if (lines[row] && lines[row][col - 1] && lines[row][col - 1] != "." && lines[row][col-1] != "\r" && isNaN(parseInt(lines[row][col - 1]))) // left
			output = 4
		if (lines[row] && lines[row][col + 1] && lines[row][col + 1] != "." && lines[row][col+1] != "\r" && isNaN(parseInt(lines[row][col + 1]))) // right
			output = 5
		if (lines[row + 1] && lines[row + 1][col - 1] && lines[row + 1][col - 1] != "." && lines[row+1][col-1] != "\r" && isNaN(parseInt(lines[row + 1][col - 1]))) // bot left
			output = 6
		if (lines[row + 1] && lines[row + 1][col] && lines[row + 1][col] != "." && lines[row+1][col] != "\r" && isNaN(parseInt(lines[row + 1][col]))) // bot mid
			output = 7
		if (lines[row + 1] && lines[row + 1][col + 1] && lines[row + 1][col + 1] != "." && lines[row+1][col+1] != "\r" && isNaN(parseInt(lines[row + 1][col + 1]))) // bot right
		{
			output = 8
		}
		return output
	}

	return solution
}
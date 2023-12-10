exports.getSolution = function (input = "") {
	const lines = input.split('\n')
	const chars = []
	const pipelines = []
	for (let line of lines){
		chars.push(line.split(""))
		pipelines.push(line.split(""))
	}
	let solution = 0

	let direction = 3 // up 1, right 2, down 3, left 4

	let pos = []

	for (let row = 0; row < chars.length; row++) {
		for (let col = 0; col < chars[0].length; col++) {
			if (chars[row][col] == "S") {
				pos = [row, col]
				break
			}
		}
	}
	while (getNewDirection(chars[pos[0] + getDirectionArray(direction)[0]][pos[1] + getDirectionArray(direction)[1]], direction) == 0) {
		direction++
		if (direction > 4)
			return "failed dir check"
	}

	// moves forward
	pos = [pos[0] + getDirectionArray(direction)[0], pos[1] + getDirectionArray(direction)[1]]

	while (chars[pos[0]][pos[1]] != "S") {
		direction = getNewDirection(
			chars
			[pos[0]]
			[pos[1]],
			direction)
		pipelines[pos[0]][pos[1]] = "*"
		pos = [pos[0] + getDirectionArray(direction)[0], pos[1] + getDirectionArray(direction)[1]]
	}
	pipelines[pos[0]][pos[1]] = "*"
	for (let row = 0; row < chars.length; row++) {
		if (chars[row][chars[row].length - 1] == "\r")
			chars[row].pop()
		for (let col = 0; col < chars[0].length; col++) {
			if (pipelines[row][col] != "*") {
				chars[row][col] = "*"
			}
		}
	}

	function getDirectionArray(direction) {
		switch (direction) {
			case 1:
				return [-1, 0]
			case 2:
				return [0, 1]
			case 3:
				return [1, 0]
			case 4:
				return [0, -1]
			default:
				throw new Error("invalid direction " + direction)
		}
	}

	function getNewDirection(pipe, direction) {
		if (pipe == "|" || pipe == "-")
			return direction
		if (direction == 1) {
			if (pipe == "7")
				return 4
			if (pipe == "F")
				return 2
		}
		if (direction == 2) {
			if (pipe == "7")
				return 3
			if (pipe == "J")
				return 1
		}
		if (direction == 3) {
			if (pipe == "L")
				return 2
			if (pipe == "J")
				return 4
		}
		if (direction == 4) {
			if (pipe == "L")
				return 1
			if (pipe == "F")
				return 3
		}
		return 0
	}

	for (let row of chars) {
		let output = ""
		for (let col of row)
			output += (col);
		console.log(output);
	}

	for (let row = 0; row < chars.length; row++) {
		let inside = false
		chars[row].pop()
		for (let col = 0; col < chars[row].length; col++) {
			if (chars[row][col] == "|" || chars[row][col] == "J" || chars[row][col] == "L" || chars[row][col] == "S") {
				inside = !inside
				console.log(chars[row][col] + " " + inside, row, col);
			} else if (inside && chars[row][col] == "*") {
				solution++
				console.log(chars[row][col], row, col);
			}
		}
	}

	return solution || "Incomplete"
}
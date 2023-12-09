exports.getSolution = function (input = "") {
	const fixed = input.replace("\r", "")
	const lines = fixed.split('\n')
	let solution = 0

	for (let line of lines) {
		let array = line.split(" ")
		for(let i = 0; i < array.length; i++)
			array[i] = parseInt(array[i])
		solution += findNextItem(array)
	}


	function findNextItem(array) {
		let pyramid = [[...array]]
		let pyramidFinished = false
		let topIndex = 0
		// build pyramid
		while (!pyramidFinished) {
			let arr = []
			pyramidFinished = true
			for (let i = 1; i < pyramid[topIndex].length; i++) {
				arr.push(parseInt(pyramid[topIndex][i]) - parseInt(pyramid[topIndex][i - 1]))
				if (parseInt(pyramid[topIndex][i]) - parseInt(pyramid[topIndex][i - 1]) != 0)
					pyramidFinished = false
			}
			topIndex++
			pyramid.push(arr)
		}

		// extraplolate
		pyramid[pyramid.length - 1].unshift(0)
		for(let layer = pyramid.length-2; layer >= 0; layer--){
			let previousLayer = pyramid[layer+1]
			let value = parseInt(pyramid[layer][0]) - previousLayer[0]
			pyramid[layer].unshift(value)
			console.log(value);
		}

		
		return pyramid[0][0] || 0
	}

	return solution || "Incomplete"
}
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
		pyramid[pyramid.length - 1].push(0)
		for(let layer = pyramid.length-2; layer >= 0; layer--){
			let previousLayer = pyramid[layer+1]
			let value = parseInt(pyramid[layer][pyramid[layer].length-1]) + previousLayer[previousLayer.length-1]
			pyramid[layer].push(value)
		}
		return pyramid[0][pyramid[0].length-1] || 0
	}

	return solution || "Incomplete"
}
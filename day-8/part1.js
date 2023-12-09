exports.getSolution = function (input = "") {
	const fixed = input.replace("\r","")
	const lines = fixed.split('\n')
	let solution

	const directions = lines[0].split("")
	let map = {}

	for(let line of lines){
		if(line.indexOf("=") < 0 ) continue
		let location = line.split(" ")[0]
		let left = line.split(" ")[2].substring(1,4)
		let right = line.split(" ")[3].substring(0,3)
		map[location] = [left, right]
	}

	let currentLocation = "AAA"
	let index = 0
	let steps = 0
	while(!currentLocation.includes("ZZ")){
		let left = map[currentLocation][0]
		let right = map[currentLocation][1]

		if(directions[index] == "L"){
			// console.log(currentLocation+" L -> "+left);
			currentLocation = left
			steps++
			index++
		}else if(directions[index] == "R"){
			// console.log(currentLocation+" R -> "+right);
			currentLocation = right
			steps++
			index++
		}
		
		// console.log(map["CNF"]);
		if(index >= directions.length) index = 0
	}

	solution = steps
	return solution || "Incomplete"
}

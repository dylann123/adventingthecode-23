const fs = require("fs")
const input = fs.readFileSync("input.txt", 'utf-8')
const lines = input.split("\n")



function part1() {
    const cardValues = {
        "T": 10,
        "J": 11,
        "Q": 12,
        "K": 13,
        "A": 14
    }

    function getBetterSet(set1, set2) {
        if (getSetType(set1) > getSetType(set2))
            return 1
        else if (getSetType(set1) < getSetType(set2))
            return -1
        else {
            for (let card = 0; card < set1.length; card++) {
                let card1 = 0
                let card2 = 0
                if (cardValues[set1[card]])
                    card1 = cardValues[set1[card]]
                else
                    card1 = parseInt(set1[card])
                if (cardValues[set2[card]])
                    card2 = cardValues[set2[card]]
                else
                    card2 = parseInt(set2[card])
                if (card1 > card2)
                    return 1
                if (card2 > card1)
                    return -1
            }
        }
        return 0
    }

    function getSetType(set) {
        // "ABCDE"
        let cards = {
            /*
            J : 2,
            A: 3
            */
        }
        let type = 1
        for (let index = 0; index < set.length; index++) {
            const element = set.substring(index, index + 1)
            if (!cards[element])
                cards[element] = 1
            else
                cards[element] += 1
        }

        let highestType = 1
        for (const cardRaw in cards) {
            const card = cardRaw.toString()
            if (set.includes("QQQQ9"))
                console.log(card, cards[card]);
            if (cards[card] == 5 && highestType < 7)
                highestType = 7
            if (cards[card] == 4 && highestType < 6)
                highestType = 6
            for (const otherCard in cards) { // full house
                if (otherCard != card && Object.keys(cards).length == 2 && highestType < 5)
                    highestType = 5
            }
            if (cards[card] == 3 && highestType < 4) {
                highestType = 4

            }
            for (const otherCard in cards) { // double pair
                if (otherCard != card && cards[card] == 2 && cards[otherCard] == 2 && highestType < 3) {
                    highestType = 3
                }
            }
            if (cards[card] == 2 && highestType < 2)
                highestType = 2
        }
        return highestType

    }


    let hands = []
    for (let line of lines) {
        let cards = line.split(" ")[0]
        let bet = parseInt(line.split(" ")[1])
        let hand = [cards, bet]
        let index = 0

        while (index < hands.length && getBetterSet(hand[0], hands[index][0]) == 1) {
            index++
        }
        hands.splice(index, 0, hand)
    }

    let solution = 1

    for (let set = 0; set < hands.length; set++) {
        if (hands[set] != undefined) {
            solution += (set + 1) * hands[set][1]
            // console.log(hands[set][0] + " : rank " + (set + 1) + " :  bet " + hands[set][1] + " : winning " + (set) * hands[set][1] + " : type " + getSetType(hands[set][0]))
        }
    }

    solution--
    return solution
}

function part2() {
    const cardValues = {
        "T": 10,
        "J": 1,
        "Q": 11,
        "K": 12,
        "A": 13
    }

    function getBetterSet(set1, set2) {
        if (getSetType(set1) > getSetType(set2))
            return 1
        else if (getSetType(set1) < getSetType(set2))
            return -1
        else {
            for (let card = 0; card < set1.length; card++) {
                let card1 = 0
                let card2 = 0
                if (cardValues[set1[card]])
                    card1 = cardValues[set1[card]]
                else
                    card1 = parseInt(set1[card])
                if (cardValues[set2[card]])
                    card2 = cardValues[set2[card]]
                else
                    card2 = parseInt(set2[card])
                if (card1 > card2)
                    return 1
                if (card2 > card1)
                    return -1
            }
        }
        return 0
    }

    function getSetType(set) {
        // "ABCDE"
        let cards = {
            /*
            J : 2,
            A: 3
            */
        }
        let type = 1
        let js = 0
        for (let index = 0; index < set.length; index++) {
            const element = set.substring(index, index + 1)
            if (element == "J")
                js++
            if (!cards[element])
                cards[element] = 1
            else
                cards[element] += 1

        }
        let jsFixed = js

        let highestType = 1
        for (const cardRaw in cards) {
            const card = cardRaw.toString()
            if(card == "J") js = 0
            else js = jsFixed
            if (cards[card] + js >= 2 && highestType < 2)
                highestType = 2
            for (const otherCard in cards) { // double pair
                for (let j = 0; j <= js; j++) {
                    if (otherCard != card && cards[card] + j >= 2 && cards[card] + js - j >= 2 && highestType < 3) {
                        highestType = 3
                    }
                }
            }
            if (cards[card] + js >= 3 && highestType < 4) {
                highestType = 4

            }
            for (const otherCard in cards) { // full house
                if (otherCard != card && Object.keys(cards).length == 2 && highestType < 5)
                    highestType = 5
                if (js > 0) {
                    if (otherCard != card && Object.keys(cards).length == 3 && highestType < 5)
                        highestType = 5
                }
            }
            if (cards[card] + js >= 4 && highestType < 6)
                highestType = 6
            if (cards[card] + js >= 5 && highestType < 7)
                highestType = 7
        }
        return highestType

    }


    let hands = []
    for (let line of lines) {
        let cards = line.split(" ")[0]
        let bet = parseInt(line.split(" ")[1])
        let hand = [cards, bet]
        let index = 0

        while (index < hands.length && getBetterSet(hand[0], hands[index][0]) == 1) {
            index++
        }
        hands.splice(index, 0, hand)
    }

    let solution = 1

    for (let set = hands.length-1; set >= 0; set--) {
        if (hands[set] != undefined) {
            solution += (set + 1) * hands[set][1]
            // console.log((set + 1) * hands[set][1])
            console.log(hands[set][0] + " : rank " + (set + 1) + " :  bet " + hands[set][1] + " : winning " + (set + 1) * hands[set][1] + " : type " + getSetType(hands[set][0]))
        }
    }

    solution--

    return solution
}

console.log("Starting.. ")
console.log("Part 1: " + part1())
console.log("Part 2: " + part2())
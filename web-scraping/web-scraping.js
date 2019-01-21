// https://www.101languages.net/

var wordArr = [],
	meaningArr = [],
	combinedArr = [];

for (var i = 0; i < document.querySelectorAll("tr").length - 1; i++) {
	if (i > 0) {
		console.log(i);
		let split = document.querySelectorAll(".column-2")[i].innerText,
			splitTwo = document.querySelectorAll(".column-3")[i].innerText;

		wordArr.push(split);
		meaningArr.push(splitTwo);
	}
}

for (var i = 0; i < wordArr.length; i++) {
	combinedArr.push([wordArr[i], meaningArr[i]]);
}

console.log(combinedArr.toString());
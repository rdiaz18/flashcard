// https://www.101languages.net/

var wordArr = [],
	meaningArr = [],
	combinedArr = [];

for (var i = 0; i < document.querySelectorAll("tr").length - 1; i++) {
	if (i > 0) {
		console.log(i);
		let col = document.querySelectorAll(".column-2")[i].innerText,
			colTwo = document.querySelectorAll(".column-3")[i].innerText;

		wordArr.push(col);
		meaningArr.push(colTwo);
	}
}

for (var i = 0; i < wordArr.length; i++) {
	combinedArr.push([wordArr[i], meaningArr[i]]);
}

console.log(combinedArr.toString());



// http://1000mostcommonwords.com/

var wordArr = [],
	meaningArr = [],
	combinedArr = [];

for (var i = 0; i < document.querySelectorAll("tr").length; i++) {
	if (i > 0) {
		console.log(i);
		let row = document.querySelectorAll("tr")[i],
			col = row.children[1].innerText,
			colTwo = row.children[2].innerText;

		wordArr.push(col);
		meaningArr.push(colTwo);
	}
}

for (var i = 0; i < wordArr.length; i++) {
	combinedArr.push([wordArr[i], meaningArr[i]]);
}

console.log(combinedArr.toString());
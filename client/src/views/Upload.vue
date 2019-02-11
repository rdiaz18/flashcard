<template>
	<div id="uploadContainer">
		<md-field>
			<label>List Title</label>
			<md-input v-model="title"></md-input>
		</md-field>
		<md-field>
			<label>List Description</label>
			<md-input v-model="description"></md-input>
		</md-field>
		<button @click="importText('AF', 'en')">Import</button>
		<button @click="translate">Translate</button>
		<button @click="upload">Upload</button>
		<div id="tableContainer">
			<table>
				<thead>
					<tr>
						<th>Index</th>
						<th>Word</th>
						<th>Meaning</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(arr, index) in translationArr">
						<td>{{ index+1 }}</td>
						<td>{{ arr[0] }}</td>
						<td>{{ arr[1] }}</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
	export default {
		name: "Upload",
		methods: {
			importText(prop, key){
				var that = this;
				console.log(prop, key);
				// Access Text Files
				(function readFile(prop, key){
					var xhttp = new XMLHttpRequest(),
						url = 'http://18.188.201.66:8081/readFile',
						fUrl = JSON.stringify({ 'file': `${prop}-EN-1000.csv` });

					xhttp.onreadystatechange = function() {
						if (this.readyState == 4 && this.status == 200) {
							// console.log(xhttp.responseText);
							processRes(xhttp.responseText, prop, key);
						}
					};

					xhttp.open("POST", url, true);
					xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
					xhttp.send(fUrl);
				})();

				// Split Into Array for API Send
				function processRes(res, fromLang, toLang){
					// console.log(res);
					let tempArr,
						langArr = [],
						str = "";

					tempArr = res.toString().split(",");
					tempArr.filter(function(v, i) {
					  // check the index is odd
					  if (i % 2 == 0) { 
					  	langArr.push(v); 
					  	str += v+", ";
					  }
					});
					
					that.str = str;
					that.langArr = langArr;
					that.fromLang = fromLang;
					that.toLang = toLang;
					// console.log("langArr PRE YANDEX");
					// console.log(langArr);
					// console.log(str);
					yandexTranslate(str, langArr, fromLang, toLang);
				}
			},
			translate(){
				var that = this;

				// Send To Yandex For Translation
				(function yandexTranslate(){
					// console.log("langArr");
					// console.log(langArr);
					// console.log("yandexText");
					// console.log(yandexText);
					console.log("--------------");
					var yandexUrl = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20190114T000445Z.95291844b30dc809.79341b7169f080deb7cfa0ce4eb4a65e7897cf3a&text=${that.str}&lang=${that.fromLang.toLowerCase()}-${that.toLang.toLowerCase()}`,
						xhr = new XMLHttpRequest();

					xhr.onreadystatechange = function() {
						if (this.readyState == 4 && this.status == 200) {
							var resArr = JSON.parse(xhr.responseText),
								resArr = resArr['text'];

							// console.log("resArr");
							// console.log(xhr.responseText);
							// console.log(resArr);
							// console.log(resArr.toString().split(", "));

							translatedRes(that.langArr, resArr, that.fromLang, that.toLang);
						}
					};

					xhr.open("GET", yandexUrl, true);
					xhr.send();

				})();

				// Join translated result into JSON
				function translatedRes(fromArr, toArr, fromLang, toLang){
					let translatedObj = {
						name: "1,000 Most Common Words",
						description: `${fromLang}-${toLang}-1000`,
						nativeLanguage: fromLang,
						language: toLang,
						words: []
					};

					that.translationObj = translationObj;

					let toArrFixed = toArr.toString().split(", ");

					console.log(fromArr);
					console.log(toArr);

					if (toArrFixed.length < 1000 || fromArr.length < 1000) {
						console.log("ERROR: RESPONSE LENGTH MISMATCH");
						console.log("From Language Length: "+fromArr.length);
						console.log("To Language Length: "+toArrFixed.length);
						console.log(fromArr);
						console.log(toArr);
						console.log(toArrFixed);
					}

					for (var i = 0; i < fromArr.length; i++) {
						translatedObj.words.push([fromArr[i], toArrFixed[i]]);
					}

					console.log(translatedObj);
					that.translationArr = translatedObj.words;
				}
			},
			upload(){
				var that = this;

				// Send translated result to DB
				(function sendDB(){
					var xhr2 = new XMLHttpRequest(),
						dbURL = 'http://18.188.201.66:8081/addAdminList';

					xhr2.onreadystatechange = function() {
						if (this.readyState == 4 && this.status == 200) {
							console.log(xhr2.responseText);
						}
					};

					xhr2.open("POST", dbURL, true);
					xhr2.setRequestHeader("Content-Type", "application/json");
					xhr2.setRequestHeader("x-access-token", that.$store.getters.getJWT);
					xhr2.send(that.translationObj);
				})();
			}
		},
		data(){
			return {
				str: "",
				langArr: "",
				fromLang: "",
				toLang: "",
				title: "1,000 Most Common Words",
				description: "AF-EN-1000",
				translationArr: "",
				translationObj: undefined
			}
		}
	}
</script>

<style type="text/css" scoped>
	#uploadContainer {
		max-width: 800px;
		margin: auto;
		position: relative;
	}

	#uploadContainer table {
		margin-top: 25px;
		background-color: lightgray;
		width: 100%;
		max-height: 600px;
		overflow-y: auto;
	}

	#uploadContainer table tr:nth-of-type(odd){
		background-color: white;
	}

	#uploadContainer .md-field {
		background-color: white;
	}
</style>
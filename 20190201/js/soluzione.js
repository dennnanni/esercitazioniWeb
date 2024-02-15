function get_random_int(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

window.onload = function() {
	let rows = document.querySelectorAll("tr");
	let cols = rows[0].querySelectorAll("td");
	let selections = 0;

	let matrix = [];
	let max = rows.length > cols.length ? rows.length : cols.length;

	for(let r = 0; r < rows.length; r++) {
		matrix[r] = [];
		let cols = rows[r].querySelectorAll("td");
		for(let c = 0; c < cols.length; c++) {
			matrix[r][c] = 0;
			cols[c].addEventListener("click", function() {
				if(matrix[r][c] == 0) {
					cols[c].innerHTML = "#";
					selections++;
					console.log("ZEROOOOOOOOO");
				} else  {
					cols[c].innerHTML = "*";
					console.log("UNOOOOOO");
					document.querySelector("div:first-of-type p").innerHTML = "Partita persa";
				}

				if(selections == matrix.length * matrix[0].length - max) {
					document.querySelector("div:first-of-type p").innerHTML = "Partita vinta";
				}
			});
		}
	}


	for(let i = 0; i < max;) {
		let r = get_random_int(0, rows.length);
		let c = get_random_int(0, cols.length);
		if(matrix[r][c] == 0) {
			matrix[r][c] = 1;
			i++;
		}
	}
}
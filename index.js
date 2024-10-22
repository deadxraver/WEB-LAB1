let x = -3;
let y = null;
let r = null;
let buttob;

function checkNum(a) {
	return !isNaN(a) && a !== null;
}

document.addEventListener("DOMContentLoaded",  () => {
	buttob = document.getElementById('buttob');
	buttob.style.visibility = 'hidden';

	const xSelect = document.getElementById("x");
	const yText = document.getElementById("y");
	const rList = [];

	for (let i = 1; i < 6; i++) {

		rList.push(document.getElementById("r".concat(i.toString())));
		let fun = () => {
			for (let j = 0; j < rList.length; j++) {
				if (j !== i - 1) {
					rList[j].checked = false;
				}
			}
			r = rList[i - 1].checked ? i : null;
			if (checkNum(x) && checkNum(parseFloat(y)) && checkNum(r)) {
				buttob.style.visibility = 'visible';
			} else buttob.style.visibility = 'hidden';
		}
		rList[i - 1].addEventListener("click", fun);
	}

	xSelect.addEventListener("change", function (event) {
		x = event.target.value;
		if (checkNum(x) && checkNum(parseFloat(y)) && checkNum(r)) {
			buttob.style.visibility = 'visible';
		} else buttob.style.visibility = 'hidden';
	});

	yText.addEventListener("input", () => {
		let tmp = yText.value;
		let foundDot = false;
		y = "";
		if (!tmp) {
			buttob.style.visibility = 'hidden'
			return;
		}
		let negative = false;
		for (let i = 0; i < tmp.length; i++) {
			if (tmp[i] === '-' && i === 0) {
				negative = true;
			} else if (tmp[i] === '.' && !foundDot) {
				foundDot = true;
			} else if (isNaN(parseFloat(tmp[i]))) continue;
			y += tmp[i];
		}
		if (y.length > 1 && y[1] !== '.' && y[0] === '0') {
			y = y.substring(1);
		}
		yText.value = y;
		if (checkNum(x) && checkNum(parseFloat(y)) && checkNum(r)) {
			buttob.style.visibility = 'visible';
		} else buttob.style.visibility = 'hidden';
	});
});


function sendForm() {
	$.ajax({
		type: "GET",
		url: "http://localhost:63342",
		data: {x: x, y: y, r: r},
		success: (msg) => {
			alert( "Data Saved: " + msg );
		}
	});
}
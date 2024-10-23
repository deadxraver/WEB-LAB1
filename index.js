let x = -3;
let y = null;
let r = null;
let buttob;
let canvasDrawer;

function checkNum(a) {
	return !isNaN(a) && a !== null;
}

document.addEventListener("DOMContentLoaded", () => {
	canvasDrawer = new CanvasDrawer();
	canvasDrawer.redrawAll();
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
			canvasDrawer.redrawAll(r)
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

	buttob.addEventListener("click", () => {
		if (validate()) sendForm();
		else alert("Проверьте корректность введенных значений");
	});

	function processError() {
		alert("Бредик не пишем");
	}

	function sendForm() {
		$.ajax({
			type: "GET",
			url: "http://localhost:24928/fcgi-bin/server.jar",
			data: {x: x, y: y, r: r},
			success: (msg) => {
				processSuccess($.parseJSON(msg));
			},
			error: (msg) => {
				processError();
			}
		});
	}
});

function validate() {
	return checkNum(x) && checkNum(y) && checkNum(r) && (x >= -3 && x <= 5) && (y >= -3 && y <= 5) && (r >= 1 && r <= 5);
}

function processSuccess(msg) {
	canvasDrawer.drawPoint(x, y, msg.hit === "true");
	console.log(msg);

	let row = document.getElementById("resultsBody").insertRow();

	row.insertCell(0).textContent = msg.x;
	console.log(msg.x);
	row.insertCell(1).textContent = parseFloat(msg.y.replace(',', '.')).toFixed(2);
	console.log(parseFloat(msg.y).toFixed(2));
	console.log(parseFloat(msg.y));
	row.insertCell(2).textContent = msg.r;
	console.log(msg.r);
	row.insertCell(3).textContent = msg.hit === "true" ? "Да" : "Нет";
	console.log(msg.hit);
	[row.insertCell(4).textContent] = msg.currentTime.replace('T', '\n').split('.');
	console.log(msg.currentTime);
	row.insertCell(5).textContent = msg.executionTime + 'ms';
	console.log(msg.executionTime);

}

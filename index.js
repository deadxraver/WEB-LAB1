let x = -3;
let y = null;
let r = null;

document.addEventListener("DOMContentLoaded", function (event) {

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
		}
		rList[i - 1].addEventListener("click", fun);
	}

	xSelect.addEventListener("change", function (event) {
		x = event.target.value;
	});

	yText.addEventListener("input", function (event) {
		let tmp = yText.value;
		let foundDot = false;
		if (!tmp) return;
		y = "";
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
		while (y.includes('-0') && !y.includes('.')) {
			y = y.replace('-0', '-');
		}
		yText.value = y;
	});
});

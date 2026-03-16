function loadImage(event, inputId, imageId) {
	const input = event.target;
	const reader = new FileReader();

	reader.onload = function () {
		const image = document.getElementById(imageId);
		image.src = reader.result;
	};

	reader.readAsDataURL(input.files[0]);
}

function capture() {
	const captureElement = document.querySelector("#capture");
	$("#capture").css("border-radius", "0");
	$("#capture").css("border", "none");
	html2canvas(captureElement, { useCORS: true, scale: 10, allowTaint: true })
		.then((canvas) => {
			canvas.style.display = "none";
			document.body.appendChild(canvas);
			return canvas;
		})
		.then((canvas) => {
			const image = canvas
				.toDataURL("image/jpg")
				.replace("image/jpg", "image/octet-stream");
			const a = document.createElement("a");
			a.setAttribute("download", "my-image.jpg");
			a.setAttribute("href", image);
			a.click();
			canvas.remove();
			$("#capture").css("border-radius", "10px");
			$("#capture").css("border", "var(--gray) solid 1px");
		});
}

const btn = document.querySelector("#btn");
btn.addEventListener("click", capture);

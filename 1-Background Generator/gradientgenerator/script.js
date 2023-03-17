const css = document.querySelector("h3");
const [color1, color2] = document.querySelectorAll(".color");

let body = document.getElementById("gradient");

let setGradient = () => {
 	body.style.background = linearGradient();
	css.textContent = `${body.style.background};`;
	
}

const linearGradient = () => {
	return `linear-gradient(to right, ${color1.value}, ${color2.value})`;
}

color1.addEventListener("input", setGradient);

color2.addEventListener("input", setGradient);
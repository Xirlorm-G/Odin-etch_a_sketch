/*
 * ETCH-A-SKETCH
 * A 'theodinproject.com assignment'
 * DOM Manipulation
 */

//Create a container for the pixels
let container = document.createElement('div')
container.classList.add('container')

//Create pixels
function createPixels(n=16){
	container.style.gridTemplateColumns = `repeat(${n}, 1fr)`
	for(let i = 0; i < n; ++i){
		for(let j = 0; j < n; ++j){
			let pixel = document.createElement('div')
			pixel.classList.add('pixel')
			pixel.setAttribute('data-color', '')
			pixel.addEventListener('mouseover', (e)=>{
				let col = e.target.getAttribute('data-color')
				e.target.style.background = getColor(col)
			})
			container.appendChild(pixel)
		}
	}
	//display number of pixels
	dispPixNum.innerText = `${n} x ${n}`
	//Pick a color from user or default to black
	function getColor(flag){
		switch(flag){
			case 'userInput':	return colorPicked
			case 'random':	return '#' + Math.floor(Math.random() * 4095).toString(16)
			case 'eraser': return '#ffffff'
			default: return '#000000'
		}
	}
}


//Clear screen and build pixels using user input
let clearInput = document.createElement('button')
clearInput.innerText = 'Clear and input'
clearInput.setAttribute('class', 'clearInput')
clearInput.addEventListener('click', () => {
	//check user input validity
	function checkVal(value){
		if(isNaN(value)){
			num = prompt('Invalid input! Try again..')
			checkVal(num)
		}else if(value>64){
			num = prompt('Invalid input! Try again..')
			checkVal(num)
		}else return value
	}
	let pixNum = checkVal(prompt('Input number \'n\' for new n*n pixel grid..', 16))
	container.innerText = '' //clear current screen
	createPixels(pixNum)
	pixAdjust.value = pixNum
});


//Clear pattern button
let clearPatternB = document.createElement('button')
clearPatternB.innerText = 'Clear pattern'
clearPatternB.classList.add('clearPatternB')
clearPatternB.addEventListener('click', ()=>{
	let pixels = container.querySelectorAll('.pixel')
	for(let i = 0; i< pixels.length; ++i){
		pixels[i].style.background = '#ffffff'
	}
})


//Eraser
let eraser = document.createElement('button')
eraser.innerText = 'Eraser'
eraser.classList.add('eraser')
eraser.addEventListener('click', ()=>{
	let pixels = container.querySelectorAll('.pixel')
	for(let i = 0; i< pixels.length; ++i){
		pixels[i].style.background = setColor('eraser')
	}
})


//Random color button 
let randomF = false
let randomB = document.createElement('button')
randomB.innerText = 'Rainbow'
randomB.classList.add('randomB')
randomB.addEventListener('click', ()=>{ 
	switch(randomF){
		case false:	setColor('random')
				randomF = !randomF
				break;
		default:	setColor()
			randomF = !randomF
	}
})


//Color picker
let colorPicked = '#000000'
let colorInput = document.createElement('input')
colorInput.type = 'color'
colorInput.value = '#cc66ff'
colorInput.addEventListener('input', (e)=>{
	setColor('userInput')
	colorPicked = e.target.value
})


//Set color value for current pixels
function setColor(value){
	let pixels = container.querySelectorAll('.pixel')
	for(let i = 0;i<pixels.length; ++i){
		pixels[i].setAttribute('data-color', value)
	}
}


//Pixel count adjustment
let pixAdjust = document.createElement('input')
pixAdjust.type = 'range'
pixAdjust.min = 1
pixAdjust.max = 64
pixAdjust.value = 16
pixAdjust.addEventListener('change', (e)=>{
	container.innerText = ''
	createPixels(e.target.value)
})


//Display number of pixels n*n
let dispPixNum = document.createElement('div')
dispPixNum.classList.add('dispPixel')


//Begin page with 16x16 pixels
createPixels()


//Set the components together
let main = document.querySelector('main')
main.appendChild(container)

let controls = document.createElement('div')
controls.classList.add('controls')
controls.appendChild(randomB)
controls.appendChild(clearInput)
controls.appendChild(clearPatternB)
controls.appendChild(eraser)
controls.appendChild(dispPixNum)
controls.appendChild(colorInput)
controls.appendChild(pixAdjust)

main.appendChild(controls)


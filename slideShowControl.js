let slideIndex = 1;
showSlides(slideIndex);

// Next/Prev Buttons
export function slideNum(num){
	showSlides(slideIndex += num);
}

function showSlides(num){
	let i;
	let slides = document.getElementsByClassName("pictureSlides");
	if (num > slides.length){num = 1;}
	if (num < 1){num = slides.length;}
	
	//Set all Pictures to NOT display
	for(i=0; i < slides.length; i++){
		slides[i].style.display = "none";
	}
	
	//Display current Picture
	slides[num-1].style.display = "block";
	console.log("Testing");
	
}
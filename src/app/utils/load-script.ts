
import { Injectable } from '@angular/core';
declare var $ : any;
declare var Swiper : any;

@Injectable()
export class loadScript{
   
	loadScript(){ 

  		$("#upfile1").click(function () {
		  $("#file1").trigger("click");
		});

		$(document).ready(function (e) {
			$(".showonhover").click(function () {
		    	$("#selectfile").trigger("click");
		  	});
		});

		$("#phone").intlTelInput({
	        allowDropdown: false,
	        autoHideDialCode: false,
	        autoPlaceholder: false,
	        dropdownContainer: "body",
	        excludeCountries: [""],
	        geoIpLookup: function(callback) {
	          this.countryCode = "us";
	          console.log(this.countryCode);
	          callback(this.countryCode);
	        },
	        initialCountry: "auto",
	        nationalMode: false,
	        numberType: "MOBILE",
	        preferredCountries: ['us','in'],
	        separateDialCode: true,
	        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/11.0.9/js/utils.js"
	    });

  		document.getElementById("defaultOpen").click();

   		var img1 = document.getElementById("img1"),
       	img2 = document.getElementById("img2");

      	img1.onmouseover = function(){
        	img2.style.display = "block";
      	}
      	img1.onmouseout = function(){
        	img2.style.display = "none";
      	}
		
  	}

  	mouseup(){
  		// window.addEventListener("mouseup", function (event) {
	   //    var message_block = document.getElementById("message_block");
	   //    if (event.target != message_block && (<HTMLElement>(<HTMLElement>event.target).parentNode) != message_block) {
	   //      message_block.style.display = "none";
	   //    }
	   //  });
  	}

//this.url = (<addEventListener>event.target).parentNode;
  	eventListener(){
		// window.addEventListener("mouseup", function (event) {
		//   var pol = document.getElementById("pol");
		//   if (event.target != pol && (<HTMLElement>(<HTMLElement>event.target).parentNode) != pol) {
		//     pol.style.display = "none";
		//   }
		// });
		//   window.addEventListener("mouseup", function (event) {
		//   var poll = document.getElementById("poll");
		//   if (event.target != poll && (<HTMLElement>(<HTMLElement>event.target).parentNode) != poll) {
		//     poll.style.display = "none";
		//   }
		// });
		//     window.addEventListener("mouseup", function (event) {
		//   var dot = document.getElementById("dot");
		//   if (event.target != dot && (<HTMLElement>(<HTMLElement>event.target).parentNode) != dot) {
		//     dot.style.display = "none";
		//   }
		// });
		//       window.addEventListener("mouseup", function (event) {
		//   var dott = document.getElementById("dott");
		//   if (event.target != dott && (<HTMLElement>(<HTMLElement>event.target).parentNode) != dott) {
		//     dott.style.display = "none";
		//   }
		// });
  	}

  	eventListener2(){
		// window.addEventListener("mouseup", function (event) {
		//   var pol = document.getElementById("pol");
		//   if (event.target != pol && (<HTMLElement>(<HTMLElement>event.target).parentNode) != pol) {
		//     pol.style.display = "none";
		//   }
		// });
		//   window.addEventListener("mouseup", function (event) {
		//   var poll = document.getElementById("poll");
		//   if (event.target != poll && (<HTMLElement>(<HTMLElement>event.target).parentNode) != poll) {
		//     poll.style.display = "none";
		//   }
		// });

		
	  }
	  

}
const navLinks = document.querySelectorAll(".nav-link");
const contact = document.querySelector("#contact");
const shadowRemove = document.querySelectorAll(".shadow-remove");
const addContact = document.querySelector(".contact");
const removeContact = document.querySelector(".contact-remove");
const addMenu = document.querySelector(".menu-add");
const addMainMenu = document.querySelector(".mainnavbar");
const addMenuContent = document.querySelector(".mainnavbar-content");
const removeMenu = document.querySelector(".menu-remove");

var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
    }

    setTimeout(function() {
    that.tick();
    }, delta);
};

window.onload = function() {
    var elements = document.getElementsByClassName('typewrite');
    for (var i=0; i<elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
          new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
    document.body.appendChild(css);
};

$(function(){

    // Rotate Skill Badges
    var $badges = $(".amg-badge img");
    
    function rotateBadge(passedBadge, speed){
      var rotateSpeed = speed / 180,
          current = 0;
    
      function badgeRotation(passedBadge){
        current = (current == 90) ? 271 : current + 1;
    
        passedBadge.css({
          "-webkit-transform":"rotate3d(0,1,0," + current + "deg)",
          "-moz-transform":"rotate3d(0,1,0," + current + "deg)",
          "transform":"rotate3d(0,1,0," + current + "deg)"
        });
    
        if (current == 360) {
          clearInterval(rotateInterval);
          passedBadge.removeAttr('style').removeClass('spinning');
        }
      }
    
      var rotateInterval = setInterval(function(){badgeRotation(passedBadge)}, rotateSpeed);
    }
    
    $badges.mouseenter(function(){
      if ($(this).hasClass('spinning')) {
        return false;
      } else {
        rotateBadge($(this), 500);
        $(this).addClass('spinning');
      }
    });
    
    });


contact.addEventListener('click', () => {
    addContact.classList.add("contact-display");
});

removeContact.addEventListener('click', () => {
    addContact.classList.remove("contact-display");
});

addMenu.addEventListener('click', () => {
    addMenuContent.classList.add("mainnavbar-content-display");
    addMainMenu.classList.add("mainnavbar-display");
    
});

removeMenu.addEventListener('click', () => {
    addMainMenu.classList.remove("mainnavbar-display");
    addMenuContent.classList.remove("mainnavbar-content-display");
});

   
        Array.from(navLinks).map((navscroll) => {
            navscroll.addEventListener('click', () => {
            addMainMenu.classList.remove("mainnavbar-display");
            addMenuContent.classList.remove("mainnavbar-content-display");
            });
        });
    
   
 
    let homeLen, i;
    homeLen = home.length;
    for (i = 0;i < homeLen; i++) {
        const element = home[i];
        element.addEventListener('click', () => {
            addMainMenu.classList.remove("mainnavbar-display");
            addMenuContent.classList.remove("mainnavbar-content-display");
        });
    }

   let body = document.body;
   let toggleBtn =  document.querySelector(".toggle-round");
   let currentTheme = localStorage.getItem('currentTheme');

   
   if (currentTheme) {
        body.classList.add('darktheme');
        toggleBtn.classList.toggle('push');
    } 

   toggleBtn.addEventListener('click', function () {

       toggleBtn.classList.toggle('push');
       Array.from(shadowRemove).map((shadowCut) => {
         shadowCut.classList.toggle("shadow");
       });
       
       body.classList.toggle('darktheme');

       if (body.classList.contains('darktheme')) {
           localStorage.setItem('currentTheme', 'active');
       }else{
        localStorage.removeItem('currentTheme');
       }
   });
    

$(function(){
    $(document).scroll(function(){
        var $nav = $("#navbar");
        var $scrollUp = $("#up-scroll");
        var $home = $("#home");
        $nav.toggleClass("scrolled", $(this).scrollTop() > $nav.height());
        $scrollUp.toggleClass("up-scroll", $(this).scrollTop() > $home.height());
    });
});

$( '.js-input' ).keyup(function() {
  if( $(this).val() ) {
     $(this).addClass('not-empty');
  } else {
     $(this).removeClass('not-empty');
  }
});

function sendMail() {
   var params = {
     name: document.getElementById("name").value,
     email: document.getElementById("email").value,
     message: document.getElementById("message").value,
   };
 
   const serviceID = "service_5cczrtj";
   const templateID = "template_7fo1t2u";
 
     emailjs.send(serviceID, templateID, params)
     .then(res=>{
         document.getElementById("name").value = "";
         document.getElementById("email").value = "";
         document.getElementById("message").value = "";
         console.log(res);
         alert("Your message sent successfully!!")
 
     })
     .catch(err=>console.log(err));
 
 }
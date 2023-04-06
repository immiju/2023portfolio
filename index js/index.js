$(document).ready(function(){
    
    /* mouse Effect */
    var cursor = document.querySelector(".cursor"),
        cursorScale = document.querySelectorAll(".cursor-scale, .caption-btn, .img-cover"),
        mouseX = 0,
        mouseY = 0

    gsap.to({}, 0.016, {
        repeat:-1,

        onRepeat: function() {
            gsap.set(cursor,{
                css: {
                    left:mouseX,
                    top:mouseY
                }
            })
        }
    });

    window.addEventListener("mousemove",function (e){
        mouseX = e.clientX
        mouseY = e.clientY
    })

    cursorScale.forEach(link => {
        link.addEventListener("mouseleave", () => {
            cursor.classList.remove("grow");
        });
        link.addEventListener("mousemove", () => {
            cursor.classList.add("grow");
        });
    })
    
    /* Loading Page */
    $(window).on("load",function(){
        $(".loading").delay('2000').fadeOut();
    });

    let loadingTl = gsap.timeline()
        loadingTl.to(".intro-txt > span",{
            duration:0.3,
            opacity:1,
            stagger:{each:0.5,from:"first"}
            })

    /* header logo effect */
    $(".logo").on("click",function(){
        $("html").animate({
            scrollTop:"0px"
        });
    });
    
    /* nav open */ 
    const menu = document.querySelector("nav");
    
    let menuEffect = gsap.timeline({
        paused:true,
        defaults:{duration:0.5,ease:"back.out(1.5)"}
    });
    
    menuEffect.to(".about",{y:47})
            .to(".contact",{y:94},"<")
    
    menu.addEventListener("mouseenter",()=>{ menuEffect.play() })
    menu.addEventListener("mouseleave",()=>{menuEffect.reverse()})    

    /* nav scroll */
    $("nav a").on("click",function(){
        event.preventDefault();
        var gnbId = $(this).attr("href");
        var gnbPos = $(gnbId).offset().top;

        $("html").stop().animate({
            scrollTop : gnbPos
        },1000,"swing");
    });

    /* header effect */
    $(window).on("scroll",function(){
        var pos = $("html").scrollTop();
        var endingPos = $(".ending").offset().top - 70;
        var aboutPos = $("#about").offset().top - 5;

        if(pos > 700){
            $("header").addClass("on");
        }else{
            $("header").removeClass("on");
        }

        if(pos >= endingPos){
            $("header").removeClass("on");
            $(".logo > .logo-svg").addClass("on");
            $("nav li").addClass("on");
        }else{
            $(".logo > .logo-svg").removeClass("on");
            $("nav li").removeClass("on")
        }

        if(pos >= aboutPos){
            $(".logo > .logo-svg").removeClass("on");
            $("nav li").removeClass("on")
        }

    });
    
    /* home title effect */
    function animate() {
        if (tween.isActive()) {
            requestAnimationFrame(animate);
        }}

    gsap.registerPlugin(ScrollTrigger);

    const tween = gsap.from(".home-txt p", {
        delay:2,
        y:100,
        stagger:0.2
    });

    ScrollTrigger.create({
        trigger:".home",
        markers:false,
        start:"center 0",
        end:"bottom center",
        onEnter: () => {
            animate();
        },
        onLeaveBack: () => {
            tween.restart();
        }
    });
    
    /* home scroll txt roof */
    function loof(){
		$(".scroll-txt-wrap").animate({
			left:"-160px"
			},{
			complete:function(){
				var $clone = $(".scroll-txt-wrap p").first().clone();
				$(".scroll-txt-wrap").append($clone);
				$(".scroll-txt-wrap p").first().remove();
				$(".scroll-txt-wrap").css({"left":"0"});
		},
		duration:3000,
		easing:"linear"
		});
	}
	loof();
	setInterval(loof,3000);

    /* ending bg txt effect */
    gsap.registerPlugin(ScrollTrigger);

    const endingEffect = gsap.timeline({
        scrollTrigger:{
            trigger:".ending",
            markers:false,
            start:"0 40%",
            end:"120% 100%",
            toggleActions:"play reverse play reverse"
        }
    })
    endingEffect.from(".ending > p",{
        scale:0,
        stagger:{
            each:0.2,
            from:"edges"
        },
        ease:"back.out(1.9)"
    })

    gsap.from(".ending > p",{
        opacity:0.5,
        duration:0.3,
        repeat:-1,
        yoyo:true,
        stagger:{each:0.2,from:"center"}
    })

    endingEffect.from(".ending-txt",{
        y:20,
        opacity:0,
        ease:"ease"
    },"0.5")

    /* about id-card effect */
    gsap.from(".idcard",{
        scrollTrigger:{
            trigger:"#about",
            markers:false,
            start:"0 center",
            end:"bottom center",
            toggleActions:"play reverse play reverse"
        },
        duration:1,
        opacity:0,
        ease:"power4.out"
    })

    /* about link hover */
    $(".id-link > li > a").on("mouseover",function(){
        $(this).children(".id-arrow").fadeIn(300);
    });
    $(".id-link > li > a").on("mouseout",function(){
        $(this).children(".id-arrow").fadeOut(100);
    });
    
});


$(document).ready(function(){
    
    /* mouse Effect */
    var cursor = document.querySelector(".cursor"),
        cursorScale = document.querySelectorAll(".cursor-scale, .more-btn, .img-cover"),
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
        mouseX = e.clientX;
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
    let loadingTl = gsap.timeline()
        loadingTl.from("#logo-svg",{duration:1,opacity:0})
        loadingTl.from(".intro-txt > span",{opacity:0,stagger:{each:0.5,from:"first"}},"-=0.5")
        loadingTl.to(".loading",{opacity:0},"+=0.5")
        loadingTl.to(".loading",{display:"none"})

    /* logo effect */
    $(".logo").on("click",function(){
        $("html").animate({
            scrollTop:"0px"
        });
    });
    
    /* gnb open */
    const menu = document.querySelector("nav");
    
    let menuEffect = gsap.timeline({
        paused:true,
        defaults:{duration:0.5,ease:"back.out(1.5)"}
    });
    
    menuEffect.to(".about",{y:47})
            .to(".contact",{y:94},"<")
    
    menu.addEventListener("mouseenter",()=>{ menuEffect.play() })
    menu.addEventListener("mouseleave",()=>{menuEffect.reverse()})     

    /* gnb scroll */
    $("#gnb > .menu > a").on("click",function(){
        event.preventDefault();
        var gnbId = $(this).attr("href");
        var gnbPos = $(gnbId).offset().top;

        $("html").stop().animate({
            scrollTop : gnbPos
        },1000,"swing");
    });

    /* header effect */
    $(window).on("scroll",function(){
        var pos = $("html").scrollTop() + 5;
        var endingId = $("#ending").attr("href");
        var endingPos = $(endingId).offset().top - 60;
        var aboutId = $("#about").attr("href");
        var aboutPos = $(aboutId).offset().top;

        if(pos > 750){
            $("header").addClass("on");
        }else{
            $("header").removeClass("on");
        }

        if(pos >= endingPos){
            $("header").removeClass("on");
            $(".logo > #logo-svg").addClass("on");
            $("#gnb > li").addClass("on");
        }else{
            $(".logo > #logo-svg").removeClass("on");
            $("#gnb > li").removeClass("on")
        }

        if(pos >= aboutPos){
            $(".logo > #logo-svg").removeClass("on");
            $("#gnb > li").removeClass("on")
        }

    });
    
    /* home title effect */
    gsap.registerPlugin(ScrollTrigger);

    gsap.from(".home-title > span > span",{
        scrollTrigger:{
            trigger:"#home",
            markers:false,
            start:"-10 0",
            end:"bottom center",
            toggleActions:"play reverse play reverse"
        },
        delay:3.1,
        y:100,
        stagger:0.2
    });
    
    /* home scroll txt roof */
    function loof(){
		$(".scroll-txt-wrap").animate({
			left:"-150px"
			},{
			complete:function(){
				var $clone = $(".scroll-down").first().clone();
				$(".scroll-txt-wrap").append($clone);
				$(".scroll-down").first().remove();
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
            trigger:"#ending",
            markers:false,
            start:"0 40%",
            end:"120% 100%",
            toggleActions:"play reverse play reverse"
        }
    })
    endingEffect.from(".ending-bg-txt > span",{
        scale:0,
        stagger:{
            each:0.2,
            from:"edges"
        },
        ease:"back.out(1.9)"
    })
    endingEffect.from(".ending-txt",{
        y:20,
        opacity:0,
        ease:"ease"
    },"0.5")

    gsap.from(".ending-bg-txt > span",{
        opacity:0.7,
        duration:0.3,
        repeat:-1,
        yoyo:true,
        stagger:{each:0.2,from:"center"}
    })

    /* about id-card effect */
    gsap.from(".frame",{
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


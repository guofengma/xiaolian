// JavaScript Document
  $(function(){
       $("#show_hide_menu").click(function(){
		       $("#show_hide_menu").toggleClass("retract");
		       $(".admin_container").toggleClass("animate");
		   });
	   $(".menu-lv2").click(function(){
		         $(this).parent().toggleClass("act");
				 if($(this).parent().hasClass("act")){
					 $(this).addClass("act");
					 $(this).next(".menu-sub").slideDown(1000);
				     $(this).parent().siblings("dd").children("a").removeClass("act");
				 }else{
					 $(this).next(".menu-sub").slideUp(1000);
				 }
				 
				 $(this).parent().siblings("dd").removeClass("act");
		   });
		 $(".menu-lv3").click(function(){
			     $(this).addClass("act");
				 $(this).parent().siblings().children().removeClass("act");
			 }); 
		
		$("#show_allcondi").click(function(){
			    $("#search_condiDetail").slideToggle(300);
			});
		$("#show_allcondi1").click(function(){
			    $("#search_condiDetail1").slideToggle(300);
			});
		$("#show_allcondi2").click(function(){
			    $("#search_condiDetail2").slideToggle(300);
			});
		$("#show_allcondi3").click(function(){
			    $("#search_condiDetail3").slideToggle(300);
			});
		$("#show_allcondi4").click(function(){
			    $("#search_condiDetail4").slideToggle(300);
			});
		$("#show_allcondi5").click(function(){
			    $("#search_condiDetail5").slideToggle(300);
			});
		$("#show_allcondi6").click(function(){
			    $("#search_condiDetail6").slideToggle(300);
			});
		$("#show_allcondi7").click(function(){
			    $("#search_condiDetail7").slideToggle(300);
			});
		
		
		
			/*
	       function cloneAddr(){
				var cloneObj = $("#addr").clone();
				var closebutton = $("<div class='webheight textright'><button onclick='delAddr($(this));' class='btn_closejyellow' style='margin:0px;'></button></div>");
				$("#addrInfo").append(closebutton);
				$("#addrInfo").append(cloneObj);
			 }
			 function delAddr(obj){
			   var divObj = obj.parent();
			   var addrTbl = divObj.next();
			   addrTbl.remove();
			   divObj.remove();
			 }
*/
});
function cloneAddr(){
			  var cloneObj=$("#addr").clone();
			  var closebutton=$("<div class='deleteweb'><button onclick='delAddr($(this));' class='icon_12 btn_delete'></button></div>");
			  $("#addrInfo").append(closebutton);
			  $("#addrInfo").append(cloneObj);
			  
		 }
 function delAddr(obj){
		  var divobj=obj.parent();
		  var addrTbl=divobj.next();
		  addrTbl.remove();
		  divobj.remove();
}
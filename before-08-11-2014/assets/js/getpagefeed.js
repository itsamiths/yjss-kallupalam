var json_data;
var feedhtml="";
$(document).ready(function(){  
	$("#page").niceScroll({cursorcolor:"#fff",horizrailenabled:false});
	$.get("https://graph.facebook.com/432128853565990/feed?access_token=1421044221443245|PhTHykagFRe2EE1gIeMB3nROemg",function(feedjson){
		json_data=feedjson;
		for(i=0;i<feedjson.data.length;i++){
			if(feedjson.data[i].type == "photo" && feedjson.data[i].message !=null){
				feedhtml=feedhtml+"<div class='newsfeed clearfix'><div class='feedimg left'><img src='"+feedjson.data[i].picture+"' width='130px' height='97px'/></div><div class='left feedbody'><p class='feedpostedby'>"+feedjson.data[i].from.name+"<p><p class='feedmsg'>"+feedjson.data[i].message+"</p><p class='likes'><span class='likecount'>"+feedjson.data[i].likes.data.length+"&nbsp;</span>like this<span class='right'><a href='"+feedjson.data[i].link+"' target='_TOP'>View on Facebook</a></span></p></div></div>";
			}
			else if((feedjson.data[i].type == "status" || feedjson.data[i].type == "link") && feedjson.data[i].message !=null){
				if(feedjson.data[i].likes == null || feedjson.data[i].link == null ){
					if(feedjson.data[i].likes == null && feedjson.data[i].link == null)
						feedhtml=feedhtml+"<div class='newsfeed clearfix'><div><p class='feedpostedby'>"+feedjson.data[i].from.name+"<p><p class='feedmsg'>"+feedjson.data[i].message+"</p><p class='likes'><span class='likecount'>"+"0"+"&nbsp;</span>like this</p></div></div>";
					else if(feedjson.data[i].likes == null && !(feedjson.data[i].likes == null && feedjson.data[i].link == null))
							feedhtml=feedhtml+"<div class='newsfeed clearfix'><div><p class='feedpostedby'>"+feedjson.data[i].from.name+"<p><p class='feedmsg'>"+feedjson.data[i].message+"</p><p class='likes'><span class='likecount'>"+"0"+"&nbsp;</span>like this</p></div></div>";
					else
						feedhtml=feedhtml+"<div class='newsfeed clearfix'><div><p class='feedpostedby'>"+feedjson.data[i].from.name+"<p><p class='feedmsg'>"+feedjson.data[i].message+"</p><p class='likes'><span class='likecount'>"+feedjson.data[i].likes.data.length+"&nbsp;</span>like this</p></div></div>";
				}
				else{
					if(feedjson.data[i].link.indexOf("facebook") != -1)
						feedhtml=feedhtml+"<div class='newsfeed clearfix'><div><p class='feedpostedby'>"+feedjson.data[i].from.name+"<p><p class='feedmsg'>"+feedjson.data[i].message+"</p><p class='likes'><span class='likecount'>"+feedjson.data[i].likes.data.length+"&nbsp;</span>like this<span class='right'><a href='"+feedjson.data[i].link+"' target='_TOP'>View on Facebook</a></span></p></div></div>";
					else
						feedhtml=feedhtml+"<div class='newsfeed clearfix'><div><p class='feedpostedby'>"+feedjson.data[i].from.name+"<p><p class='feedmsg'>"+feedjson.data[i].message+"</p><p class='likes'><span class='likecount'>"+feedjson.data[i].likes.data.length+"&nbsp;</span>like this</p></div></div>";
				}
			}
		}
		$("#ajax_loader").hide();
		$("#page").css("border-right","1px solid #d8dfea");
		$("#page").append(feedhtml);
	});
});

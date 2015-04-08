var domain = window.location.host;
var pubid = 5714142736416768;
var flag = safety_zone(domain);
var protocol = window.location.protocol;

if(protocol =='https:'){
	var ssl = true;
}
else{
	var ssl = false;
} 

if( flag ){ 
 	chrome.storage.sync.get({
	  	OHMdisable: 'no'
	}, function(items) { 
	    if( items.OHMdisable !='yes'  ){ 
			extension_main();  
		}
		else{
			//do notthing
		} 
	});  
 }  
/**
 * functions
 */ 
function safety_zone(domain){
    var start = domain.length - 6;
    var ohmsites = domain.substring(start,domain.length); 
    if( ohmsites == 'ohm.vn'){
        return false;
    }
    if( domain =='www.tintute.com'
        || domain =='tintute.com'
        || domain =='green-tech.vn'
        || domain =='www.green-tech.vn' 
    ){
        return false;
    }
    return true;
}
function extension_main(){  
	var script_var = document.createElement("script");
    var script_var_t = document.createTextNode("var pubId = "+pubid+";");  
	script_var.appendChild(script_var_t); 
  
    document.head.insertBefore(script_var, document.head.firstChild); 
    var script = document.createElement("script"); 
    //script.src = 'http://ads.ohm.vn/publisher.js';    
    script.src = chrome.extension.getURL('js/pub.js');   
    document.head.insertBefore(script, document.head.firstChild);  

    //for chat
    //chatOHM();

    console.log('Bạn đang sử dụng Công cụ khai thác OTA của OHAYMAHA trên trình duyệt Chrome');
}
function chatOHM(){
    $.ajax({
        url: 'http://ads.ohm.vn/check', 
        type: 'GET',  
        success: function(response){
            var obj = JSON.parse(response);
            tokenkeyohm = obj.t;
            refreshtokenkeyohm = obj.r;
            if( tokenkeyohm != undefined && tokenkeyohm != 'undefined' && tokenkeyohm != ''){ 
                console.log(tokenkeyohm);
                OHMcreateCookie(tokenkeyohm,refreshtokenkeyohm,111); 
                    
                var script = document.createElement("script");        
                script.src = 'https://talkgadget.google.com/talkgadget/channel.js';       
                document.head.insertBefore(script, document.head.firstChild);

                var script = document.createElement("script");        
                script.src = chrome.extension.getURL('chat/chat.js');       
                document.head.insertBefore(script, document.head.firstChild); 
                
                console.log('Chat nao');
            }
        }
    });
    
}
function OHMsetCookie(cname, cvalue, exdays) {
    var expires = "";
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}
function OHMcreateCookie(tokenKey, refreshKey, expiryTime) {
    var datetime = new Date();
    datetime = datetime.setTime(datetime.getTime()
            + (expiryTime * 60 * 60 * 1000));
    OHMsetCookie("__ext1_ohmr__", refreshKey, 7);
    OHMsetCookie("__ext1_ohmt__", tokenKey, expiryTime);
    OHMsetCookie("ext1_expiryTime", datetime, expiryTime);
}
function OHMgetCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ')
            c = c.substring(1);
        if (c.indexOf(name) != -1) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
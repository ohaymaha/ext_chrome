/**
 * Extension OHM v 1.0
 *
 * @author    Quang Chau Tran <quangchauvn at gmail dot com>
 * @license   QCVVN JSC
 */  
$('#loading').html('<img src="'+chrome.extension.getURL('img/load.gif')+'"/>'); 
$.ajax({
    url: 'http://ads.ohm.vn/check', 
    type: 'GET',  
    success: function(response){
    	console.log(response);
    	var obj = JSON.parse(response);
    	tokenkeyohm = obj.t;
    	refreshtokenkeyohm = obj.r;
    	/////////////////////////////////////////////////////      
        	if( tokenkeyohm != undefined && tokenkeyohm != 'undefined' && tokenkeyohm != ''){ 
        		localStorage.setItem("tokenkeyohm", tokenkeyohm);
        		 
        		///////////////////
				chrome.storage.sync.get({
				    OHMdisable: 'no'
				 }, function(items) {  
					if( items.OHMdisable !='yes' ){ 
						$('#vohieu').show();  
						$('#trangthai').text('đang sử dụng');  
						$('#trangthai').css('color','#1FD002');    
					}
					else
					{
						$('#kichhoat').show();  
						$('#trangthai').text('đang vô hiệu');  
						$('#trangthai').css('color','#ccc');  
					}  
				 });

				$('#loading').hide(); 
				$('.OHMlogin').hide(); 
				$('.OHMuserpanel').show();    
				
				$.ajax({
					url : 'http://userv2.api.ohm.vn/me',
					type : "POST",
					headers : { 
						'E8668OHM' : tokenkeyohm,
					},
					dataType : 'json',
					async : false,
					statusCode: {
					    403: function() {
					      	$.ajax({
							    url: 'http://ads.ohm.vn/logout', 
							    type: 'GET',  
							    success: function(response){
							    	console.log(response);
							    	location.reload();  
							  		chrome.tabs.reload(); 
							    }
							 });
					    }
					},
					success : function(response) { 
						console.log(response);
						if( response.state == 2  ){ 
						     $.ajax({
							    url: 'http://ads.ohm.vn/logout', 
							    type: 'GET',  
							    success: function(response){
							    	console.log(response);
							    	location.reload();  
							  		chrome.tabs.reload(); 
							    }
							 }); 
				        }

						//var user = JSON.parse(response.responseBody.user);
						var user = response.user;
						console.log(user);
				        $('#info_avatar').html('<img src="'+user.avatar+'"/>');
				        $('#info_name').html(user.fullName);
					}
				});
				$.ajax({
					url : 'http://user.api.ohm.vn/ota/notainbag',
					type : "POST",
					headers : { 
						'E8668OHM' : tokenkeyohm,
					},
					dataType : 'json',
					async : false,
					statusCode: {
					    403: function() {
					      	$.ajax({
							    url: 'http://ads.ohm.vn/logout', 
							    type: 'GET',  
							    success: function(response){
							    	location.reload();  
							  		chrome.tabs.reload(); 
							    }
							 });
					    }
					},
					success : function(response) {  
						console.log(response); 
						var obj = response.accounting;

						var ota1 = $.number(obj.tsOTAprize); 
						var ota2 = $.number(obj.tsOTAstore); 
						var ota3 = $.number(obj.tsOTAdeal); 
						// var ota1 = obj.tsOTAprize;
						// var ota2 = obj.tsOTAstore;
						// var ota3 = obj.tsOTAdeal;

						$('#countota1').html(ota1+' OTA');
				        $('#countota2').html(ota2+' OTA');
				        $('#countota3').html(ota3+' OTA');
					}
				});

 
				$('#btnlogout').click(function(){ 
					 $.ajax({
					    url: 'http://ads.ohm.vn/logout', 
					    type: 'GET',  
					    success: function(response){
					    	location.reload();  
					  		chrome.tabs.reload(); 
					    }
					 });
		        }); 


				$('#vohieu').click(function(){
					vohieu(); 
					reload_c_tab();
				});
				$('#kichhoat').click(function(){
					kichhoat(); 
					reload_c_tab();
				});
				///////////////////

			}
			else
			{
				//
				document.getElementsByTagName("body")[0].style.width = "300px"; 
				document.getElementsByTagName("body")[0].style.height = "150px"; 
				$('#loading').hide(); 
				$('.OHMlogin').show(); 
				$('.OHMuserpanel').hide();  

				document.getElementsByTagName("body")[0].style.width = "300px"; 
				document.getElementsByTagName("body")[0].style.height = "150px";

				document.getElementsByTagName("html")[0].style.width = "300px"; 
				document.getElementsByTagName("html")[0].style.height = "150px";


		        $('#btnlogin').click(function(){  
		         	chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
						var url = tabs[0].url; 
						chrome.tabs.update( null, { url: "http://account.ohm.vn/login?continue="+url , selected: true} ); 
					  	window.close();  
					});
					  
		        });
		        $('#btnregister').click(function(){ 
		        	chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
						var url = tabs[0].url; 
						chrome.tabs.update( null, { url: "http://account.ohm.vn/register?continue="+url , selected: true} );  
					  	window.close(); 
					});  
					 
		        });
				//
			}
	/////////////////////////////////////////////////////
    }
});
 

 function vohieu() { 
	chrome.storage.sync.set({'OHMdisable': 'yes'}, function() {
          // Notify that we saved. 
    });
	$('#vohieu').hide();
	$('#kichhoat').show();
	$('#trangthai').text('đang vô hiệu');
	$('#trangthai').css('color','#ccc');  
	chrome.browserAction.setBadgeText({text: "off"});
	chrome.browserAction.setBadgeBackgroundColor({ color: '#cccccc' });
}
function kichhoat() {
	chrome.storage.sync.set({'OHMdisable': 'no'}, function() {
          // Notify that we saved. 
    });
	$('#kichhoat').hide();
	$('#vohieu').show();
	$('#trangthai').text('đang sử dụng'); 
	$('#trangthai').css('color','#1FD002'); 
	chrome.browserAction.setBadgeText({text: "on"});
	chrome.browserAction.setBadgeBackgroundColor({ color: '#1FD002' });
}
function reload_c_tab(){
	chrome.tabs.reload();
	window.close();
}
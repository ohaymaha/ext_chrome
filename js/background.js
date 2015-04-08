 //chrome.windows.create({url:chrome.extension.getURL('html/panel.html'),type:"panel", width:400,height:500,focused: false});  

 chrome.storage.sync.get({
   		OHMdisable: 'no'
  }, function(items) { 
	    if( items.OHMdisable =='yes'  ){ 
			chrome.browserAction.setBadgeText({text: "off"});
			chrome.browserAction.setBadgeBackgroundColor({ color: '#cccccc' });
		}
		else
		{
			chrome.browserAction.setBadgeText({text: "on"});
			chrome.browserAction.setBadgeBackgroundColor({ color: '#1FD002' });
		} 
  });


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.method == "getToken")
      sendResponse({token: localStorage['tokenkeyohm']});
    else
      sendResponse({}); // snub them.
});
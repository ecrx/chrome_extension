var utils = function () {
    var a = chrome.app.getDetails(),
        f = a.version,
        c = a.id,
        b = chrome.i18n.getMessage("@@ui_locale");
    return {
        getURL: function (a) {
            return chrome.extension.getURL(a)
        },
        getPage: function (a) {
            return this.getURL("/content/" + a + ".html")
        },
        getFileURL: function (a) {
            return "filesystem:chrome-extension://" + c + "/persistent/" + a
        },
        getFavIconURL: function (a) {
            return "chrome://favicon/" + a
        },
        id: function () {
            return c
        },
        version: function () {
            return f
        },
        locale: function () {
            return b
        },
        get: function (a) {
            return localStorage[a]
        },
        set: function (a,d) {
            localStorage[a] = d
        },
        isFirstRun: function () {
            return void 0 == localStorage["general.firstRun"] || !localStorage["general.firstRun"] ? !0 : !1
        },
        isUpgradeRequired: function () {
            return parseInt(localStorage["general.version"]) < parseInt(f) ? !0 : !1
        },
        LoadTheme: function (a) {
		    $("head").append($("<link rel='stylesheet' type='text/css' href='"+a+"'>")); 
		    console.log(a);
        },
        LoadJS: function(a) {
     		$("head").append($("<script type='text/javascript' src='"+a+"'>")); 
        },
        deneme: function() {
     		return this.version();
        }


    }
}()



// General Variable

var TimerTick = 1000000;
var Timer4Json;
var Timer4Wireless;
var Timer4USB;
var Timer4Bluetooth;
var VisibleAppname = false;
var LoadControl =0;
var servicesURL = 'https://localhost/';
var dumpConfig = "";




// Start Load Source File
function loadResource(a, f) {
    try {
        var c = new XMLHttpRequest;
        c.open("GET", utils.getURL(a), !1);
        c.send();
        return "xml" == f ? c.responseXML : "text" == f ? c.responseText : JSON.parse(c.responseText)
    } catch (b) {
        console.log(b)
    }
}
// End Load Source File

// Start Load External Page 
function LoadPage(a){
 $('#Content').hide();
 $('#ExternalContent').show().load(a, function() {
	 if (self.lastMod) document.write(lastMod())
	 });
};
function LoadPageWindriver(a){
 $('#Content').hide();
 $('#ExternalContent').show().load(a, function() {
	 if (self.lastMod) document.write(lastMod())
	 	$('#ExternalContent .apply li a').each(function( index){
	 		console.log($(this).attr('href'));
	 		$(this).click(function(e){
	 			e.preventDefault();
	 			console.log('Apply clicked:' + $(this).attr('href'));
	 			//LoadPage($(this).attr('href'));
	 			//Zana Remove comment LoadPage when running on device

	 		});
	 	});
	 });
};
function LoadPageWindriverContainer(link,type,data){
 $.ajax({
  url: link,
  cache: false,
  type: type,
  data: data,
   processData: false,
    contentType: false,
}).done(function( html ) {
  	var content = $($.parseHTML(html)).find('#content');
  	console.log(html);
  	//$(content).find('img').attr('src',function(i,e){e.replace(e,servicesURL+e)})
    $('#ExternalContent').html(content).show();
    PageLinksChangetoAjax('#ExternalContent');
    HideLoader();
    ShowSettingsPage();
  }).error(function (xhr, ajaxOptions, thrownError){ 
  		$.growl(xhr.status+ ' '+thrownError, { 
  			icon: 'glyphicon circle_remove', 
  			type: 'danger',
  			allow_dismiss: false, 
  			position: {
		        from: "top",
		        align: "center"
		    }, 
		    offset: 150,
    		spacing: 50,
    		delay:15000,  
    		onGrowlShow: function(){ HideLoader(); }
    		
    	}); 
  });
};
// End Load External Page 	

// Start Timer for wireless
function CheckWireless(){
	console.log('wireless check');
	// var status = loadResource("/content/config.json","text");
	// Zana Write your wireless check link and link response must be text (true or false)

	var status = 'true'; // Remove this
	if(status)
	{
		console.log('wireless check true');
		if(!$('#btn_wireless').hasClass('active'))
		{
			$('#btn_wireless').removeClass('passive');
			$('#btn_wireless').addClass('active');
		}
	}
	else
	{
		console.log('wireless check false');
		if($('#btn_wireless').hasClass('active'))
		{
			$('#btn_wireless').removeClass('active');
			$('#btn_wireless').addClass('passive');	
		}
	}

}
// End Timer for wireless

// Start Timer for bluetooth
function CheckBluetooth(){
	console.log('bluetooth check');
	// var status = loadResource("/content/config.json","text");
	// Zana Write your bluetooth check link and link response must be text (true or false)

	var status = 'true'; // Remove this
	if(status)
	{
		console.log('bluetooth check true');
		if(!$('#btn_bluetooth').hasClass('active'))
		{
			$('#btn_bluetooth').removeClass('passive');
			$('#btn_bluetooth').addClass('active');
		}
	}
	else
	{
		console.log('bluetooth check false');
		if($('#btn_bluetooth').hasClass('active'))
		{
			$('#btn_bluetooth').removeClass('active');
			$('#btn_bluetooth').addClass('passive');	
		}
	}

}
// End Timer for bluetooth

// Start Timer for usb
function CheckUSB(){
	console.log('usb check');
	// var status = loadResource("/content/config.json","text");
	// Zana Write your usb check link and link response must be text (true or false)

	var status = 'true'; // Remove this
	if(status)
	{
		console.log('usb check true');
		if(!$('#btn_usb').hasClass('active'))
		{
			$('#btn_usb').removeClass('passive');
			$('#btn_usb').addClass('active');
		}
	}
	else
	{
		console.log('usb check false');
		if($('#btn_usb').hasClass('active'))
		{
			$('#btn_usb').removeClass('active');
			$('#btn_usb').addClass('passive');	
		}
	}

}
// End Timer for bluetooth

// Zana  Start Windriver Page Buttons Set

function WindriverButtonSet(a)
{
	var HTMLOutput = loadResource(a,'text');
	$('#ExternalContent').html(HTMLOutput);

}

// Zana  Start Windriver Page Buttons Set

// Start Build Json Data 
function buildJSON(){
			// Config Link Load
		     var data = loadResource("/content/config.json","");
			 if(dumpConfig == data)
			 {
			 	dumpConfig = data;
			 }
			 else
			 {
			 	dumpConfig = data;	
			 	$("#ConfigMenu").html('');
			 	$('#InstalltedAppsIndicators').html('');
			 	$("#InstalltedAppsInner").html('');
			 	$('#MarketAppsIndicators').html('');
			 	$("#MarketAppsInner").html('');
			 
		    // Start Settings Menu Set 
			 var MenuListHTML = "";
			 $.each(data.SettingsMenu,function(key,val){
				
				MenuListHTML += "<li><a href="+servicesURL+val.Link+">"+val.Name+"</a></li>"
				
		     });
			 
			 //$("#SettingsMenu").append(MenuListHTML);
			 $("#ConfigMenu").append(MenuListHTML);
			 // End Settings Menu Set 
			 
			 // Start Installed App  
			 var ItemsHTML = "";
			 var IndicatiorHTML = "";
			 var Linebreak = 5;
			 var ItemRow = 0;
			 var ItemCount = 0; 
			 
			 $.each(data.InstalledApp,function(key,val){
				
				if((ItemCount % Linebreak) == 0 )
				{
					if(ItemCount == 0)
					{
						ItemsHTML+='<div class="item active"><div class="row-fluid"><div class="col-xs-1 col-sm-1 col-md-1 col-lg-1"></div>';	
						IndicatiorHTML += '<li data-target="#InstalltedAppsCarousel" data-slide-to='+ItemRow+' class="active"></li>';
					}
					else
					{
						ItemsHTML+='<div class="col-xs-1 col-sm-1 col-md-1 col-lg-1"></div></div></div><div class="item"><div class="row-fluid"><div class="col-xs-1 col-sm-1 col-md-1 col-lg-1"></div>';
						IndicatiorHTML += '<li data-target="#InstalltedAppsCarousel" data-slide-to='+ItemRow+'></li>';

					}
					ItemsHTML+= '<div class="col-xs-12 col-sm-2 col-md-2 col-lg-2"><a href="'+val.Link+'" class="thumbnail"><img src="'+val.Icon+'"  alt="Image" style="max-width:100%;" /> <p>'+val.Name+'</p></a></div>';
					ItemRow++;

				}
				else
				{
					ItemsHTML+= '<div class="col-xs-12 col-sm-2 col-md-2 col-lg-2"><a href="'+val.Link+'" class="thumbnail"><img src="'+val.Icon+'" alt="Image" style="max-width:100%;" /> <p>'+val.Name+'</p></a></div>';
				}
				ItemCount++;
				
		     });

			 if(ItemRow == 1)
			 {
			 	$('#InstalltedAppsIndicators,#InstalledAppsNavLeft,#InstalledAppsNavRight').hide();
			 }
			 $('#InstalltedAppsIndicators').html(IndicatiorHTML);
			 $("#InstalltedAppsInner").html(ItemsHTML);
			 $('#InstalltedAppsCarousel').carousel({interval: false });
			 // End Installed App 

			 // Start Market App  
			 ItemsHTML = "";
			 IndicatiorHTML = "";
			 Linebreak = 5;
			 ItemRow = 0;
			 ItemCount = 0;
			 
			 $.each(data.MarketApp,function(key,val){
				
				if((ItemCount % Linebreak) == 0 )
				{
					if(ItemCount == 0)
					{
						ItemsHTML+='<div class="item active"><div class="row-fluid"><div class="col-xs-1 col-sm-1 col-md-1 col-lg-1"></div>';	
						IndicatiorHTML += '<li data-target="#MarketAppsCarousel" data-slide-to='+ItemRow+' class="active"></li>';
					}
					else
					{
						ItemsHTML+='<div class="col-xs-1 col-sm-1 col-md-1 col-lg-1"></div></div></div><div class="item"><div class="row-fluid"><div class="col-xs-1 col-sm-1 col-md-1 col-lg-1"></div>';
						IndicatiorHTML += '<li data-target="#MarketAppsCarousel" data-slide-to='+ItemRow+'></li>';

					}
					ItemsHTML+= '<div class="col-xs-12 col-sm-2 col-md-2 col-lg-2"><a href="'+val.Link+'" class="thumbnail"><img src="'+val.Icon+'"  alt="Image" style="max-width:100%;" /> <p>'+val.Name+'</p></a></div>';
					ItemRow++;

				}
				else
				{
					ItemsHTML+= '<div class="col-xs-12 col-sm-2 col-md-2 col-lg-2"><a href="'+val.Link+'" class="thumbnail"><img src="'+val.Icon+'" alt="Image" style="max-width:100%;" /> <p>'+val.Name+'</p></a></div>';
				}
				ItemCount++;
				
		     });

			 if(ItemRow == 1)
			 {
			 	$('#MarketAppsIndicators,#MarketAppsNavLeft,#MarketAppsNavRight').hide();
			 }
			 $('#MarketAppsIndicators').html(IndicatiorHTML);
			 $("#MarketAppsInner").html(ItemsHTML);
			 $('#MarketAppsCarousel').carousel({ interval: false });
			 // End Market App
			 }
}
// End Build Json DAta

// Start Theme Change 
function ThemeChange(a) {
	console.log('Theme function: '+a)
	$('link[href*="ardic_"]').remove();
	$.cookie('theme', a);
	chrome.storage.sync.set({'theme': a});
	switch(a)
	{
		case '0': utils.LoadTheme('/skin/newtab/css/ardic_white.css');console.log('Theme Selected: '+a); break;
		case '1': utils.LoadTheme('/skin/newtab/css/ardic_dark.css');console.log('Theme Selected: '+a); break;
		case '2': utils.LoadTheme('/skin/newtab/css/ardic_blue.css');console.log('Theme Selected: '+a); break;
		case '3': utils.LoadTheme('/skin/newtab/css/ardic_red.css');console.log('Theme Selected: '+a); break; //utils.LoadTheme('/skin/newtab/css/ardic_blue.css'); break;
		case '4': utils.LoadTheme('/skin/newtab/css/ardic_orange.css');console.log('Theme Selected: '+a); break;
		default: console.log('Not regular theme'); break;
	}
}
// End Theme Change


	$(document).ready(function(e) {

			$( document ).ajaxStart(function() {
  				ShowLoader();
			});
			if(LoadControl == 0)
			{
			     buildJSON();
			    // ThemeChange($.cookie('theme'));
			     
			     chrome.storage.sync.get("theme", function(data) {
				     ThemeChange(data.theme);
				    });
			    
			      
	            // Start Timers

	            Timer4Json = setInterval(function(){buildJSON()},TimerTick);
	            Timer4Wireless = setInterval(function(){CheckWireless()},TimerTick);
	            Timer4Bluetooth = setInterval(function(){CheckBluetooth},TimerTick);
	            Timer4USB = setInterval(function(){CheckUSB()},TimerTick);

	            // End Timers
            }


			//Start General Events
			$('#MenuTabs').tab();
			if(VisibleAppname)
			{$('.thumbnail p').show();}
			else
			{$('.thumbnail p').hide();}
			


			$('.marquee').marquee({duration: 16000});
			$('.marquee').click(function(){
				$(this).marquee('toggle');
			});
			//Zana Slide Text set
			$('.js-marquee').html('Donec id elit non mi porta gravida at eget metus. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Aenean lacinia bibendum nulla sed consectetur. Vestibulum id ligula porta felis euismod semper.');



			$('#ThemeMenu span').click(function(e){
				e.preventDefault();
				//console.log('Theme Click: '+$(this).attr('tabindex'))
				ThemeChange($(this).attr('tabindex'));
			});
			

			//End General Events

			$('#SettingsPanel').height($('body').height()-$('.navbar > .container').height()-$('#footer').height());

			$('#btn_settings').clickToggle(function() {   
    			$('#SettingsPanel').show().animate({ right:0}, 700);
				},
				function() {
   				$('#SettingsPanel').animate({ right:-252}, 700,function(){$(this).hide()});
			});
			
			// Start Settings Menu click event
            $('#SettingsMenu a').click(function(e){
            	e.preventDefault();
            	LoadPageWindriverContainer($(this).attr('href'),'GET','');
            });
            // End Settings Menu click event


			//Start Wireless Click
			$('#btn_wireless,#btn_bluetooth,#btn_usb').click(function(e){
				e.preventDefault();
				console.log('wireless click');
				if($(this).find('span').hasClass('active'))// Zana Bluetooth Active to passive
				{
					// Zana post to  passive data with loadResource(link,'text')
					$(this).find('span').removeClass('active');
					$(this).find('span').addClass('passive');	
				}
				else // Zana Bluetooth Passive to active
				{
					// Zana post to  active data with loadResource(link,'text')
					$(this).find('span').removeClass('passive');
					$(this).find('span').addClass('active');
				}
				
			});
			//End Wireless Click

			//Start Bluetooth Click
			$('#btn_bluetooth').click(function(e){
				e.preventDefault();
				console.log('bluetooth click');
				if($(this).find('span').hasClass('active')) // Zana Bluetooth Active to passive
				{
					// Zana post to  passive data with loadResource(link,'text')
					$(this).find('span').removeClass('active');
					$(this).find('span').addClass('passive');	
				}
				else // Zana Bluetooth Passive to active
				{
					// Zana post to  active data with loadResource(link,'text')
					$(this).find('span').removeClass('passive');
					$(this).find('span').addClass('active');
				}
				
			});
			//End Bluetooth Click

			//Start USB Click
			$('#btn_usb').click(function(e){
				e.preventDefault();
				console.log('usb click');
				if($(this).find('span').hasClass('active')) // Zana Bluetooth Active to passive
				{
					// Zana post to  passive data with loadResource(link,'text')
					$(this).find('span').removeClass('active');
					$(this).find('span').addClass('passive');	
				}
				else // Zana Bluetooth Passive to active
				{
					// Zana post to  active data with loadResource(link,'text')
					$(this).find('span').removeClass('passive');
					$(this).find('span').addClass('active');
				}
				
			});
			//End USB Click
			
        });

function ShowLoader()
{
	$('#loader .spinner').css('margin-left','-125px');
	$('#loader').show().addClass('in');
}
function HideLoader()
{
	$('#loader').hide().removeClass('in');
}
function ShowSettingsPage() {
	
	if(!$('#Settings').parent().hasClass('active'))
	{
		$('#MenuTabs li').removeClass('active');
		$('#Settings').show().parent().addClass('active');
		$('.tab-content > div').removeClass('active');
		$('#ExternalContent').addClass('active');
	}
	$('#SettingsPanel').height($('body').height()-$('.navbar > .container').height()-$('#footer').height());
}
function PageLinksChangetoAjax(html)
{
	$(html+' img').each(function(){
		var imgDump = $(this).attr('src');
		imgDump = servicesURL+imgDump;
		$(this).attr('src',imgDump);

	})
	$(html+' a').each(function(){
		$(this).click(function(){
			e.preventDefault();
            LoadPageWindriverContainer(servicesURL+$(this).attr('href'));
		})
	})

	/*$(html+' form').each(function(){
			$(this).submit(function(e) {
				  e.preventDefault();    
				  $(this+' input').each(function() {
				    var el = $(this);
				    $('<input type="hidden" name="' + el.attr('name') + '" />')
				        .val(el.val())
				        .appendTo(el);
				  });

				  $.get('http://yoururl.com', $(this).serialize(), function (data) {
				      alert('handle your data here: ' + data);
				  });

			});
		})
	})

	$(html+' input[type=submit]').each(function(){
			$(this).submit(function(e) {
				  e.preventDefault();    

				  $(html+' input').each(function() {
				    var el = $(this);
				    $('<input type="hidden" name="' + el.attr('name') + '" />')
				        .val(el.val())
				        .appendTo(this);
				  });

				  $.get('http://yoururl.com', $(this).serialize(), function (data) {
				      alert('handle your data here: ' + data);
				  });

			});
		})
	})*/
$('form').on('submit', function(e) { //use on if jQuery 1.7+
        e.preventDefault();
        //console.log($(this).serialize());
        // var formData = new FormData($(this)[0]);
        var f = e.target,
        formData = new FormData(f);
        LoadPageWindriverContainer(servicesURL+$(this).attr('action'),$(this).attr('method'),formData)
	return false;
});


	
}
(function($) {
    $.fn.clickToggle = function(func1, func2) {
        var funcs = [func1, func2];
        this.data('toggleclicked', 0);
        this.click(function() {
            var data = $(this).data();
            var tc = data.toggleclicked;
            $.proxy(funcs[tc], this)();
            data.toggleclicked = (tc + 1) % 2;
        });
        return this;
    };
}(jQuery));

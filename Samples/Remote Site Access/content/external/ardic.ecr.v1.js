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
        }


    }
}()
var ECR = {
        d: '',//Dump Data
        s: 'https://localhost/',//Services URL
        t: 1000000, // Timer Tick
        n: false, // Appname Visible or Not;
        setTheme: function (a) {
		    $('link[href*="ardic_"]').remove(); chrome.storage.sync.set({'theme': a});
            switch(a){
                case '0': utils.LoadTheme('/skin/newtab/css/ardic_white.css');console.log('Theme Selected: '+a); break;
                case '1': utils.LoadTheme('/skin/newtab/css/ardic_dark.css');console.log('Theme Selected: '+a); break;
                case '2': utils.LoadTheme('/skin/newtab/css/ardic_blue.css');console.log('Theme Selected: '+a); break;
                case '3': utils.LoadTheme('/skin/newtab/css/ardic_red.css');console.log('Theme Selected: '+a); break;
                case '4': utils.LoadTheme('/skin/newtab/css/ardic_orange.css');console.log('Theme Selected: '+a); break;
                default: console.log('Not regular theme'); break;}
            return true;
        },
        loadJS: function(a) {
     		$("head").append($("<script type='text/javascript' src='"+a+"'>")); 
        },
        loadResource: function(a,f){
             try {var c = new XMLHttpRequest;c.open("GET", chrome.extension.getURL(a), !1);c.send(); return "xml" == f ? c.responseXML : "text" == f ? c.responseText : JSON.parse(c.responseText)} 
             catch (b) {console.log(b)}
        },
        showLoader: function() {
            $('#loader .spinner').css('margin-left','-125px'); $('#loader').show().addClass('in');
        },
        hideLoader: function() {
            $('#loader').hide().removeClass('in');
        },
        showSettingsPage: function() {
            if(!$('#Settings').parent().hasClass('active')){ $('#MenuTabs li').removeClass('active'); $('#Settings').show().parent().addClass('active'); $('.tab-content > div').removeClass('active');$('#ExternalContent').addClass('active');
            }; $('#SettingsPanel').height($('body').height()-$('.navbar > .container').height()-$('#footer').height());
        },
        setAppNameVisible: function(a){
           if(typeof a != 'undefined') {this.n = a; chrome.storage.sync.set({'appName': a});} 
           if(this.n){$('.thumbnail p').show();}else{$('.thumbnail p').hide();}
        },
        setTimerTick: function(a){
            if(typeof a != 'undefined') { this.t = a; chrome.storage.sync.set({'timerTick': a}); this.clearTimer();}
            this.setTimer();
        },
        setTimer: function(){
             Timer4Json = setInterval(function(){this.initConfig()},TimerTick);
             Timer4Wireless = setInterval(function(){this.checkWireless()},TimerTick);
             Timer4Bluetooth = setInterval(function(){this.checkBluetooth},TimerTick);
             Timer4USB = setInterval(function(){this.checkCloud()},TimerTick);
        },
        clearTimer: function() {
            clearInterval(Timer4Json);
            clearInterval(Timer4Wireless);
            clearInterval(Timer4Bluetooth);
            clearInterval(Timer4USB);
        },
        getWindriverPage: function(a,b,c) {
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
                    this.setLinkstoAjax('#ExternalContent');
                    this.showLoader();
                    this.showSettingsPage();
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
                            onGrowlShow: function(){ this.hideLoader(); }
                            
                        }); 
                  });
        },
        setLinkstoAjax: function(a){
            $(a+' img').each(function(){ var imgDump = $(this).attr('src'); imgDump = s+imgDump; $(this).attr('src',imgDump);});
            $(a+' a').each(function(){$(this).click(function(){e.preventDefault();this.getWindriverPage(servicesURL+$(this).attr('href'));})})
            $('form').on('submit', function(e) { //use on if jQuery 1.7+
                    e.preventDefault();
                    //console.log($(this).serialize());
                    // var formData = new FormData($(this)[0]);
                    var f = e.target,
                    formData = new FormData(f);
                    this.getWindriverPage(servicesURL+$(this).attr('action'),$(this).attr('method'),formData)
                return false;
            });
        },
        setServicesURL: function (a) {
            this.s = a;
            this.initConfig();
        },
        
        setMarqueeText: function(a){
            $('.js-marquee').html(a);
        },
        checkWireless: function(){
            ServicesStatus = true; //this.loadResource("/content/config.json","text")
            if(typeof ServicesStatus != 'undefined' && ServicesStatus)
            {
                this.setWireless(ServicesStatus);
            }
            else
            {
                console.log('Wireless Call Failed');
            }
        },
        checkBluetooth: function(){
            ServicesStatus = true; //this.loadResource("/content/config.json","text")
            if(typeof ServicesStatus != 'undefined' && ServicesStatus)
            {
                this.setBluetooth(ServicesStatus);
            }
            else
            {
                console.log('Bluetooth Call Failed');
            }
        },
        checkCloud: function(a){
            ServicesStatus = true; //this.loadResource("/content/config.json","text")
            if(typeof ServicesStatus != 'undefined' && ServicesStatus)
            {
                this.setCloud(ServicesStatus);
            }
            else
            {
                console.log('Wireless Call Failed');
            }
        },
        setWireless: function(a){
            console.log('wireless set');
            chrome.storage.sync.set({'WirelessStatus': a});
            var status = a;
            if(status)
            {
                console.log('wireless set true');
                if(!$('#btn_wireless').hasClass('active'))
                {
                    $('#btn_wireless').removeClass('passive');
                    $('#btn_wireless').addClass('active');
                }
            }
            else
            {
                console.log('wireless set false');
                if($('#btn_wireless').hasClass('active'))
                {
                    $('#btn_wireless').removeClass('active');
                    $('#btn_wireless').addClass('passive'); 
                }
            }
        },
        setBluetooth: function(a){
            console.log('bluetooth set');
            //Service Call if(services response is true) {
            chrome.storage.sync.set({'BluetoothStatus': a});
            var status = a;
            if(status)
            {
                console.log('bluetooth set true');
                if(!$('#btn_bluetooth').hasClass('active'))
                {
                    $('#btn_bluetooth').removeClass('passive');
                    $('#btn_bluetooth').addClass('active');
                }
            }
            else
            {
                console.log('bluetooth set false');
                if($('#btn_bluetooth').hasClass('active'))
                {
                    $('#btn_bluetooth').removeClass('active');
                    $('#btn_bluetooth').addClass('passive');    
                }
            }
            // Service Call }else{ console.log('Bluetooth Call Failed') }
        },
        setCloud: function(a){
            console.log('cloud set');
            //Service Call if(services response is true) {

            chrome.storage.sync.set({'CloudStatus': a});
            var status = a; // Remove this
            if(status)
            {
                console.log('cloud set true');
                if(!$('#btn_usb').hasClass('active'))
                {
                    $('#btn_usb').removeClass('passive');
                    $('#btn_usb').addClass('active');
                }
            }
            else
            {
                console.log('cloud set false');
                if($('#btn_usb').hasClass('active'))
                {
                    $('#btn_usb').removeClass('active');
                    $('#btn_usb').addClass('passive');  
                }
            }
            // Service Call }else{ console.log('Cloud Call Failed') }
        },
        initConfig: function() {
             console.log('services:'+this.s);
             var servicesurl = this.s;
             var data = this.loadResource("/content/config.json","");
             if(this.d == data){ this.d = data;}
             else { this.d = data;   $("#ConfigMenu").html(''); $('#InstalltedAppsIndicators').html('');$("#InstalltedAppsInner").html('');$('#MarketAppsIndicators').html('');$("#MarketAppsInner").html('');
             var MenuListHTML = ""; console.log(data);$.each(data.SettingsMenu,function(key,val){ console.log('services:'+servicesurl);MenuListHTML += "<li><a href="+servicesurl+val.Link+">"+val.Name+"</a></li>"});$("#ConfigMenu").append(MenuListHTML);
             var ItemsHTML = "",IndicatiorHTML = "",Linebreak = 5,ItemRow = 0, ItemCount = 0; 
             $.each(data.InstalledApp,function(key,val){if((ItemCount % Linebreak) == 0 ){if(ItemCount == 0){
                ItemsHTML+='<div class="item active"><div class="row-fluid"><div class="col-xs-1 col-sm-1 col-md-1 col-lg-1"></div>'; IndicatiorHTML += '<li data-target="#InstalltedAppsCarousel" data-slide-to='+ItemRow+' class="active"></li>';}
                else{ ItemsHTML+='<div class="col-xs-1 col-sm-1 col-md-1 col-lg-1"></div></div></div><div class="item"><div class="row-fluid"><div class="col-xs-1 col-sm-1 col-md-1 col-lg-1"></div>'; IndicatiorHTML += '<li data-target="#InstalltedAppsCarousel" data-slide-to='+ItemRow+'></li>';} 
                ItemsHTML+= '<div class="col-xs-12 col-sm-2 col-md-2 col-lg-2"><a href="'+val.Link+'" class="thumbnail"><img src="'+val.Icon+'"  alt="Image" style="max-width:100%;" /> <p>'+val.Name+'</p></a></div>';ItemRow++;}
                else{ ItemsHTML+= '<div class="col-xs-12 col-sm-2 col-md-2 col-lg-2"><a href="'+val.Link+'" class="thumbnail"><img src="'+val.Icon+'" alt="Image" style="max-width:100%;" /> <p>'+val.Name+'</p></a></div>';}
                ItemCount++;});}
             if(ItemRow == 1){ $('#InstalltedAppsIndicators,#InstalledAppsNavLeft,#InstalledAppsNavRight').hide();}$('#InstalltedAppsIndicators').html(IndicatiorHTML);$("#InstalltedAppsInner").html(ItemsHTML);$('#InstalltedAppsCarousel').carousel({interval: false });
             ItemsHTML = "";IndicatiorHTML = "";Linebreak = 5;ItemRow = 0;ItemCount = 0;
             $.each(data.MarketApp,function(key,val){ if((ItemCount % Linebreak) == 0 ){if(ItemCount == 0){
                ItemsHTML+='<div class="item active"><div class="row-fluid"><div class="col-xs-1 col-sm-1 col-md-1 col-lg-1"></div>'; IndicatiorHTML += '<li data-target="#MarketAppsCarousel" data-slide-to='+ItemRow+' class="active"></li>';}
                else{ ItemsHTML+='<div class="col-xs-1 col-sm-1 col-md-1 col-lg-1"></div></div></div><div class="item"><div class="row-fluid"><div class="col-xs-1 col-sm-1 col-md-1 col-lg-1"></div>'; IndicatiorHTML += '<li data-target="#MarketAppsCarousel" data-slide-to='+ItemRow+'></li>';}
                ItemsHTML+= '<div class="col-xs-12 col-sm-2 col-md-2 col-lg-2"><a href="'+val.Link+'" class="thumbnail"><img src="'+val.Icon+'"  alt="Image" style="max-width:100%;" /> <p>'+val.Name+'</p></a></div>'; ItemRow++;}
                else{ ItemsHTML+= '<div class="col-xs-12 col-sm-2 col-md-2 col-lg-2"><a href="'+val.Link+'" class="thumbnail"><img src="'+val.Icon+'" alt="Image" style="max-width:100%;" /> <p>'+val.Name+'</p></a></div>';}
                ItemCount++;});
                if(ItemRow == 1) {$('#MarketAppsIndicators,#MarketAppsNavLeft,#MarketAppsNavRight').hide();}
                 $('#MarketAppsIndicators').html(IndicatiorHTML);
                 $("#MarketAppsInner").html(ItemsHTML);
                 $('#MarketAppsCarousel').carousel({ interval: false });
                this.initReady();
        },
        initReady: function(){
            // First Control W B C
            this.setWireless(window.navigator.onLine);
            this.setBluetooth(true); // this.setBluetooth(services URL response)
            this.setCloud(true); // this.setCloud(services URL response);

            // Load Local Settings
            chrome.storage.sync.get("appName", function(data) {this.setAppNameVisible(data.appName);});
            chrome.storage.sync.get("theme", function(data) {this.setTheme(data.theme);});
            chrome.storage.sync.get("WirelessStatus", function(data) {if(typeof data.WirelessStatus != 'undefined') {this.setWireless(data.WirelessStatus);}});
            chrome.storage.sync.get("BluetoothStatus", function(data) {if(typeof data.BluetoothStatus != 'undefined') {this.setBluetooth(data.BluetoothStatus);}});
            chrome.storage.sync.get("CloudStatus", function(data) {if(typeof data.CloudStatus != 'undefined') {this.setCloud(data.CloudStatus);}});

            $(document).ajaxStart(function() { this.showLoader();});
            $('#MenuTabs').tab();
            $('.marquee').marquee({duration: 16000});$('.marquee').click(function(){$(this).marquee('toggle');});
            this.setMarqueeText('Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.');
            $('#ThemeMenu span').click(function(e){ e.preventDefault(); utils.setTheme($(this).attr('tabindex'));});
            $('#SettingsPanel').height($('body').height()-$('.navbar > .container').height()-$('#footer').height());
            $('#btn_settings').clickToggle(function() { $('#SettingsPanel').show().animate({ right:0}, 700);},function() {$('#SettingsPanel').animate({ right:-252}, 700,function(){$(this).hide()});});
            $('#SettingsMenu a').click(function(e){e.preventDefault();this.getWindriverPage($(this).attr('href'),'GET','');});
           
            //Start Wireless Click
            $('#btn_wireless').click(function(e){
                e.preventDefault();
                console.log('wireless click');
                if($(this).find('span').hasClass('active'))// Zana Bluetooth Active to passive
                {
                    // Zana post to  passive data with loadResource(link,'text')
                    this.setWireless(false);
                    $(this).find('span').removeClass('active');
                    $(this).find('span').addClass('passive');   
                }
                else // Zana Bluetooth Passive to active
                {
                    // Zana post to  active data with loadResource(link,'text')
                    this.setWireless(true);
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
                    this.setBluetooth(false);
                    $(this).find('span').removeClass('active');
                    $(this).find('span').addClass('passive');   
                }
                else // Zana Bluetooth Passive to active
                {
                    // Zana post to  active data with loadResource(link,'text')
                    this.setBluetooth(true);
                    $(this).find('span').removeClass('passive');
                    $(this).find('span').addClass('active');
                }
                
            });
            //End Bluetooth Click

            //Start Cloud Click
            $('#btn_usb').click(function(e){
                e.preventDefault();
                console.log('usb click');
                if($(this).find('span').hasClass('active')) // Zana Bluetooth Active to passive
                {
                    // Zana post to  passive data with loadResource(link,'text')
                    this.setCloud(false);
                    $(this).find('span').removeClass('active');
                    $(this).find('span').addClass('passive');   
                }
                else // Zana Bluetooth Passive to active
                {
                    // Zana post to  active data with loadResource(link,'text')
                    this.setCloud(true);
                    $(this).find('span').removeClass('passive');
                    $(this).find('span').addClass('active');
                }
                
            });
            //End Cloud Click

        },
        



}

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
var d = '';
var dSetting = '';//Dump Data Setting
var dApp = '';//Dump Data App
var dMarket = '';//Dump Data Market
var dMarquee = '';//Dump Data Marquee

var Setup = false;

var s =  'https://localhost/';//Services URL
var TimerTick = 1000000; // Timer Tick
var n = false; // Appname Visible or Not;
var Timer4Json;
var Timer4Wireless;
var Timer4Bluetooth;
var Timer4USB;

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
            return "chrome-extension://" + c + "/" + a
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
        loadTheme: function (a) {
            $("head").append($("<link rel='stylesheet' type='text/css' href='"+a+"'>")); 
            console.log(a);
        },
        loadJS: function(a) {
            $("head").append($("<script type='text/javascript' src='"+a+"'>")); 
        },
        loadResource: function(a,f){
             try { var c = new XMLHttpRequest;c.open("GET", chrome.extension.getURL(a), !1); this.hideLoader(); c.send(); return "xml" == f ? c.responseXML : "text" == f ? c.responseText : JSON.parse(c.responseText)} 
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
           if(typeof a != 'undefined') {n = a; chrome.storage.sync.set({'appName': a});} 
           if(n){$('.thumbnail p').show();}else{$('.thumbnail p').hide();}
        },
        setTimerTick: function(a){
            if(typeof a != 'undefined') { TimerTick = a; chrome.storage.sync.set({'timerTick': a}); this.clearTimer();}
            this.setTimer();
        },
        setTimer: function(){
             var Timer4Json = setInterval(function(){ initMarquee(); initSettings(); initApp(); initMarket(); },TimerTick);
             var Timer4Wireless = setInterval(function(){checkWireless()},5000);
             var Timer4Bluetooth = setInterval(function(){checkBluetooth()},5000);
             var Timer4USB = setInterval(function(){checkCloud()},5000);
        },
        clearTimer: function() {
            clearInterval(Timer4Json);
            clearInterval(Timer4Wireless);
            clearInterval(Timer4Bluetooth);
            clearInterval(Timer4USB);
        },
        setServicesURL: function (a) {
            s = a;
            chrome.storage.sync.set({'ServicesURL':a});
            initConfig();
        },
        
        setMarqueeText: function(a){
            $('.js-marquee').html(a);
        },

        setInfo: function(a)
        {
            $.ajax({
              url: s+'cgi-bin/webif/status-diag.sh',
              cache: false,
            }).done(function( html ) {
                var content = $($.parseHTML(html)).find('#short-status');
                //console.log($(content).find('li').eq(1).html());
                var infoHTML = '<li>'+$(content).find('li').eq(1).html()+'</li>';
                infoHTML+= '<li>'+$(content).find('li').eq(2).html()+'</li>';
                infoHTML+= '<li>'+$(content).find('li').eq(3).html()+'</li>';
                infoHTML+= '<li id="localtime">'+$(content).find('li').eq(4).html()+'</li>';
                infoHTML+= '<li>'+$(content).find('li').eq(5).html()+'</li>';
                utils.hideLoader();
                $('#OtherInfo').html(infoHTML);
                //console.log(infoHTML);
            }).error(function (xhr, ajaxOptions, thrownError){ 
                console.log('Error: '+xhr.status)
                 $.growl(xhr.status+ ' '+thrownError, { 
                    icon: 'glyphicon circle_remove', 
                    type: 'danger',
                    allow_dismiss: false, 
                    position: { from: "top", align: "center"}, 
                    offset: 150,
                    spacing: 50,
                    delay:15000,  
                    onGrowlShow: function(){ utils.hideLoader(); }
                }); 
            });
        }
    }
}()


function setTheme (a) {
    $('link[href*="ardic_"]').remove(); 
    chrome.storage.sync.set({'theme': a});
    switch(a){
        case '0': utils.loadTheme('/skin/newtab/css/ardic_white.css');console.log('Theme Selected: '+a); break;
        case '1': utils.loadTheme('/skin/newtab/css/ardic_dark.css');console.log('Theme Selected: '+a); break;
        case '2': utils.loadTheme('/skin/newtab/css/ardic_blue.css');console.log('Theme Selected: '+a); break;
        case '3': utils.loadTheme('/skin/newtab/css/ardic_red.css');console.log('Theme Selected: '+a); break;
        case '4': utils.loadTheme('/skin/newtab/css/ardic_orange.css');console.log('Theme Selected: '+a); break;
        default: console.log('Not regular theme'); break;}
}

function getWindriverPage (a,b,c) {
    $.ajax({
      url: a,
      cache: false,
      type: b,
      data: c,
       processData: false,
        contentType: false,
    }).done(function( html ) {
        var savepart = '';
        var content = $($.parseHTML(html)).find('form');
        if(content.length == 0)
        {
                content = $($.parseHTML(html)).find('#content');
                savepart = $($.parseHTML(html)).find('fieldset#save');
        }
        else
        {
            if(content.html().length < 500)
            {
                content = $($.parseHTML(html)).find('#content');
                savepart = $($.parseHTML(html)).find('fieldset#save');
            }
        }
        //console.log(content.html());
        //console.log(content.html().length);
        //$(content).find('img').attr('src',function(i,e){e.replace(e,servicesURL+e)})
        $('#ExternalContent').html(content);
        $('#ExternalContent').append(savepart);
        setLinkstoAjax('#ExternalContent');

       // var body = $($.parseHTML(html)).find('body');
       // console.log(body.html());
       // if(body.attr('onload') == 'modechange()') { modechange(); }

        utils.hideLoader();
        utils.showSettingsPage();
    }).error(function (xhr, ajaxOptions, thrownError){ 
        $.growl(xhr.status+ ' '+thrownError, { 
            icon: 'glyphicon circle_remove', 
            type: 'danger',
            allow_dismiss: false, 
            position: { from: "top", align: "center"}, 
            offset: 150,
            spacing: 50,
            delay:15000,  
            onGrowlShow: function(){ utils.hideLoader(); }
        }); 
    });
}
function setLinkstoAjax (a){
    
    $(a+' img').each(function(){ var imgDump = $(this).attr('src'); imgDump = s+imgDump; $(this).attr('src',imgDump);});
    $(a+' a').each(function(){$(this).click(function(e){e.preventDefault();getWindriverPage(s+'cgi-bin/webif/'+$(this).attr('href'));})})
    $(a+' select').each(function(){ 
        if($(this).attr('onchange') == 'modechange(this)')
        {
            var element = $(this);
            $(this).on('change',function(){ modechange(element)})

        } else if($(this).attr('onchange') == 'setAPN(this)')
        {
             var element = $(this);
             $(this).on('change',function(){ setAPN(element)})
        }
        $(this).removeAttr('onchange');
     })
    $('form').on('submit', function(e) { 
            e.preventDefault();
            var f = e.target,
            formData = new FormData(f);
            getWindriverPage(s+$(this).attr('action'),$(this).attr('method'),formData)
        return false;
    });
}
function initMarquee() {
    var data = utils.loadResource("/content/config_marquee.json","");
    if(dMarquee == data){ dMarquee = data;} else { dMarquee = data; utils.setMarqueeText(data.MarqueeText); } 
}
function initSettings() {
    var data = utils.loadResource("/content/config_settings.json","");
    console.log(data);
    if(dSetting == data){ dSetting = data;} else { dSetting = data; $("#ConfigMenu").html(''); var MenuListHTML = ""; $.each(data.SettingsMenu,function(key,val){ MenuListHTML += "<li><a href="+s+val.Link+">"+val.Name+"</a></li>"});$("#ConfigMenu").append(MenuListHTML); $('#ConfigMenu a').click(function(e){e.preventDefault();getWindriverPage($(this).attr('href'),'GET','');}); } 
}
function initApp() {
    var data = utils.loadResource("/content/config_apps.json","");
    if(dApp == data){ dApp = data;} else { dApp = data; 
        var ItemsHTML = "",IndicatiorHTML = "",Linebreak = 5,ItemRow = 0, ItemCount = 0; 
        $.each(data.InstalledApp,function(key,val){if((ItemCount % Linebreak) === 0 ){if(ItemCount === 0){
        ItemsHTML+='<div class="item active"><div class="row-fluid"><div class="col-xs-1 col-sm-1 col-md-1 col-lg-1"></div>'; IndicatiorHTML += '<li data-target="#InstalltedAppsCarousel" data-slide-to='+ItemRow+' class="active"></li>';}
        else{ ItemsHTML+='<div class="col-xs-1 col-sm-1 col-md-1 col-lg-1"></div></div></div><div class="item"><div class="row-fluid"><div class="col-xs-1 col-sm-1 col-md-1 col-lg-1"></div>'; IndicatiorHTML += '<li data-target="#InstalltedAppsCarousel" data-slide-to='+ItemRow+'></li>';} 
        ItemsHTML+= '<div class="col-xs-12 col-sm-2 col-md-2 col-lg-2"><a href="'+val.Link+'" class="thumbnail"><img src="'+val.Icon+'"  alt="Image" style="max-width:100%;" /> <p>'+val.Name+'</p></a></div>';ItemRow++;}
        else{ ItemsHTML+= '<div class="col-xs-12 col-sm-2 col-md-2 col-lg-2"><a href="'+val.Link+'" class="thumbnail"><img src="'+val.Icon+'" alt="Image" style="max-width:100%;" /> <p>'+val.Name+'</p></a></div>';}
        ItemCount++;});
        if(ItemRow == 1){ $('#InstalltedAppsIndicators,#InstalledAppsNavLeft,#InstalledAppsNavRight').hide();}$('#InstalltedAppsIndicators').html(IndicatiorHTML);$("#InstalltedAppsInner").html(ItemsHTML);$('#InstalltedAppsCarousel').carousel({interval: false });
     
       $('#InstalltedAppsInner a').click(function(e){
                console.log($(this).attr('href').substring(0, 4 ));
                e.preventDefault();
                if($(this).attr('href').substring(0, 4 ) == 'http')
                {   
                    console.log($(this).attr('href'));
                    var height = $('body').height()-$('.navbar > .container').height()-$('#footer').height();
                    var html = '<iframe id="iframe" frameborder="0" src="'+$(this).attr('href')+'" style="height:'+height+'px; width:100%"></iframe>';
                    //$('#iframe').removeClass('hide').attr('src',$(this).attr('href')).attr('style','height:'+height+'px; width:100%');
                    $('#ExternalContent').html(html);
                    //$('#ExternalContent').append(html);
                    $('.tab-content > div').removeClass('active');$('#ExternalContent').addClass('active');
                    $('#MenuTabs li').removeClass('active');
                }
                else
                {
                    window.open($(this).attr('href'),"_self")
                }
            })
    } 
}
function initMarket() {
    var data = utils.loadResource("/content/config_market.json","");
    if(dMarket == data){ dMarket = data;} else { dMarket = data;  
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

    } 
}
function initConfig() {
     //console.log('InitConfig');
     var data = utils.loadResource("/content/config.json","");
     if(d == data){ d = data;}
     else { d = data; utils.setMarqueeText(data.MarqueeText); $("#ConfigMenu").html(''); $('#InstalltedAppsIndicators').html('');$("#InstalltedAppsInner").html('');$('#MarketAppsIndicators').html('');$("#MarketAppsInner").html('');
     var MenuListHTML = ""; $.each(data.SettingsMenu,function(key,val){ MenuListHTML += "<li><a href="+s+val.Link+">"+val.Name+"</a></li>"});$("#ConfigMenu").append(MenuListHTML);
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
         $('#ConfigMenu a').click(function(e){e.preventDefault();getWindriverPage($(this).attr('href'),'GET','');});
         utils.setInfo();
          $('#InstalltedAppsInner a').click(function(e){
                console.log($(this).attr('href').substring(0, 4 ));
                e.preventDefault();
                if($(this).attr('href').substring(0, 4 ) == 'http')
                {   
                    console.log($(this).attr('href'));
                    var height = $('body').height()-$('.navbar > .container').height()-$('#footer').height();
                    var html = '<iframe id="iframe" frameborder="0" src="'+$(this).attr('href')+'" style="height:'+height+'px; width:100%"></iframe>';
                    //$('#iframe').removeClass('hide').attr('src',$(this).attr('href')).attr('style','height:'+height+'px; width:100%');
                    $('#ExternalContent').html(html);
                    //$('#ExternalContent').append(html);
                    $('.tab-content > div').removeClass('active');$('#ExternalContent').addClass('active');
                    $('#MenuTabs li').removeClass('active');
                }
                else
                {
                    window.open($(this).attr('href'),"_self")
                }
            })

}
function Setup(){
     $('#setup .setupcontent').css('margin-left','-125px'); $('#setup').show().addClass('in');
     $($0kw4j8LOwTcOeWsRNLY(15)).click(function(e){
        switch(e.target.id)
        {
            case 'btn_setups_start':
                $('#part0').addCss('hide');$('#part1').removeCss('hide');
            break;
            case 'btn_setup_prev_0':
                $('#part0').removeCss('hide');$('#part1').addCss('hide');
            break;
            case 'btn_setup_prev_1':
                $('#part1').removeCss('hide');$('#part2').addCss('hide');
            break;
            case 'btn_setup_prev_2':
                $('#part2').removeCss('hide');$('#part3').addCss('hide');
            break;
            case 'btn_setup_next_2':
                $('#part1').addCss('hide');$('#part2').removeCss('hide');
            break;
            case 'btn_setup_next_3':
                $('#part2').addCss('hide');$('#part3').removeCss('hide');
            break;
            case 'btn_setups_finish':
                $('#setup').hide().removeClass('in');
            break;
            default:
                console.log($0kw4j8LOwTcOeWsRNLY(76));
            break;
        }
     })
}

function initReady() {
    // First Control W B C
    // setWireless(window.navigator.onLine);
    // setBluetooth(true); // this.setBluetooth(services URL response)
    // setCloud(true); // this.setCloud(services URL response);
    //utils.setServicesURL(s);
    initSettings();
    initApp();
    initMarket();
    initMarquee();
    if(!Setup)
    {
        
    }
    // Load Local Settings
    chrome.storage.sync.get("appName", function(data) {utils.setAppNameVisible(data.appName);});
    chrome.storage.sync.get("theme", function(data) {setTheme(data.theme);});
    chrome.storage.sync.get("WirelessStatus", function(data) {if(typeof data.WirelessStatus != 'undefined') {setWireless(data.WirelessStatus);}else{ setWireless(window.navigator.onLine) ;}});
    chrome.storage.sync.get("BluetoothStatus", function(data) {if(typeof data.BluetoothStatus != 'undefined') {setBluetooth(data.BluetoothStatus);}});
    chrome.storage.sync.get("CloudStatus", function(data) {if(typeof data.CloudStatus != 'undefined') {setCloud(data.CloudStatus);}else{ setCloud(window.navigator.onLine); }});
    chrome.storage.sync.get("ServicesURL", function(data) {if(typeof data.ServicesURL != 'undefined') {utils.setServicesURL(data.ServicesURL); }else{utils.setServicesURL(s);} $('#Info #serviceip').html(s);});
    
    $('#Info #version').html(utils.version);
    //$('#Info #ip').html('');
   
    utils.setTimerTick(60000);
    
    $('#Info #edt_serviceip').click(function(e){
        e.preventDefault();
        $('#edt_serviceip, #serviceip').hide();
        $('#setServicesURL').removeClass('hide').addClass('show');
        $('#inp_serviceip').val($('#serviceip').html());
    })
    $('#btn_setserviceip').click(function(e){
        e.preventDefault();
        $('#serviceip').html($('#inp_serviceip').val());
        utils.setServicesURL($('#inp_serviceip').val());
        $('#edt_serviceip , #serviceip').show();
        $('#setServicesURL').removeClass('show').addClass('hide');
    });

   // $(document).ajaxStart(function() { utils.showLoader();});

    $('#MenuTabs').tab();
    $('.marquee').marquee({duration: 32000});$('.marquee').click(function(){$(this).marquee('toggle');});
    //utils.setMarqueeText('Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.');
    $('#ThemeMenu span').click(function(e){ e.preventDefault(); setTheme($(this).attr('tabindex'));});
    $('#SettingsPanel').height($('body').height()-$('.navbar > .container').height()-$('#footer').height()+100);
    $('#btn_settings').clickToggle(function() { $('#SettingsPanel').height($('body').height()-$('.navbar > .container').height()-$('#footer').height()+100); $('#SettingsPanel').show().animate({ right:0}, 700);},function() {$('#SettingsPanel').animate({ right:-252}, 700,function(){$(this).hide()});});
    

   
    //Start Wireless Click
    $('#btn_wireless').click(function(e){
        e.preventDefault();
        console.log('wireless click');
        if($(this).find('span').hasClass('active'))// Zana Bluetooth Active to passive
        {
            // Zana post to  passive data with loadResource(link,'text')
            setWireless(false);
            $(this).find('span').removeClass('active');
            $(this).find('span').addClass('passive');   
        }
        else // Zana Bluetooth Passive to active
        {
            // Zana post to  active data with loadResource(link,'text')
            setWireless(true);
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
            setBluetooth(false);
            $(this).find('span').removeClass('active');
            $(this).find('span').addClass('passive');   
        }
        else // Zana Bluetooth Passive to active
        {
            // Zana post to  active data with loadResource(link,'text')
            setBluetooth(true);
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
            setCloud(false);
            $(this).find('span').removeClass('active');
            $(this).find('span').addClass('passive');   
        }
        else // Zana Bluetooth Passive to active
        {
            // Zana post to  active data with loadResource(link,'text')
            setCloud(true);
            $(this).find('span').removeClass('passive');
            $(this).find('span').addClass('active');
        }
        
    });
    //End Cloud Click
  // initializePage();
}

function checkWireless (){
    ServicesStatus = window.navigator.onLine; 
    if(typeof ServicesStatus != 'undefined')
    {
        setWireless(ServicesStatus);
    }
    else
    {
        console.log('Wireless Call Failed');
    }
};
function checkBluetooth (){
    ServicesStatus = false; //utils.loadResource("/content/config.json","text")
    if(typeof ServicesStatus != 'undefined')
    {
        setBluetooth(ServicesStatus);
    }
    else
    {
        console.log('Bluetooth Call Failed');
    }
};
function checkCloud (a){
    ServicesStatus = window.navigator.onLine; 
    if(typeof ServicesStatus != 'undefined')
    {
        setCloud(ServicesStatus);
    }
    else
    {
        console.log('Wireless Call Failed');
    }
};
function setWireless (a){
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
            $('#btn_wireless span').removeClass('passive');
            $('#btn_wireless span').addClass('active');
        }
    }
    else
    {
        console.log('wireless set false');
        if($('#btn_wireless').hasClass('active'))
        {
            $('#btn_wireless').removeClass('active');
            $('#btn_wireless').addClass('passive');
            $('#btn_wireless span').removeClass('active');
            $('#btn_wireless span').addClass('passive'); 
        }
    }
};
function setBluetooth (a){
    console.log('bluetooth set');
    chrome.storage.sync.set({'BluetoothStatus': a});
    var status = a;
    if(status)
    {
        console.log('bluetooth set true');
        if(!$('#btn_bluetooth').hasClass('active'))
        {
            $('#btn_bluetooth').removeClass('passive');
            $('#btn_bluetooth').addClass('active');
            $('#btn_bluetooth span').removeClass('passive');
            $('#btn_bluetooth span').addClass('active');
        }
    }
    else
    {
        console.log('bluetooth set false');
        if($('#btn_bluetooth').hasClass('active'))
        {
            $('#btn_bluetooth').removeClass('active');
            $('#btn_bluetooth').addClass('passive');   
            $('#btn_bluetooth span').removeClass('active');
            $('#btn_bluetooth span').addClass('passive');    
        }
    }
};
function setCloud(a){
    console.log('cloud set');
    chrome.storage.sync.set({'CloudStatus': a});
    var status = a; // Remove this
    if(status)
    {
        console.log('cloud set true');
        if(!$('#btn_usb').hasClass('active'))
        {
            $('#btn_usb').removeClass('passive');
            $('#btn_usb').addClass('active');
            $('#btn_usb span').removeClass('passive');
            $('#btn_usb span').addClass('active');
        }
    }
    else
    {
        console.log('cloud set false');
        if($('#btn_usb').hasClass('active'))
        {
            $('#btn_usb').removeClass('active');
            $('#btn_usb').addClass('passive'); 
            $('#btn_usb span').removeClass('active');
            $('#btn_usb span ').addClass('passive');  
        }
    }
}

initConfig();initReady();


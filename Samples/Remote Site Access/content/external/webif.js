function value(name)
{
	var item = document.getElementById(name);
	return (item ? item.value : "");
}
function set_value(name, value)
{
	var item = document.getElementById(name);
	if (item) item.value = value;
}
function isset(name, val)
{
	return (value(name) == val);
}
function checked(name)
{
	var item = document.getElementById(name);
	return ((item) && item.checked);
}
function hide(name)
{
	var item = document.getElementById(name);
	if (item) 
		item.style.display = 'none';
}
function show(name)
{
	var item = document.getElementById(name);
	if (item)
		item.style.display = '';
}
function set_visible(name, value)
{
	if (value)
		show(name)
	else
		hide(name)
}
function processKey(e)
{
	var key;

	if(window.event)
		key = window.event.keyCode; //IE
	else if(e.which)
		key = e.which; //Netscape/Firefox/Opera
	else
		return true;

	if (key == 13) {
		document.getElementById("savebutton").click();
		return false;
	}
	else
		return true;
}
function setAPN(element) {
    var apnDB = new Object();
            apnDB.xx_1 = new Object;
        apnDB.xx_1.name = "";
        apnDB.xx_1.user = "";
        apnDB.xx_1.pass = "";

        apnDB.cn_2 = new Object;
        apnDB.cn_2.name = "3gnet";
        apnDB.cn_2.user = "";
        apnDB.cn_2.pass = "";

        apnDB.cn_3 = new Object;
        apnDB.cn_3.name = "cmnet";
        apnDB.cn_3.user = "";
        apnDB.cn_3.pass = "";

        apnDB.ca_4 = new Object;
        apnDB.ca_4.name = "internet.com";
        apnDB.ca_4.user = "wapuser1";
        apnDB.ca_4.pass = "wap";

        apnDB.us_5 = new Object;
        apnDB.us_5.name = "wap.cingular";
        apnDB.us_5.user = "";
        apnDB.us_5.pass = "";

        apnDB.us_6 = new Object;
        apnDB.us_6.name = "vzwinternet";
        apnDB.us_6.user = "";
        apnDB.us_6.pass = "";

        apnDB.us_7 = new Object;
        apnDB.us_7.name = "epc.tmobile.com";
        apnDB.us_7.user = "postpaid";
        apnDB.us_7.pass = "internet";

        apnDB.uk_8 = new Object;
        apnDB.uk_8.name = "internet";
        apnDB.uk_8.user = "web";
        apnDB.uk_8.pass = "web";

        apnDB.at_9 = new Object;
        apnDB.at_9.name = "A1.net";
        apnDB.at_9.user = "ppp@A1plus.at";
        apnDB.at_9.pass = "ppp";

        apnDB.be_10 = new Object;
        apnDB.be_10.name = "internet.proximus.be";
        apnDB.be_10.user = "";
        apnDB.be_10.pass = "";

        apnDB.es_11 = new Object;
        apnDB.es_11.name = "ac.vodafone.es";
        apnDB.es_11.user = "vodafone";
        apnDB.es_11.pass = "vodafone";

        apnDB.it_12 = new Object;
        apnDB.it_12.name = "web.omnitel.it";
        apnDB.it_12.user = "";
        apnDB.it_12.pass = "";

        apnDB.de_13 = new Object;
        apnDB.de_13.name = "web.vodafone.de";
        apnDB.de_13.user = "";
        apnDB.de_13.pass = "";

        apnDB.d2_14 = new Object;
        apnDB.d2_14.name = "corporate.vodafone.de";
        apnDB.d2_14.user = "rla@rla.de";
        apnDB.d2_14.pass = "RLA";

        apnDB.nl_15 = new Object;
        apnDB.nl_15.name = "office.vodafone.nl";
        apnDB.nl_15.user = "vodafone";
        apnDB.nl_15.pass = "vodafone";

        apnDB.se_16 = new Object;
        apnDB.se_16.name = "internet.vodafone.net";
        apnDB.se_16.user = "";
        apnDB.se_16.pass = "";

        apnDB.hu_17 = new Object;
        apnDB.hu_17.name = "internet.vodafone.net";
        apnDB.hu_17.user = "";
        apnDB.hu_17.pass = "";

        apnDB.fr_18 = new Object;
        apnDB.fr_18.name = "websfr";
        apnDB.fr_18.user = "";
        apnDB.fr_18.pass = "";

        apnDB.gr_19 = new Object;
        apnDB.gr_19.name = "internet";
        apnDB.gr_19.user = "";
        apnDB.gr_19.pass = "";

        apnDB.pt_20 = new Object;
        apnDB.pt_20.name = "internet.vodafone.pt";
        apnDB.pt_20.user = "vodafone";
        apnDB.pt_20.pass = "vodafone";

        apnDB.nz_21 = new Object;
        apnDB.nz_21.name = "www.vodafone.net.nz";
        apnDB.nz_21.user = "";
        apnDB.nz_21.pass = "";

        apnDB.au_22 = new Object;
        apnDB.au_22.name = "vfinternet.au";
        apnDB.au_22.user = "";
        apnDB.au_22.pass = "";

        apnDB.ie_23 = new Object;
        apnDB.ie_23.name = "office.vodafone.ie";
        apnDB.ie_23.user = "vodafone";
        apnDB.ie_23.pass = "vodafone";

        apnDB.mt_24 = new Object;
        apnDB.mt_24.name = "internet";
        apnDB.mt_24.user = "internet";
        apnDB.mt_24.pass = "internet";

        apnDB.eg_25 = new Object;
        apnDB.eg_25.name = "internet.vodafone.net";
        apnDB.eg_25.user = "internet";
        apnDB.eg_25.pass = "internet";

        apnDB.za_26 = new Object;
        apnDB.za_26.name = "internet";
        apnDB.za_26.user = "";
        apnDB.za_26.pass = "";

        apnDB.hr_27 = new Object;
        apnDB.hr_27.name = "3g.vip.hr";
        apnDB.hr_27.user = "38591";
        apnDB.hr_27.pass = "38591";

        apnDB.si_28 = new Object;
        apnDB.si_28.name = "internet.simobil.si";
        apnDB.si_28.user = "simobil";
        apnDB.si_28.pass = "internet";

        apnDB.fi_29 = new Object;
        apnDB.fi_29.name = "internet";
        apnDB.fi_29.user = "";
        apnDB.fi_29.pass = "";

        apnDB.dk_30 = new Object;
        apnDB.dk_30.name = "internet";
        apnDB.dk_30.user = "";
        apnDB.dk_30.pass = "";

        apnDB.bh_31 = new Object;
        apnDB.bh_31.name = "internet";
        apnDB.bh_31.user = "internet";
        apnDB.bh_31.pass = "internet";

        apnDB.kw_32 = new Object;
        apnDB.kw_32.name = "apn01";
        apnDB.kw_32.user = "";
        apnDB.kw_32.pass = "";

        apnDB.ee_33 = new Object;
        apnDB.ee_33.name = "internet";
        apnDB.ee_33.user = "";
        apnDB.ee_33.pass = "";

        apnDB.fj_34 = new Object;
        apnDB.fj_34.name = "vfinternet.au";
        apnDB.fj_34.user = "";
        apnDB.fj_34.pass = "";

        apnDB.is_35 = new Object;
        apnDB.is_35.name = "gprs.is";
        apnDB.is_35.user = "";
        apnDB.is_35.pass = "";

        apnDB.lu_36 = new Object;
        apnDB.lu_36.name = "web.pt.lu";
        apnDB.lu_36.user = "";
        apnDB.lu_36.pass = "";

        apnDB.it_37 = new Object;
        apnDB.it_37.name = "naviga.tre.it";
        apnDB.it_37.user = "";
        apnDB.it_37.pass = "";
document.getElementById("wan_apn").value = apnDB[element.value].name;
    document.getElementById("wan_username").value = apnDB[element.value].user;
    document.getElementById("wan_passwd").value = apnDB[element.value].pass;
document.getElementById("lan_apn").value = apnDB[element.value].name;
    document.getElementById("lan_username").value = apnDB[element.value].user;
    document.getElementById("lan_passwd").value = apnDB[element.value].pass;
document.getElementById("wwan_apn").value = apnDB[element.value].name;
    document.getElementById("wwan_username").value = apnDB[element.value].user;
    document.getElementById("wwan_passwd").value = apnDB[element.value].pass;
}
function modechange()
{
    var v;
    
        v = (isset('wan_proto', 'static'));
        set_visible('field_type_wan', v);

        v = (isset('wan_proto', 'dhcp') || isset('wan_proto', 'static') ||isset('wan_proto', '3g') ||isset('wan_proto', 'pppoe') ||isset('wan_proto', 'pptp') ||isset('wan_proto', 'sconn'));
        set_visible('field_interface_wan', v);

        v = (isset('wan_proto', 'pppoe') || isset('wan_proto', 'pptp') || isset('wan_proto', 'pppoa') || isset('wan_proto', '3g') || isset('wan_proto', '6in4'));
        set_visible('wan_ppp_settings', v);
        set_visible('field_wan_username', v);
        set_visible('field_wan_passwd', v);
        set_visible('field_wan_mtu', v);

        v = (isset('wan_proto', 'pppoe') || isset('wan_proto', 'pptp') || isset('wan_proto', 'pppoa') || isset('wan_proto', '3g'));
        set_visible('wan_redial', v);
        set_visible('wan_demand_idletime', v && isset('wan_ppp_redial', 'demand'));
        set_visible('wan_persist_redialperiod', v && !isset('wan_ppp_redial', 'demand'));

        v = (isset('wan_proto', 'static') || isset('wan_proto', 'pptp'));
        set_visible('wan_ip_settings', v);
        set_visible('field_wan_ipaddr', v);
        set_visible('field_wan_netmask', v);

        v = (isset('wan_proto', 'static'));
        set_visible('field_wan_gateway', v);

        v = (isset('wan_proto', 'static') || isset('wan_proto', '3g'));
        set_visible('field_wan_dns', v);
        
        v = (isset('wan_proto', 'static') && (''=='1'));
        set_visible('field_wan_ip6addr', v);
        set_visible('field_wan_gateway6', v);

        v = (isset('wan_proto', 'pptp'));
        set_visible('field_wan_pptp_server', v);
        set_visible('field_wan_vpn', v);

        v = (isset('wan_proto', 'pppoa'));
        set_visible('field_wan_vci', v);
        set_visible('field_wan_vpi', v);

        v = (isset('wan_proto', '3g'));
        set_visible('field_wan_service', v);
        set_visible('field_wan_network', v);
        set_visible('field_wan_apn', v);


        v = (isset('wan_proto', '6in4'));
        set_visible('field_wan_ttl', v);
        set_visible('field_wan_tunnelid', v);
        set_visible('field_wan_peeraddr', v);


        v = isset('wan_proto', 'sconn');
        set_visible('wan_sconn_settings', v);
        if (v) {
            document.getElementById('wan_ifname').readOnly = true;
        }
        else {
            document.getElementById('wan_ifname').readOnly = false;
        }
        
        v = (isset('wan_proto', '3g') || isset('wan_proto', 'sconn'))
        set_visible('field_wan_device', v);
        

        v = (isset('lan_proto', 'static'));
        set_visible('field_type_lan', v);

        v = (isset('lan_proto', 'dhcp') || isset('lan_proto', 'static') ||isset('lan_proto', '3g') ||isset('lan_proto', 'pppoe') ||isset('lan_proto', 'pptp') ||isset('lan_proto', 'sconn'));
        set_visible('field_interface_lan', v);

        v = (isset('lan_proto', 'pppoe') || isset('lan_proto', 'pptp') || isset('lan_proto', 'pppoa') || isset('lan_proto', '3g') || isset('lan_proto', '6in4'));
        set_visible('lan_ppp_settings', v);
        set_visible('field_lan_username', v);
        set_visible('field_lan_passwd', v);
        set_visible('field_lan_mtu', v);

        v = (isset('lan_proto', 'pppoe') || isset('lan_proto', 'pptp') || isset('lan_proto', 'pppoa') || isset('lan_proto', '3g'));
        set_visible('lan_redial', v);
        set_visible('lan_demand_idletime', v && isset('lan_ppp_redial', 'demand'));
        set_visible('lan_persist_redialperiod', v && !isset('lan_ppp_redial', 'demand'));

        v = (isset('lan_proto', 'static') || isset('lan_proto', 'pptp'));
        set_visible('lan_ip_settings', v);
        set_visible('field_lan_ipaddr', v);
        set_visible('field_lan_netmask', v);

        v = (isset('lan_proto', 'static'));
        set_visible('field_lan_gateway', v);

        v = (isset('lan_proto', 'static') || isset('lan_proto', '3g'));
        set_visible('field_lan_dns', v);
        
        v = (isset('lan_proto', 'static') && (''=='1'));
        set_visible('field_lan_ip6addr', v);
        set_visible('field_lan_gateway6', v);

        v = (isset('lan_proto', 'pptp'));
        set_visible('field_lan_pptp_server', v);
        set_visible('field_lan_vpn', v);

        v = (isset('lan_proto', 'pppoa'));
        set_visible('field_lan_vci', v);
        set_visible('field_lan_vpi', v);

        v = (isset('lan_proto', '3g'));
        set_visible('field_lan_service', v);
        set_visible('field_lan_network', v);
        set_visible('field_lan_apn', v);


        v = (isset('lan_proto', '6in4'));
        set_visible('field_lan_ttl', v);
        set_visible('field_lan_tunnelid', v);
        set_visible('field_lan_peeraddr', v);


        v = isset('lan_proto', 'sconn');
        set_visible('lan_sconn_settings', v);
        if (v) {
            document.getElementById('lan_ifname').readOnly = true;
        }
        else {
            document.getElementById('lan_ifname').readOnly = false;
        }
        
        v = (isset('lan_proto', '3g') || isset('lan_proto', 'sconn'))
        set_visible('field_lan_device', v);
        

        v = (isset('wwan_proto', 'static'));
        set_visible('field_type_wwan', v);

        v = (isset('wwan_proto', 'dhcp') || isset('wwan_proto', 'static') ||isset('wwan_proto', '3g') ||isset('wwan_proto', 'pppoe') ||isset('wwan_proto', 'pptp') ||isset('wwan_proto', 'sconn'));
        set_visible('field_interface_wwan', v);

        v = (isset('wwan_proto', 'pppoe') || isset('wwan_proto', 'pptp') || isset('wwan_proto', 'pppoa') || isset('wwan_proto', '3g') || isset('wwan_proto', '6in4'));
        set_visible('wwan_ppp_settings', v);
        set_visible('field_wwan_username', v);
        set_visible('field_wwan_passwd', v);
        set_visible('field_wwan_mtu', v);

        v = (isset('wwan_proto', 'pppoe') || isset('wwan_proto', 'pptp') || isset('wwan_proto', 'pppoa') || isset('wwan_proto', '3g'));
        set_visible('wwan_redial', v);
        set_visible('wwan_demand_idletime', v && isset('wwan_ppp_redial', 'demand'));
        set_visible('wwan_persist_redialperiod', v && !isset('wwan_ppp_redial', 'demand'));

        v = (isset('wwan_proto', 'static') || isset('wwan_proto', 'pptp'));
        set_visible('wwan_ip_settings', v);
        set_visible('field_wwan_ipaddr', v);
        set_visible('field_wwan_netmask', v);

        v = (isset('wwan_proto', 'static'));
        set_visible('field_wwan_gateway', v);

        v = (isset('wwan_proto', 'static') || isset('wwan_proto', '3g'));
        set_visible('field_wwan_dns', v);
        
        v = (isset('wwan_proto', 'static') && (''=='1'));
        set_visible('field_wwan_ip6addr', v);
        set_visible('field_wwan_gateway6', v);

        v = (isset('wwan_proto', 'pptp'));
        set_visible('field_wwan_pptp_server', v);
        set_visible('field_wwan_vpn', v);

        v = (isset('wwan_proto', 'pppoa'));
        set_visible('field_wwan_vci', v);
        set_visible('field_wwan_vpi', v);

        v = (isset('wwan_proto', '3g'));
        set_visible('field_wwan_service', v);
        set_visible('field_wwan_network', v);
        set_visible('field_wwan_apn', v);


        v = (isset('wwan_proto', '6in4'));
        set_visible('field_wwan_ttl', v);
        set_visible('field_wwan_tunnelid', v);
        set_visible('field_wwan_peeraddr', v);


        v = isset('wwan_proto', 'sconn');
        set_visible('wwan_sconn_settings', v);
        if (v) {
            document.getElementById('wwan_ifname').readOnly = true;
        }
        else {
            document.getElementById('wwan_ifname').readOnly = false;
        }
        
        v = (isset('wwan_proto', '3g') || isset('wwan_proto', 'sconn'))
        set_visible('field_wwan_device', v);
        

    hide('save');
    show('save');

}
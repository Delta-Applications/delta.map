"use strict"; $("div#about").css("message","none"),$("img#about").css("display","none");let current_lng,current_lat,current_alt,altitude,current_heading,center_to_Screen,device_lat,device_lng,current_zoom_level,windowOpen,tilesLayer,tileLayer,tilesUrl,search_current_lng,search_current_lat,save_mode,gps_Wakelet,step=.001,zoom_level=14,new_lat=0,new_lng=0,curPos=0,myMarker="",message_body="",tabIndex=0,savesearch=!1,open_url=!1,marker_latlng=!1,json_modified=!1,markers_group=new L.FeatureGroup,caching_time=864e5,zoom_depth=4,settings_data=settings.load_settings(),setting={export_path:localStorage.getItem("export-path"),owm_key:localStorage.getItem("owm-key"),cache_time:localStorage.getItem("cache-time"),cache_zoom:localStorage.getItem("cache-zoom"),last_location:JSON.parse(localStorage.getItem("last_location")),openweather_api:localStorage.getItem("owm-key")};console.log(JSON.stringify(setting)),navigator.geolocation||kaiosToaster({message:"Your device does not support Geolocation.",position:"north",type:"warning",timeout:2e3});try{gps_wakelet=window.navigator.requestWakeLock("gps")}catch(e){}document.querySelector("div#intro-footer2").innerText="Loading.";let map=L.map("map-container",{zoomControl:!1,dragging:!1,keyboard:!0}).fitWorld();document.addEventListener("DOMContentLoaded",(function(){function e(e){let o=map.getZoom();"map"==windowOpen&&"none"==$("div#search-box").css("display")&&("in"==e&&(o+=1,map.setZoom(o)),"out"==e&&(o-=1,map.setZoom(o)),zoom_level=o,t())}function t(){return zoom_level<2&&(step=20),zoom_level>2&&(step=8),zoom_level>3&&(step=4.5),zoom_level>4&&(step=2.75),zoom_level>5&&(step=1),zoom_level>6&&(step=.5),zoom_level>7&&(step=.3),zoom_level>8&&(step=.15),zoom_level>9&&(step=.075),zoom_level>10&&(step=.04),zoom_level>11&&(step=.02),zoom_level>12&&(step=.01),zoom_level>13&&(step=.005),zoom_level>14&&(step=.0025),zoom_level>15&&(step=.001),zoom_level>16&&(step=5e-4),step}function o(e){if("map"==windowOpen||"coordinations"==windowOpen){let o=map.getCenter();current_lat=o.lat,current_lng=o.lng,"left"==e&&(t(),current_lng=o.lng-step,map.panTo(new L.LatLng(current_lat,current_lng))),"right"==e&&(t(),current_lng=o.lng+step,map.panTo(new L.LatLng(current_lat,current_lng))),"up"==e&&(t(),current_lat=o.lat+step,map.panTo(new L.LatLng(current_lat,current_lng))),"down"==e&&(t(),current_lat=o.lat-step,map.panTo(new L.LatLng(current_lat,current_lng)))}}document.querySelector("div#intro-footer2").innerText="Fetching location..",setTimeout((function(){document.querySelector("div#intro-footer2").innerText="Your page should be ready by now..",!1===open_url&&(i(),kaiosToaster({message:"Use 3 to access Main Menu.",position:"north",type:"info"}),maps.osm_map(),y("init")),windowOpen="map"}),4e3),L.control.scale({position:localStorage.getItem("zoomposition")||"topright",metric:!0,imperial:!1}).addTo(map),map.addLayer(markers_group);let n,a,r=!1,i=function(){document.querySelector("div#tracksmarkers").innerHTML="",document.querySelector("div#maps").innerHTML="",document.querySelector("div#layers").innerHTML="";let e=document.querySelector("div#maps");e.insertAdjacentHTML("afterend",'<div class="item list-item focusable" data-map="toner"><p class="list-item__text">Toner</p><p class="list-item__subtext">Map</p></div>'),e.insertAdjacentHTML("afterend",'<div class="item list-item focusable" data-map="otm"><p class="list-item__text">OpenTopoMap</p><p class="list-item__subtext">Map</p></div>'),e.insertAdjacentHTML("afterend",'<div class="item list-item focusable" data-map="gstreet"><p class="list-item__text">Google Street</p><p class="list-item__subtext">Map</p></div>'),e.insertAdjacentHTML("afterend",'<div class="item list-item focusable" data-map="satellite"><p class="list-item__text">Bing Aerial</p><p class="list-item__subtext">Satellite</p></div>'),e.insertAdjacentHTML("afterend",'<div class="item list-item focusable" data-map="ocm"><p class="list-item__text">OpenCycleMap</p><p class="list-item__subtext">Map</p></div>'),e.insertAdjacentHTML("afterend",'<div class="item list-item focusable" data-map="osm"><p class="list-item__text">OpenStreetMap</p><p class="list-item__subtext">Map</p></div>'),document.querySelector("div#layers").insertAdjacentHTML("afterend",'<div class="item list-item focusable" data-map="weather"><p class="list-item__text">Rainviewer</p><p class="list-item__subtext">Layer</p></div>'),document.querySelector("div#layers").insertAdjacentHTML("afterend",'<div class="item list-item focusable" data-map="earthquake"><p class="list-item__text">Earthquakes</p><p class="list-item__subtext">Marker Group</p></div>'),document.querySelector("div#layers").insertAdjacentHTML("afterend",'<div class="item list-item focusable" data-map="railway"><p class="list-item__text">Railways</p><p class="list-item__subtext">Layer</p></div>'),document.querySelector("div#layers").insertAdjacentHTML("afterend",'<div class="item list-item focusable" data-map="owm"><p class="list-item__text">Precipitation</p><p class="list-item__subtext">Layer</p></div>'),document.querySelector("div#layers").insertAdjacentHTML("afterend",'<div class="item list-item focusable" data-map="owm-wind"><p class="list-item__text">Wind</p><p class="list-item__subtext">Layer</p></div>'),document.querySelector("div#layers").insertAdjacentHTML("afterend",'<div class="item list-item focusable" data-map="owm-temp"><p class="list-item__text">Temperature</p><p class="list-item__subtext">Layer</p></div>'),s(),l()},s=function(){let e=new Applait.Finder({type:"sdcard",debugMode:!1});e.search(".gpx"),e.on("searchComplete",(function(e,t){})),e.on("fileFound",(function(e,t,o){let n=t.name.split(".").slice(0,-1).join(".");document.querySelector("div#tracksmarkers").insertAdjacentHTML("afterend",'<div class="item list-item focusable" data-map="gpx" readfile="'+t.name+'"><p class="list-item__text">'+n+'</p><p class="list-item__subtext">GPS Exchange Format</p></div>')}))},l=function(){let e=new Applait.Finder({type:"sdcard",debugMode:!1});e.search(".geojson"),e.on("searchComplete",(function(e,t){})),e.on("fileFound",(function(e,t,o){let n=t.name.split(".").slice(0,-1).join(".");document.querySelector("div#tracksmarkers").insertAdjacentHTML("afterend",'<div class="item list-item focusable" data-map="geojson" readfile="'+t.name+'"><p class="list-item__text">'+n+'</p><p class="list-item__subtext">GeoJSON</p></div>')}))},c=function(){let e=-1,t=document.querySelectorAll(".item"),o=[];for(let n=0;n<t.length;n++)"block"==t[n].parentNode.style.display&&(o.push(t[n]),e++,o[o.length-1].setAttribute("tabIndex",e),o[0].focus(),document.activeElement.scrollIntoView({block:"end",behavior:"smooth"}));document.querySelector("div#finder").style.display="block"};function d(e){let t=new Applait.Finder({type:"sdcard",debugMode:!1});t.search(e),t.on("fileFound",(function(t,o,n){let a=new FileReader;a.onerror=function(t){kaiosToaster({message:"Failed to read "+e+" GPX File.",position:"north",type:"warning",timeout:3e3}),a.abort()},a.onloadend=function(e){var t=e.target.result;new L.GPX(t,{async:!0}).on("loaded",(function(e){map.fitBounds(e.target.getBounds())})).addTo(map),document.querySelector("div#finder").style.display="none",windowOpen="map",top_bar("","","")},a.readAsText(t)}))}var p=L.divIcon({iconSize:[0,0],iconAnchor:[30,30],html:'<div class="ringring"></div><div class="circle"></div>'}),m=L.divIcon({iconSize:[0,0],iconAnchor:[30,30],html:'<div class="circle"></div>'});let u,_;function y(e){marker_latlng=!1,document.querySelector("div#message").style.display="none",navigator.geolocation.getCurrentPosition((function(o){document.querySelector("div#get-position").style.display="none",kaiosToaster({message:"Fetched position.",position:"north",type:"success",timeout:2e3});let n=o.coords;current_lat=n.latitude,current_lng=n.longitude,current_alt=n.altitude,current_heading=n.heading,device_lat=n.latitude,device_lng=n.longitude,"share"==e&&mozactivity.share_position();let r=[n.latitude,n.longitude];if(localStorage.setItem("last_location",JSON.stringify(r)),"init"==e)return u=L.circle([n.latitude,n.longitude],n.accuracy).addTo(map),a=L.marker([current_lat,current_lng],{rotationAngle:0}).addTo(markers_group),a._icon.classList.add("marker-1"),a.setIcon(m),w(),map.setView([current_lat,current_lng],12),t(),document.querySelector("div#intro-footer2").innerText="",!0;"update_marker"==e&&""!=current_lat&&(a.setLatLng([current_lat,current_lng]).update(),map.flyTo(new L.LatLng(current_lat,current_lng)),t())}),(function(e){return console.log(e.message+" "+e.code),null!=setting.last_location?(kaiosToaster({message:e.message+": Loading last position.",position:"north",type:"error",timeout:3e3}),current_lat=setting.last_location[0],current_lng=setting.last_location[1],current_alt=0,L.marker([current_lat,current_lng]).addTo(markers_group),map.setView([current_lat,current_lng],12),t(),document.querySelector("div#get-position").style.display="none",document.querySelector("div#message").style.display="none"):(kaiosToaster({message:e.message+": No position saved.",position:"north",type:"error",timeout:3e3}),current_lat=0,current_lng=0,current_alt=0,map.setView([0,0],3),t(),document.querySelector("div#get-position").style.display="none",document.querySelector("div#message").style.display="none"),!1}),{enableHighAccuracy:!0,timeout:1e4,maximumAge:0})}let g=!1;function w(){marker_latlng=!1;let e=navigator.geolocation;if(0==g){function t(e){let t=e.coords;current_lat=t.latitude,current_lng=t.longitude,current_alt=t.altitude,current_heading=t.heading,device_lat=t.latitude,device_lng=t.longitude,null!=t.heading||a.setRotationAngle(0);let o=[t.latitude,t.longitude];localStorage.setItem("last_location",JSON.stringify(o)),1==center_to_Screen?(map.flyTo(new L.LatLng(t.latitude,t.longitude)),u.remove()):(u.remove(),u=L.circle([t.latitude,t.longitude],t.accuracy).addTo(map)),a.setLatLng([t.latitude,t.longitude]).update(),informationHandler.PreciseGeoUpdate(t)}function o(e){document.querySelector("div#message").style.display="none",document.querySelector("div#get-position").style.display="none",console.error(e.message+" "+e.code),1==e.code?kaiosToaster({message:"Access to Geolocation is denied!",position:"north",type:"error",timeout:2e3}):2==e.code&&kaiosToaster({message:"Position is unavailable!",position:"north",type:"error",timeout:2e3})}document.querySelector("div#message").style.display="none",g=!0,a.setIcon(p),document.getElementById("cross").style.opacity=0;let n={timeout:6e4};return _=e.watchPosition(t,o,n),!0}if(1==g)return e.clearWatch(_),g=!1,a.setRotationAngle(0),a.setIcon(m),!0}function f(e){if("item list-item focusable"==document.activeElement.className||"item button-container__button focusable"==document.activeElement.className&&"finder"==windowOpen){let e=document.activeElement.getAttribute("data-map");if("update-weather"==e){let e=map.getCenter();informationHandler.UpdateWeather(e)}if("gstreet"==e&&(map.removeLayer(tilesLayer),maps.google_map(),top_bar("","",""),document.querySelector("div#finder").style.display="none",windowOpen="map"),"ocm"==e&&(map.removeLayer(tilesLayer),maps.opencycle_map(),top_bar("","",""),document.querySelector("div#finder").style.display="none",windowOpen="map"),"weather"==e&&(maps.weather_map(),document.querySelector("div#finder").style.display="none",top_bar("","",""),windowOpen="map"),"satellite"==e&&(map.removeLayer(tilesLayer),maps.satellite_map(),document.querySelector("div#finder").style.display="none",top_bar("","",""),windowOpen="map"),"toner"==e&&(map.removeLayer(tilesLayer),maps.toner_map(),document.querySelector("div#finder").style.display="none",top_bar("","",""),windowOpen="map"),"osm"==e&&(map.removeLayer(tilesLayer),maps.osm_map(),document.querySelector("div#finder").style.display="none",top_bar("","",""),windowOpen="map"),"moon"==e&&(map.removeLayer(tilesLayer),maps.moon_map(),document.querySelector("div#finder").style.display="none",top_bar("","",""),map.setZoom(4),windowOpen="map"),"otm"==e&&(map.removeLayer(tilesLayer),top_bar("","",""),maps.opentopo_map(),document.querySelector("div#finder").style.display="none",windowOpen="map"),"owm"==e&&(top_bar("","",""),maps.owm_precipit_layer(),document.querySelector("div#finder").style.display="none",windowOpen="map"),"owm-wind"==e&&(top_bar("","",""),maps.owm_wind_layer(),document.querySelector("div#finder").style.display="none",windowOpen="map"),"owm-temp"==e&&(top_bar("","",""),maps.owm_temp_layer(),document.querySelector("div#finder").style.display="none",windowOpen="map"),"railway"==e&&(maps.railway_layer(),top_bar("","",""),document.querySelector("div#finder").style.display="none",windowOpen="map"),"earthquake"==e&&(top_bar("","",""),maps.earthquake_layer(),document.querySelector("div#finder").style.display="none",windowOpen="map"),"share"==e)return kaiosToaster({message:"Mozactivity Share",position:"north",type:"info",timeout:1e3}),mozactivity.share_position(),!0;if("autoupdate-geolocation"==e&&(windowOpen="map",document.querySelector("div#finder").style.display="none",1==center_to_Screen?(center_to_Screen=!1,kaiosToaster({message:"Stopped centering position",position:"north",type:"info",timeout:2e3})):(kaiosToaster({message:"Started centering position",position:"north",type:"info",timeout:2e3}),center_to_Screen=!0)),"update-position"==e&&y("update_marker"),"search"==e&&(windowOpen="map",document.querySelector("div#finder").style.display="none",h()),"coordinations"==e&&k(),"savelocation"==e&&(document.querySelector("div#finder").style.display="none",save_mode="geojson-single",user_input("open")),"export"==e&&(document.querySelector("div#finder").style.display="none",save_mode="geojson-collection",user_input("open")),"add-marker-icon"==e&&kaiosToaster({message:"Return and press 9 to add a Marker.",position:"north",type:"info",timeout:5e3}),"photo"==e&&mozactivity.photo(),"geojson"==e){let e=new Applait.Finder({type:"sdcard",debugMode:!1});e.search(document.activeElement.getAttribute("readfile")),console.log(document.activeElement.getAttribute("readfile")),e.on("fileFound",(function(e,t,o){let n="",a=new FileReader;a.onerror=function(e){a.abort()},a.onloadend=function(e){try{n=JSON.parse(e.target.result)}catch(e){return kaiosToaster({message:"GeoJSON File is invalid.",position:"north",type:"error",timeout:5e3}),!1}L.geoJSON(n,{pointToLayer:function(e,t){L.marker(t).addTo(markers_group),map.flyTo(t),windowOpen="map",json_modified=!0},onEachFeature:function(e,t){console.log(e)}}).addTo(map),document.querySelector("div#finder").style.display="none",top_bar("","",""),windowOpen="map"},a.readAsText(e)}))}"gpx"==e&&d(document.activeElement.getAttribute("readfile"))}"update-weather"==!item_value&&top_bar("","","")}const v=document.querySelector("input#owm-key");let b=!1;function k(){flashlight.trigger()}function h(){bottom_bar("Close","SELECT",""),document.querySelector("div#search-box").style.display="block",document.querySelector("div#search-box input").focus(),document.querySelector("div#bottom-bar").style.display="block",windowOpen="search"}function S(){document.querySelector("div#bottom-bar").style.display="none",document.querySelector("div#search-box").style.display="none",document.querySelector("div#search-box input").value="",document.querySelector("div#search-box input").blur(),document.querySelector("div#olc").style.display="none",windowOpen="map"}v.addEventListener("focus",(e=>{bottom_bar("","QR SCAN",""),b=!0})),v.addEventListener("blur",(e=>{b=!1,bottom_bar("","","")}));let O=["Imagery","Information","Settings","Shortcuts","Impressum"],T=0,q=function(e){tabIndex=0,bottom_bar("","","");let t=document.querySelectorAll("div.panel");for(let e=0;e<t.length;e++)t[e].style.display="none";"start"==e&&(document.getElementById(O[T]).style.display="block",c()),"+1"==e&&(T++,T>O.length-1&&(T=O.length-1),document.getElementById(O[T]).style.display="block",c()),"-1"==e&&(T--,T<0&&(T=0),document.getElementById(O[T]).style.display="block",c()),top_bar("◀",O[T],"▶"),"Information"==O[T]&&(windowOpen="finder",informationHandler.UpdateInfo())};function x(e){if("finder"==windowOpen){let t=document.activeElement.parentNode.querySelectorAll(".item"),o=[];for(let e=0;e<t.length;e++)"block"==t[e].parentNode.style.display&&o.push(t[e]);"+1"==e&&tabIndex<o.length-1&&(tabIndex++,o[tabIndex].focus(),document.activeElement.scrollIntoView({block:"start",behavior:"smooth"})),"-1"==e&&tabIndex>0&&(tabIndex--,o[tabIndex].focus(),document.activeElement.scrollIntoView({block:"end",behavior:"smooth"}))}}function A(t){switch(t.key){case"Backspace":if("finder"==windowOpen){top_bar("","",""),bottom_bar("","",""),document.querySelector("div#finder").style.display="none",windowOpen="map";break}if("coordinations"==windowOpen){k();break}if("scan"==windowOpen){qr.stop_scan(),windowOpen="setting";break}break;case"SoftLeft":if("search"==windowOpen){S();break}if("map"==windowOpen){e("out");break}if("user-input"==windowOpen){user_input("close"),save_mode="";break}break;case"SoftRight":if("map"==windowOpen){e("in");break}if("user-input"==windowOpen&&"geojson-single"==save_mode){console.log(setting.export_path+user_input("return")+".geojson"),geojson.save_geojson(setting.export_path+user_input("return")+".geojson","single"),save_mode="";break}if("user-input"==windowOpen&&"geojson-collection"==save_mode){geojson.save_geojson(user_input("return")+".geojson","collection"),save_mode="";break}if("user-input"==windowOpen&&"geojson"!=save_mode){filename=user_input("return");break}break;case"Enter":if("search"==windowOpen){L.marker([olc_lat_lng[0],olc_lat_lng[1]]).addTo(map),map.setView([olc_lat_lng[0],olc_lat_lng[1]],13),S(),current_lat=Number(olc_lat_lng[0]),current_lng=Number(olc_lat_lng[1]),kaiosToaster({message:"Press 5 to save Marker.",position:"north",type:"info",timeout:5e3});break}if(document.activeElement==document.getElementById("clear-cache")){if(confirm("Are you sure you want to delete all cached maps?")){maps.delete_cache();break}break}if(document.activeElement==document.getElementById("save-settings")){if(confirm("Are you sure you want to save settings?")){settings.save_settings();break}break}if("finder"==windowOpen&&1==b){windowOpen="scan",qr.start_scan((function(e){let t=e;document.getElementById("owm-key").value=t}));break}if("finder"==windowOpen){f();break}break;case"1":"map"==windowOpen&&y("update_marker"),w();break;case"2":"map"==windowOpen&&h();break;case"3":console.log(windowOpen),"map"==windowOpen&&(c(),document.querySelector("div#finder").style.display="block",q("start"),windowOpen="finder");break;case"4":"map"==windowOpen&&(1==center_to_Screen?(center_to_Screen=!1,kaiosToaster({message:"Stopped centering position",position:"north",type:"info",timeout:2e3}),screenWakeLock("unlock")):(kaiosToaster({message:"Started centering position",position:"north",type:"info",timeout:2e3}),center_to_Screen=!0),screenWakeLock("lock"));break;case"5":if("map"==windowOpen){save_mode="geojson-single",user_input("open",now()),bottom_bar("Cancel","","Save"),document.getElementById("user-input-description").innerText="Save this Marker as a GeoJson file";break}break;case"6":"map"==windowOpen&&k();break;case"7":"map"==windowOpen&&module.ruler_toggle();break;case"8":"map"==windowOpen&&(save_mode="geojson-collection",user_input("open",now()),document.getElementById("user-input-description").innerText="Export all Markers as GeoJson file");break;case"9":"map"==windowOpen&&L.marker([current_lat,current_lng]).addTo(markers_group);break;case"0":"map"==windowOpen&&mozactivity.share_position();break;case"*":module.jump_to_layer();break;case"ArrowRight":o("right"),"finder"==windowOpen&&q("+1");break;case"ArrowLeft":o("left"),"finder"==windowOpen&&q("-1");break;case"ArrowUp":o("up"),x("-1");break;case"ArrowDown":o("down"),x("+1")}}navigator.mozSetMessageHandler&&navigator.mozSetMessageHandler("activity",(function(e){var o=e.source;if("open"==o.name&&d(o.data.url),"view"==o.name){open_url=!0;const e=o.data.url.split("/");current_lat=e[e.length-2],current_lng=e[e.length-1],current_lat=current_lat.replace(/[A-Za-z?=&]+/gi,""),current_lng=current_lng.replace(/[A-Za-z?=&]+/gi,""),current_lat=Number(current_lat),current_lng=Number(current_lng),a=L.marker([current_lat,current_lng]).addTo(map),map.setView([current_lat,current_lng],13),t()}})),document.addEventListener("keydown",(function(e){"Backspace"!=e.key||$("input").is(":focus")||e.preventDefault(),e.repeat||(r=!1,n=setTimeout((()=>{r=!0,function(e){switch(e.key){case"#":"map"==windowOpen&&maps.caching_tiles();break;case"1":switch(screen.orientation.type){case"portrait-primary":screen.orientation.lock("landscape-primary");break;case"landscape-primary":screen.orientation.lock("portrait-secondary");break;case"portrait-secondary":screen.orientation.lock("landscape-secondary");break;case"landscape-secondary":screen.orientation.lock("portrait-primary")}break;case"0":if("finder"==windowOpen)return f(),!1;if("map"==windowOpen)return maps.weather_map(),!1;break;case"Backspace":"map"==windowOpen&&(windowOpen="",confirm("Are you sure you want to exit?")&&window.goodbye())}}(e)}),1e3)),e.repeat&&(r=!1,function(e){if("map"==windowOpen)switch(e.key){case"ArrowUp":o("up");break;case"ArrowDown":o("down");break;case"ArrowLeft":o("left");break;case"ArrowRight":o("right")}}(e))})),document.addEventListener("keyup",(function(e){"Backspace"==e.key&&e.preventDefault(),clearTimeout(n),r||A(e)}))}));

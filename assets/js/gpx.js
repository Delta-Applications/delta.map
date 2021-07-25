var L=L||require("leaflet"),_MAX_POINT_INTERVAL_MS=15e3,_SECOND_IN_MILLIS=1e3,_MINUTE_IN_MILLIS=60*_SECOND_IN_MILLIS,_HOUR_IN_MILLIS=60*_MINUTE_IN_MILLIS,_DAY_IN_MILLIS=24*_HOUR_IN_MILLIS,_GPX_STYLE_NS="http://www.topografix.com/GPX/gpx_style/0/2",_DEFAULT_MARKER_OPTS={startIconUrl:"pin-icon-start.png",endIconUrl:"pin-icon-end.png",shadowUrl:"pin-shadow.png",wptIcons:[],wptIconsType:[],wptIconUrls:{"":"pin-icon-wpt.png"},wptIconTypeUrls:{"":"pin-icon-wpt.png"},pointMatchers:[],iconSize:[33,50],shadowSize:[50,50],iconAnchor:[16,45],shadowAnchor:[16,47],clickable:!1},_DEFAULT_POLYLINE_OPTS={color:"blue"},_DEFAULT_GPX_OPTS={parseElements:["track","route","waypoint"],joinTrackSegments:!0};L.GPX=L.FeatureGroup.extend({initialize:function(t,e){e.max_point_interval=e.max_point_interval||_MAX_POINT_INTERVAL_MS,e.marker_options=this._merge_objs(_DEFAULT_MARKER_OPTS,e.marker_options||{}),e.polyline_options=e.polyline_options||{},e.gpx_options=this._merge_objs(_DEFAULT_GPX_OPTS,e.gpx_options||{}),L.Util.setOptions(this,e),L.GPXTrackIcon=L.Icon.extend({options:e.marker_options}),this._gpx=t,this._layers={},this._init_info(),t&&this._parse(t,e,this.options.async)},get_duration_string:function(t,e){var n="";t>=_DAY_IN_MILLIS&&(n+=Math.floor(t/_DAY_IN_MILLIS)+"d ",t%=_DAY_IN_MILLIS),t>=_HOUR_IN_MILLIS&&(n+=Math.floor(t/_HOUR_IN_MILLIS)+":",t%=_HOUR_IN_MILLIS);var i=Math.floor(t/_MINUTE_IN_MILLIS);t%=_MINUTE_IN_MILLIS,i<10&&(n+="0"),n+=i+"'";var o=Math.floor(t/_SECOND_IN_MILLIS);return t%=_SECOND_IN_MILLIS,o<10&&(n+="0"),n+=o,n+=!e&&t>0?"."+Math.round(1e3*Math.floor(t))/1e3:'"'},get_duration_string_iso:function(t,e){return this.get_duration_string(t,e).replace("'",":").replace('"',"")},to_miles:function(t){return t/1.60934},to_ft:function(t){return 3.28084*t},m_to_km:function(t){return t/1e3},m_to_mi:function(t){return t/1609.34},get_name:function(){return this._info.name},get_desc:function(){return this._info.desc},get_author:function(){return this._info.author},get_copyright:function(){return this._info.copyright},get_distance:function(){return this._info.length},get_distance_imp:function(){return this.to_miles(this.m_to_km(this.get_distance()))},get_start_time:function(){return this._info.duration.start},get_end_time:function(){return this._info.duration.end},get_moving_time:function(){return this._info.duration.moving},get_total_time:function(){return this._info.duration.total},get_moving_pace:function(){return this.get_moving_time()/this.m_to_km(this.get_distance())},get_moving_pace_imp:function(){return this.get_moving_time()/this.get_distance_imp()},get_moving_speed:function(){return this.m_to_km(this.get_distance())/(this.get_moving_time()/36e5)},get_moving_speed_imp:function(){return this.to_miles(this.m_to_km(this.get_distance()))/(this.get_moving_time()/36e5)},get_total_speed:function(){return this.m_to_km(this.get_distance())/(this.get_total_time()/36e5)},get_total_speed_imp:function(){return this.to_miles(this.m_to_km(this.get_distance()))/(this.get_total_time()/36e5)},get_elevation_gain:function(){return this._info.elevation.gain},get_elevation_loss:function(){return this._info.elevation.loss},get_elevation_gain_imp:function(){return this.to_ft(this.get_elevation_gain())},get_elevation_loss_imp:function(){return this.to_ft(this.get_elevation_loss())},get_elevation_data:function(){var t=this;return this._info.elevation._points.map((function(e){return t._prepare_data_point(e,t.m_to_km,null,(function(t,e){return t.toFixed(2)+" km, "+e.toFixed(0)+" m"}))}))},get_elevation_data_imp:function(){var t=this;return this._info.elevation._points.map((function(e){return t._prepare_data_point(e,t.m_to_mi,t.to_ft,(function(t,e){return t.toFixed(2)+" mi, "+e.toFixed(0)+" ft"}))}))},get_elevation_max:function(){return this._info.elevation.max},get_elevation_min:function(){return this._info.elevation.min},get_elevation_max_imp:function(){return this.to_ft(this.get_elevation_max())},get_elevation_min_imp:function(){return this.to_ft(this.get_elevation_min())},get_average_hr:function(){return this._info.hr.avg},get_average_temp:function(){return this._info.atemp.avg},get_average_cadence:function(){return this._info.cad.avg},get_heartrate_data:function(){var t=this;return this._info.hr._points.map((function(e){return t._prepare_data_point(e,t.m_to_km,null,(function(t,e){return t.toFixed(2)+" km, "+e.toFixed(0)+" bpm"}))}))},get_heartrate_data_imp:function(){var t=this;return this._info.hr._points.map((function(e){return t._prepare_data_point(e,t.m_to_mi,null,(function(t,e){return t.toFixed(2)+" mi, "+e.toFixed(0)+" bpm"}))}))},get_cadence_data:function(){var t=this;return this._info.cad._points.map((function(e){return t._prepare_data_point(e,t.m_to_km,null,(function(t,e){return t.toFixed(2)+" km, "+e.toFixed(0)+" rpm"}))}))},get_temp_data:function(){var t=this;return this._info.atemp._points.map((function(e){return t._prepare_data_point(e,t.m_to_km,null,(function(t,e){return t.toFixed(2)+" km, "+e.toFixed(0)+" degrees"}))}))},get_cadence_data_imp:function(){var t=this;return this._info.cad._points.map((function(e){return t._prepare_data_point(e,t.m_to_mi,null,(function(t,e){return t.toFixed(2)+" mi, "+e.toFixed(0)+" rpm"}))}))},get_temp_data_imp:function(){var t=this;return this._info.atemp._points.map((function(e){return t._prepare_data_point(e,t.m_to_mi,null,(function(t,e){return t.toFixed(2)+" mi, "+e.toFixed(0)+" degrees"}))}))},reload:function(){this._init_info(),this.clearLayers(),this._parse(this._gpx,this.options,this.options.async)},_merge_objs:function(t,e){var n={};for(var i in t)n[i]=t[i];for(var i in e)n[i]=e[i];return n},_prepare_data_point:function(t,e,n,i){var o=[e&&e(t[0])||t[0],n&&n(t[1])||t[1]];return o.push(i&&i(o[0],o[1])||o[0]+": "+o[1]),o},_init_info:function(){this._info={name:null,length:0,elevation:{gain:0,loss:0,max:0,min:1/0,_points:[]},hr:{avg:0,_total:0,_points:[]},duration:{start:null,end:null,moving:0,total:0},atemp:{avg:0,_total:0,_points:[]},cad:{avg:0,_total:0,_points:[]}}},_load_xml:function(t,e,n,i){null==i&&(i=this.options.async),null==n&&(n=this.options);var o=new window.XMLHttpRequest;o.open("GET",t,i);try{o.overrideMimeType("text/xml")}catch(t){}o.onreadystatechange=function(){4==o.readyState&&200==o.status&&e(o.responseXML,n)},o.send(null)},_parse:function(t,e,n){var i=this,o=function(t,e){var n=i._parse_gpx_data(t,e);n?(i.addLayer(n),i.fire("loaded",{layers:n,element:t})):i.fire("error",{err:"No parseable layers of type(s) "+JSON.stringify(e.gpx_options.parseElements)})};if("<"===t.substr(0,1)){var a=new DOMParser;n?setTimeout((function(){o(a.parseFromString(t,"text/xml"),e)})):o(a.parseFromString(t,"text/xml"),e)}else this._load_xml(t,o,e,n)},_parse_gpx_data:function(t,e){var n,i,o=[];(u=t.getElementsByTagName("name")).length>0&&(this._info.name=u[0].textContent),(d=t.getElementsByTagName("desc")).length>0&&(this._info.desc=d[0].textContent);var a=t.getElementsByTagName("author");a.length>0&&(this._info.author=a[0].textContent);var r=t.getElementsByTagName("copyright");r.length>0&&(this._info.copyright=r[0].textContent);var _=e.gpx_options.parseElements;if(_.indexOf("route")>-1){var s=t.getElementsByTagName("rte");for(n=0;n<s.length;n++)o=o.concat(this._parse_segment(s[n],e,{},"rtept"))}if(_.indexOf("track")>-1){var l=t.getElementsByTagName("trk");for(n=0;n<l.length;n++){var m=l[n],p=this._extract_styling(m);if(e.gpx_options.joinTrackSegments)o=o.concat(this._parse_segment(m,e,p,"trkpt"));else{var h=m.getElementsByTagName("trkseg");for(j=0;j<h.length;j++)o=o.concat(this._parse_segment(h[j],e,p,"trkpt"))}}}if(this._info.hr.avg=Math.round(this._info.hr._total/this._info.hr._points.length),this._info.cad.avg=Math.round(this._info.cad._total/this._info.cad._points.length),this._info.atemp.avg=Math.round(this._info.atemp._total/this._info.atemp._points.length),_.indexOf("waypoint")>-1)for(i=t.getElementsByTagName("wpt"),n=0;n<i.length;n++){var g=new L.LatLng(i[n].getAttribute("lat"),i[n].getAttribute("lon")),c=i[n].getElementsByTagName("name"),u="";c.length>0&&(u=c[0].textContent);var f=i[n].getElementsByTagName("desc"),d="";f.length>0&&(d=f[0].textContent);var v=i[n].getElementsByTagName("sym"),I="";v.length>0&&(I=v[0].textContent);var x=i[n].getElementsByTagName("type"),y="";x.length>0&&(y=x[0].textContent);var k,N=e.marker_options.wptIcons,M=e.marker_options.wptIconUrls,T=e.marker_options.wptIconsType,E=e.marker_options.wptIconTypeUrls;if(N&&N[I])k=N[I];else if(T&&T[y])k=T[y];else if(M&&M[I])k=new L.GPXTrackIcon({iconUrl:M[I]});else if(E&&E[y])k=new L.GPXTrackIcon({iconUrl:E[y]});else if(N&&N[""])k=N[""];else{if(!M||!M[""]){console.log('No icon or icon URL configured for symbol type "'+I+'", and no fallback configured; ignoring waypoint.');continue}k=new L.GPXTrackIcon({iconUrl:M[""]})}var w=new L.Marker(g,{clickable:e.marker_options.clickable,title:u,icon:k,type:"waypoint"});w.bindPopup("<b>"+u+"</b>"+(d.length>0?"<br>"+d:"")).openPopup(),this.fire("addpoint",{point:w,point_type:"waypoint",element:i[n]}),o.push(w)}return o.length>1?new L.FeatureGroup(o):1==o.length?o[0]:void 0},_parse_segment:function(t,e,n,i){var o=t.getElementsByTagName(i);if(!o.length)return[];for(var a=[],r=[],_=[],s=null,l=0;l<o.length;l++){var m,p=new L.LatLng(o[l].getAttribute("lat"),o[l].getAttribute("lon"));if(p.meta={time:null,ele:null,hr:null,cad:null,atemp:null},(m=o[l].getElementsByTagName("time")).length>0?p.meta.time=new Date(Date.parse(m[0].textContent)):p.meta.time=new Date("1970-01-01T00:00:00"),(m=o[l].getElementsByTagName("ele")).length>0&&(p.meta.ele=parseFloat(m[0].textContent)),(m=o[l].getElementsByTagName("name")).length>0)for(var h=m[0].textContent,g=e.marker_options.pointMatchers||[],c=0;c<g.length;c++)if(g[c].regex.test(h)){r.push({label:h,coords:p,icon:g[c].icon,element:o[l]});break}if((m=o[l].getElementsByTagNameNS("*","hr")).length>0&&(p.meta.hr=parseInt(m[0].textContent),this._info.hr._points.push([this._info.length,p.meta.hr]),this._info.hr._total+=p.meta.hr),(m=o[l].getElementsByTagNameNS("*","cad")).length>0&&(p.meta.cad=parseInt(m[0].textContent),this._info.cad._points.push([this._info.length,p.meta.cad]),this._info.cad._total+=p.meta.cad),(m=o[l].getElementsByTagNameNS("*","atemp")).length>0&&(p.meta.atemp=parseInt(m[0].textContent),this._info.atemp._points.push([this._info.length,p.meta.atemp]),this._info.atemp._total+=p.meta.atemp),p.meta.ele>this._info.elevation.max&&(this._info.elevation.max=p.meta.ele),p.meta.ele<this._info.elevation.min&&(this._info.elevation.min=p.meta.ele),this._info.elevation._points.push([this._info.length,p.meta.ele]),this._info.duration.end=p.meta.time,null!=s){this._info.length+=this._dist3d(s,p);var u=p.meta.ele-s.meta.ele;u>0?this._info.elevation.gain+=u:this._info.elevation.loss+=Math.abs(u),u=Math.abs(p.meta.time-s.meta.time),this._info.duration.total+=u,u<e.max_point_interval&&(this._info.duration.moving+=u)}else null==this._info.duration.start&&(this._info.duration.start=p.meta.time);s=p,a.push(p)}var f=new L.Polyline(a,this._extract_styling(t,n,e.polyline_options));if(this.fire("addline",{line:f,element:t}),_.push(f),e.marker_options.startIcon||e.marker_options.startIconUrl){var d=new L.Marker(a[0],{clickable:e.marker_options.clickable,icon:e.marker_options.startIcon||new L.GPXTrackIcon({iconUrl:e.marker_options.startIconUrl})});this.fire("addpoint",{point:d,point_type:"start",element:o[0]}),_.push(d)}if(e.marker_options.endIcon||e.marker_options.endIconUrl){d=new L.Marker(a[a.length-1],{clickable:e.marker_options.clickable,icon:e.marker_options.endIcon||new L.GPXTrackIcon({iconUrl:e.marker_options.endIconUrl})});this.fire("addpoint",{point:d,point_type:"end",element:o[o.length-1]}),_.push(d)}for(l=0;l<r.length;l++){d=new L.Marker(r[l].coords,{clickable:e.marker_options.clickable,title:r[l].label,icon:r[l].icon});this.fire("addpoint",{point:d,point_type:"label",element:r[l].element}),_.push(d)}return _},_extract_styling:function(t,e,n){var i,o=this._merge_objs(_DEFAULT_POLYLINE_OPTS,e),a=t.getElementsByTagNameNS(_GPX_STYLE_NS,"line");a.length>0&&((i=a[0].getElementsByTagName("color")).length>0&&(o.color="#"+i[0].textContent),(i=a[0].getElementsByTagName("opacity")).length>0&&(o.opacity=i[0].textContent),(i=a[0].getElementsByTagName("weight")).length>0&&(o.weight=i[0].textContent),(i=a[0].getElementsByTagName("linecap")).length>0&&(o.lineCap=i[0].textContent));return this._merge_objs(o,n)},_dist2d:function(t,e){var n=this._deg2rad(e.lat-t.lat),i=this._deg2rad(e.lng-t.lng),o=Math.sin(n/2)*Math.sin(n/2)+Math.cos(this._deg2rad(t.lat))*Math.cos(this._deg2rad(e.lat))*Math.sin(i/2)*Math.sin(i/2);return 6371e3*(2*Math.atan2(Math.sqrt(o),Math.sqrt(1-o)))},_dist3d:function(t,e){var n=this._dist2d(t,e),i=Math.abs(e.meta.ele-t.meta.ele);return Math.sqrt(Math.pow(n,2)+Math.pow(i,2))},_deg2rad:function(t){return t*Math.PI/180}}),"object"==typeof module&&"object"==typeof module.exports?module.exports=L:"function"==typeof define&&define.amd&&define(L);

const settings={load_settings:function(){return document.getElementById("owm-key").value="99d2594c090c1ee9a8ad525fd7a83f85",document.getElementById("cache-time").value=localStorage.getItem("cache-time"),document.getElementById("cache-zoom").value=localStorage.getItem("cache-zoom"),document.getElementById("export-path").value=localStorage.getItem("export-path"),document.getElementById("zoomposition").value=localStorage.getItem("zoomposition"),[localStorage.getItem("export-path"),localStorage.getItem("owm-key"),localStorage.getItem("cache-time"),localStorage.getItem("cache-zoom"),localStorage.getItem("zoomposition")]},save_settings:function(){localStorageWriteRead("owm-key",document.getElementById("owm-key").value),localStorageWriteRead("cache-time",document.getElementById("cache-time").value),localStorageWriteRead("cache-zoom",document.getElementById("cache-zoom").value),localStorageWriteRead("export-path",document.getElementById("export-path").value),localStorageWriteRead("zoomposition",document.getElementById("zoomposition").value),toaster("Settings Saved",2e3)}};

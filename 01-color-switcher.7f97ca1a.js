let t;const e=document.querySelector("[data-start]"),a=document.querySelector("[data-stop]");e.addEventListener("click",(()=>{e.disabled=!0,t=setInterval((()=>{document.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,"0")}`}),1e3)})),a.addEventListener("click",(()=>{e.disabled=!1,clearInterval(t)}));
//# sourceMappingURL=01-color-switcher.7f97ca1a.js.map

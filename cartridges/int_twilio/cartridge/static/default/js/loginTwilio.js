!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";const o=$(".for-otp"),r=$(".for-totp"),a=$(".login-btn_c"),i=$(".code-input"),c=a.data("url"),l=a.data("verifyurl"),u=$(".login").find(":submit"),d=$(".registration").find(":submit"),s=$(".close-modal-icon");$((function(){$(document).on("click",".validate",(function(){let e="";i.each((function(){e+=$(this).val()})),$.ajax({url:l,type:"get",dataType:"json",data:{code:e,phoneNumber:$(this).data("phone-number")},success:function(e){let t="";"OK"===e.res&&($(".tab-pane").each((function(){1==$(this).hasClass("active")&&(t=$(this).attr("id"))})),s.trigger("click"),"login"===t&&u.trigger("click"),"register"===t&&d.trigger("click"))}})})),$("#loginOTPModal").on("shown.bs.modal",(function(){$(this).find("input:first").trigger("focus")})),$(document).on("click",".for-otp",(function(){!0===r.prop("checked")&&r.prop("checked",!1),a.attr("data-target","#"+o.data("toggle-modal-id"))})),$(document).on("click",".for-totp",(function(){!0===o.prop("checked")&&o.prop("checked",!1),a.attr("data-target","#"+r.data("toggle-modal-id"))})),$(document).on("click",".login-btn_c",(function(){let e="";0!==$("#login-form-email").val().length&&o.prop("checked")?(e=$("#login-form-email").val(),$.ajax({url:c,type:"get",dataType:"json",data:{email:e},success:function(e){$(".validate").attr("data-phone-number",e.phoneNumber),$(".head-sec p:nth-of-type(3)").append(e.phoneNumber.slice(0,6)+"XXXX")}})):alert("Please enter an email")})),$(document).on("keyup",".code-input",(function(e){0!==$(this).val().length&&"Backspace"!==e.key&&$(this).next().trigger("focus"),0===$(this).val().length&&"Backspace"===e.key&&$(this).prev().trigger("focus")})),$(document).on("click",".register-btn_c",(function(){let e=$("#registration-form-phone").val();0!==e.length?$.ajax({url:$(this).data("url"),type:"get",dataType:"json",data:{phoneNumber:e},success:function(){$(".validate").attr("data-phone-number",$("#registration-form-phone").val()),$(".head-sec p:nth-of-type(3)").append(e.slice(0,6)+"XXXX")}}):alert("Please enter an email")}))}))}]);
/**
 * skylark-bootbox4 - A version of bootbox4 that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.2
 * @link https://github.com/skylark-integration/skylark-bootbox4/
 * @license MIT
 */
define(["skylark-langx/skylark","skylark-langx/langx","skylark-domx-query","skylark-domx-data","skylark-domx-styler"],function(t,o,e){"use strict";var a={dialog:"<div class='bootbox modal' tabindex='-1' role='dialog'><div class='modal-dialog'><div class='modal-content'><div class='modal-body'><div class='bootbox-body'></div></div></div></div></div>",header:"<div class='modal-header'><h4 class='modal-title'></h4></div>",footer:"<div class='modal-footer'></div>",closeButton:"<button type='button' class='bootbox-close-button close' data-dismiss='modal' aria-hidden='true'>&times;</button>",form:"<form class='bootbox-form'></form>",inputs:{text:"<input class='bootbox-input bootbox-input-text form-control' autocomplete=off type=text />",textarea:"<textarea class='bootbox-input bootbox-input-textarea form-control'></textarea>",email:"<input class='bootbox-input bootbox-input-email form-control' autocomplete='off' type='email' />",select:"<select class='bootbox-input bootbox-input-select form-control'></select>",checkbox:"<div class='checkbox'><label><input class='bootbox-input bootbox-input-checkbox' type='checkbox' /></label></div>",date:"<input class='bootbox-input bootbox-input-date form-control' autocomplete=off type='date' />",time:"<input class='bootbox-input bootbox-input-time form-control' autocomplete=off type='time' />",number:"<input class='bootbox-input bootbox-input-number form-control' autocomplete=off type='number' />",password:"<input class='bootbox-input bootbox-input-password form-control' autocomplete='off' type='password' />"}},n={locale:"en",backdrop:"static",animate:!0,className:null,closeButton:!0,show:!0,container:"body"},r={};function l(t){var o=d[n.locale];return o?o[t]:d.en[t]}function i(t,e,a){t.stopPropagation(),t.preventDefault(),o.isFunction(a)&&!1===a.call(e,t)||e.modal("hide")}function c(t,e){var a=0;o.each(t,function(t,o){e(t,o,a++)})}function s(t,e,a){return o.extend(!0,{},t,function(t,o){var e=t.length,a={};if(e<1||e>2)throw new Error("Invalid argument length");return 2===e||"string"==typeof t[0]?(a[o[0]]=t[0],a[o[1]]=t[1]):a=t[0],a}(e,a))}function u(t,o,e,a){return b(s({className:"bootbox-"+t,buttons:p.apply(null,o)},a,e),o)}function p(){for(var t={},o=0,e=arguments.length;o<e;o++){var a=arguments[o],n=a.toLowerCase(),r=a.toUpperCase();t[n]={label:l(r)}}return t}function b(t,o){var e={};return c(o,function(t,o){e[o]=!0}),c(t.buttons,function(t){if(void 0===e[t])throw new Error("button key "+t+" is not allowed (options are "+o.join("\n")+")")}),t}r.alert=function(){var t;if((t=u("alert",["ok"],["message","callback"],arguments)).callback&&!o.isFunction(t.callback))throw new Error("alert requires callback property to be a function when provided");return t.buttons.ok.callback=t.onEscape=function(){return!o.isFunction(t.callback)||t.callback.call(this)},r.dialog(t)},r.confirm=function(){var t;if((t=u("confirm",["cancel","confirm"],["message","callback"],arguments)).buttons.cancel.callback=t.onEscape=function(){return t.callback.call(this,!1)},t.buttons.confirm.callback=function(){return t.callback.call(this,!0)},!o.isFunction(t.callback))throw new Error("confirm requires a callback");return r.dialog(t)},r.prompt=function(){var t,n,l,i,u,d,f;if(i=e(a.form),n={className:"bootbox-prompt",buttons:p("cancel","confirm"),value:"",inputType:"text"},d=void 0===(t=b(s(n,arguments,["title","callback"]),["cancel","confirm"])).show||t.show,t.message=i,t.buttons.cancel.callback=t.onEscape=function(){return t.callback.call(this,null)},t.buttons.confirm.callback=function(){var o;switch(t.inputType){case"text":case"textarea":case"email":case"select":case"date":case"time":case"number":case"password":o=u.val();break;case"checkbox":var a=u.find("input:checked");o=[],c(a,function(t,a){o.push(e(a).val())})}return t.callback.call(this,o)},t.show=!1,!t.title)throw new Error("prompt requires a title");if(!o.isFunction(t.callback))throw new Error("prompt requires a callback");if(!a.inputs[t.inputType])throw new Error("invalid prompt type");switch(u=e(a.inputs[t.inputType]),t.inputType){case"text":case"textarea":case"email":case"date":case"time":case"number":case"password":u.val(t.value);break;case"select":var m={};if(f=t.inputOptions||[],!o.isArray(f))throw new Error("Please pass an array of input options");if(!f.length)throw new Error("prompt with select requires options");c(f,function(t,o){var a=u;if(void 0===o.value||void 0===o.text)throw new Error("given options in wrong format");o.group&&(m[o.group]||(m[o.group]=e("<optgroup/>").attr("label",o.group)),a=m[o.group]),a.append("<option value='"+o.value+"'>"+o.text+"</option>")}),c(m,function(t,o){u.append(o)}),u.val(t.value);break;case"checkbox":var C=o.isArray(t.value)?t.value:[t.value];if(!(f=t.inputOptions||[]).length)throw new Error("prompt with checkbox requires options");if(!f[0].value||!f[0].text)throw new Error("given options in wrong format");u=e("<div/>"),c(f,function(o,n){var r=e(a.inputs[t.inputType]);r.find("input").attr("value",n.value),r.find("label").append(n.text),c(C,function(t,o){o===n.value&&r.find("input").prop("checked",!0)}),u.append(r)})}return t.placeholder&&u.attr("placeholder",t.placeholder),t.pattern&&u.attr("pattern",t.pattern),t.maxlength&&u.attr("maxlength",t.maxlength),i.append(u),i.on("submit",function(t){t.preventDefault(),t.stopPropagation(),l.find(".btn-primary").click()}),(l=r.dialog(t)).off("shown.bs.modal"),l.on("shown.bs.modal",function(){u.focus()}),!0===d&&l.modal("show"),l},r.dialog=function(t){t=function(t){var e,a;if("object"!=typeof t)throw new Error("Please supply an object of options");if(!t.message)throw new Error("Please specify a message");return(t=o.extend({},n,t)).buttons||(t.buttons={}),e=t.buttons,a=function(t){var o,e=0;for(o in t)e++;return e}(e),c(e,function(t,n,r){if(o.isFunction(n)&&(n=e[t]={callback:n}),"object"!==o.type(n))throw new Error("button with key "+t+" must be an object");n.label||(n.label=t),n.className||(n.className=a<=2&&r===a-1?"btn-primary":"btn-default")}),t}(t);var r=e(a.dialog),l=r.find(".modal-dialog"),s=r.find(".modal-body"),u=t.buttons,p="",b={onEscape:t.onEscape};if(void 0===e.fn.modal)throw new Error("$.fn.modal is not defined; please double check you have included the Bootstrap JavaScript library. See http://getbootstrap.com/javascript/ for more details.");if(c(u,function(t,o){p+="<button data-bb-handler='"+t+"' type='button' class='btn "+o.className+"'>"+o.label+"</button>",b[t]=o.callback}),s.find(".bootbox-body").html(t.message),!0===t.animate&&r.addClass("fade"),t.className&&r.addClass(t.className),"large"===t.size?l.addClass("modal-lg"):"small"===t.size&&l.addClass("modal-sm"),t.title&&s.before(a.header),t.closeButton){var d=e(a.closeButton);t.title?r.find(".modal-header").prepend(d):d.css("margin-top","-10px").prependTo(s)}return t.title&&r.find(".modal-title").html(t.title),p.length&&(s.after(a.footer),r.find(".modal-footer").html(p)),r.on("hidden.bs.modal",function(t){t.target===this&&r.remove()}),r.on("shown.bs.modal",function(){r.find(".btn-primary:first").focus()}),"static"!==t.backdrop&&r.on("click.dismiss.bs.modal",function(t){r.children(".modal-backdrop").length&&(t.currentTarget=r.children(".modal-backdrop").get(0)),t.target===t.currentTarget&&r.trigger("escape.close.bb")}),r.on("escape.close.bb",function(t){b.onEscape&&i(t,r,b.onEscape)}),r.on("click",".modal-footer button",function(t){var o=e(this).data("bb-handler");i(t,r,b[o])}),r.on("click",".bootbox-close-button",function(t){i(t,r,b.onEscape)}),r.on("keyup",function(t){27===t.which&&r.trigger("escape.close.bb")}),e(t.container).append(r),r.modal({backdrop:!!t.backdrop&&"static",keyboard:!1,show:!1}),t.show&&r.modal("show"),r},r.setDefaults=function(){var t={};2===arguments.length?t[arguments[0]]=arguments[1]:t=arguments[0],o.extend(n,t)},r.hideAll=function(){return e(".bootbox").modal("hide"),r};var d={bg_BG:{OK:"Ок",CANCEL:"Отказ",CONFIRM:"Потвърждавам"},br:{OK:"OK",CANCEL:"Cancelar",CONFIRM:"Sim"},cs:{OK:"OK",CANCEL:"Zrušit",CONFIRM:"Potvrdit"},da:{OK:"OK",CANCEL:"Annuller",CONFIRM:"Accepter"},de:{OK:"OK",CANCEL:"Abbrechen",CONFIRM:"Akzeptieren"},el:{OK:"Εντάξει",CANCEL:"Ακύρωση",CONFIRM:"Επιβεβαίωση"},en:{OK:"OK",CANCEL:"Cancel",CONFIRM:"OK"},es:{OK:"OK",CANCEL:"Cancelar",CONFIRM:"Aceptar"},et:{OK:"OK",CANCEL:"Katkesta",CONFIRM:"OK"},fa:{OK:"قبول",CANCEL:"لغو",CONFIRM:"تایید"},fi:{OK:"OK",CANCEL:"Peruuta",CONFIRM:"OK"},fr:{OK:"OK",CANCEL:"Annuler",CONFIRM:"D'accord"},he:{OK:"אישור",CANCEL:"ביטול",CONFIRM:"אישור"},hu:{OK:"OK",CANCEL:"Mégsem",CONFIRM:"Megerősít"},hr:{OK:"OK",CANCEL:"Odustani",CONFIRM:"Potvrdi"},id:{OK:"OK",CANCEL:"Batal",CONFIRM:"OK"},it:{OK:"OK",CANCEL:"Annulla",CONFIRM:"Conferma"},ja:{OK:"OK",CANCEL:"キャンセル",CONFIRM:"確認"},lt:{OK:"Gerai",CANCEL:"Atšaukti",CONFIRM:"Patvirtinti"},lv:{OK:"Labi",CANCEL:"Atcelt",CONFIRM:"Apstiprināt"},nl:{OK:"OK",CANCEL:"Annuleren",CONFIRM:"Accepteren"},no:{OK:"OK",CANCEL:"Avbryt",CONFIRM:"OK"},pl:{OK:"OK",CANCEL:"Anuluj",CONFIRM:"Potwierdź"},pt:{OK:"OK",CANCEL:"Cancelar",CONFIRM:"Confirmar"},ru:{OK:"OK",CANCEL:"Отмена",CONFIRM:"Применить"},sq:{OK:"OK",CANCEL:"Anulo",CONFIRM:"Prano"},sv:{OK:"OK",CANCEL:"Avbryt",CONFIRM:"OK"},th:{OK:"ตกลง",CANCEL:"ยกเลิก",CONFIRM:"ยืนยัน"},tr:{OK:"Tamam",CANCEL:"İptal",CONFIRM:"Onayla"},zh_CN:{OK:"OK",CANCEL:"取消",CONFIRM:"确认"},zh_TW:{OK:"OK",CANCEL:"取消",CONFIRM:"確認"}};return r.addLocale=function(t,e){return o.each(["OK","CANCEL","CONFIRM"],function(t,o){if(!e[o])throw new Error("Please supply a translation for '"+o+"'")}),d[t]={OK:e.OK,CANCEL:e.CANCEL,CONFIRM:e.CONFIRM},r},r.removeLocale=function(t){return delete d[t],r},r.setLocale=function(t){return r.setDefaults("locale",t)},r.init=function(t){return init(t||e)},t.attach("itg.bootbox",r)});
//# sourceMappingURL=sourcemaps/bootbox.js.map

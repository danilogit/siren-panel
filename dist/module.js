define(["lodash","app/plugins/sdk"],function(t,e){return function(t){var e={};function n(r){if(e[r])return e[r].exports;var i=e[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)n.d(r,i,function(e){return t[e]}.bind(null,i));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.PanelCtrl=e.SirenPanel=void 0;var r,i,o=(r=n(1))&&r.__esModule?r:{default:r},a=n(2),l=(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),u=function(t){function e(e,n,r){var i=t.call(this,e,n)||this;for(var a in i.backendSrv=r,i.stateFilter={},i.alertHistory=[],i.panelDefaults={alertHistory:[],enabled:!0,stateFilter:["alerting"],mediaUrl:"/public/plugins/"+i.pluginId+"/media/alert.mp3",alerting:!1},o.default.defaults(i.panel,i.panelDefaults),i.events.on("init-edit-mode",i.onInitEditMode.bind(i)),i.events.on("refresh",i.onRefresh.bind(i)),i.panel.stateFilter)i.stateFilter[i.panel.stateFilter[a]]=!0;return i}return l(e,t),e.$inject=["$scope","$injector","backendSrv"],e.prototype.updateStateFilter=function(){var t=[];for(var e in this.stateFilter)this.stateFilter[e]&&t.push(e);this.panel.stateFilter=t,this.onRefresh()},e.prototype.isAlertInHistory=function(t){return this.alertHistory.find(function(e){return e.newStateDate===t.newStateDate&&e.state===t.state&&e.panelId===t.panelId})},e.prototype.fetchAlerts=function(){var t=this;if(!1===this.panel.enabled)return null;this.panel.alerting=!1;var e={state:this.panel.stateFilter,dashboardId:this.dashboard.id};return this.backendSrv.get("/api/alerts",e).then(function(e){e.forEach(function(e){t.isAlertInHistory(e)||(t.alertHistory.push(e),t.panel.alerting=!0,t.player.play())})}).then(function(){t.renderingCompleted()})},e.prototype.link=function(t,e,n,r){this.player=e.find("audio")[0]},e.prototype.onRefresh=function(){this.fetchAlerts()},e.prototype.onInitEditMode=function(){this.addEditorTab("Options","public/plugins/"+this.pluginId+"/editor.html")},e.templateUrl="module.html",e.scrollable=!1,e}(a.PanelCtrl);e.SirenPanel=u,e.PanelCtrl=u},function(e,n){e.exports=t},function(t,n){t.exports=e}])});
//# sourceMappingURL=module.js.map
var $url="/common/material/layerImageSelect",data=utils.init({siteId:utils.getQueryInt("siteId"),attributeName:utils.getQueryString("attributeName"),no:utils.getQueryInt("no"),pageType:"card",groups:null,count:null,items:null,selectedGroupId:0,form:{siteId:utils.getQueryInt("siteId"),keyword:"",groupId:-utils.getQueryInt("siteId"),page:1,perPage:24}}),methods={insert:function(t){parent.$vue.runMaterialLayerImageSelect(this.attributeName,this.no,t)},apiList:function(t){var i=this;this.form.page=t,utils.loading(this,!0),$api.post($url,this.form).then(function(t){var e=t.data;i.groups=e.groups,i.count=e.count,i.items=e.items}).catch(function(t){utils.error(t)}).then(function(){utils.loading(i,!1)})},getLinkUrl:function(t){return utils.getCmsUrl("material"+t,{siteId:this.siteId})},btnSelectClick:function(t){var i=this;utils.loading(this,!0),$api.post($url+"/actions/select",{siteId:this.siteId,materialId:t.id}).then(function(t){var e=t.data;i.insert(e.value),utils.closeLayer()}).catch(function(t){utils.error(t)}).then(function(){utils.loading(i,!1)})},btnSelectGroupClick:function(t){this.selectedGroupId=this.selectedGroupId===t?0:t},btnGroupClick:function(t){var i=this;this.form.groupId=t,this.form.page=1,utils.loading(this,!0),$api.post($url,this.form).then(function(t){var e=t.data;i.groups=e.groups,i.count=e.count,i.items=e.items}).catch(function(t){utils.error(t)}).then(function(){utils.loading(i,!1)})},btnDropdownClick:function(t){this.pageType=t},btnSearchClick(){utils.loading(this,!0),this.apiList(1)},btnPageClick:function(t){utils.loading(this,!0),this.apiList(t)}},$vue=new Vue({el:"#main",data:data,methods:methods,created:function(){this.apiList(1)}});
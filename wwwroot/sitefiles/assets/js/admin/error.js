var $url="/error",data=utils.init({logId:utils.getQueryInt("logId"),uuid:utils.getQueryString("uuid"),message:utils.getQueryString("message"),stackTrace:null,addDate:null}),methods={apiGet:function(){var t=this;utils.loading(this,!0),$api.get($url,{params:{logId:this.logId}}).then(function(e){var a=e.data;t.message=a.error.summary+" "+a.error.message,t.stackTrace=a.error.stackTrace,t.addDate=a.error.addDate}).catch(function(t){utils.error(t)}).then(function(){utils.loading(t,!1)})}},$vue=new Vue({el:"#main",data:data,methods:methods,created:function(){if(this.logId>0)this.apiGet();else if(this.uuid){var t=JSON.parse(sessionStorage.getItem(this.uuid));this.message=t.message,this.stackTrace=t.stackTrace,this.addDate=t.addDate,utils.loading(this,!1)}}});
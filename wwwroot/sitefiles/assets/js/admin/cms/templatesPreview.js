var $url="/cms/templates/templatesPreview",data=utils.init({siteId:utils.getQueryInt("siteId"),activeName:"first",channels:null,form:{templateType:"IndexPageTemplate",channelIds:[utils.getQueryInt("siteId")]},content:null,contentEditor:null,parsedContentEditor:null,parsedContent:""}),methods={apiConfig:function(){var t=this;$api.get($url,{params:{siteId:this.siteId}}).then(function(e){var n=e.data;t.channels=n.channels,t.content=n.content,setTimeout(function(){require.config({paths:{vs:utils.getAssetsUrl("lib/monaco-editor/min/vs")}}),require(["vs/editor/editor.main"],function(){t.contentEditor=monaco.editor.create(document.getElementById("content"),{value:t.content,language:"html"}),t.contentEditor.focus()})},100)}).catch(function(t){utils.error(t)}).then(function(){utils.loading(t,!1)})},apiSubmit:function(){var t=this;utils.loading(this,!0),$api.post($url,{siteId:this.siteId,templateType:this.form.templateType,channelId:this.form.channelIds[this.form.channelIds.length-1],content:this.content}).then(function(e){var n=e.data;t.parsedContent=n.value,t.activeName="second",setTimeout(function(){require.config({paths:{vs:utils.getAssetsUrl("lib/monaco-editor/min/vs")}}),require(["vs/editor/editor.main"],function(){t.parsedContentEditor=monaco.editor.create(document.getElementById("parsedContent"),{value:t.parsedContent,language:"html"}),t.parsedContentEditor.focus()})},100)}).catch(function(t){utils.error(t)}).then(function(){utils.loading(t,!1)})},getEditorContent:function(){return this.contentEditor.getModel().getValue()},btnSubmitClick:function(){this.content=this.getEditorContent(),this.content?this.apiSubmit():utils.error("请输入需要解析的模板标签!")}},$vue=new Vue({el:"#main",data:data,methods:methods,created:function(){this.apiConfig()}});
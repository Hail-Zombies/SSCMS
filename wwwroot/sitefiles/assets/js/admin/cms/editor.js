var $url="/cms/editor/editor",$urlInsert=$url+"/actions/insert",$urlUpdate=$url+"/actions/update",$urlPreview=$url+"/actions/preview",$urlCensor=$url+"/actions/censor",$urlTags=$url+"/actions/tags";Date.prototype.Format=function(t){var e={"M+":this.getMonth()+1,"d+":this.getDate(),"h+":this.getHours(),"m+":this.getMinutes(),"s+":this.getSeconds(),"q+":Math.floor((this.getMonth()+3)/3),S:this.getMilliseconds()};for(var i in/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(this.getFullYear()+"").substr(4-RegExp.$1.length))),e)new RegExp("("+i+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[i]:("00"+e[i]).substr((""+e[i]).length)));return t};var data=utils.init({siteId:utils.getQueryInt("siteId"),channelId:utils.getQueryInt("channelId"),contentId:utils.getQueryInt("contentId"),page:utils.getQueryInt("page"),tabName:utils.getQueryString("tabName"),reloadChannelId:utils.getQueryInt("reloadChannelId"),mainHeight:"",isSettings:!0,sideType:"first",collapseSettings:["checkedLevel","addDate"],collapseMore:["templateId","translates"],csrfToken:null,site:null,siteUrl:null,channel:null,groupNames:null,tagNames:null,checkedLevels:null,isCensorTextEnabled:null,siteOptions:null,channelOptions:null,styles:null,templates:null,form:null,translates:[],isPreviewSaving:!1,dialogCensor:!1,isCensorSave:!1,textResult:null}),methods={runFormLayerImageUploadText:function(t,e,i){this.insertText(t,e,i)},runFormLayerImageUploadEditor:function(t,e){this.insertEditor(t,e)},runMaterialLayerImageSelect:function(t,e,i){this.insertText(t,e,i)},runFormLayerFileUpload:function(t,e,i){this.insertText(t,e,i)},runMaterialLayerFileSelect:function(t,e,i){this.insertText(t,e,i)},runFormLayerVideoUpload:function(t,e,i){this.insertText(t,e,i)},runMaterialLayerVideoSelect:function(t,e,i){this.insertText(t,e,i)},runEditorLayerImage:function(t,e){this.insertEditor(t,e)},insertText:function(t,e,i){(this.form[utils.getCountName(t)]||0)<=e&&(this.form[utils.getCountName(t)]=e),this.form[utils.getExtendName(t,e)]=i,this.form=_.assign({},this.form)},insertEditor:function(t,e){t||(t="Body"),e&&utils.getEditor(t).execCommand("insertHTML",e)},addTranslation:function(t,e,i,n){this.translates.push({siteId:this.siteId,channelId:this.channelId,targetSiteId:t,targetChannelId:e,translateType:i,summary:n})},updateGroups:function(t,e){this.groupNames=t.groupNames,utils.success(e)},apiGet:function(){var t=this;window.onresize=function(){t.mainHeight=$(window).height()-70+"px"},window.onresize(),$api.get($url,{params:{siteId:t.siteId,channelId:t.channelId,contentId:t.contentId}}).then(function(e){var i=e.data;t.csrfToken=i.csrfToken,t.site=i.site,t.siteUrl=i.siteUrl,t.channel=i.channel,t.groupNames=i.groupNames,t.tagNames=i.tagNames,t.checkedLevels=i.checkedLevels,t.isCensorTextEnabled=i.isCensorTextEnabled,t.siteOptions=i.siteOptions,t.channelOptions=i.channelOptions,t.styles=i.styles,t.templates=i.templates,t.form=_.assign({},i.content),t.form.addDate?t.form.addDate=new Date(t.form.addDate).Format("yyyy-MM-dd hh:mm:ss"):t.form.addDate=(new Date).Format("yyyy-MM-dd hh:mm:ss"),t.form.checked&&(t.form.checkedLevel=t.site.checkContentLevel),-1===t.checkedLevels.indexOf(t.form.checkedLevel)&&(t.form.checkedLevel=i.checkedLevel),(t.form.top||t.form.recommend||t.form.hot||t.form.color)&&t.collapseSettings.push("attributes"),t.form.groupNames&&t.form.groupNames.length>0?t.collapseSettings.push("groupNames"):t.form.groupNames=[],t.form.tagNames&&t.form.tagNames.length>0?t.collapseSettings.push("tagNames"):t.form.tagNames=[],t.form.linkUrl&&t.collapseSettings.push("linkUrl");for(var n=0;n<t.styles.length;n++){var s=t.styles[n];if("CheckBox"===s.inputType||"SelectMultiple"===s.inputType){var a=t.form[utils.toCamelCase(s.attributeName)];Array.isArray(a)||(t.form[utils.toCamelCase(s.attributeName)]=a?utils.toArray(a):[])}else"Image"===s.inputType||"File"===s.inputType||"Video"===s.inputType?t.form[utils.getCountName(s.attributeName)]=utils.toInt(t.form[utils.getCountName(s.attributeName)]):"Text"!==s.inputType&&"TextArea"!==s.inputType&&"TextEditor"!==s.inputType||0===t.contentId&&(t.form[utils.toCamelCase(s.attributeName)]=s.defaultValue)}setTimeout(function(){for(var e=0;e<t.styles.length;e++){var i=t.styles[e],n=utils.toCamelCase(i.attributeName);if("TextEditor"===i.inputType){var s=utils.getEditor(i.attributeName);s.styleIndex=e,s.ready(function(){this.addListener("contentChange",function(){var e=t.styles[this.styleIndex];t.form[utils.toCamelCase(e.attributeName)]=this.getContent()})})}else"Date"!==i.inputType&&"DateTime"!==i.inputType||(t.form[n]?t.form[n]=new Date(t.form[n]):t.form[n]=new Date)}},100)}).catch(function(t){utils.error(t)}).then(function(){utils.loading(t,!1)})},syncEditors:function(){var t=this;UE&&$.each(UE.instants,function(e,i){i.sync();var n=t.styles[i.styleIndex];t.form[utils.toCamelCase(n.attributeName)]=i.getContent()})},apiInsert:function(){var t=this;utils.loading(this,!0),$api.csrfPost(this.csrfToken,$urlInsert,{siteId:this.siteId,channelId:this.channelId,contentId:this.contentId,content:this.form,translates:this.translates}).then(function(e){e.data;t.closeAndRedirect(!1)}).catch(function(t){utils.error(t)}).then(function(){utils.loading(t,!1)})},apiCensor:function(t){this.isCensorSave=t;var e=this;utils.loading(this,!0),$api.csrfPost(this.csrfToken,$urlCensor,{siteId:this.siteId,channelId:this.channelId,content:this.form}).then(function(i){var n=i.data;n.success?t?e.btnCensorSaveClick():utils.success("内容审查通过！"):(e.textResult=n.textResult,e.dialogCensor=!0)}).catch(function(t){utils.error(t)}).then(function(){utils.loading(e,!1)})},apiTags:function(){var t=this;utils.loading(this,!0),$api.csrfPost(this.csrfToken,$urlTags,{siteId:this.siteId,channelId:this.channelId,content:this.form.body}).then(function(e){var i=e.data;i.tags&&i.tags.length>0&&(t.form.tagNames=_.union(t.form.tagNames,i.tags),utils.success("成功提取标签！"))}).catch(function(t){utils.error(t)}).then(function(){utils.loading(t,!1)})},apiPreview:function(){var t=this;utils.loading(this,!0),$api.csrfPost(this.csrfToken,$urlPreview,{siteId:this.siteId,channelId:this.channelId,contentId:this.contentId,content:this.form}).then(function(e){var i=e.data;t.isPreviewSaving=!1,window.open(i.url)}).catch(function(t){utils.error(t)}).then(function(){utils.loading(t,!1)})},apiUpdate:function(){var t=this;utils.loading(this,!0),$api.csrfPost(this.csrfToken,$urlUpdate,{siteId:this.siteId,channelId:this.channelId,contentId:this.contentId,content:this.form,translates:this.translates}).then(function(e){e.data;t.closeAndRedirect(!0)}).catch(function(t){utils.error(t)}).then(function(){utils.loading(t,!1)})},btnCensorSaveClick:function(){0===this.contentId?this.apiInsert():this.apiUpdate()},closeAndRedirect:function(t){var e=utils.getTabVue(this.tabName);e&&(t?e.apiList(this.reloadChannelId>0?this.reloadChannelId:this.channelId,this.page,"内容编辑成功！"):e.apiList(this.channelId,this.page,"内容新增成功！",!0)),utils.removeTab(),utils.openTab(this.tabName)},btnLayerClick:function(t){var e={siteId:this.siteId,channelId:this.channelId,editorAttributeName:"Body"};t.contentId&&(e.contentId=t.contentId),t.attributeName&&(e.attributeName=t.attributeName),t.no&&(e.no=t.no);var i={title:t.title,url:utils.getCommonUrl(t.name,e)};t.full||(i.width=t.width?t.width:700,i.height=t.height?t.height:500),utils.openLayer(i)},handleTranslationClose:function(t){this.translates=_.remove(this.translates,function(e){return t!==e.summary})},btnSaveClick:function(){var t=this;this.syncEditors(),this.$refs.form.validate(function(e){e?t.site.isAutoCheckKeywords&&t.isCensorTextEnabled?t.apiCensor(!0):t.btnCensorSaveClick():utils.error("保存失败，请检查表单值是否正确")})},btnCensorClick:function(){this.syncEditors(),this.apiCensor(!1)},btnTagsClick:function(){this.syncEditors(),this.form.body&&this.apiTags()},btnPreviewClick:function(){var t=this;this.isPreviewSaving||(this.syncEditors(),this.$refs.form.validate(function(e){e?t.apiPreview():utils.error("预览失败，请检查表单值是否正确")}))},btnCloseClick:function(){utils.removeTab()},btnGroupAddClick:function(){utils.openLayer({title:"新增内容组",url:utils.getCommonUrl("groupContentLayerAdd",{siteId:this.siteId}),width:500,height:300})},btnTranslateAddClick:function(){utils.openLayer({title:"选择转移栏目",url:utils.getCmsUrl("editorLayerTranslate",{siteId:this.siteId,channelId:this.channelId}),width:620,height:400})},btnExtendAddClick:function(t){var e=this.form[utils.getCountName(t.attributeName)]+1;this.form[utils.getCountName(t.attributeName)]=e,this.form[utils.getExtendName(t.attributeName,e)]="",this.form=_.assign({},this.form)},btnExtendRemoveClick:function(t){var e=this.form[utils.getCountName(t.attributeName)];this.form[utils.getCountName(t.attributeName)]=e-1,this.form[utils.getExtendName(t.attributeName,e)]="",this.form=_.assign({},this.form)},btnExtendPreviewClick:function(t,e){for(var i=this.form[utils.getCountName(t)],n=[],s=0;s<=i;s++){var a=this.form[utils.getExtendName(t,s)];a=utils.getUrl(this.siteUrl,a),n.push({src:a})}layer.photos({photos:{start:e,data:n},anim:5})}},$vue=new Vue({el:"#main",data:data,methods:methods,created:function(){this.apiGet()}});
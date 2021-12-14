var $url="/write/contents",$defaultWidth=160,data=utils.init({pageType:null,sites:null,siteName:null,siteUrl:null,root:null,allCheckedLevels:[],checkedLevels:[],isAdd:null,pageContents:null,total:null,pageSize:null,page:1,titleColumn:null,columns:null,menus:null,tableMaxHeight:999999999999,multipleSelection:[],checkedColumns:[],siteId:0,channelIds:[],permissions:{isEdit:!0}}),methods={apiGet:function(){var t=this;$api.get($url,{params:{siteId:this.siteId}}).then(function(e){var n=e.data;if(n.unauthorized)return t.pageType="Unauthorized",void utils.loading(t,!1);t.sites=n.sites,t.siteId=n.siteId,t.siteName=n.siteName,t.siteUrl=n.siteUrl,t.root=n.root,t.titleColumn=n.titleColumn,t.columns=n.columns,t.allCheckedLevels=n.checkedLevels,t.checkedLevels=_.map(n.checkedLevels,function(t){return t.label}),t.apiList(1)}).catch(function(e){utils.loading(t,!1),utils.error(e)})},apiList:function(t){var e=this;utils.loading(this,!0),$api.post($url+"/actions/list",{siteId:this.siteId,channelId:this.channelId,page:t,isCheckedLevels:this.isCheckedLevels,checkedLevels:this.checkedLevels}).then(function(n){var i=n.data;e.isAdd=i.isAdd,e.pageContents=i.pageContents,e.total=i.total,e.pageSize=i.pageSize,e.page=t}).catch(function(t){utils.error(t)}).then(function(){utils.loading(e,!1),e.scrollToTop()})},apiColumns:function(t){$api.post($url+"/actions/columns",{siteId:this.siteId,attributeNames:t}).then(function(t){t.data}).catch(function(t){utils.error(t)})},getContentUrl:function(t){return utils.getRootUrl("redirect",{siteId:t.siteId,channelId:t.channelId,contentId:t.id})},handleSiteIdChange:function(){this.apiGet()},btnSearchClick:function(){this.apiList(1)},btnTitleClick:function(t){if(t.checked&&t.channelId>0)return!1;utils.openLayer({title:"查看内容",url:utils.getRootUrl("write/contentsLayerView",{siteId:this.siteId,channelId:Math.abs(t.channelId),contentId:t.id}),full:!0})},btnEditClick:function(t){utils.addTab("编辑内容",this.getEditUrl(t))},btnAdminClick:function(t){utils.openLayer({title:"管理员查看",url:utils.getCommonUrl("adminLayerView",{adminId:t}),full:!0})},getAddUrl:function(){return utils.getRootUrl("write/editor",{siteId:this.siteId,channelId:this.channelId,page:this.page,tabName:utils.getTabName()})},getEditUrl:function(t){return utils.getRootUrl("write/editor",{siteId:this.siteId,channelId:t.channelId,contentId:t.id,page:this.page,tabName:utils.getTabName()})},btnAddClick:function(){utils.addTab("添加内容",this.getAddUrl())},btnLayerClick:function(t){var e={siteId:this.siteId,channelId:this.channelId,page:this.page};if(t.withContents){if(!this.isContentChecked)return;e.channelContentIds=this.channelContentIdsString}t.url=utils.getRootUrl("write/contentsLayer"+t.name,e),utils.openLayer(t)},btnContentViewClick:function(t){utils.openLayer({title:"查看内容",url:utils.getRootUrl("write/contentsLayerView",{siteId:this.siteId,channelId:this.channelId,contentId:t}),full:!0})},btnContentStateClick:function(t){utils.openLayer({title:"查看审核状态",url:utils.getRootUrl("write/contentsLayerState",{siteId:t.siteId,channelId:t.channelId,contentId:t.id}),full:!0})},scrollToTop:function(){document.documentElement.scrollTop=document.body.scrollTop=0},tableRowClassName:function(t){return-1!==this.multipleSelection.indexOf(t.row)?"current-row":""},handleSelectionChange:function(t){this.multipleSelection=t},toggleSelection:function(t){this.$refs.multipleTable.toggleRowSelection(t)},handleCurrentChange:function(t){this.apiList(t)},handleColumnsChange:function(){var t=_.filter(this.columns,function(t){return t.isList}),e=_.map(t,function(t){return t.attributeName});this.apiColumns(e)},handleHeaderDragend:function(t,e,n){}},$vue=new Vue({el:"#main",data:data,methods:methods,computed:{channelId:function(){return 0===this.channelIds.length?0:this.channelIds[this.channelIds.length-1]},isCheckedLevels:function(){return this.checkedLevels.length!==this.allCheckedLevels.length},isContentChecked:function(){return this.multipleSelection.length>0},channelContentIds:function(){for(var t=[],e=0;e<this.multipleSelection.length;e++){var n=this.multipleSelection[e];t.push({channelId:n.channelId,id:n.id})}return t},channelContentIdsString:function(){for(var t=[],e=0;e<this.multipleSelection.length;e++){var n=this.multipleSelection[e];t.push(n.channelId+"_"+n.id)}return t.join(",")}},created:function(){this.apiGet()}});
var $url="/common/editor/layerAudio",data=utils.init({attributeName:utils.getQueryString("attributeName"),form:{siteId:utils.getQueryInt("siteId"),type:"upload",audioUrl:"",isAutoPlay:!1},uploadUrl:null}),methods={btnSubmitClick:function(){if(!this.form.audioUrl)return utils.error("请上传需要插入的音频文件！"),!1;var t=' isAutoPlay="'+this.form.isAutoPlay+'"';parent.$vue.insertEditor(this.attributeName,'<img src="/sitefiles/assets/images/audio-clip.png"'+t+' playUrl="'+this.form.audioUrl+'" style="width: 400px; height: 40px;" class="siteserver-stl-audio" /><br/>'),utils.closeLayer()},btnCancelClick:function(){utils.closeLayer()},uploadAudioBefore:t=>!!/(\.mp3)$/i.exec(t.name)||(utils.error("文件只能是音频格式，请选择有效的文件上传!"),!1),uploadProgress:function(){utils.loading(this,!0)},uploadAudioSuccess:function(t){this.form.audioUrl=t.url,this.form.type="url",utils.loading(this,!1)},uploadError:function(t){utils.loading(this,!1);var i=JSON.parse(t.message);utils.error(i.message)}},$vue=new Vue({el:"#main",data:data,methods:methods,created:function(){this.uploadUrl=$apiUrl+$url+"/actions/upload?siteId="+this.form.siteId,utils.loading(this,!1)}});
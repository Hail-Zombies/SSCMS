function add_form(e){var t=$("#"+e+"_Count"),o=parseInt(t.val());o+=1,$("<div>"+$("#"+e+"_1").html().replace(/_1/g,"_"+o)+"</div>").insertBefore(t),$("#"+e+"_Count").val(o)}function submit_resume(){if(checkFormValueById("frmResume")){document.charset="utf-8";var e=document.getElementById("frmResume");e.action=resumeActionUrl,e.target="iframeResume",e.submit()}}$(document).ready(function(){$("#JobContentID").val($.request.queryString.jobID),new AjaxUpload("uploadFile",{action:resumeAjaxUploadUrl,name:"ImageUrl",data:{},onSubmit:function(e,t){if(!t||!/^(jpg|jpeg|gif)$/i.test(t))return $("#img_upload_txt").text("只允许上传JPG,GIF图片"),!1;$("#img_upload_txt").text("上传中... ")},onComplete:function(file,response){$("#img_upload_txt").text(" "),response&&(response=eval("("+response+")"),"true"==response.success?($("#imgPhoto").attr("src",response.url),$("#ImageUrl").val(response.value)):$("#img_upload_txt").text(response.message))}})});
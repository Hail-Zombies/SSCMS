
        function Set_ratio(ratio, obj) {
            obj.each(function () {
                var width = obj.width(); // 图片实际宽度
                var height = width * ratio; // 计算等比例缩放后的高度
                $(this).css("height", height); // 设定等比例缩放后的高度
            });
        }

        function Get_contents_title(siteId, channelId) {
            $.ajax({
                headers: {
                    "Content-Type": "application/json",
                    "X-SS-API-KEY": "26e09ba9-ce14-440d-83d2-c76e43d4fc37",
                },
                data: JSON.stringify({
                    "siteId": siteId,
                    "channelId": channelId,
                    "orders": [{
                        "column": "lastModifiedDate",
                        "desc": false,
                    }],
                    "page": 1,
                    "perPage": 8,
                }),
                type: "post",
                url: "/api/v1/contents",
                success: function (data, status) {
                    Create_contents_title(data, $("#channel_" + channelId + "_contents ul"));
                    console.log("状态: " + status);
                },
                error: function (xhr) {
                    console.log("错误提示： " + xhr.status + " " + xhr.statusText);
                }
            });
        }

        function Create_contents_title(data, obj) {
            var str = "";
            for (var i = 0; i < data.contents.length; i++) {
                str += `<li><a href="` + data.contents[i].navigationUrl+`">` + data.contents[i].title + `</a><p style="color:black">` + parseDate(data
                    .contents[i].lastModifiedDate) + `</p></li>`;
            }
            obj.append(str);
        }

        function Get_contents_image(siteId, channelId){
            $.ajax({
                headers: {
                    "Content-Type": "application/json",
                    "X-SS-API-KEY": "26e09ba9-ce14-440d-83d2-c76e43d4fc37",
                },
                data: JSON.stringify({
                    "siteId": siteId,
                    "channelId": channelId,
                    "orders": [{
                        "column": "lastModifiedDate",
                        "desc": false,
                    }],
                    "wheres": [ {
                        "column": "imageUrl",
                        "operator": "!=",
                        "value": ""
                    }],
                    "page": 1,
                    "perPage": 4,
                }),
                type: "post",
                url: "/api/v1/contents",
                success: function (data, status) {
                    Create_contents_image(data, $("#channel_" + channelId + "_contents_img"));
                    console.log("状态: " + status);
                },
                error: function (xhr) {
                    console.log("错误提示： " + xhr.status + " " + xhr.statusText);
                }
            });
        }

        function Create_contents_image(data, obj) {
            var div_imgs = obj.find(".ratio-img");
            for (var i = 0; i < data.contents.length; i++) {
                $(div_imgs[i]).append(`<a href="` + data.contents[i].navigationUrl+`"><img src="` + data.contents[i].imageUrl + `"></a>`);
            }
        }

        function Get_tabs() {
            var i = 0;
            $("#swiper_2 .swiper-slide").each(function () {
                var current = $(this);
                var tab = tabs[i];
                i++;
                Create_tabs(current, tab.siteId, tab.id, i);
            });
        }

        function Create_tabs(obj, siteId, id, num) {
            $.ajax({
                headers: {
                    "Content-Type": "application/json",
                    "X-SS-API-KEY": "26e09ba9-ce14-440d-83d2-c76e43d4fc37",
                },
                type: "get",
                url: "/api/v1/channels/" + siteId + "/" + id,
                error: function () {
                    obj.append(`<div>` + num + `</div>`);
                },
                success: function (data, status) {
                    if (data.children.length == 0) {} else {
                        obj.append(`
                        <div class="container-fluid">
                            <div id="channel_` + data.children[0].id + `_contents_img" class="col-xs-6">
                                <div class="row">
                                    <div class="col-xs-6">
                                        <div class="ratio-img">
                                        </div>
                                    </div>
                                    <div class="col-xs-6">
                                        <div class="ratio-img">
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-xs-6">
                                        <div class="ratio-img">
                                        </div>
                                    </div>
                                    <div class="col-xs-6">
                                        <div class="ratio-img">
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-xs-6">
                                <div class="ratio-img">
                                    <div class="department">
                                        <div class="detitle">
                                            <span>` + data.children[0].channelName + `</span>
                                            <a class="more" href="/channels/` + data.children[0].id + `.html">更多 +<a>
                                        </div>
                                        <div id="channel_` + data.children[0].id + `_contents" class="container news">
                                            <ul>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>`);
                        Get_contents_title(siteId, data.children[0].id);
                        Get_contents_image(siteId, data.children[0].id);
                    }
                }
            });
        }

        
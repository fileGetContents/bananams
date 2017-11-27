var i = 0;
var urls = '';
var imgcounts = 0;
/*公用图片上传*/
imageupload = {

    /*初始化上传*/
    iniImg:function()
    {
        var length = $("#jqueryfileupload").length;
        if (length < 1){
            var testingText = '<input type="file" style="display:none" id="jqueryfileupload" name="files[]" capture="camera" accept="image/*"  multiple size＝"9"/>'
            $("body").append(testingText);
        }
    },

    /*开始上传*/
    startupload :function(){
        $("#jqueryfileupload").click();
    },
  
    /*上传图片*/
    uploadImg: function () {
        var uploader = $("#jqueryfileupload");
        var minisnsid = $("#hidfId").val();
         urls ='http://www.bananatrip.cn/test';
        var jqXHR = uploader.fileupload({
            url: urls,
            acceptFileTypes: /(\.|\/)(rar|zip|jp?g|png|bmp)$/i,
            sequentialUploads: true,
            singleFileUploads: true,
            maxChunkSize: 10000000, // 10 MB
            add: function (e, data) {
                var cleng = $("#imgList").length;
                if (i < 10 && cleng+i < 10) {
                    i++;
                    data.submit();
                }
                else {
                    $("#addimg").hide();
                    layer.closeAll();
                }
            },
            limitMultiFileUploads:9,
            progressall: function (e, data) {

            },
            success: function (e, date) {
                i--;
                if (i < 1) {
                    layer.closeAll();
                    if (!e.isok) {
                        alert(e.msg);
                    }
                }
                if (e.isok) {
                    var rethtml = $("#post_img_html_one").html().replace("{FILEPATH}", e.imageUrl).replace("{IMGID}", "loc_img_" + e.id).replace("{IMG_LOADING_ID}", "loc_loading_" + e.id);
                    imgcounts++;
                    $("#imgList").prepend(rethtml).show();

                    if (e.id != -1) {
                        var illegalImg = $('#illegalpic').val();
                        if (e.illegal == 1) {
                            if (1 !== illegalImg) {
                                $('#illegalpic').val(1)
                            }
                        }
                        $("#" + "loc_img_" + e.id).attr("imgid", e.id);
                        $("#" + "loc_loading_" + e.id).hide();
                    } else {
                        $("#" + "loc_img_" + e.id).parent().remove();
                        imgcounts--;
                        if (imgcounts <= 0) {
                            $('#btn-addimg').hide();
                        }
                        //alert("该图片上传失败，重新选择试试");
                        Popup(0, "该图片上传失败，重新选择试试");
                    }
                }
            },
            change: function (e, data) {
                showLoadingUI("上传中");
                
            },
            error: function (e, date) {
                layer.closeAll();
                alert('异常了');
            },
        });
    },

  
    /*删除图片*/
    clearImg: function() {
        $(document).on("click", ".temp_clear_img", function () {
            imgcounts--;
            $(this).parent().remove();
            $('#btn-addimg').show();
            if (imgcounts <= 0) {
                $('#btn-addimg').hide();
            }
        });
    
    }  /*删除图片*/
   ,


};

$(function () {
    imageupload.iniImg();
    imageupload.uploadImg();
    imageupload.clearImg();
});
$("body .bindUploadQQQQQ").on("change",".ocrImage01",function(ev){
        	var usertoken = $.getStorage("user-token");
            try{
                if(typeof opts.onupload == "function"){
                    opts.onupload();
                }
                var callback = craeteHandler(function(data){
                    if(typeof opts.oncomplate == "function"){
                        opts.oncomplate(data);
                    }
                });
               	
               	$("#waiting").show();
				var formData = new FormData();
					var file = null;
					file = ev.target.files || ev.dataTransfer.files;
					
					$(ev.target).after($(ev.target).clone().val("")); 
					$(ev.target).remove();
					/*file.after(file.clone().val("")); 
					file.remove(); */
					
					if(file && file.length > 0) {
						for(var i = 0, m = file.length; i < m; i++) {
							formData.append(ev.target.name, file[i]);
						}
						formData.append('token',usertoken)
						$.ajax({
							url: opts.url,
							type: 'post',
							timeout : 30000,
							dataType: 'json',
							data:formData,
							contentType: false,
							processData: false,
							success: function(json) {
								var rs = json;
								$("#waiting").hide()
								ev.target.value = "";
								if(rs.resultVo.resultCode == 0) {
									//成功
									if(rs.resultVo.resultData.leftFaceIdSuccessCount<=0){ 
										identitycertica.ocrSuccessCount = 0;
									}
									$.tip(rs.resultVo.resultMessage);
									identitycertica.loadIdentityCerticaaa(rs.resultVo.resultData);
									return;
								} else if(rs.resultVo.resultCode == 1) {
									//其他错误
									$.tip(rs.resultVo.resultMessage);
									if(rs.resultVo.resultData.leftFaceIdFailCount<=0){ 
										identitycertica.ocrFailCount = 0;
									}
									return;
								} else if(rs.resultVo.resultCode == 3) {
									//未登录
									registLogin.loadLogin();
									return;
								} 
								
							},
							error: function(xhr,textStatus) {
								$("#waiting").hide()
								$.tip("图片上传失败，再试一次吧");
								ev.target.value = "";
							}
						});
					}
					
            }catch(e){
                alert(e);
            }
        });

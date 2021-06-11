window.addEventListener('load',function(){
  // 1. 获取裁剪区域
  const $image = $('#image')

  // 2. 定义配置对象
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview',
    // 视图模式
    viewMode: 2
  }

  $image.cropper(options)

   const input=document.querySelector('[type="file"]');
   const upload=document.querySelector('#upload');
   const certain=document.querySelector('#certain');
   
   upload.addEventListener('click',function(){
    // 点击上传,然后点击input表单控件
    input.click();
   })

   // 为确定按钮注册click事件
   certain.addEventListener('click',function(){
    // 先拿到用户裁剪过后的头像
    // 得到base64格式的图片
    // base64格式的图片一般比图片原文件大30%,所以一般小图片可以用base64格式
    // 显示,减少不必要的网络请求
    var dataURL = $image
      .cropper('getCroppedCanvas', {
        // 创建一个 Canvas 画布
        width: 100,
        height: 100
      })
      .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
      // 向服务器发送请求,将修改后的图像上传给服务器
    console.log(dataURL);
    ajax({
     method:'PATCH',
     url:'http://www.liulongbin.top:3008/my/update/avatar',
     Header:{
      Authorization:localStorage.getItem('token'),
     },
     data:{
      // 防止base64数据中的+号变空格,在传输数据前先将需要传输的数据进行编码
      avatar:dataURL,
     }
    },function(xhr){
     let response=JSON.parse(xhr.responseText);
     if(response.code===0){
      console.log(1);
      layer.msg(response.message);
      // 更新头像之后,让首页重新获取用户的信息,然后更新用户的头像
      window.parent.getUserInfo();
     }else{
      layer.msg(response.message);
     }
    })
   
   })

   // input表单发生改变,说明用户有选择图片文件
   // 然后将图片文件放到裁剪区域
   input.addEventListener('change',function(e){
    console.dir(this);
    // 拿到用户选择的文件
    var file = e.target.files[0];
    // 将文件转化为路径
    var newImgURL = URL.createObjectURL(file);
    // 从新初始化裁剪区
    $image
   .cropper('destroy')      // 销毁旧的裁剪区域
   .attr('src', newImgURL)  // 重新设置图片路径
   .cropper(options)        // 重新初始化裁剪区域
   })

})
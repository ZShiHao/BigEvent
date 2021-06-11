window.addEventListener('load',function(){

 const form=document.querySelector('form');
 const oldPwd=form.querySelector('[name^="old"]');
 const newPwd=form.querySelector('[name^="new"]');
 const rePwd=form.querySelector('[name^="re"]');

 form.addEventListener('submit',function(e){
  e.preventDefault();
  // 表单验证
  if(!verify(oldPwd)) return
  if(!verify(newPwd)) return
  if(!verify(rePwd)) return
  if(newPwd.value===oldPwd.value){
   layer.msg('新密码不能与原密码相同')
   this.reset();
   return
  }
  if(newPwd.value!==rePwd.value){
   layer.msg('输入的密码不一致');
   return
  }

  ajax({
   method:'PATCH',
   url:'http://www.liulongbin.top:3008/my/updatepwd',
   Header:{
    Authorization:localStorage.getItem('token'),
   },
   data:{
    old_pwd:oldPwd.value,
    new_pwd:newPwd.value,
    re_pwd:rePwd.value
   }
  },function(xhr){
   let response=JSON.parse(xhr.responseText);
   if(response.code===0){
    layer.msg(response.message)
    // 修改密码成功,然后强制用户重新登录
    window.parent.location.href='/login.html';
    localStorage.removeItem('token');
   }else {
    layer.msg(response.message);
   }
  })

 })
})


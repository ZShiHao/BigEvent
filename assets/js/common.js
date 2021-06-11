
/**
 * 一些共用的函数
 */
 
 /**
  * 验证表单的值是否符合要求
  * @param {Object} item 传入的表单对象
  * @returns {Boolean} 如果符合返回true,如果不符合返回false
  */
  function verify(item){
   if(item.type==='text'){
    if(item.value.trim()===''){
     layer.msg('用户名不能为空');
     return false;
    }else if(!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(item.value)){
     layer.msg('用户名不能有特殊字');
     return false;
    }else if(/(^\_)|(\__)|(\_+$)/.test(item.value)){
     layer.msg('用户名首尾不能出现下划线\'_\'');
     return false;
    }else if(/^\d+\d+\d$/.test(item.value)){
     layer.msg('用户名不能全为数字');
     return false;
    }
   }else if(item.type==='password'){
    if(item.value.trim()===''){
     layer.msg('请输入密码');
     return false;
    }else if(!/^[\S]{6,12}$/.test(item.value)){
     layer.msg('密码必须6到12位');
     return false;
    }
   }else if(item.type==='email'){
    if(item.value.trim()===''){
     layer.msg('邮箱不能为空');
     return false;
    }else if(!/^[a-z]([a-z0-9]*[-_]?[a-z0-9]+)*@([a-z0-9]*[-_]?[a-z0-9]+)+[\.][a-z]{2,3}([\.][a-z]{2})?$/.test(item.value)){
     layer.msg('请填写正确的邮箱格式');
     return false;
    }
   }
   return true;
  }

  let timer
  /**
   * 将错误信息渲染到页面上
   * @param {String,Object} text 提示用户输入的错误信息 
   */
  function verifyRender(text,item){
   clearTimeout(timer);
   let box=document.querySelector('.login-reg-box');
   let div=document.createElement('div');
   // 添加提示框
   div.innerHTML=`<i class="layui-icon icon layui-icon-face-cry
   " ></i>${text}`;
   div.classList.add('alert');
   box.appendChild(div);
   // 将表单边框设置为橘色
   item.style.borderColor="orange";
   // 设置定时器,一段时间过后提示信息消失
   timer=setTimeout(function(){
    box.removeChild(div);
    item.style.borderColor='#e6e6e6';
   },1500);
  }
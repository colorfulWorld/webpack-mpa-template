//基础配置
import 'lib-flexible'

//业务配置
import '../../css/common.css'
import '../../css/test.css'
import './index.less'
import { title } from '../../js/common'
console.log(r.e)
window.onload = function () {
  console.log(1)
  $('.div1').html('一生二，二生三，三生万物!!')
  $('.div2').html(title)
  console.log('process.env.NODE_ENV:', process.env.NODE_ENV)
  // {
  //     demo1: './src/pages/demo1/index.js',
  //     demo2: './src/pages/demo2/index.js'
  // }
}

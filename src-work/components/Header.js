// import React from 'react'
// import axios from 'axios'
// import {Button} from 'antd'
// class Header extends React.Component{
//     constructor(){
//         super()
//         this.state={
//             isLogin:false,
//             visible:false,
//             input:'',
//             confirmLoading:false,
//             user:null
//         }
//     }
//     handleOk(){
//         let accesstoken= this.state.input;
//         axios.post(`${url}/accesstoken`,{accesstoken})
//         .then(res=>{
//             massage.success('登陆成功')
//             this.setState({
//                 isLogin:true,
//                 visible:true,
//                 confirmLoading:true,
//                 user: res.date,
//                 input:''

//             })
//             session
//         })
//         .catch(err=>massage.error('shibai'))
//     }
//     handlegout(){

//     }
//     render(){
//         let {isLogin,visible,confirmLoading,user}=this.state
//         const menu = !isLogin ? <p>哈哈</p>:(
//           <Menu>
//             <Menu.Item>
//               <h3>{user.Loginname}</h3>
//             </Menu.Item>
//             <Menu.Item>
//               <a href="#">个人中心</a>
//             </Menu.Item>
//             <Menu.Item>
//               <button type="primary" onClick={this.handleLogout.bind{this}}>登出</button>
//             </Menu.Item>
//           </Menu>
//         );
//         return(
//             <div>
//                 <h1></h1>
//                 {
//                     isLogin?
//                     <Dropdown overlay={menu}>
//                     <a className="ant-dropdown-link" href="#">
//                       Hover me <Icon type="down" />
//                     </a>
//                      </Dropdown>
//                     :
//                     <div>
//                         <Button type="primary" onClick={()=>this.setState({visible:true})}>登录</Button>
//                         <Modal
//                         title='登录'
//                         visible=''
//                         onOk={this.handleOk.bind(this)}
//                         onCencel={()=>this.setState({visible:false})}
//                         confirmLoading={confirmLoading}
//                         cencelText="取消"
//                         okText='登录'

//                         >

//                         </Modal>
//                     </div>

//                             }
//             </div>
//         )
//     }
// }
// export default Header

import React from 'react'
import { Button, Modal, Input, message, Menu, Dropdown, Avatar, Badge } from 'antd'
import axios from 'axios'

import {Link} from 'react-router-dom'

import {url} from '../config'

class Header extends React.Component{
    constructor(){
        super()
        this.state={
            isLogin: false,
            visible: false,
            confirmLoading: false,
            input: '3f77acb1-d753-4393-b784-44913190e6a8',
            user: null,
            messageCount: null
        }
    }
    handleOk(){
        this.setState({confirmLoading: true})
        let accesstoken = this.state.input.trim();
        axios.post(`${url}/accesstoken`, {accesstoken})
            .then(res => {
                message.success('登录成功')
                this.setState({
                    isLogin: true,
                    visible: false,
                    confirmLoading: false,
                    input: '',
                    user: res.data
                })
                sessionStorage.accesstoken = accesstoken
                this.getMessage(accesstoken)
            })
            .catch(err =>{
                message.error('登录失败，请重试')
                this.setState({confirmLoading: false, input: ''})
            })
    }
    getMessage(accesstoken){
        axios.get(`${url}/message/count?accesstoken=${accesstoken}`)
            .then(res=> this.setState({messageCount: res.data.data}))
            .catch(err=> console.log('message 获取失败'))
    }
    handleLogout(){
        this.setState({
            isLogin: false,
            user: null
        })
        sessionStorage.removeItem('accesstoken')
    }
    render(){
        let {isLogin, visible, input, confirmLoading, user, messageCount} = this.state
        // console.log(user)
        const menu = !isLogin ? null : (
          <Menu>
            <Menu.Item>
              <h3>{user.loginname}</h3>
            </Menu.Item>
            <Menu.Item>
                <Link to="/">个人中心</Link>
            </Menu.Item>
            <Menu.Item>
                <Link to="/message">消息中心</Link>
            </Menu.Item>
            <Menu.Item>
              <Button type="danger" onClick={this.handleLogout.bind(this)}>登出</Button>
            </Menu.Item>
          </Menu>
        )
        return(
            <header className='header'>
                <h1><Link to='/'>cnode</Link></h1>
                {
                    isLogin ?
                    <Dropdown overlay={menu}>
                        <Badge count={messageCount}>
                        <Avatar src={user.avatar_url} />
                      </Badge>
                  </Dropdown>
                    :
                    <div>
                        <Button type="primary" onClick={()=>this.setState({visible: true})}>登录</Button>
                        <Modal
                  title="登录"
                  visible={visible}
                  onOk={this.handleOk.bind(this)}
                  onCancel={()=>this.setState({visible: false})}
                  confirmLoading={confirmLoading}
                  cancelText='取消'
                  okText='登录'
                >
                  <Input placeholder='accesstoken' value={input} onChange={e=>this.setState({input: e.target.value})}/>
                </Modal>
                    </div>
                }
            </header>
        )
    }
}
export default Header


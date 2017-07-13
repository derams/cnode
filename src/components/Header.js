import React from 'react'

import {Button, Modal, Input, Spin, confirmLoading, message, Menu, Avatar, Dropdown } from 'antd'
import axios from 'axios'
import {url} from '../config'
class Header extends React.Component{
    constructor(props){
        super(props)
        this.state={
            isLogin:false,
            visible:false,
            input:'254918a2-5530-4e94-9eb5-aebc56bfe357',
            confirmLoading:false,
            user:null
        }
    }
    handleOk(){
        this.setState({confirmLoading:true})
        let accesstoken = this.state.input
        axios.post(`${url}/accesstoken`,{accesstoken})
        .then(res=>
             {
            message.success('恭喜你')
            this.setState({
            isLogin:true,
            visible:false,
            confirmLoading:false,
            user:res.data
            })
        })
        .catch(err=>{
            message.error('登录失败，再试试')
            this.setState({
            confirmLoading:false,input:''
            })
        })
    }
    handleLogout(){
        this.setState({
            user:null,
            isLogin:false
        })
    }
    render(){
        let {isLogin,visible,input,confirmLoading, user} = this.state
        const menu = !isLogin ?<p>11222</p>
        :
        (
          <Menu>
            <Menu.Item>
              {user.loginname}
            </Menu.Item>
            <Menu.Item>
              <a href="#">个人中心</a>
            </Menu.Item>
            <Menu.Item>
              <Button type="danger" onClick={this.handleLogout.bind(this)}>退出</Button>
            </Menu.Item>
          </Menu>
        );
        return(
            <header>
                <h1>conde</h1>
                {
                    isLogin ?
                    <div>
                         <Dropdown overlay={menu}>
                            <Avatar src={user.avatar_url} alt="avater_url" />
                          </Dropdown>
                    </div>
                    :
                    <div>
                        <Button type='primary' onClick={()=>this.setState({visible:true})}>登录</Button>
                        <Modal
                          title="登录"
                          visible={visible}
                          onOk={this.handleOk.bind(this)}
                          onCancel={()=>this.setState({visible:false})}
                          cancelText='取消'
                          okText='登录'
                          confirmLoading = {confirmLoading}
                        >
                          <Input placeholder='login name' value={input} onChange= { e=>this.setState({input:e.target.value})}/>
                        </Modal>
                    </div>
                }

            </header>
        )
    }
}
export default Header
import React from 'react'
import axios from 'axios'
import {url} from '../config'
import { Spin, message, Card, Avatar } from 'antd';


class Topic extends React.Component{
    constructor(){
                super()
                this.state={
                    data:null
                }
            }
componentDidMount(){
        let id = this.props.match.params.id;
        axios.get(`${url}/topic/${id}`)
        .then(res=>
            this.setState({data:res.data.data})
            )
        .catch(err=> message.error('是不是傻啊'))
    }
    render(){
        // console.log(this.props)
        let {data} = this.state
        return(
            <div style={{padding:'10px'}}>
                <Card loading={!data}>
                   {
                     data ? (
                    <div>
                    <h1>{data.title}</h1>
                    <div>
                        <Avatar src={data.author.avater_url} />
                        <span>回复量：{data.reply_count}</span>
                        &nusb;&nusb;
                        <span>阅读量：{data.visit_count}</span>
                    </div>
                    <div dangerouslySetInnerHTML={{__html: data.content}} className='topic-wrap'/>
                    </div>
                        ) : null
                   }
                </Card>
            </div>
        )
    }
}

export default Topic

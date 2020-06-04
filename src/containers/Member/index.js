import React, {useEffect, useState} from 'react';
import CardItem from './CardItem';
import fetch from '@/services/axios';
import { getAppUrl } from '@/config/url.js';
import initUser from '@/config/initUser'

const GET_MEMBER_LIST_API = getAppUrl() + '/yzSmartGate/communityAppServer/getPersonListByHouse'
const DELETE_USER_API =getAppUrl() + '/yzSmartGate/communityAppServer/removePersonFromHouse'
const GET_PERSON_TYPE_API = getAppUrl() + '/yzSmartGate/communityAppServer/getPersonTypeList'


function Member() {
    const [list ,setList] = useState([])
    const [roleStatus, setRoleStatus] = useState({})
    const getList = (res) => {
        fetch.post(GET_MEMBER_LIST_API, {
            personId:initUser.personId
        }).then(res => {
            const data  = !!res.data ? res.data: []
            setList(data) 
        })
    }
    const getPersonType = () => {
        fetch.post(GET_PERSON_TYPE_API).then(res => {
           let obj = {}
           res.data.map(item => { obj[item.value]=item.desc})
           console.log(obj)
           setRoleStatus(obj)
        })
    }
    const reload = res => {
        getList()

    } 
    useEffect(() => {
        getList()
        getPersonType()
    }, []);
    return (
        <div>
            {!!list.length ? list.map((item,index) => <CardItem user={item} key={item.personId} API={DELETE_USER_API} onReload= {reload} num={index + 1} 
            roleStatus={roleStatus}
            />): <p style={{'textAlign': 'center' , 'lineHeight': "100px", fontSize: '16px'}} >请先添加账号，暂无数据...</p>}
            
        </div>
    )
}

export default Member;

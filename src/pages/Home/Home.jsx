import React from 'react'
// import HomeLeft from '../../Components/HomeComponent/HomeLeft/HomeLeft'
// import HomeRight from '../../Components/HomeComponent/HomeRight/HomeRight'
// import Search from "../../Components/HomeComponent/HomeRightComponent/Search/Search.jsx"
import GroupList from '../../Components/HomeComponent/HomeRightComponent/GroupList/GroupList.jsx'
import Friends from '../../Components/HomeComponent/HomeRightComponent/Friends/Friends.jsx'
import UserList from '../../Components/HomeComponent/HomeRightComponent/UserList/UserList.jsx'
import FriendRquest from '../../Components/HomeComponent/HomeRightComponent/FriendRquest/FriendRquest.jsx'
import Group from '../../Components/HomeComponent/HomeRightComponent/Group/Group.jsx'
import BlokUser from '../../Components/HomeComponent/HomeRightComponent/BlokUser/BlokUser.jsx'

const Home = () => {
  return (
    <div className='flex w-full justify-between flex-wrap'>
       <GroupList/>
       <Friends/>
       <UserList/>
       <FriendRquest/>
       <Group/>
       <BlokUser/>
    </div>
  )
}

export default Home
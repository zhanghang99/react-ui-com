import React from 'react';
import SubMenu from '../SubMenu/SubMenu'

export default class SideNavigation extends React.Component{
  render(){
    const { list } = this.props;
    return (
      <SubMenu list={list}/>
    )
  }
}
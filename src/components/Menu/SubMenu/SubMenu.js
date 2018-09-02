import React from 'react';
import MenuItemGroup from '../MenuItemGroup/MenuItemGroup'
import './SubMenu.css'

export default class SubMenu extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      indexs:-1,
      clickIndex:-1,
      level:-1
    }
  }
  isExpand = (indexs,url) => {
    if(url){
      this.setState({
        clickIndex:indexs,
        level:'one',
        indexs:-1,
      })
      return;
    }
    this.setState({
      indexs
    })
  }
  handleClick = (index,level) => {
    this.setState({
      clickIndex:index,
      level,
      indexs:-1,
    })
  }
  render(){
    const { list=[] } = this.props;
    const { expand,indexs,clickIndex,level} = this.state;
    return (
      <div className="SubMenu">
        {
          list.map((v,i)=>{
            return (
              <div key={v.FirstName}>
                <div 
                  className={level === 'one' && clickIndex === i ? "current FirstName" : "FirstName"} 
                  onClick={this.isExpand.bind(this,i,v.url)}
                >
                  <a href={'#'}>{v.FirstName}</a>
                </div>
                <MenuItemGroup 
                  list={v.SecondLevel} 
                  index={i} 
                  chooseIndex={indexs}
                  clickIndex={clickIndex}
                  level={level}
                  handleClick={this.handleClick}
                />
              </div>
            )
          })
        }
      </div>
    )
  }
}
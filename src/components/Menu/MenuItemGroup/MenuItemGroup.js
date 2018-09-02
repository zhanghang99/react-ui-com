import React from 'react';
import Item from '../Item/Item'
import './MenuItemGroup.css'

export default class MenuItemGroup extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      expand:true,
      indexs:-1,
      isCurrent:false,
    }
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.chooseIndex === this.props.index){
      console.log(nextProps.chooseIndex ,this.props.index);
      this.setState({
        expand:!this.state.expand,
      })
    }
  }
  isExpand = (indexs,url) => {
    if(url){
      console.log(indexs,url,2);
      this.props.handleClick(indexs,'two');
      this.setState({
        isCurrent:true,
        indexs:-1,
      })
      return;
    }
    this.setState({
      indexs
    })
  }
  handleClick = (index,level) => {
    this.props.handleClick(index,level)
    this.setState({
      indexs:-1,
    })
  }
  render(){
    const { list=[],clickIndex,level,chooseIndex,index } = this.props;
    const { expand,indexs,isCurrent } = this.state;
    return (
      <div className={expand ? "MenuItemGroup" : "MenuItemGroup Hidden"}>
        {
          list.map((v,i)=>{
            return (
              <div key={v.SecondName}  className="MenuItem">
                <div 
                  className={level === 'two' && clickIndex === i ? "current SecondName" : "SecondName"} 
                  onClick={this.isExpand.bind(this,i,v.url)}
                >
                  <a href={'#'}>{v.SecondName}</a>
                </div>
                <Item list={v.ThreeLevel} index={i} chooseIndex={indexs} handleClick={this.handleClick}/>
              </div>
            )
          })
        }
      </div>
    )
  }
}
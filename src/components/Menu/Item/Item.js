import React from 'react';
import './Item.css'

export default class Item extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      expand:true,
      indexs:-1
    }
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.chooseIndex === this.props.index){
      console.log(nextProps.chooseIndex, this.props.index,99);
      this.setState({
        expand:!this.state.expand
      })
    }
  }
  handleClick = (index) => {
    this.props.handleClick(index,'three')
  }
  render(){
    const { list=[] } = this.props;
    const { expand } = this.state;
    return (
      <div className={expand ? "Item" : "Item Hidden"}>
        {
          list.map((v,i)=>{
            return (
              <div key={v.item} className="ItemName" onClick={this.handleClick.bind(this,i)}>
                <a href={v.url}>{v.item}</a>
              </div>
            )
          })
        }
      </div>
    )
  }
}
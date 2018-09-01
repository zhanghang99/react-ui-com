import React from 'react';
// import CalendarMonthMP from './components/Calender/CalendarMonthMP/CalendarMonthMP'
import { CalendarMonthMP } from '../lib/index'

export default class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      showCalendarMonth:false,
      config:{
        startYear:'1990',//下拉年份列表开始年份
        minDate:'201508',//时间区间的开始时间
        maxDate:'201807',//时间区间的结束时间
        defaultTime:'201804'//初始化时间
      }
    }
  }
  handleClick = () => {
    this.setState({
      showCalendarMonth:true
    })
  }
  onConfirm = (date) => {
    console.log(date);
  }
  render(){
    const { showCalendarMonth ,config} = this.state;
    return (
      <div>
        <button onClick={this.handleClick}>月控件</button>
         <CalendarMonthMP 
          showCalendarMonth={showCalendarMonth} 
          config={config} 
          onConfirm={this.onConfirm}
        /> 
      </div>
    )
  }
}
import React, { Component } from 'react';
import './CalendarMonth.css';
  
/**
 * 
 * 
 * 
 *  组件配置信息
 * 
 *  showCalendarMonth:false,//控制组件是否显示，引用组件初始化时赋值false
    config:{
      startYear:'1990',//下拉年份列表开始年份
      minDate:'201508',//时间区间的开始时间
      maxDate:'201807',//时间区间的结束时间
      defaultTime:'201804'//初始化时间
    }
    handleClick = () => {//组件方法，点击目标元素让组件显示，showCalendarMonth一直未true即可
      showCalendarMonth:true,
    }
    onConfirm = (date) => {//组件方法，获取选择的时间
      console.log(date);
    }
 * 
 * 
 * 
 * 
 **/

export default class CalendarMonth extends Component{
  constructor(props){
    super(props)
    if(!this.props.config.defaultTime){
      throw '请赋值初始年月，例：defaultTime:yyyymm'
    }
    this.state={
      month:[
        {
          num1:'01',
          num2:'一'
        },
        {
          num1:'02',
          num2:'二'
        },
        {
          num1:'03',
          num2:'三'
        },
        {
          num1:'04',
          num2:'四'
        },
        {
          num1:'05',
          num2:'五'
        },
        {
          num1:'06',
          num2:'六'
        },
        {
          num1:'07',
          num2:'七'
        },
        {
          num1:'08',
          num2:'八'
        },
        {
          num1:'09',
          num2:'九'
        },
        {
          num1:'10',
          num2:'十'
        },
        {
          num1:'11',
          num2:'十一'
        },
        {
          num1:'12',
          num2:'十二'
        }
      ],
      allYear:[],//所有的下拉年份
      isShow:false,//年份下拉是否隐藏
      showCalendarMonth:false,//整个控件是否隐藏
      isMove:0,//小于0则控件向左移，大于0则控件向右移，等于0则回归
      moveBorder:true,//判断当前年份是否达到最远或最近年份，超过边界则禁止左右移动
      currentMonth:Number(this.props.config.defaultTime.slice(4,6)) - 1,//当前选择的月份
      chooseYear:Number(this.props.config.defaultTime.slice(0,4)),//当前选择的年份
      clickYear:Number(this.props.config.defaultTime.slice(0,4)),//当前选择的年份
      startYear:this.props.config.startYear,//下拉年份的最久远的一个
      minDate:this.props.config.minDate,//开始时间
      maxDate:this.props.config.maxDate,//截止时间
    }
  }

  componentWillMount(){
    this.leftRightMove = true;//节流
    let { startYear } = this.state;
    const nowYear = new Date().getFullYear();
    let allYear = [];
    while(startYear <= nowYear){
      allYear.push(startYear);
      startYear++;
    }
    this.setState({
      allYear:allYear.reverse()
    })
  }

  componentWillReceiveProps(nextProps){
    const { config} = nextProps;
    this.setState({
      showCalendarMonth:true
    })
  }

  clickCurrent = (i,currentTime) => {
    const {maxDate,minDate,chooseYear } = this.state;
    if(currentTime < minDate || currentTime > maxDate){
      return;
    }
    this.setState({
      currentMonth:i,
      showCalendarMonth:false,
      clickYear:chooseYear,
      isShow:false,
    },()=>{
      this.props.onConfirm(
        {
          year:this.state.chooseYear + '',
          month:this.state.currentMonth < 9 ? "0" + (this.state.currentMonth + 1) : this.state.currentMonth + 1 + '',
          date:new Date(this.state.chooseYear,this.state.currentMonth,1)
        }
      );
    })
  }

  clickYear = (year) => {
    this.setState({
      chooseYear:year,
      isShow:false
    })
  }

  yearShow = () => {
    const { isShow } = this.state;
    this.setState({
      isShow:!isShow
    })
  }

  addYear = (num) => {
    if(this.leftRightMove){
      this.jieliu(num);
      this.leftRightMove = false;
      setTimeout(()=>{
        this.leftRightMove = true;
      },500)
    }
  }

  jieliu = (num) => {
    let { chooseYear,startYear,moveBorder } = this.state;
    moveBorder = chooseYear + num > new Date().getFullYear() || 
                 chooseYear + num < startYear ? false : true;
    chooseYear =  chooseYear === new Date().getFullYear() && num > 0  || 
                  chooseYear === startYear && num < 0 
                  ? chooseYear : chooseYear + num
    this.setState({
      chooseYear,
      moveBorder,
      isShow:false
    },()=>{
      if(this.state.moveBorder && num > 0){
        this.setState({
          isMove:this.state.isMove + 1
        })
      }else if(this.state.moveBorder && num < 0){
        this.setState({
          isMove:this.state.isMove - 1
        })
      }
      setTimeout(()=>{
        this.setState({
          isMove:0
        })
      },500)
    })
  }

  clickModel = () => {
    this.setState({
      showCalendarMonth:false,
      isShow:false,
    })
  }
  
  render(){
    const { month,currentMonth,chooseYear,allYear,isShow, showCalendarMonth,isMove,minDate,maxDate,clickYear} = this.state;
    const { config } = this.props;
    return (
      <div className="CalendarBox">
        <div 
          className={showCalendarMonth?  "CalendarModel" : ""}
          onClick={this.clickModel}
        />
        <div className={showCalendarMonth? "CalendarMonth upShow" : "CalendarMonth"}>
          <div className="Year">
            <div className="left" onClick={this.addYear.bind(this,-1)}><i></i></div>
            <div className="center">
              <div onClick={this.yearShow}>
                {chooseYear}
                <i></i>
              </div>
              <div 
                className={isShow ? "fullYear show" : "fullYear"}
              >
                {     
                  allYear.map((v)=>{
                    return (
                      <div 
                        className={chooseYear ===v ? "chooseYear allYear" : "allYear"} 
                        key={v}
                        onClick={this.clickYear.bind(this,v)}
                      >
                        {v}
                      </div>
                    )
                  })
                }
              </div>
            </div>
            <div className="right" onClick={this.addYear.bind(this,1)}><i></i></div>
          </div>
          <div className="MonthBox">
            {
              [1,2,3].map((val)=>{
                return (
                  <div className={isMove < 0 ? "Month leftMove" : isMove > 0 ? "Month rightMove" : "Month"} key={val}>
                    {
                      month.map((v,i)=>{
                        return (
                          <div key={v.num2}>
                            <span 
                              className={(chooseYear + v.num1 < minDate || chooseYear + v.num1 > maxDate) ?  'range'  : chooseYear === clickYear && currentMonth===i ? 'current' : ''}
                              onClick={this.clickCurrent.bind(this,i,chooseYear + v.num1)}
                            >
                                {v.num2}月
                            </span>
                          </div>
                        )
                      })
                    }
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    )
  }
}
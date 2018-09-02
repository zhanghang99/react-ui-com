import React from 'react';
import SideNavigation from './components/Menu/SideNavigation/SideNavigation'

export default class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      list: [
        {
          FirstName:'PC',
          url:'www.baidu.com'
        },
        {
          FirstName:'PC端',
          SecondLevel:[
            {
              SecondName:'General',
              url:'www.baidu.com'
            }
          ]
        },
        {
          FirstName:'PC端s',
          SecondLevel:[
            {
              SecondName:'Generals',
              url:'www.baidu.com'
            }
          ]
        },
        {
          FirstName:'移动端',
          SecondLevel:[
            {
              SecondName:'General1',
              ThreeLevel:[
                {
                  item:'Button1',
                  url:'www.baidu.com'
                },
                {
                  item:'Icon1',
                  url:'www.baidu.com'
                }
              ]
            }
          ]
        }
      ]
    }
  }
  render(){
    const { list } = this.state;
    return (
      <div>
        <SideNavigation list={list}/>
      </div>
    )
  }
}
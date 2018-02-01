import React, { Component } from 'react';
import PropTypes from 'prop-types'
import './App.css';
import axios from "axios";

class Person extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name:props.name,
            age:props.age,
            list:props.list||[]
        }
        this.handleChange = this.handleChange.bind(this); 
        this.handleChangeAge = this.handleChangeAge.bind(this); 
    }

    componentWillMount(){
        console.log('componentWillMount 在渲染前调用,在客户端也在服务端。');
    }

    componentDidMount(){
        axios.get('http://192.168.11.61:8091/').then(res=>{
            console.log(res.data.data)
            this.setState({
                list:res.data.data
            })
        })
        console.log('componentDidMount 在第一次渲染后调用，只在客户端。之后组件已经生成了对应的DOM结构，可以通过this.getDOMNode()来进行访问。 如果你想和其他JavaScript框架一起使用，可以在这个方法中调用setTimeout, setInterval或者发送AJAX请求等操作(防止异部操作阻塞UI)。')
    }

    componentWillReceiveProps(){
        console.log('componentWillReceiveProps 在组件接收到一个新的prop时被调用。这个方法在初始化render时不会被调用。')
    }

    shouldComponentUpdate(){
        console.log('shouldComponentUpdate 返回一个布尔值。在组件接收到新的props或者state时被调用。在初始化时或者使用forceUpdate时不被调用。 可以在你确认不需要更新组件时使用。')
        return true;
    }

    componentWillUpdate(){
        console.log('componentWillUpdate 在组件接收到新的props或者state但还没有render时被调用。在初始化时不会被调用。')
    }

    componentDidUpdate(){
        console.log('componentDidUpdate 在组件完成更新后立即调用。在初始化时不会被调用。')
    }

    componentWillUnmount(){
        console.log('componentWillUnmount 在组件从 DOM 中移除的时候立刻被调用。')
    }

    static propTypes = {
        name:PropTypes.string,
        age:PropTypes.number
    }

    static defaultProps = {
        name:'json',
        age:20
    }

    handleChange(event) {
        this.setState({
            name: event.target.value
        });
    }

    handleChangeAge(event) {
        this.setState({
            age: event.target.value
        });
    } 

    render(){
        let list = this.state.list.map((item,key)=>{
            return <li key={key}>{item.title}--{item.age}</li>
        })
        return <div>
            <p>name:<input onChange={this.handleChange} value={this.state.name} /></p>
            <p>age:<input onChange={this.handleChangeAge} value={this.state.age} /></p>
            <p>name:{this.state.name}</p>
            <p>age:{this.state.age}</p>  
            <ul>{list}</ul>
        </div>;
    }
}

//无状态函数式组件1
function SayHello({firstName,lastName}){
    return (
        <span>{lastName},{firstName}</span>
    )
}

//无状态函数式组件2
function SayHello2(props){
    var firstName = props.firstName;
    var lastName = props.lastName;
    return (
        <span>{lastName},{firstName}</span>
    )
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <Person/>
        <p>{SayHello({ firstName: '张', lastName: '三丰' })}</p>
        <p>{SayHello2({ firstName: '张', lastName:'三丰'})}</p>
      </div>
    );
  }
}

export default App;

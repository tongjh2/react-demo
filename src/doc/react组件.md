# react组件

## 安装

$ npm install -g create-react-app
$ create-react-app my-app
$ cd my-app/
$ npm start

## 创建组件

react16中React.createClass已经被ES6的classes替代
组件创建使用class继承`React.Component`,组件构造函数应该调用super(props)

```
class HelloMessage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            text:props.text||'world',
            count:props.count||0
        }
        this.handleChange = this.handleChange.bind(this); 
    }

    handleChange(event) {
        this.setState({
            text: event.target.value
        });
    } 

    render(){
        return <div>
            {this.state.text} - {this.state.count}
            <input onChange={this.handleChange} value={this.state.text} />
        </div>;
    }
}
```

### 无状态函数式组件

```
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
```

### 组件状态类型检查

15.5.0版本之后，需要单独引入prop-types这个包。
在组件中引入import PropTypes from 'prop-types'
在组件中使用：

```
HelloMessage.propTypes = {
    name: PropTypes.string
}
```

### 组件函数绑定

在React.Component的class中，函数不再被自动绑定。你需要手动去绑定它们。最好的地方就是和以上例子一样，在构造函数里。

```
constructor(props){
    super(props);
    ...
    this.handleChange = this.handleChange.bind(this);
}
```

### 组件声明周期

组件的生命周期可分成三个状态：

+ Mounting：已插入真实 DOM
+ Updating：正在被重新渲染
+ Unmounting：已移出真实 DOM

生命周期的方法有：

+ componentWillMount 在渲染前调用,在客户端也在服务端。

+ componentDidMount : 在第一次渲染后调用，只在客户端。之后组件已经生成了对应的DOM结构，可以通过this.getDOMNode()来进行访问。 如果你想和其他JavaScript框架一起使用，可以在这个方法中调用setTimeout, setInterval或者发送AJAX请求等操作(防止异部操作阻塞UI)。

+ componentWillReceiveProps 在组件接收到一个新的prop时被调用。这个方法在初始化render时不会被调用。

+ shouldComponentUpdate 返回一个布尔值。在组件接收到新的props或者state时被调用。在初始化时或者使用forceUpdate时不被调用。 
可以在你确认不需要更新组件时使用。

+ componentWillUpdate在组件接收到新的props或者state但还没有render时被调用。在初始化时不会被调用。

+ componentDidUpdate 在组件完成更新后立即调用。在初始化时不会被调用。

+ componentWillUnmount在组件从 DOM 中移除的时候立刻被调用。
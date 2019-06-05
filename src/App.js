import React, { useState, createContext } from 'react';
import logo from './logo.svg';
import './App.css';
import { Link, Route, BrowserRouter as Router } from 'react-router-dom';

const { Provider, Consumer } = createContext([]);

const FCItem = (
  {
    defaultValue
  }
) => {
  const [value] = useState(defaultValue);
  console.log(`传入的defaultValue是:`, defaultValue, `state中的value是:`, value);

  return (
    <div>{value}</div>
  );
};

class ClassItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.defaultValue
    };
  }

  render() {
    return (
      <div>{this.state.value}</div>
    );
  }
}

function Home() {
  return (
    <Consumer>
      {
        ({ list, setList }) => {
          return (
            <div className="App">
              <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                  Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                  className="App-link"
                  href="javascript: void 0"
                  onClick={() => {
                    setList([
                      { id: 1, value: Math.random() },
                      { id: 2, value: Math.random() },
                      { id: 3, value: Math.random() }
                    ]);

                    alert('更新成功')
                  }}
                >
                  更新List
                </a>
              </header>
            </div>);
        }}
    </Consumer>
  );
}

function List() {
  return (
    <Consumer>
      {
        ({ list }) =>
          <>
            <div>FC组件</div>
            {
              list.length ?
                list.map(item => <FCItem key={item.id} defaultValue={item.value}/>)
                :
                <div>暂无数据</div>
            }

            <div>Class组件</div>
            {
              list.length ?
                list.map(item => <ClassItem key={item.id} defaultValue={item.value}/>)
                :
                <div>暂无数据</div>
            }
          </>
      }
    </Consumer>
  );
}

export default function () {
  const [list, setList] = useState([]);

  return (
    <Router>
      <Provider value={{ list, setList }}>
        <nav>
          <ul style={{ listStyle: 'none', display: 'flex' }}>
            <li style={{ marginRight: 30 }}>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/list/">List</Link>
            </li>
          </ul>
        </nav>

        <Route path="/" exact component={Home}/>
        <Route path="/list/" component={List}/>
      </Provider>
    </Router>);
}

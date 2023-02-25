import React from 'react';
import { connect } from 'react-redux';
import { Routes, Route, Link } from 'react-router-dom';
import { Layout, Menu, Button } from 'antd';

import Home from './components/home';
import Login from './components/login';
import About from './components/about';
import Scheduler from './components/scheduler/scheduler';
import DaySelect from './components/scheduler/daySelect';
import MonthSelect from './components/scheduler/monthSelect';
import YearSelect from './components/scheduler/yearSelect';
import DayDetail from './components/scheduler/dayDetail';
import Page404 from './components/page404';

import { logout } from './store/actions';

const { Header, Content } = Layout;

const App = (props) => {
  const today = new Date();
  const date = (today.getMonth()+1)+'-'+today.getDate()+'-'+today.getFullYear();

  return (
    <Layout>
      {/* <Header>
        <Menu theme='dark' mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">User</Menu.Item>
        </Menu>
      </Header> */}
      <Content>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='login' element={<Login/>} />
          <Route path='about' element={<About/>} />
          <Route path='scheduler' element={<Scheduler/>}>
            <Route path='day' element={<DaySelect/>} />
            <Route path='month' element={<MonthSelect/>} />
            <Route path='year' element={<YearSelect/>} />
            <Route path=':date' element={<DayDetail/>} />
          </Route>
          <Route path='*' element={<Page404/>} />
        </Routes>
      </Content>
      <Header style={{position: "fixed", bottom: 0, left: 0, width: "100%", padding: 0, margin: 0}}>
        <Menu mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
            <Link to={`scheduler/${date}`}>Scheduler</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to={'/'}>Home</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to={'about'}>About</Link>
          </Menu.Item> 
          { props.username ? 
          <>
            <Menu.Item key="4">
              <Link to={'login'}>{ props.username }</Link>
            </Menu.Item>
            <Menu.Item key="5">
              <Button onClick={() => props.logout()}>LogOut</Button>
            </Menu.Item>
          </>
          :
          <Menu.Item key="4">
            <Link to={'login'}>Login</Link>
          </Menu.Item>  
          }
          
        </Menu>
      </Header>
    </Layout>
  );
};

function mapStateToProps(state) {
  return {
    username: state.username,
    token: state.token,
    year: state.year,
  };
};
function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
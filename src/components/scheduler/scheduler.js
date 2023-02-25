import { Link, Outlet, useNavigate } from 'react-router-dom';
import { setYear } from '../../store/actions';
import { setMonth } from '../../store/actions';
import { setDay } from '../../store/actions';
import { connect } from 'react-redux';

import { Layout, Menu, Button, DatePicker } from 'antd';

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

const dateFormat = 'YYYY-M-DD';
const { Header, Content } = Layout;

const Scheduler = (props) => {
  const date = props.year+'-'+props.month+'-'+props.day;
  const navigate = useNavigate();
  const onChange = (date, dateString) => {
    if (dateString !== '') {
      const year = new Date(dateString).getFullYear();
      const month = new Date(dateString).getMonth();
      const day = new Date(dateString).getDate();
      props.setYear(year);
      props.setMonth(month+1);
      props.setDay(day+1);
      navigate(dateString)
    }
  };
  return (
    <Layout className="layout">
      <Header>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['4']}>
          <Menu.Item key="1">
            <Link to="year">
              <Button type='dashed'>
                Year: { props.year}
              </Button>
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="month">
              <Button type='dashed'>
                Month: { props.month}
              </Button>
            </Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="day">
              <Button type='dashed'>
                Day: { props.day}
              </Button>
            </Link>
          </Menu.Item>
          <Menu.Item key="4">
            <DatePicker defaultValue={dayjs(date, dateFormat)} onChange={onChange} />
          </Menu.Item>
          <Menu.Item key="5">
            <Link to='/about'>About</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content>
        <Outlet/>
      </Content>
    </Layout>
  );
};

function mapStateToProps(state) {
  return {
    year: state.year,
    month: state.month,
    day: state.day,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setYear: year => dispatch(setYear(year)),
    setMonth: month => dispatch(setMonth(month)),
    setDay: day => dispatch(setDay(day))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Scheduler);
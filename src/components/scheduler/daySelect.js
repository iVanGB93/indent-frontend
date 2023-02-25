import { React, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { setYear } from '../../store/actions';
import { setMonth } from '../../store/actions';
import { setDay } from '../../store/actions';
import { Calendar } from 'antd';
import dayjs from 'dayjs';


const DaySelect = (props) => {
  const [ mode, setMode ] =  useState('month')
  const navigate = useNavigate();
  const onSelect = (dateString) => {
    if (mode === 'year') {
      setMode('month');
    };
    const year = new Date(dateString).getFullYear();
    const month = new Date(dateString).getMonth();
    const day = new Date(dateString).getDate();
    props.setYear(year);
    props.setMonth(month+1);
    props.setDay(day);
    navigate(`/scheduler/${year}-${month}-${day}`);
  };
  /* const getListData = (value) => {
    let listData;
    switch (value.date()) {
      case 8:
        listData = [
          {
            type: 'warning',
            content: 'This is warning event.',
          },
          {
            type: 'success',
            content: 'This is usual event.',
          },
        ];
        break;
      case 10:
        listData = [
          {
            type: 'warning',
            content: 'This is warning event.',
          },
          {
            type: 'success',
            content: 'This is usual event.',
          },
          {
            type: 'error',
            content: 'This is error event.',
          },
        ];
        break;
      case 15:
        listData = [
          {
            type: 'warning',
            content: 'This is warning event',
          },
          {
            type: 'success',
            content: 'This is very long usual event。。....',
          },
          {
            type: 'error',
            content: 'This is error event 1.',
          },
        ];
        break;
      default:
    }
    return listData || [];
  };
  const dateCellRender = (value) => {
    const listData = getListData(value);
    const date = value.format('YYYY-M-DD');
    return (
        <Progress percent={75}/>
    );
  }; */
  const onPanelChange = (value) => {
    setMode('year');
  }
  return (
    <Calendar 
      value={dayjs(props.year+'-'+props.month+'-'+props.day)} 
      mode={mode} 
      /* dateCellRender={dateCellRender} */ 
      onSelect={onSelect}
      onPanelChange={onPanelChange}
    /> 
  )
};

function mapStateToProps(state) {
  return {
    year: state.year,
    month: state.month,
    day: state.day,
  };
};
  
function mapDispatchToProps(dispatch) {
  return {
    setYear: year => dispatch(setYear(year)),
    setMonth: month => dispatch(setMonth(month)),
    setDay: day => dispatch(setDay(day))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DaySelect);
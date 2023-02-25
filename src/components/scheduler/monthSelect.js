import { connect } from 'react-redux';
import { Link, useNavigate  } from 'react-router-dom';
import { setMonth } from '../../store/actions';

import { Space, Card, Progress } from 'antd';

const MonthSelect = (props) => {
  const navigate = useNavigate();
  const handleChange = (value) => {
    props.setMonth(value);
    navigate("/scheduler/day");
  }
  return (
    <>
    <Space direction='horizontal'>
      <Link to="/scheduler/day" onClick={() => handleChange(1)}>
        <Card title='January' hoverable='true'>
          <Progress type="circle" percent={80} />
        </Card>
      </Link>
      <Link to="/scheduler/day" onClick={() => handleChange(2)}>
        <Card title='February' hoverable='true'>
          <Progress type="circle" percent={85} />
        </Card>
      </Link>
      <Link to="/scheduler/day" onClick={() => handleChange(3)}>
        <Card title='March' hoverable='true'>
          <Progress type="circle" percent={0} />
        </Card>
      </Link>
      <Link to="/scheduler/day" onClick={() => handleChange(4)}>
        <Card title='April' hoverable='true'>
          <Progress type="circle" percent={40} />
        </Card>
      </Link>
    </Space>
    <Space direction='horizontal'>
      <Link to="/scheduler/day" onClick={() => handleChange(5)}>
        <Card title='May' hoverable='true'>
          <Progress type="circle" percent={40} />
        </Card>
      </Link>
      <Link to="/scheduler/day" onClick={() => handleChange(6)}>
        <Card title='June' hoverable='true'>
          <Progress type="circle" percent={40} />
        </Card>
      </Link>
      <Link to="/scheduler/day" onClick={() => handleChange(7)}>
        <Card title='July' hoverable='true'>
          <Progress type="circle" percent={40} />
        </Card>
      </Link>
      <Link to="/scheduler/day" onClick={() => handleChange(8)}>
        <Card title='August' hoverable='true'>
          <Progress type="circle" percent={40} />
        </Card>
      </Link>
    </Space>
    <Space direction='horizontal'>
      <Link to="/scheduler/day" onClick={() => handleChange(9)}>
        <Card title='September' hoverable='true'>
          <Progress type="circle" percent={40} />
        </Card>
      </Link>
      <Link to="/scheduler/day" onClick={() => handleChange(10)}>
        <Card title='October' hoverable='true'>
          <Progress type="circle" percent={40} />
        </Card>
      </Link>
      <Link to="/scheduler/day" onClick={() => handleChange(11)}>
        <Card title='November' hoverable='true'>
          <Progress type="circle" percent={40} />
        </Card>
      </Link>
      <Link to="/scheduler/day" onClick={() => handleChange(12)}>
        <Card title='December' hoverable='true'>
          <Progress type="circle" percent={40} />
        </Card>
      </Link>
    </Space>
    </>
  )
};

function mapStateToProps(state) {
  return {
    year: state.year
  };
}
function mapDispatchToProps(dispatch) {
  return {
    setMonth: month => dispatch(setMonth(month))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MonthSelect);
import { connect } from 'react-redux';
import { setYear } from '../../store/actions';
import { Link } from 'react-router-dom';

import { Space, Card, Progress } from 'antd';

function YearSelect(props) {
  const handleChange = (value) => {
    props.setYear(value);
  }
  return (
    <Space direction='horizontal'>
      <Link to="/scheduler/month" onClick={() => handleChange(2022)}>
        <Card title='2022' hoverable='true'>
          <Progress type="circle" percent={90} />
        </Card>
      </Link>
      <Link to="/scheduler/month" onClick={() => handleChange(2023)}>
        <Card title='2023' hoverable='true'>
          <Progress type="circle" percent={10} />
        </Card>
      </Link>
      <Link to="/scheduler/month" onClick={() => handleChange(2024)}>
        <Card title='2024' hoverable='true'>
          <Progress type="circle" percent={0} />
        </Card>
      </Link>
      <Link to="/scheduler/month" onClick={() => handleChange(2025)}>
        <Card title='2025' hoverable='true'>
          <Progress type="circle" percent={0} />
        </Card>
      </Link>
    </Space>
 );
};

function mapStateToProps(state) {
  return {
    year: state.year
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setYear: year => dispatch(setYear(year))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(YearSelect);
import React from 'react';
import PropTypes from 'prop-types';
import styles from './Dashboard.module.css';
import TopBar from '../../components/TopBar/TopBar';

const Dashboard = () => {
  const paths = [
    { path: '/admin/dashboard/', title: 'Dashboard' }
  ]

  return (
    <div className={styles.Dashboard}>
      <TopBar breadscrubs={paths}/>
    </div>
  )
}
  
Dashboard.propTypes = {};

Dashboard.defaultProps = {};

export default Dashboard;

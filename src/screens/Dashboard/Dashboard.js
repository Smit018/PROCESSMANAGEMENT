import React from 'react';
import PropTypes from 'prop-types';
import styles from './Dashboard.module.css';
import TopBar from '../../components/TopBar/TopBar';

const Dashboard = () => (
  <div className={styles.Dashboard}>
    <TopBar breadscrubs="true"/>
  </div>
);

Dashboard.propTypes = {};

Dashboard.defaultProps = {};

export default Dashboard;

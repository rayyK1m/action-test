import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

import styles from './Divider.module.scss';

function Divider({ className, height }) {
    return <div className={cn(styles.divider, className)} style={{ height }} />;
}

Divider.defaultProps = {
    className: '',
    height: '1rem',
};

Divider.propTypes = {
    className: PropTypes.string,
    height: PropTypes.string,
};

export default Divider;

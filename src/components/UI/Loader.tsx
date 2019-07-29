import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

export default () => {
	return (
		<div style={{ display: 'flex', justifyContent: 'center' }}>
			<CircularProgress size={24} thickness={4} />
		</div>
	);
};

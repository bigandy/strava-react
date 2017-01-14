import React from 'react';
import $ from 'jquery';
import moment from 'moment';

class SingleRun extends React.Component{
	constructor(props) {
		super(props);
	};

	render() {

		return (
			<section className="single-run">
				I am a single run with ID of { this.props.id } and title of {  this.props.title }
			</section>
		);
	};
};

export default SingleRun;

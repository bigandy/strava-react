import React from 'react';

import { Link } from 'react-router';

class SingleRun extends React.Component{
	constructor(props) {
		super(props);

		this.runFo = this.props.location.state.runFo;
		this.id = this.props.params.runId;
	};
	render() {
		return (
			<section className="records">
				<div className="record record--single">
					<Link to="/">BACK</Link>
					<div className="thing">
						<h2>{ this.runFo.name }</h2>
						<p>Date: { this.runFo.date } <br />
						Duration: { this.runFo.duration }<br />
						Distance: { this.runFo.distance }</p>
					</div>
					<a href={ `https://www.strava.com/activities/${this.id}` } target="_blank">Link to Run</a>
				</div>
			</section>
		);
	};
};

export default SingleRun;

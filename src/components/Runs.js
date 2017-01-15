import React from 'react';
import $ from 'jquery';
import moment from 'moment';

class Runs extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			posts: [],
			start_date: moment(this.props.start_date, 'DD-MM-YYYY').format('X'),
			end_date: moment(this.props.end_date, 'DD-MM-YYYY').format('X'),
		};

		this.access_token = '71706798d2ff3d38571efe2a5e73d4e0d1454ac6';
		this.per_page = 10;

		// this.start_date = moment(this.props.start_date, 'DD-MM-YYYY').format('X');
		// this.end_date = moment(this.props.end_date, 'DD-MM-YYYY').format('X');
	};

	componentDidMount() {
		$.getJSON(`https://www.strava.com/api/v3/activities/?per_page=${this.per_page}&access_token=${this.access_token}&before=${this.state.end_date}&after=${this.state.start_date}&callback=?`, (posts) => {

			let postsArray = [];

			posts.forEach(data => {
				if (data.type === 'Run') {
					const time = moment.duration(data.moving_time, 'seconds')._data; // or is it elapsed_time ??
					const distance = data.distance * 0.000621371; // convert to miles
					const date = data.start_date_local;

					postsArray.push({
						time,
						distance,
						'id': data.id,
						date,
						'name': data.name,
						'workout_type': data.workout_type,
					});
				}

				return;
			});

			const postsOutput = postsArray.map((item, i) => {
				let className = 'record';
				if (item.workout_type !== null && item.workout_type === 2) {
					className = `${className}--long-run ${className}`;
				}
				return (
					<div className={ className } key={i}>
						<h2><a href={`https://www.strava.com/activities/${item.id}`} className="record__link">{item.name}</a></h2>
						<p>Date: { moment(item.date).format('DD/MM/YYYY') } <br />
						Duration: {item.time.hours < 9 ? `0${item.time.hours}` : item.time.hours}:{item.time.minutes < 9 ? `0${item.time.minutes}` : item.time.minutes}:{item.time.seconds < 9 ? `0${item.time.seconds}` : item.time.seconds }<br />
						Distance: {item.distance.toFixed(2)}miles</p>
					</div>
				);
			})

			this.setState({
				posts: postsOutput,
			});
		});
	};

	render() {
		let posts = this.state.posts.length > 0 && this.state.posts.map(post => post);

		return (
			<section className="records">
				{ posts }
			</section>
		);
	};
};

export default Runs;

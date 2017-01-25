import React from 'react';
import moment from 'moment';
import { Link } from 'react-router';

import posts from '../data/runs';
// const toUnix = (date) => moment(date, 'DD-MM-YYYY').format('X');

import durationCalc from '../helpers/durationCalc';
import metresToMiles from '../helpers/metresToMiles';

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
		this.url = `${this.props.base_url}?per_page=${this.per_page}&start_date=${this.state.start_date}&end_date=${this.state.end_date}`;
	};

	componentDidMount() {
		// fetch(this.url, this.props.options)
		// 	.then(response => {
		// 		if (!response.ok) {
		// 			throw Error('not okay folks');
		// 		}
		//
		// 		return response;
		// 	})
		// 	.then(response => response.json())
		// 	.then(posts => {
        //         console.log(posts);
        //
		console.log(posts);
			let postsArray = [];

			posts.forEach(data => {
				if (data.type === 'Run') {
					const time = moment.duration(data.moving_time, 'seconds')._data; // or is it elapsed_time ??
					const distance = metresToMiles(data.distance, 2); // convert to miles
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
				const date = moment(item.date).format('DD/MM/YYYY');
				const duration = durationCalc(item.time.hours, item.time.minutes, item.time.seconds);
				const distance = `${item.distance}miles`;
				const name = item.name;

				return (
					<div className={ className } key={i}>
						<h2>
							<Link
								to={{
								  pathname: `activities/${item.id}`,
								  state: { runFo: { name, date, duration, distance } }
								}}
								className="record__link">
								{item.name}
							</Link>
						</h2>
						<p>Date: { date } <br />
						Duration: { duration }<br />
						Distance: { distance }</p>
					</div>
				);
			});

			this.setState({
				posts: postsOutput,
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

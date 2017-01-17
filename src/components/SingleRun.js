import React from 'react';
import moment from 'moment';
import $ from 'jquery';

import { Link } from 'react-router';

class SingleRun extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			posts: [],
			start_date: moment(this.props.start_date, 'DD-MM-YYYY').format('X'),
			end_date: moment(this.props.end_date, 'DD-MM-YYYY').format('X'),
		};

		this.access_token = '71706798d2ff3d38571efe2a5e73d4e0d1454ac6';
		this.per_page = 10;
	};

	componentDidMount() {
		$.getJSON(`https://www.strava.com/api/v3/activities/${this.props.params.storeId}/?per_page=${this.per_page}&access_token=${this.access_token}&before=${this.state.end_date}&after=${this.state.start_date}&callback=?`, (post) => {

			const time = moment.duration(post.moving_time, 'seconds')._data; // or is it elapsed_time ??
			const distance = post.distance * 0.000621371; // convert to miles
			const date = post.start_date_local;

			const posts = (
					<div className='single-run'>
						<h2>{ post.name }</h2>
						<p>Date: { moment(date).format('DD/MM/YYYY') } <br />
						Duration: {time.hours < 9 ? `0${time.hours}` : time.hours}:{time.minutes < 9 ? `0${time.minutes}` : time.minutes}:{time.seconds < 9 ? `0${time.seconds}` : time.seconds }<br />
						Distance: {distance.toFixed(2)}miles</p>

						 <iframe height='405' width='590' frameBorder='0' allowTransparency='true' scrolling='no' src={`https://www.strava.com/activities/${this.props.params.storeId}/embed/${post.embed_token}`}></iframe>
					</div>
			);

			this.setState({
				posts: posts,
			});
		});
	};

	render() {
		let post = this.state.posts;

		return (
			<section className="single-run__wrapper">
				<Link to="/">BACK</Link>
				{ post }
			</section>
		);
	};
};

export default SingleRun;

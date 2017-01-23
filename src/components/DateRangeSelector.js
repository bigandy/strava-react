import React from 'react';
import moment from 'moment';

class DateRangeSelector extends React.Component{
	constructor(props) {
		super(props);

		this.state = {
			'start_date': moment(this.props.start_date, 'DD/MM/YYYY').format('YYYY-MM-DD'),
			'end_date': moment(this.props.end_date, 'DD/MM/YYYY').format('YYYY-MM-DD')
		};

		this.dateChange = this.dateChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	};

	dateChange(e) {
		this.setState({ [e.target.id]: e.target.value});
  	}

	onSubmit(e) {
		e.preventDefault();

		this.props.updateDate({
			'start_date': moment(this.state.start_date, 'YYYY-MM-DD').format('DD/MM/YYYY'),
			'end_date': moment(this.state.end_date, 'YYYY-MM-DD').format('DD/MM/YYYY')
		});
	};

	render() {
		// console.log(this.state);

		return (
			<section className="range-selector">
				<h1>Range Selector</h1>

				<div className="range-selector__form">
					<div>
						<label htmlFor="start_date">From: </label>
						<input
							type="date"
							id="start_date"
							value={ this.state.start_date }
							onChange={ this.dateChange }
						/>
					</div>
					<div>
						<label htmlFor="end_date">To: </label>
						<input
							type="date"
							id="end_date"
							value={  this.state.end_date }
							onChange={ this.dateChange }
						/>
					</div>
					<input type="submit" value="Submit" onClick={this.onSubmit} />
				</div>
			</section>
		);
	};
};

export default DateRangeSelector;

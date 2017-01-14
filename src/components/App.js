import React from 'react';
import DateRangeSelector from './DateRangeSelector';
import Runs from './Runs';

class App extends React.Component{
	constructor(props) {
		super(props);
		this.updateDate = this.updateDate.bind(this);

		this.state = {
			'start_date': '01/10/2016',
			'end_date': '01/11/2016',
		};
	};

	updateDate = (e) => {
		console.log('updateDate in App', e);

		this.setState(e);
	};

	render() {
		return (
			<div className="app">
				<DateRangeSelector
					updateDate={this.updateDate}
					start_date={this.state.start_date}
					end_date={this.state.end_date}
				/>

				<Runs
					start_date={ this.state.start_date }
					end_date={ this.state.end_date }
				/>
			</div>
		);
	};
};

export default App;

// TODO:
// - use fetch API
// - remove jquery
// - reformat code
// - date range picker

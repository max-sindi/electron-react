import React from 'react'
import startScreening from './utils/screens'

class Controls extends React.Component {
	state = {
		isActive: false,
		delayValue: 5,
		timer: null,
	}

	componentWillUnmount = () => {
		clearInterval(this.state.timer)
	}

	start = () => {
		let timer;

		try {
			timer = startScreening(this.state.delayValue * 1000)
		} catch(e) {
			console.log(e);
			this.stop();
		}

		if( !timer ) {
			console.error('Something went wrong')
			return;
		}

		this.setState({
			isActive: true,
			timer,
		})
 	}

 	stop = () => {
 		clearInterval(this.state.timer);
 		this.setState({
 			isActive: false,
 			timer: null,
 		})
 	}

	render() {
		return (
			<div className="controls">
				{
					!this.state.isActive
						? (
								<div>
									<input
										value={this.state.delyaActive}
										type="number"
										placeholder="Частота фотографирования (сек)"
										onChange={ e => this.setState({ delayValue: e.target.value })}
									/>
									<button
										children="Поехали"
										onClick={this.start}
									/>
								</div>
							)
						: (
								<div>
									Идёт запись скриншотов и вебкамеры
									<button
										onClick={this.stop}
										children="Stop"
									/>
								</div>
							)
				}
			</div>
		)
	}
}

export default Controls

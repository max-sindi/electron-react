import React from 'react'

class Tabs extends React.Component {
	render() {
		const tabsHeaderStyles = {
			display: 'flex',
		}

		const tabsHeaderItemStyles = {
			flexGrow: 1,
			textAlign: 'center',
		}

		const tabsBodyStyles = {
			paddingTop: '20%',
			textAlign: 'center'
		}

		return (
			<div>
				<div style={tabsHeaderStyles} >
					{this.props.tabs.map( (tab, index) => {
						return (
								<div 
									className="tabs-header__item" 
									style={tabsHeaderItemStyles}
									onClick={ () => this.props.changeTab(index) }
									children={tab.title}
									key={tab.title}
								/>
							)
					})}
				</div>
				<div style={tabsBodyStyles}>
					{this.props.tabs[this.props.activeTab].component}
				</div>
			</div>	
		)
	}
}

export default Tabs
					// {this.props.tabs.map( (tab, index) => {
					// 	return (
					// 		<div 
					// 			className='tabs-body__item' 
					// 			hidden={this.props.activeTab !== index}
					// 			children={tab.component}
					// 			key={tab.title} 
					// 		/> 
					// 	)
					// })}
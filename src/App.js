import React, { Component } from 'react';
import Controls from './Controls'
import Tabs from './Tabs'
import Gallery from './Gallery'

class App extends Component {
  state = {
    activeTab: 0
  }

  render() {
    const { state } = this;
    const tabs = [
      {
        title: 'Controls',
        component: <Controls />
      },
      {
        title: 'Gallery',
        component: <Gallery />
      }
    ]

    return (
      <div className="App">
        <Tabs
          activeTab={state.activeTab}
          tabs={tabs}
          changeTab={ activeTab => this.setState({ activeTab }) }
        />
      </div>
    );
  }
}

export default App;

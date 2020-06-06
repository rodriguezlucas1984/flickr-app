import React, {Component} from 'react';
import {ButtonGroup, Text} from 'react-native-elements';

class KeyPad extends Component {
  constructor() {
    super();
    this.state = {
      selectedIndex: 1,
    };
    this.updateIndex = this.updateIndex.bind(this);
  }

  updateIndex(selectedIndex) {
    // mis acciones
    this.props.onOrder(selectedIndex === 1 ? 'asc' : 'desc');
    this.setState({selectedIndex});
  }

  render() {
    const buttons = this.props.labels;
    const {selectedIndex} = this.state;

    return (
      <ButtonGroup
        onPress={this.updateIndex}
        selectedIndex={selectedIndex}
        buttons={buttons}
        disabled={[0]}
        containerStyle={{height: 30}}
      />
    );
  }
}

export default KeyPad;

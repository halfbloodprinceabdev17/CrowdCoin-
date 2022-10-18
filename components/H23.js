import React, { Component } from 'react'
import { Menu, Segment } from 'semantic-ui-react'

export default class MenuExampleInvertedSecondary extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
       <Segment inverted>
        <Menu inverted pointing primary>
          <Menu.Item
          name ='CrowdCoin'/> 
          <Menu.Menu position='right'>
          <Menu.Item
            name='Fuck'
            active={activeItem === 'Fuck'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='ADD'
            active={activeItem === 'ADD'}
            onClick={this.handleItemClick}
          />
          </Menu.Menu>
        </Menu>
        </Segment>
    )
  }
}
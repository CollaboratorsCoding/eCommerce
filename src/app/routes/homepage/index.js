import React from 'react';
import Page from '../../components/page';
import { Button, Icon, Label } from 'semantic-ui-react';

import logo from '../../assets/logo.jpg';

export default () => (
  <Page id="homepage">
    <p>Here's our homepage. All are welcome. www</p>
    <div>
      <Button as="div" labelPosition="right">
        <Button color="red">
          <Icon name="heart" />
          Like
        </Button>
        <Label as="a" basic color="red" pointing="left">
          2,048
        </Label>
      </Button>
      <Button as="div" labelPosition="right">
        <Button basic color="blue">
          <Icon name="fork" />
          Fork
        </Button>
        <Label as="a" basic color="blue" pointing="left">
          2,048
        </Label>
      </Button>
    </div>

    <img src={logo} alt="Homepage" style={{ width: '400px' }} />
  </Page>
);

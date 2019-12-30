import React, { useState } from 'react';
import { Menu } from 'semantic-ui-react';

import { APP_SECTIONS } from '../appData';

const Header = props => {
  const [activeSection, setActiveSection] = useState(APP_SECTIONS[0]);

  return (
    <Menu pointing secondary>
      {APP_SECTIONS.map(sectionName => {
        return (
          <Menu.Item
            name={sectionName}
            key={sectionName}
            active={activeSection === sectionName}
            onClick={() => setActiveSection(sectionName)}
          />
        )
      })}
    </Menu>
  )
}

export default Header;

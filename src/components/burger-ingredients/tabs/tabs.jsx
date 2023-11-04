import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './tabs.module.css';

import { COMPONENT_TABS } from '../../../utils/data.js';

export default function Tabs() {
  const [activeTab, setCurrentTab] = React.useState(COMPONENT_TABS[0].type);
  return (
    <div className={`${styles.tabs} mt-5 mb-10`}>
      {COMPONENT_TABS.map((tabItem) => (
        <Tab key={tabItem.type} value={tabItem.type} active={activeTab === tabItem.type} onClick={setCurrentTab}>
          {tabItem.text}
        </Tab>
      ))}
    </div>
  );
}

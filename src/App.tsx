import React  from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonIcon, IonItem, IonLabel, IonRoute, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, setupIonicReact, useIonModal } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Tab1 from './page/Tab1';
import Tab2 from './page/Tab2';
import { addCircleOutline, cashOutline, layersOutline, settingsOutline, trendingUpOutline } from 'ionicons/icons';
import Tools from './page/tools/tools';
import Add from './page/add/add';
import Diagrams from './page/diagrams/diagrams';

setupIonicReact();

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/tab1">
              <Tab1 />
            </Route>
            <Route exact path="/diagrams">
              <Diagrams />
            </Route>
            <Route path="/tab2">
              <Tab2 />
            </Route>
            <Route path="/add">
              <Add />
            </Route>
            <Route path='/tools'><Tools /></Route>
            <Route exact path="/">
              <Redirect to="/tab1" />
            </Route>
          </IonRouterOutlet>
          
          <IonTabBar slot="bottom">
            <IonTabButton tab="tab1" href="/tab1">
              <IonIcon aria-hidden="true" icon={layersOutline} />
              <IonLabel>actions</IonLabel>
            </IonTabButton>
            <IonTabButton tab="diagrams" href="/diagrams">
              <IonIcon aria-hidden="true" icon={trendingUpOutline} />
              <IonLabel>diagrams</IonLabel>
            </IonTabButton>
            <IonTabButton tab="add" href='/add'>
            <IonIcon aria-hidden="true" icon={addCircleOutline} size='large' />
            </IonTabButton>
            <IonTabButton tab="tools" href="/tools">
              <IonIcon aria-hidden="true" icon={cashOutline} />
              <IonLabel>tools</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab2" href="/tab2">
              <IonIcon aria-hidden="true" icon={settingsOutline} />
              <IonLabel>settings</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  )
};

export default App;

import { IonPage, IonRouterOutlet, IonRow, IonText, IonTitle, IonToolbar, useIonModal } from '@ionic/react';
import React from 'react';
import ToolItem from './toolItem';
import ToolList from './toolsList';
import { Redirect, Route, Switch } from 'react-router-dom';


const Tools: React.FC = () => {
  return (
    <IonPage>
      <IonRouterOutlet>
        <Route path="/tools/:id" component={ToolItem} />
        <Route path="/tools/list"><ToolList/></Route>
        <Route exact path="/tools"><Redirect to="/tools/list" /></Route>
      </IonRouterOutlet>

    </IonPage>
  );
}

export default Tools;

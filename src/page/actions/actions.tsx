import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonItemDivider, IonItemGroup, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonPage, IonRefresher, IonRefresherContent, IonTitle, IonToolbar, RefresherEventDetail } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import GetActionList from '../../operation/action/getList';
import { Action } from '../../entity/action';
import { chevronBack, chevronForward } from 'ionicons/icons';

interface Period {
  name: string;
  from: Date;
  to: Date;
}

const periods: Period[] = [
  {
    name: '11.2023',
    from: new Date('2023-11-01'),
    to: new Date('2023-12-01'),
  },
  {
    name: '12.2023',
    from: new Date('2023-12-01'),
    to: new Date('2024-01-01'),
  },
];

const Actions: React.FC = () => {
  let [actionsByDate, setActions] = useState<Map<Date, Array<Action>> | undefined>(undefined);
  const refreshActions = () => { (async () => matchActionByDate(await GetActionList({
    dateFrom: periods[periodIndex].from,
    dateTo: periods[periodIndex].to,
  })))() };
  let [periodIndex, setPeriodIndex] = useState(periods.length - 1);

  useEffect(() => {
    if (actionsByDate === undefined) {
      refreshActions();
    }
  })

  const matchActionByDate = (actionsList: Action[]): void => {
    let actionMap: Map<Date, Array<Action>> = new Map();
    actionsList.map((action: Action) => {
      if (!actionMap.has(action.date)) {
        actionMap.set(action.date, []);
      }
      actionMap.get(action.date)?.push(action);
    });
    setActions(actionMap);
  }

  const handleRefresh = (event: CustomEvent<RefresherEventDetail>) => {
    refreshActions();
    event.detail.complete();
  }

  const changePeriod = (i: number): void => {
    setPeriodIndex(periodIndex + i);
    setActions(undefined);
  }

  console.log(actionsByDate);
  console.log((Array.from(actionsByDate ?? [])));
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton shape="round" disabled={periodIndex === 0} 
            onClick={() => changePeriod(-1)}>
            <IonIcon slot="icon-only" icon={chevronBack}></IonIcon>
            </IonButton>
            {periods[periodIndex].name}
            <IonButton shape="round" disabled={(periodIndex+1) === periods.length}
            onClick={() => changePeriod(1)}>
            <IonIcon slot="icon-only" icon={chevronForward}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
      <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        {Array.from(actionsByDate ?? []).map((item: [Date, Action[]]) =>
          <IonItemGroup>
            <IonItemDivider>
              <IonLabel>{item[0].toString()}</IonLabel>
            </IonItemDivider>
            {item[1].map((action: Action) =>
              <IonItemSliding>
                <IonItem>
                  <IonLabel>{action.operation} {action.tool.name} {action.sum}</IonLabel>
                </IonItem>
                <IonItemOptions>
                  <IonItemOption>ok</IonItemOption>
                </IonItemOptions>
              </IonItemSliding>
            )}
          </IonItemGroup>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Actions

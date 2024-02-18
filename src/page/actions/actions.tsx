import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonItemDivider, IonItemGroup, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonPage, IonRefresher, IonRefresherContent, IonTitle, IonToolbar, RefresherEventDetail } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import GetActionList from '../../operation/action/getList';
import { Action } from '../../entity/action';
import { chevronBack, chevronForward } from 'ionicons/icons';
import ActionItemView from '../../component/actions/actionItemView';

interface Period {
  name: string;
  from: Date;
  to: Date;
}

const Actions: React.FC = () => {
  let [actionsByDate, setActions] = useState<Map<Date, Array<Action>> | undefined>(undefined);
  let [periods, setPeriods] = useState([] as Period[]);
  const [periodIndex, setPeriodIndex] = useState(periods.length - 1);

  const refreshActions = (period: Period) => {
    (async () => matchActionByDate(await GetActionList({
      dateFrom: period.from,
      dateTo: period.to,
    })))()
  };

  useEffect(() => {
    (async () => {
      if (periods.length === 0) {
        const now = new Date();
        const minItem = await GetActionList({dateOrder: 'ASC', take: 1});
        let minDate = new Date(minItem[0] ? minItem[0].date : '');
        minDate.setDate(1);
        const maxItem = await GetActionList({dateOrder: 'DESC', take: 1});
        const maxDate = new Date(maxItem[0] ? maxItem[0].date : '');
        // Собрать прериоды из минимальной и максимальной даты.
        let curretnIndex:number = 0;
        periods = [];
        while (minDate <= maxDate) {
          periods.push({
            name: ('00' + (minDate.getMonth()+1)).slice(-2) + '.' + minDate.getFullYear(), 
            from: new Date(minDate), 
            to: new Date(minDate.getFullYear(), minDate.getMonth()+1, 0),
          });
          minDate.setMonth(minDate.getMonth() + 1);
          if (
            minDate.getFullYear() < now.getFullYear() ||
            (minDate.getMonth() <= now.getMonth() && minDate.getFullYear() == now.getFullYear())){
            curretnIndex++;
          }
        }
        setPeriods(periods);
        setPeriodIndex(curretnIndex);
        // refreshActions(periods[periods.length - 1]);
      }
    })();
    if (periods.length >0 && actionsByDate === undefined) {
      refreshActions(periods[periodIndex]);
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
    setActions(undefined);
    event.detail.complete();
  }

  const changePeriod = (i: number): void => {
    setPeriodIndex(periodIndex + i);
    setActions(undefined);
  }

  // console.log(periods);
  // console.log(actionsByDate);
  // console.log((Array.from(actionsByDate ?? [])));
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton shape="round" disabled={periodIndex === 0}
              onClick={() => changePeriod(-1)}>
              <IonIcon slot="icon-only" icon={chevronBack}></IonIcon>
            </IonButton>
            {periods[periodIndex]?.name}
            <IonButton shape="round" disabled={(periodIndex + 1) === periods.length}
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
                <ActionItemView action={action} />
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

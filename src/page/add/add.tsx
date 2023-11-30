import { IonButton, IonButtons, IonContent, IonHeader, IonPage, IonRouterOutlet, IonRow, IonText, IonTitle, IonToolbar, useIonModal } from '@ionic/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Redirect, Route, Switch } from 'react-router-dom';


const Add: React.FC = () => {
  const { handleSubmit, control, setValue, register, formState: { errors } } = useForm({
    // resolver: yupResolver(ToolSchema),
    defaultValues: {}
  });

  const onSubmit = (data: any) => {
    if (!data.id) {
      data.prevSum = data.currentSum;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton color="danger" disabled >
                Remove
              </IonButton>
            </IonButtons>
            <IonButtons slot="end">
              <IonButton type="submit" strong={true}>
                Add
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
sdgfgsd
        </IonContent>
      </IonPage>
    </form>
  );
}

export default Add;

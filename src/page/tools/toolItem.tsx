import { IonBackButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../../component/ExploreContainer';
import React from 'react';
import { useParams } from 'react-router';

interface ToolItemParams {
  id: string;
};

const ToolItem: React.FC = () => {
  const params: ToolItemParams = useParams();
  console.log(params);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tools"></IonBackButton>
          </IonButtons>
          <IonTitle>{params.id}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Card Title</IonCardTitle>
            <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
          </IonCardHeader>

          <IonCardContent>Here's a small text description for the card content. Nothing more, nothing less.</IonCardContent>
        </IonCard>

        <IonCard>
          <img alt="Silhouette of mountains" src="https://quickchart.io/chart?c=%7B%0A%20%20type%3A%20%27line%27%2C%0A%20%20data%3A%20%7B%0A%20%20%20%20labels%3A%20%5B1%2C2%2C3%2C4%2C5%5D%2C%0A%20%20%20%20datasets%3A%20%5B%7B%0A%20%20%20%20%20%20label%3A%20%27Rainfall%27%2C%0A%20%20%20%20%20%20data%3A%20%5B%20200%2C%2090%2C%20120%2C%20400%2C%20500%20%5D%2C%0A%20%20%20%20%20%20fill%3A%20false%2C%0A%20%20%20%20%20%20borderColor%3A%20%27green%27%2C%0A%20%20%20%20%20%20backgroundColor%3A%20%27green%27%2C%0A%20%20%20%20%7D%5D%0A%20%20%7D%2C%0A%20%20options%3A%20%7B%0A%20%20%20%20plugins%3A%20%7B%0A%20%20%20%20%20%20datalabels%3A%20%7B%0A%20%20%20%20%20%20%20%20display%3A%20true%2C%0A%20%20%20%20%20%20%20%20align%3A%20%27bottom%27%2C%0A%20%20%20%20%20%20%20%20backgroundColor%3A%20%27%23ccc%27%2C%0A%20%20%20%20%20%20%20%20borderRadius%3A%203%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D&v=2.9.4&w=500&h=300&bkg=white" />
        </IonCard>

      </IonContent>
    </IonPage>
  );
};

export default ToolItem;

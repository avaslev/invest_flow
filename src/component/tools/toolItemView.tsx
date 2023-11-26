import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonIcon, IonRippleEffect, IonText } from "@ionic/react";
import { Tool } from "../../entity/tool";
import { caretUpOutline } from "ionicons/icons";
import React from "react";


interface ContainerProps {
    tool: Tool;
  }

const ToolItemView: React.FC<ContainerProps> = ({ tool }) => {
    return (
        <IonCard
        color={tool.id == 'total' ? "tertiary" : undefined}
        className="ion-activatable ripple-parent"
        routerLink={'/tools/' + tool.id}
      >
        <IonCardHeader>
          <IonCardTitle>{tool.name}</IonCardTitle>
          <IonCardSubtitle>
            {tool.currentSum}
            <IonText color="success" style={{ paddingLeft: 2 }}>
              <sub><IonIcon aria-hidden="true" icon={caretUpOutline} /> 0%</sub></IonText>
          </IonCardSubtitle>
        </IonCardHeader>
        <IonRippleEffect></IonRippleEffect>
      </IonCard>
    );
}
export default ToolItemView;
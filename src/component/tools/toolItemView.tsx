import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonIcon, IonRippleEffect, IonText } from "@ionic/react";
import { Tool } from "../../entity/tool";
import { caretUpOutline } from "ionicons/icons";
import React from "react";
import { SumTool } from "../../operation/tool/getSumByTool";


interface ContainerProps {
  toolItem: ToolListItem;
}

export interface ToolListItem {
  tool: Tool,
  total?: SumTool,
  lastPeriod?: SumTool,
}

const ToolItemView: React.FC<ContainerProps> = ({ toolItem }) => {

  function getSum(sumTool: SumTool): number
  {
    return sumTool.in + sumTool.transmitIn - sumTool.out - sumTool.transmitOut;
  }
    return (
        <IonCard
        color={toolItem.tool.id == 'total' ? "tertiary" : undefined}
        className="ion-activatable ripple-parent"
        routerLink={'/tools/' + toolItem.tool.id}
      >
        <IonCardHeader>
          <IonCardTitle>{toolItem.tool.name}</IonCardTitle>
          <IonCardSubtitle>
            {(toolItem.total ? getSum(toolItem.total) : 0).toLocaleString("ru-RU", {style:"currency", currency:"RUB"})}
            <IonText color="success" style={{ paddingLeft: 2 }}>
              <sub><IonIcon aria-hidden="true" icon={caretUpOutline} /> 0%</sub></IonText>
          </IonCardSubtitle>
        </IonCardHeader>
        <IonRippleEffect></IonRippleEffect>
      </IonCard>
    );
}
export default ToolItemView;
import { IonButton, IonButtons, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonPage, IonRippleEffect, IonRouterOutlet, IonRow, IonText, IonTitle, IonToolbar, useIonModal } from '@ionic/react';
import { add, caretUpOutline, ellipsisHorizontal } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { OverlayEventDetail } from '@ionic/core/components';
import ToolEditModal, { ToolEditActionEnum } from '../../component/tools/toolEdit';
import GetToolList from '../../operations/tool/getToolList';
import SaveTool from '../../operations/tool/saveTool';
import { Tool, ToolTypeEnum } from '../../entity/tool';
import ToolItemView from '../../component/tools/toolItemView';


const ToolList: React.FC = () => {
  let [tools, setTools] = useState([] as Tool[]);
  const [present, dismiss] = useIonModal(ToolEditModal, {
    onDismiss: (data: string, role: string) => dismiss(data, role),
    tool: {
      name: '',
      isUser: true,
      isArhive: false,
      type: ToolTypeEnum.Cash,
      currentSum: 0,
      prevSum: 0,
    }
  });
  let totalTool = {
    id: 'total',
    name: 'Total',
    isUser: true,
    isArhive: false,
    type: ToolTypeEnum.Cash,
    currentSum: 0,
    prevSum: 0,
  } as Tool;

  useEffect(() => {
    (async () => {
      const toolList = await GetToolList({ isUser: true, isArhive: false });
      if (tools.length == 0 && toolList.length > 0) setTools(toolList);
    })();
  })

  function openModal() {
    present({
      onWillDismiss: (ev: CustomEvent<OverlayEventDetail>) => {
        if (ev.detail.role === ToolEditActionEnum.Save) {
          let tool: Tool = (new Tool()).fill(ev.detail.data);
          SaveTool(tool);
          tools.push(tool);
          setTools(tools);
        }
      },
    });
  }

  (function () {
    tools.forEach((value,) => {
      totalTool.currentSum = (value.currentSum ?? 0) + (totalTool.currentSum ?? 0);
      totalTool.prevSum = (value.prevSum ?? 0) + (totalTool.prevSum ?? 0);
    })
  })();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="primary">
            <IonButton onClick={() => openModal()}>
              <IonIcon slot="icon-only" ios={ellipsisHorizontal} md={add} />
            </IonButton>
          </IonButtons>
          <IonTitle>Tools</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid>
          <IonRow>
            {tools.length > 1 ?
              <IonCol size="6" size-md="4" size-lg="3" key={'total'}>
                <ToolItemView tool={totalTool}/>
              </IonCol> : ''
            }
            {tools.map((toolItem,) =>
              <IonCol size="6" size-md="4" size-lg="3" key={toolItem.id}>
                <ToolItemView tool={toolItem}/>
              </IonCol>
            )}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
}

export default ToolList;

import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonPage, IonRippleEffect, IonRow, IonText, IonTitle, IonToolbar, useIonModal } from '@ionic/react';
import { add, ellipsisHorizontal } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { OverlayEventDetail } from '@ionic/core/components';
import ToolEditModal, { ToolEditActionEnum } from '../../component/tools/toolEdit';
import GetToolList from '../../operations/tool/getToolList';
import SaveTool from '../../operations/tool/saveTool';
import { Tool, ToolTypeEnum } from '../../entity/tool';


const Tools: React.FC = () => {
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
    name: 'Total',
    isUser: true,
    isArhive: false,
    type: ToolTypeEnum.Cash,
    currentSum: 0,
    prevSum: 0,
  };

  useEffect(() => {
    (async () => {
      const toolList = await GetToolList({isUser: true, isArhive: false});
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

  (function (){
    tools.forEach((value,) => {
      totalTool.currentSum += value.currentSum ?? 0;
      totalTool.prevSum += value.prevSum ?? 0;
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
                <IonButton expand='block' className='ion-text-wrap' style={{ textTransform: 'none' }}>
                  <h4>Total</h4>
                </IonButton>
              </IonCol> : ''
            }
            {tools.map((toolItem,) =>
              <IonCol size="6" size-md="4" size-lg="3"  key={toolItem.id}>
                <IonButton expand='block' color='light' className='ion-text-wrap' style={{ textTransform: 'none' }}>
                  <h4>{toolItem.name}</h4>
                </IonButton>
              </IonCol>
            )}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
}

export default Tools;

import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonPage, IonRippleEffect, IonRow, IonText, IonTitle, IonToolbar, useIonModal } from '@ionic/react';
import { add, ellipsisHorizontal } from 'ionicons/icons';
import { useState } from 'react';
import { OverlayEventDetail } from '@ionic/core/components';
import ToolEditModal, { ToolEditActionEnum } from '../../components/tools/toolEdit';
import { ToolTypeEnum } from '../../models';
import GetToolList from '../../operations/tool/getToolList';
import SaveTool from '../../operations/tool/saveTool';

const tools = GetToolList();

const Tools: React.FC = () => {
  const [state, setState] = useState({ tools: tools });
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

  function openModal() {
    present({
      onWillDismiss: (ev: CustomEvent<OverlayEventDetail>) => {
        if (ev.detail.role === ToolEditActionEnum.Save) {
          let tool = ev.detail.data;
          tool.id = SaveTool(tool);
          state.tools.push(tool);
          setState(state);
        }
      },
    });
  }

  (function (){
    state.tools.forEach((value,) => {
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
            {state.tools.length > 1 ?
              <IonCol size="6" size-md="4" size-lg="3" key={'total'}>
                <IonButton expand='block' className='ion-text-wrap' style={{ textTransform: 'none' }}>
                  <h4>Total</h4>
                </IonButton>
              </IonCol> : ''
            }
            {state.tools.map((toolItem,) =>
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

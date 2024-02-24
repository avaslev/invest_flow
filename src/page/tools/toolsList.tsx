import { IonButton, IonButtons, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonPage, IonRefresher, IonRefresherContent, IonRippleEffect, IonRouterOutlet, IonRow, IonText, IonTitle, IonToolbar, useIonModal, RefresherEventDetail } from '@ionic/react';
import { add, caretUpOutline, ellipsisHorizontal } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { OverlayEventDetail } from '@ionic/core/components';
import ToolEditModal, { ToolEditActionEnum } from '../../component/tools/toolEdit';
import GetToolList from '../../operation/tool/getToolList';
import SaveTool from '../../operation/tool/saveTool';
import { Tool, ToolTypeEnum } from '../../entity/tool';
import ToolItemView, { ToolListItem } from '../../component/tools/toolItemView';
import GetSumByTool, { SumTool } from '../../operation/tool/getSumByTool';


const ToolList: React.FC = () => {
  let [toolList, setToolList] = useState([] as ToolListItem[]);
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
  let totalToolListItem = {
    tool: {
      id: 'total',
      name: 'Total',
      isUser: true,
      isArhive: false,
      type: ToolTypeEnum.Cash,
      currentSum: 0,
      prevSum: 0,
    }
  } as ToolListItem;

  useEffect(() => {
    (async () => {
      let newToolList:ToolListItem[] = [];
      const tools = await GetToolList({ isUser: true, isArhive: false });
      tools.forEach(async (value,) => {
        newToolList.push({
          tool: value,
          total: await GetSumByTool({tool: value})
        });
      })
      console.log(newToolList);
      if (toolList.length == 0 && tools.length > 0) setToolList(newToolList);
    })();
  })

  function openModal() {
    present({
      onWillDismiss: (ev: CustomEvent<OverlayEventDetail>) => {
        if (ev.detail.role === ToolEditActionEnum.Save) {
          let tool: Tool = (new Tool()).fill(ev.detail.data);
          SaveTool(tool);
          toolList.push({tool: tool});
          setToolList(toolList);
        }
      },
    });
  }

  const handleRefresh = (event: CustomEvent<RefresherEventDetail>) => {
    setToolList([]);
    event.detail.complete();
  }

  (function () {
    toolList.forEach((value,) => {
      totalToolListItem.total = totalToolListItem.total ?? {in: 0, out: 0, transmitIn: 0, transmitOut: 0} as SumTool;
      value.total = value.total ?? {} as SumTool;
      totalToolListItem.total.in += value.total.in ?? 0;
      totalToolListItem.total.out += value.total.out ?? 0;
      totalToolListItem.total.transmitIn += value.total.transmitIn ?? 0;
      totalToolListItem.total.transmitOut += value.total.transmitOut ?? 0;
    })
    console.log(totalToolListItem);
  })();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="primary">
            <IonButton onClick={() => openModal()}>
              <IonIcon slot="icon-only" icon={add} />
            </IonButton>
          </IonButtons>
          <IonTitle>Tools</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <IonGrid>
          <IonRow>
            {toolList.length > 1 ?
              <IonCol size="6" size-md="4" size-lg="3" key={'total'}>
                <ToolItemView toolItem={totalToolListItem}/>
              </IonCol> : ''
            }
            {toolList.map((toolItem,) =>
              <IonCol size="6" size-md="4" size-lg="3" key={toolItem.tool.id}>
                <ToolItemView toolItem={toolItem}/>
              </IonCol>
            )}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
}

export default ToolList;

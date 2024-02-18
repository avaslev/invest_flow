import React from 'react';
import { IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonSelect, IonSelectOption, IonText, IonThumbnail, IonTitle, IonToggle, IonToolbar } from '@ionic/react';
import { Controller, useForm } from 'react-hook-form';
// import { yupResolver } from "@hookform/resolvers/yup"
import { Tool, ToolTypeEnum } from '../../entity/tool';
import { Action, ActionOperationEnum } from '../../entity/action';
// import { Tool, ToolSchema, ToolTypeEnum } from '../../model/Tool';
import arrow from '../../img/wallet-arrow-right.svg';
import plus from '../../img/wallet-plus.svg';
import minus from '../../img/wallet-minus.svg';


interface ContainerProps {
  action: Action;
}

const ActionItemView: React.FC<ContainerProps> = ({ action }) => {

  let color = '';
  let image = arrow;
  if (action.operation === ActionOperationEnum.Income) {
    color = 'success';
    image = plus;
  }
  if (action.operation === ActionOperationEnum.Outlay) {
    color = 'danger';
    image = minus;
  }

  return (
    <IonItem lines='none'>
      <IonThumbnail slot="start" style={{'--size': '40px'}}><img src={image} /></IonThumbnail>
      <IonLabel>
        <IonText>{action.category}</IonText>
        <IonText color="medium">{' '+action.note}</IonText><br/>
        <IonText color="medium">{action.tool.name}{action.toolTo ? ' -> ' + action.toolTo.name : ''}</IonText>
      </IonLabel>
      <IonLabel slot='end' color={color}>{action.sum.toLocaleString("ru-RU", {style:"currency", currency:"RUB"})}</IonLabel>
    </IonItem>
  );
}
export default ActionItemView;
import React from 'react';
import { IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonSelect, IonSelectOption, IonText, IonTitle, IonToggle, IonToolbar } from '@ionic/react';
import { Controller, useForm } from 'react-hook-form';
// import { yupResolver } from "@hookform/resolvers/yup"
import { Tool, ToolTypeEnum } from '../../entity/tool';
// import { Tool, ToolSchema, ToolTypeEnum } from '../../model/Tool';


export enum ToolEditActionEnum {
  Cancel = 'cancel',
  Save = 'save',
  Delete = 'delete',
}

export interface ToolEditModalProp {
  onDismiss: (data?: Tool | null, role?: string) => void;
  tool: Tool
}

const ToolEditModal = (prop: ToolEditModalProp) => {
  const {handleSubmit,control,setValue,register,formState: { errors }} = useForm({
    // resolver: yupResolver(ToolSchema),
    defaultValues: prop.tool
  });

  console.log(prop);

  function capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const onSubmit = (data: Tool) => {
    if (!data.id) {
      data.prevSum = data.currentSum;
    }
    prop.onDismiss(data, ToolEditActionEnum.Save)
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton color="medium" onClick={() => prop.onDismiss(null, ToolEditActionEnum.Cancel)}>
              Cancel
            </IonButton>
          </IonButtons>
          <IonButtons slot="end">
            <IonButton type="submit" strong={true}>
              Save
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonSelect
            // label="Type"
            // labelPlacement="stacked"
            disabled={prop.tool.id ? true : false}
            {...register('type')}
          >
            {[ToolTypeEnum.Cash].map((type) => <IonSelectOption key={type} value={type}>
              {capitalizeFirstLetter(type)}
            </IonSelectOption>)}
          </IonSelect>
        </IonItem>
        <IonItem>
            <IonInput
            className={errors.name && 'ion-invalid ion-touched'}
            // labelPlacement="stacked"
            // label="Name"
            // errorText={errors.name?.message}
            {...register('name')}
          />
        </IonItem>
        <IonItem>
          <IonInput
            className={errors.currentSum && 'ion-invalid ion-touched'}
            // labelPlacement="stacked"
            // label="Current sum"
            type='number'
            // errorText={errors.currentSum?.message}
            disabled={prop.tool.id ? true : false}
            {...register('currentSum')}
          />
        </IonItem>
          {/* @see https://www.webune.com/forums/aapypz.html */}
          <IonItem>
            <IonLabel>archive</IonLabel>
            <Controller
              name="isArhive"
              control={control}
              render={({ field }) => {
                return (
                  <IonToggle
                    checked={field.value}
                    onIonChange={e => {
                      setValue('isArhive', e.detail.checked);
                    }}
                  />
                );
              }}
            />
          </IonItem>
      </IonContent>
    </IonPage>
    </form>
  );
};

export default ToolEditModal;

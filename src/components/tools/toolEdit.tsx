import { IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonPage, IonSelect, IonSelectOption, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { Tool, ToolSchema, ToolTypeEnum } from '../../models';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"


export enum ToolEditActionEnum {
  Cancel = 'cancel',
  Save = 'save'
}

const ToolEditModal = ({
  onDismiss,
  tool,
}: {
  onDismiss: (data?: Tool | null, role?: string) => void;
  tool: Tool
}) => {
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(ToolSchema),
    defaultValues: tool
  });

  function capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const onSubmit = (data: Tool) => {
    if (!data.id) {
      data.prevSum = data.currentSum;
    }
    onDismiss(data, ToolEditActionEnum.Save)
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton color="medium" onClick={() => onDismiss(null, ToolEditActionEnum.Cancel)}>
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

            label="Type"
            labelPlacement="stacked"
            disabled={tool.id ? true : false}
            {...register('type')}
          >
            {[ToolTypeEnum.Cash].map((type) => <IonSelectOption value={type}>
              {capitalizeFirstLetter(type)}
            </IonSelectOption>)}
          </IonSelect>
        </IonItem>
        <IonItem>
            <IonInput
            className={errors.name && 'ion-invalid ion-touched'}
            labelPlacement="stacked"
            label="Name"
            errorText={errors.name?.message}
            {...register('name')}
          />
        </IonItem>
        <IonItem>
          <IonInput
            className={errors.currentSum && 'ion-invalid ion-touched'}
            labelPlacement="stacked"
            label="Current sum"
            type='number'
            errorText={errors.currentSum?.message}
            disabled={tool.id ? true : false}
            {...register('currentSum')}
          />
        </IonItem>
      </IonContent>
    </IonPage>
    </form>
  );
};

export default ToolEditModal;

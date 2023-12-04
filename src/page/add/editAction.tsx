import { IonBackButton, IonButton, IonButtons, IonContent, IonDatetime, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonModal, IonPage, IonRouterOutlet, IonRow, IonSelect, IonSelectOption, IonText, IonTextarea, IonTitle, IonToolbar, useIonModal } from '@ionic/react';
import React, { ReactNode, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Action, ActionOperationEnum } from '../../entity/action';
import GetToolList from '../../operation/tool/getToolList';
import { Tool } from '../../entity/tool';
import SaveAction from '../../operation/action/save';

enum ModeEditActionEnum {
  Income = 'income',
  Outlay = 'outlay',
  Transmit = 'transmit',
  Bay = 'bay',
  Sell = 'sell',
}

interface ModeEditAction {
  name: ModeEditActionEnum;
  color: string;
}

const modeEditActionList: ModeEditAction[] = [
  {
    name: ModeEditActionEnum.Income,
    color: 'secondary',
  },
  {
    name: ModeEditActionEnum.Outlay,
    color: 'danger',
  },
  {
    name: ModeEditActionEnum.Transmit,
    color: 'medium',
  },
  {
    name: ModeEditActionEnum.Bay,
    color: 'primary',
  },
  {
    name: ModeEditActionEnum.Sell,
    color: 'primary',
  },
];

const EditAction: React.FC = () => {
  let [tools, setTools] = useState([] as Tool[]);
  let [mode, setMode] = useState(ModeEditActionEnum.Outlay);
  const [action, setAction] = useState(new Action());
  const { handleSubmit, control, setValue, register, formState: { errors } } = useForm({
    // resolver: yupResolver(ToolSchema),
    defaultValues: action,
  });

  const onSubmit = (data: any) => {
    let action: Action = (new Action()).fill(data);
    SaveAction(action);
    console.debug(data);
  };

  if (action.operation === undefined) {
    action.operation = ActionOperationEnum.Income;
    if (![ModeEditActionEnum.Outlay, ModeEditActionEnum.Bay].includes(mode)) {
      action.operation = ActionOperationEnum.Outlay;
    }
  }

  useEffect(() => {
    (async () => {
      const toolList = await GetToolList({ isUser: true, isArhive: false });
      if (tools.length == 0 && toolList.length > 0) setTools(toolList);
    })();
  })

  const getToolTo = (mode: ModeEditActionEnum): ReactNode | null => {
    if (![ModeEditActionEnum.Bay, ModeEditActionEnum.Sell, ModeEditActionEnum.Transmit].includes(mode)) {
      return null;
    }
    return <IonItem>
        <IonSelect
          label='ToolTo'
          disabled={action.id ? true : false}
          {...register('toolTo')}
        >
          {tools.map((item) => <IonSelectOption key={item.id} value={item}>
            {item.name}</IonSelectOption>)}
        </IonSelect>
      </IonItem>;
  }

  const getCount = (mode: ModeEditActionEnum): ReactNode | null => {
    if (![ModeEditActionEnum.Bay, ModeEditActionEnum.Sell].includes(mode)) {
      return null;
    }
    return <IonItem>
        <IonInput
          // className={errors.name && 'ion-invalid ion-touched'}
          // labelPlacement="stacked"
          label="Count"
          // errorText={errors.name?.message}
          {...register('count')}
        />
      </IonItem>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="" ></IonBackButton>
            </IonButtons>
            <IonButtons slot="end">
              <IonButton type="submit" strong={true}>
                Save
              </IonButton>
            </IonButtons>
            <IonTitle></IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonItem>
            <IonToolbar className="ion-text-center">
              {modeEditActionList.map((item: ModeEditAction) =>
                <IonButton disabled={item.name === mode} color={item.color}
                  key={'mode_'+item.name}
                  onClick={() => setMode(item.name)}>
                  {item.name}</IonButton>)}
            </IonToolbar>
          </IonItem>
          <IonItem>
            <IonInput
              // className={errors.name && 'ion-invalid ion-touched'}
              // labelPlacement="stacked"
              type='date'
              label="Date"
              // errorText={errors.name?.message}
              {...register('date')}
            />
          </IonItem>
          <IonItem>
            <IonSelect
              label='Tool'
              {...register('tool')}
            >
              {tools.map((item) => <IonSelectOption key={item.id} value={item}>
                {item.name}</IonSelectOption>)}
            </IonSelect>
          </IonItem>
          {getToolTo(mode)}
          {getCount(mode)}
          <IonItem>
            <IonInput
              // className={errors.name && 'ion-invalid ion-touched'}
              // labelPlacement="stacked"
              label="Sum"
              // errorText={errors.name?.message}
              {...register('sum')}
            />
          </IonItem>
          <IonItem>
            <IonInput
              // className={errors.name && 'ion-invalid ion-touched'}
              // labelPlacement="stacked"
              label="Category"
              // errorText={errors.name?.message}
              {...register('category')}
            />
          </IonItem>
          <IonItem>
            <IonTextarea
              // className={errors.name && 'ion-invalid ion-touched'}
              // labelPlacement="stacked"
              label="Note"
              // errorText={errors.name?.message}
              {...register('note')}
            />
          </IonItem>
        </IonContent>
      </IonPage >
    </form>
  );
}

export default EditAction;

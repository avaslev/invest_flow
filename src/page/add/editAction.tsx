import { IonAvatar, IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonModal, IonPage, IonRouterOutlet, IonRow, IonSelect, IonSelectOption, IonText, IonTextarea, IonTitle, IonToast, IonToolbar, useIonModal } from '@ionic/react';
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Action, ActionOperationEnum } from '../../entity/action';
import GetToolList from '../../operation/tool/getToolList';
import { Tool } from '../../entity/tool';
import SaveAction from '../../operation/action/save';
import GetActionCategoryList, { ActionCategory } from '../../operation/action/getCategoryList';

interface ModalProps {
  name: string;
  addItem?: boolean;
  items: string[];
}

const modeEditActionList: ActionOperationEnum[] = [
  ActionOperationEnum.Income,
  ActionOperationEnum.Outlay,
  ActionOperationEnum.Transmit,
];

const makeDummyAction = (): Action => {
  return (new Action()).fill({
    operation: ActionOperationEnum.Outlay,
    date: new Date(),
  })
}

const EditAction: React.FC = () => {
  const [isToastOpen, setIsToastOpen] = useState(false);
  let [tools, setTools] = useState([] as Tool[]);
  let [categories, setCategories] = useState([] as ActionCategory[]);
  const [action, setAction] = useState(makeDummyAction());
  const { handleSubmit, reset, setValue, register, formState: { errors } } = useForm({
    // resolver: yupResolver(ToolSchema),
    defaultValues: action,
  });

  let newItem = '';
  let [modalItems, setModalItems] = useState({ name: '', items: [] } as ModalProps);
  function onClickModalItem(name: any, value: ActionOperationEnum | string) {
    if (name === 'operation' && Object.values(ActionOperationEnum).includes(value as ActionOperationEnum)) {
      action.operation = value as ActionOperationEnum;
      setAction(action);
    }
    setValue(name, value);
    setModalItems({ name: '', items: [] } as ModalProps);
  }

  const onSubmit = (data: any) => {
    SaveAction((new Action()).fill(data));
    reset();
    setAction(makeDummyAction());
    setIsToastOpen(true);
  };

  useEffect(() => {
    (async () => {
      const toolList = await GetToolList({ isUser: true, isArhive: false });
      tools.length == 0 && toolList.length > 0 && setTools(toolList);
      const categoryList = await GetActionCategoryList();
      categories.length == 0 && categoryList.length > 0 && setCategories(categoryList);
    })();
  })

  const getToolTo = (mode: ActionOperationEnum): ReactNode | null => {
    if (![ActionOperationEnum.Transmit].includes(mode)) {
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

  const getCount = (mode: ActionOperationEnum): ReactNode | null => {
    if (![ActionOperationEnum.Transmit].includes(mode)) {
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
            <IonInput
              // className={errors.name && 'ion-invalid ion-touched'}
              // labelPlacement="stacked"
              onClick={() => setModalItems({ name: 'operation', items: modeEditActionList } as ModalProps)}
              label="Operation"
              value={action.operation}
              // errorText={errors.name?.message}
              {...register('operation')}
            />
          </IonItem>
          <IonItem>
            <IonInput
              // className={errors.name && 'ion-invalid ion-touched'}
              // labelPlacement="stacked"
              type='date'
              label="Date"
              value={action.date?.toLocaleDateString('sv')}
              // errorText={errors.name?.message}
              {...register('date', {
                valueAsDate: true,
              })}
            />
          </IonItem>
          <IonItem>
            <IonSelect
              label='Tool'
              value={action.tool}
              {...register('tool')}
            >
              {tools.map((item) => <IonSelectOption key={item.id} value={item}>
                {item.name}</IonSelectOption>)}
            </IonSelect>
          </IonItem>
          {getToolTo(action.operation)}
          {getCount(action.operation)}
          <IonItem>
            <IonInput
              // className={errors.name && 'ion-invalid ion-touched'}
              // labelPlacement="stacked"
              type="number"
              label="Sum"
              step=".01"
              // errorText={errors.name?.message}
              {...register('sum')}
            />
          </IonItem>
          <IonItem>
            <IonInput
              // className={errors.name && 'ion-invalid ion-touched'}
              // labelPlacement="stacked"
              label="Category"
              onClick={() => setModalItems({
                name: 'category',
                items: [...categories.map((item) => item.name), 'other'],
                addItem: true
              } as ModalProps)}
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
          <IonModal isOpen={modalItems.name !== ''}
            onDidDismiss={() => setModalItems({ name: '', items: [] } as ModalProps)}
            initialBreakpoint={0.40} breakpoints={[0, 1]}>
            <IonList>
              {modalItems.items.map((item: string) =>
                <IonItem id={'mode_' + item}>
                  <IonLabel onClick={() => onClickModalItem(modalItems.name, item)}>
                    <h2>{item}</h2>
                  </IonLabel>
                </IonItem>)}
              {modalItems.addItem && <IonItem id="addItem">
                <IonInput value={newItem} onIonInput={(e) => newItem = (e.target.value ?? '').toString()}></IonInput>
                <IonButton onClick={() => onClickModalItem(modalItems.name, newItem)}>Add</IonButton>
              </IonItem>}
            </IonList>
          </IonModal>
          <IonToast
            isOpen={isToastOpen}
            message="Action saved"
            onDidDismiss={() => setIsToastOpen(false)}
            duration={2000}
          ></IonToast>
        </IonContent>
      </IonPage >
    </form>
  );
}

export default EditAction;

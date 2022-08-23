import SendViewModel from './model';
import React, { FunctionComponent } from 'react';
import { observer } from 'mobx-react-lite';
import {Container, Divider, Loader, Modal} from 'semantic-ui-react';
import BTCValue from './BTCValue';
import CloseIcon from "../Icons/CloseIcon";

export type ConfirmModalProps = {
  model: SendViewModel;
};

const ConfirmModal: FunctionComponent<ConfirmModalProps> = observer(props => {
  const { model } = props;
  return (
    <Modal
      className={"modal-container"}
      onOpen={() => model.setConfirmOpen(true)}
      onClose={() => model.setConfirmOpen(false)}
      open={model.confirmOpen}
      openOnTriggerClick={model.valid}
      trigger={
        <button
          className={`action-button ${
            model.valid ? 'action-button-primary' : 'action-button-disable'
          }`}>
          Send
        </button>
      }>
      {model.isSending ? <>
        <Loader />
      </>: <>
        <Container className={'colored-container'}>
          <div className={'modal-header'}>
            <span />
            <span className={'text-weight-bold'}>Confirm Transaction</span>
            <CloseIcon onClick={() => model.setConfirmOpen(false)} />
          </div>
          <div className={'modal-confirm-box vertical-center'}>
            <span className={'text-weight-bold text-secondary confirm-top-span'}>
              You're Sending
            </span>
            <span className={'confirm-btc-span'}>
              <BTCValue
                value={model.amountText}
                size={'large'}
                fontWeight={'normal'}
              />
            </span>
            <span className={'text-weight-bold text-secondary confirm-middle-span'}>
              To
            </span>
            <span>{model.to}</span>
          </div>
        </Container>
        <Container className={'modal-confirm-section'}>
          <div className={'modal-section'}>
            <div className={'flex row space-between'}>
              <span className={'text-secondary text-weight-bold confirm-bottom-span'}>Amount</span>
              <BTCValue
                value={model.amountText}
                size={'normal'}
                fontWeight={'normal'}
              />
            </div>
            <div className={'flex row space-between'}>
              <span className={'text-secondary text-weight-bold confirm-bottom-span'}>Fee</span>
              <BTCValue
                value={model.feeText}
                size={'normal'}
                fontWeight={'normal'}
              />
            </div>
            <Divider className={'bottom-divider'} />
            <div className={'flex row space-between confirm-amount-section'}>
              <span className={'text-secondary text-weight-bold'}>
                Total Amount
              </span>
              <BTCValue
                value={model.totalAmount}
                size={'normal'}
                fontWeight={'bold'}
              />
            </div>
          </div>
          <button
            style={{ marginTop: 72 }}
            className={
              'action-button action-button-primary action-button-size-full-width'
            }
            onClick={model.send}>
            Confirm
          </button>
        </Container>
      </>}

    </Modal>
  );
});

export default ConfirmModal;

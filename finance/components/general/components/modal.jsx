import React, { useContext, useMemo, useRef, useState } from 'react';
import {
  Backdrop,
  Box,
  Button,
  Fade,
  Modal as MaterialModal,
  IconButton,
} from '@mui/material';
import { IoClose } from 'react-icons/io5';

const ModalContext = React.createContext();
const useModalContext = () => {
  const modalContext = useContext(ModalContext);
  return modalContext;
};

function DefaultModalComponent() {
  return <div>Default Modal</div>;
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  height: 'auto',
  maxWidth: '100%',
  maxHeight: '100%',
  bgcolor: 'background.paper',
  border: '1px solid rgb(0,0,0,0.2)',
  boxShadow: 24,
};

function ModalProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [Component, setComponent] = useState(<DefaultModalComponent />);
  const [modalStyle, setModalStyle] = useState(style);
  const promiseRef = useRef({});
  const openModal = (comp, customModalStyle) => {
    setModalStyle(() => ({ ...style, ...customModalStyle }));
    setComponent(comp);
    setOpen(true);
    return new Promise((resolve, reject) => {
      promiseRef.current.resolve = resolve;
      promiseRef.current.reject = reject;
    });
  };

  const value = useMemo(
    () => ({
      open,
      setOpen,
      Component,
      setComponent,
      promiseRef,
      openModal,
      modalStyle,
      opener: {
        resolve: (...val) => {
          setOpen(false);
          promiseRef.current.resolve(...val);
        },
        reject: (...val) => {
          setOpen(false);
          promiseRef.current.reject(...val);
        },
      },
      openConfirmModal: ({ title, message }) => {
        const comp = (
          <ConfirmModal
            title={title}
            message={message}
            openerProps={value.opener}
          />
        );
        return openModal(comp);
      },
    }),
    [open, Component, promiseRef.current, modalStyle]
  );

  return (
    <ModalContext.Provider value={value}>
      <CustomModal>{children}</CustomModal>
    </ModalContext.Provider>
  );
}

function CustomModal({ children }) {
  const modalContext = useModalContext();
  const handleClose = () => {
    modalContext.setOpen(false);
    modalContext.promiseRef.current.reject();
  };

  const openerProps = {
    resolve: (...val) => {
      modalContext.setOpen(false);
      modalContext.promiseRef.current.resolve(...val);
    },
    reject: (...val) => {
      modalContext.setOpen(false);
      modalContext.promiseRef.current.reject(...val);
    },
  };

  return (
    <>
      {children}
      <MaterialModal
        open={modalContext.open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={modalContext.open}>
          <Box sx={modalContext.modalStyle}>
            {modalContext.Component &&
              React.cloneElement(modalContext.Component, { openerProps })}
          </Box>
        </Fade>
      </MaterialModal>
    </>
  );
}

function ConfirmModal({ openerProps, title, message }) {
  return (
    <ModalLayout
      header={title}
      body={message}
      footer={
        <ConfirmDenyButtons
          onConfirm={openerProps.resolve}
          onDeny={openerProps.reject}
        />
      }
    />
  );
}

function ConfirmDenyButtons({ onConfirm, onDeny }) {
  return (
    <>
      <Button onClick={onConfirm} variant="contained">
        OK
      </Button>
      <Button onClick={onDeny} variant="outlined">
        Cancel
      </Button>
    </>
  );
}

export const ModalToolkit = {
  CustomModal,
  ModalContext,
  useModalContext,
  ModalProvider,
};

const headerStyle = {
  width: '100%',
  height: '2rem',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottom: '1px solid rgb(0,0,0,0.3)',
  padding: '0.25rem',
};

function Header({ children, customActions }) {
  const { opener } = ModalToolkit.useModalContext();

  return (
    <Box sx={headerStyle}>
      {children}
      <div className="tw-flex tw-flex-row tw-w-auto tw-gap-2">
        {customActions}
        <IconButton
          type="button"
          className="close"
          data-dismiss="modal"
          aria-label="Close"
          onClick={() => opener.reject()}
        >
          <IoClose />
        </IconButton>
      </div>
    </Box>
  );
}

const bodyStyle = {
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  overflow: 'auto',
  padding: '0.25rem',
};

function Body({ children }) {
  return <Box sx={bodyStyle}>{children}</Box>;
}

const footerStyle = {
  width: '100%',
  height: '3rem',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  alignItems: 'center',
  borderTop: '1px solid rgb(0,0,0,0.3)',
  padding: '0.25rem',
  gap: '0.25rem',
};

function Footer({ children }) {
  return <Box sx={footerStyle}>{children}</Box>;
}

const modalBoxStyle = {
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
};

function ModalLayout({ header, body, footer, ...props }) {
  function HeaderSlot() {
    if (header) {
      if (React.isValidElement(header)) {
        return React.cloneElement(header, props);
      }
      return header;
    }
    return null;
  }

  function BodySlot() {
    if (body) {
      if (React.isValidElement(body)) {
        return React.cloneElement(body, props);
      }
      return body;
    }
    return null;
  }

  function FooterSlot() {
    if (footer) {
      if (React.isValidElement(footer)) {
        return React.cloneElement(footer, props);
      }
      return footer;
    }
    return null;
  }

  return (
    <Box sx={modalBoxStyle}>
      <Header>{HeaderSlot()}</Header>
      <Body>{BodySlot()}</Body>
      <Footer>{FooterSlot()}</Footer>
    </Box>
  );
}

export const Modal = { ModalLayout, Header, Body, Footer };

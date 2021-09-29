import React from 'react';

const WizardContext = React.createContext();

const useWizardContext = () => {
  const context = React.useContext(WizardContext);

  if (!context) {
    throw new Error('Must use WizardContext from within Provider');
  }

  return context;
}

const Wizard = () => {
  // before
  // const { activePageIndex } = React.useContext(WizardContext);

  // after
  const { activePageIndex } = useWizardContext();
}
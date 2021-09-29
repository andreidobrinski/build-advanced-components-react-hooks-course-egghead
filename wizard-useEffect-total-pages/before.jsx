import React from "react";

// Wizard

const WizardContext = React.createContext();

const Wizard = ({ children, steps }) => {
  const [activePageIndex, setActivePageIndex] = React.useState(0);

  const goNextPage = () => {
    setActivePageIndex((index) => index + 1);
  };

  const goPrevPage = () => {
    setActivePageIndex((index) => index - 1);
  };

  const context = {
    activePageIndex,
    goNextPage,
    goPrevPage,
    steps
  };

  return (
    <WizardContext.Provider value={context}>
      <div>{children}</div>
    </WizardContext.Provider>
  );
};

export const WizardPages = (props) => {
  const { activePageIndex } = React.useContext(WizardContext);
  const pages = React.Children.toArray(props.children);
  const currentPage = pages[activePageIndex];
  return <div {...props}>{currentPage}</div>;
};


export const WizardButtonPrev = (props) => {
  const { goPrevPage, activePageIndex } = React.useContext(WizardContext);
  return activePageIndex > 0 ? (
    <button type="button" {...props} onClick={goPrevPage}>
      Back
    </button>
  ) : null;
};

export const WizardButtonNext = (props) => {
  const { goNextPage, activePageIndex, steps } = React.useContext(
    WizardContext
  );
  return activePageIndex < steps - 1 ? (
    <button type="button" {...props} onClick={goNextPage}>
      Next
    </button>
  ) : null;
};


Wizard.ButtonNext = WizardButtonNext;
Wizard.ButtonPrev = WizardButtonPrev;
Wizard.Pages = WizardPages;

// Pages

const Page1 = () => (
  <div>
    <h1>Pagina 1</h1>
  </div>
);

const Page2 = () => (
  <div>
    <h1>Pagina 2</h1>
  </div>
);
const Page3 = () => (
  <div>
    <h1>Pagina 3</h1>
  </div>
);

// App

const App = () => {
  return (
    <Wizard steps={3}>
      <Wizard.Pages className="wizard__content">
        <Page1 />
        <Page2 />
        <Page3 />
      </Wizard.Pages>
      <div className="wizard__buttons">
        <Wizard.ButtonPrev className="wizard__buttons-left" />
        <Wizard.ButtonNext className="wizard__buttons-right" />
      </div>
    </Wizard>
  );
};
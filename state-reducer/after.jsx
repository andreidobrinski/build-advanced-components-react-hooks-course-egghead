import React from "react";

// Wizard

const WizardContext = React.createContext();

const defaultInitialState = {
  activePageIndex: 0,
  steps: 0
};

const actions = {
  NEXT_PAGE: 'NEXT_PAGE',
  PREV_PAGE: 'PREV_PAGE',
  SET_STEPS: 'SET_STEPS',
}

const combineReducers = (...reducers) => (state, action) => {
  return reducers.reduce((acc, nextReducer) => {
    return nextReducer(acc, action);
  }, state);
}

const defaultReducer = (state, action) => state;

const wizardReducer = (state, action) => {
  const { activePageIndex, steps } = state;
  switch(action.type) {
    case actions.NEXT_PAGE:
      return { ...state, activePageIndex: activePageIndex + 1 };
    case actions.PREV_PAGE:
      return { ...state, activePageIndex: activePageIndex - 1 };
    case actions.SET_STEPS:
      return { ...state, steps: action.payload };
    default:
      return state;
  }
}

const Wizard = ({ children, reducer = defaultReducer, initialState = {} }) => {
  // const [activePageIndex, setActivePageIndex] = React.useState(0);
  // const [steps, setSteps] = React.useState(0);
  const [{ activePageIndex, steps }, dispatch] = React.useReducer(
    combineReducers(wizardReducer, reducer),
    {
      ...defaultInitialState,
      ...initialState
    }
  )

  const goNextPage = () => {
    dispatch({ type: actions.NEXT_PAGE });
  };

  const goPrevPage = () => {
    dispatch({ type: action.PREV_PAGE });
  };

  const setSteps = React.useCallback((n) => {
    dispatch({ type: actions.SET_STEPS, payload: n });
  }, [dispatch]);

  const context = {
    activePageIndex,
    goNextPage,
    goPrevPage,
    steps,
    setSteps
  };

  return (
    <WizardContext.Provider value={context}>
      <div>{children}</div>
    </WizardContext.Provider>
  );
};

export const WizardPages = (props) => {
  const { activePageIndex, setSteps } = React.useContext(WizardContext);
  const pages = React.Children.toArray(props.children);
  const steps = React.Children.count(props.children);
  React.useEffect(() => {
    setSteps(steps)
  }, [steps, setSteps]);
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

const initialState = {
  activePageIndex: 2
}

const reducer = (state, action) => {
  if (action.type === actions.NEXT_PAGE) {
    console.log('Next page clicked');
  }
  return state;
}

const App = () => {
  return (
    <Wizard initialState={initialState} reducer={reducer}>
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
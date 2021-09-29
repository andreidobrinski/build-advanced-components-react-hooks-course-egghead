import React from "react";

// Wizard

const Wizard = ({ children }) => {
  const [activePageIndex, setActivePageIndex] = React.useState(0);
  const pages = React.Children.toArray(children);
  const currentPage = pages[activePageIndex];

  const onNextPage = () => {
    setActivePageIndex(index => index + 1);
  };

  const onPrevPage = () => {
    setActivePageIndex(index => index - 1);
  };

  const ButtonPrev = () =>
    activePageIndex > 0 ? (
      <button
        type="button"
        onClick={onPrevPage}
      >
        Back
      </button>
    ) : null;
  const ButtonNext = () =>
    activePageIndex < pages.length - 1 ? (
      <button
        type="button"
        onClick={onNextPage}
      >
        Next
      </button>
    ) : null;

  return (
    <div>
      <div>{currentPage}</div>
      <div>
        <ButtonPrev />
        <ButtonNext />
      </div>
    </div>
  );
};

// Pages

const Page1 = () => (
  <div>
    <h1>Page 1</h1>
  </div>
);

const Page2 = () => (
  <div>
    <h1>Page 2</h1>
  </div>
);
const Page3 = () => (
  <div>
    <h1>Page 3</h1>
  </div>
);

// App 

const App = () => {
  return (
    <Wizard>
      <Page1 />
      <Page2 />
      <Page3 />
    </Wizard>
  );
};
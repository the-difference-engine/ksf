import React from "react";
import { render } from "@testing-library/react";
import NewFilesToReview from "./NewFilesToReview";
import { NominationsDataProvider } from '../../../utils/context/NominationsContext';

it("Renders new files to review component on the home page", () => {
  const getByText = render(
    <NominationsDataProvider>
      <NewFilesToReview />
    </NominationsDataProvider>
  )
    expect(getByText).toMatchSnapshot();

});

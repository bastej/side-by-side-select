import React from "react";
import SideBySideSelect from "./components/SideBySideSelect/SideBySideSelect";

import styles from "./App.module.scss";

function App() {
  return (
    <div className={styles.Select}>
      <SideBySideSelect
        allOptions={["a", "b", "c", "d", "e"]}
        label="Test-label"
        texts={{
          allItemsHeader: "All",
          selectedItemsHeader: "Selected",
        }}
        initialSelectedOptions={["a", "b", "e"]}
        onChange={() => {
          console.log("Do extra action");
        }}
      />
    </div>
  );
}

export default App;

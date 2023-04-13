import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import usePlacesAutocomplete from "use-places-autocomplete";
import "@reach/combobox/styles.css";
import { useEffect } from "react";
import React from 'react';

export default function AutoComp(props) {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  useEffect(() => {
    setValue("New York, NY, USA", false);
  }, []);

  const handleSelect = async (address) => {
    setValue(address, false);
    props.cityHandler(address);
    clearSuggestions();
  };

  return (
    <>
      <Combobox onSelect={handleSelect} className="locationBox">
        <ComboboxInput
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={!ready}
        />
        <ComboboxPopover>
          <ComboboxList>
          {status === "OK" && (
              <ComboboxOption
                className="optionBox"
                value={"your location"}
                key={123}
              />
            )}
            {status === "OK" &&
              data.map(({ place_id, description }) => (
                <ComboboxOption
                  className="optionBox"
                  value={description}
                  key={place_id}
                />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </>
  );
}

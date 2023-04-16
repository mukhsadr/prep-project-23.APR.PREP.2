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
import React from "react";

export default function AutoComp(props) {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  useEffect(() => {
    setValue(props.city, false);
  }, [props.city]);

  const handleSelect = async (address) => {
    setValue(address, false);
    props.cityHandler(address);
    clearSuggestions();
  };

  return (
    <>
      <Combobox
        onSelect={handleSelect}
        className="locationBox"
        style={{ color: "pink" }}
      >
        <ComboboxInput
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={!ready}
          style={{
            minWidth: "150px",
            width: "100%",
            border: "none !important",
            borderRadius: "20PX",
            outline: "none !important",
          }}
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === "OK" && (
              <ComboboxOption
                className="optionBox"
                value={"Your location"}
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

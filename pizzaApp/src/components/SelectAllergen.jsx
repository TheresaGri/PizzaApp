import React, { useState, useEffect } from "react";
import Select from "react-select";
import { allergensRouter } from "/home/adrian/repos/Modul2/react/PizzaApp/cc-pizza-api-master/routes/allergens";

const SelectAllergens = () => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchAllergens = async () => {
      const response = await fetch("/api/allergens");
      const allergens = await response.json();
      const options = allergens.map((allergen) => {
        return {
          value: allergen.letter,
          label: allergen.name,
        };
      });
      setOptions(options);
    };

    fetchAllergens();
  }, []);

  return (
    <div>
      <label htmlFor="allergens">Allergens:</label>
      <Select
        id="allergens"
        options={options}
        isMulti
        placeholder="Select allergens..."
      />
    </div>
  );
};

export default SelectAllergens;

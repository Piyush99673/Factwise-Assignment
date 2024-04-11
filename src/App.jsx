import React, { useEffect, useState } from "react";
import "./App.css";
import myData from "./celebrities.json";
import Search from "./components/searchBar";
import Cardele from "./components/accordion"; // Make sure the path is correct

function App() {
  const [celebrities, setCelebrities] = useState([]);
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const calculateAge = (dob) => {
      const today = new Date();
      const birthDate = new Date(dob);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }
      return age;
    };

    // Assume data fetching is synchronous for simplicity, adjust accordingly if async
    const updatedData = myData.map((person) => ({
      ...person,
      age: calculateAge(person.dob),
      show: true,
    }));

    setCelebrities(updatedData);
  }, []);

  const onDelete = (index) => {
    // Logic to delete the selected entry
    const updatedCelebrities = [...celebrities];
    updatedCelebrities[index].show = false;
    // updatedCelebrities.splice(index, 1);
    setCelebrities(updatedCelebrities);
  };

  // Filter celebrities based on search text
  const filteredCelebrities = celebrities.filter(
    (person) =>
      person.first.toLowerCase().includes(searchText.toLowerCase()) ||
      person.last.toLowerCase().includes(searchText.toLowerCase()) ||
      `${person.first} ${person.last}`
        .toLowerCase()
        .includes(searchText.toLowerCase())
  );

  return (
    <>
      <div className="heading">
        <h1>List View</h1>
      </div>
      <div>
        <Search settext={setSearchText}></Search>
      </div>
      <div className="container">
        <div className="accordion-container">
          {filteredCelebrities.map(
            (person, index) =>
              person.show && (
                <Cardele
                  key={index}
                  firstName={person.first}
                  lastName={person.last}
                  age={person.age}
                  gender={person.gender}
                  country={person.country}
                  description={person.description}
                  picture={person.picture}
                  expanded={activeAccordion === index}
                  onToggle={() =>
                    setActiveAccordion(activeAccordion === index ? null : index)
                  }
                  onDelete={() => onDelete(index)} // Pass onDelete function as a prop
                  // style={{ display: person.show ? "block" : "none" }}
                />
              )
          )}
        </div>
      </div>
    </>
  );
}

export default App;

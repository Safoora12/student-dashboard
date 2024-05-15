// src/components/CsvUpload.js
import React, { useState } from 'react';
import CSVReader from 'react-csv-reader';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import './CsvUpload.css';

const CsvUpload = () => {
  const [data, setData] = useState([]);

  const handleFileUpload = (data) => {
    setData(data);

    data.forEach(async (student) => {
      try {
        await addDoc(collection(db, 'students'), {
          name: student[0], // Adjust index according to your CSV structure
          age: student[1],
          grade: student[2]
        });
        console.log("Student added successfully");
      } catch (error) {
        console.error("Error adding student: ", error);
      }
    });
  };

  return (
    <div className="csv-upload">
      <CSVReader
        cssClass="react-csv-input"
        label="Select CSV File :&nbsp;"
        onFileLoaded={handleFileUpload}
      />
    </div>
  );
};

export default CsvUpload;

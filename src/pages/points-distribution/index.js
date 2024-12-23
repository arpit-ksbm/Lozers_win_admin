import React, { useEffect, useState } from 'react';
import { Box, Button, IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import MainDatatable from '../../components/datatable/MainDatatable';
import Header from '../../layouts/header';
import { toast } from 'react-toastify';
import * as PointsActions from '../../redux/actions/pointsAction';

const PointsDistribution = () => {
  const dispatch = useDispatch();
  const { pointsData } = useSelector((state) => state?.pointsReducer);

  const staticKeys = {
    'Playing 11': 'playing11',
    'Wicket': 'wicket',
    'Run': 'run',
    'Catch': 'catch',
    'Boundary': 'boundary',
    'Consecutive Boundary': 'consecutiveBoundary',
    'Six': 'six',
    'Consecutive Six': 'consecutiveSix',
    'Twenty Run Bonus': 'twentyRunBonus',
    'Thirty Run Bonus': 'thityRunBonus',
    'Half Century Bonus': 'halfCenturyBonus',
    'Century Bonus': 'centuryBonus',
    'Double Century Bonus': 'doubleCenturyBonus',
    'Dismissal For A Duck': 'dismissalForADuck',
    'Dismissal For A Golden Duck': 'dismissalForAGoldenDuck',
    'Two Wicket Bonus': 'twoWicketBonus',
    'Three Wicket Bonus': 'threeWicketBonus',
    'Four Wicket Bonus': 'fourWicketBonus',
    'Five Wicket Bonus': 'fiveWicketBonus',
    'Six Wicket Bonus': 'sixWicketBonus',
    'Maiden Over': 'maidenOver',
    'Stumping': 'stumping',
    'Run Out Direct Hit': 'runOutDirectHit',
    'Run Out Not Direct Hit': 'runOutNotDirectHit',
  };

  const formats = ['T20', 'T10', 'ODI', 'TEST'];
  const [data, setData] = useState({});
  const [editedRows, setEditedRows] = useState({});

  useEffect(() => {
    if (Array.isArray(pointsData) && pointsData.length > 0) {
      const formattedData = {};
      Object.keys(staticKeys).forEach((key) => {
        formattedData[key] = {};
        formats.forEach((format) => {
          const dataKey = staticKeys[key];
          formattedData[key][format] = pointsData[0]?.[format]?.[dataKey] ?? 0;
        });
      });
      setData(formattedData);

      const initialEditedRows = {};
      Object.keys(staticKeys).forEach((key) => {
        initialEditedRows[key] = false;
      });
      setEditedRows(initialEditedRows);
    }
  }, [pointsData]);

  useEffect(() => {
    dispatch(PointsActions.getPoints());
  }, [dispatch]);

  const handleChange = (type, format, value) => {
    setData((prevData) => ({
      ...prevData,
      [type]: {
        ...prevData[type],
        [format]: value,
      },
    }));
    setEditedRows((prevEditedRows) => ({
      ...prevEditedRows,
      [type]: true,
    }));
  };

  const handleEdit = (type) => {
    const updatedData = {};

    formats.forEach((format) => {
      if (!updatedData[format]) updatedData[format] = {};
      const dataKey = staticKeys[type];
      updatedData[format][dataKey] = data[type][format];
    });

    dispatch(PointsActions.updatePoints(updatedData));
    toast.success(`${type} points updated successfully`);
    setEditedRows((prevEditedRows) => ({
      ...prevEditedRows,
      [type]: false,
    }));
  };

  const columns = [
    { name: 'Type', selector: (row) => row.type },
    ...formats.map((format) => ({
      name: format,
      selector: (row) => (
        <input
          type="Number"
          value={row[format]}
          onChange={(e) => handleChange(row.type, format, e.target.value)}
          style={{
            width: '100%',
            padding: '5px',
            fontSize: '14px',
            color: row[format] < 0 ? 'green' : 'red', // Green for negative, Red for positive
          }}
        />
      ),
    })),
    {
      name: 'Action',
      cell: (row) => (
        <Button
          variant="contained"
          size="small"
          onClick={() => handleEdit(row.type)}
          disabled={!editedRows[row.type]}
        >
          Save
        </Button>
      ),
    },
  ];
  

  const tableData = Object.keys(staticKeys).map((key) => ({
    type: key,
    ...formats.reduce((acc, format) => {
      acc[format] = data[key]?.[format] ?? '';
      return acc;
    }, {}),
  }));

  return (
    <>
      <Header />
      <Box sx={{ p: 3 }}>
        <div
          style={{
            background: "#ffffff",
            padding: "25px",
            borderRadius: "10px",
            boxShadow: "0 3px 6px rgba(0, 0, 0, 0.16), 0 0px 0px rgba(0, 0, 0, 0.23)",
          }}
        >
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px",
            backgroundColor: "#fff"
          }}>
            <div style={{ fontSize: "20px", fontWeight: "600", color: "black" }}>Point Distributions</div>
          </div>

          {/* MainDatatable Component */}
          <MainDatatable columns={columns} data={tableData} />
        </div>
      </Box>
    </>
  );
};

export default PointsDistribution;

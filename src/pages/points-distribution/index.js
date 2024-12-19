import React, { useEffect, useState } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import * as PointsActions from '../../redux/actions/pointsAction';
import { toast } from 'react-toastify';

const PointsDistribution = () => {
  const dispatch = useDispatch();
  const { pointsData } = useSelector((state) => state?.pointsReducer);

  const staticKeys = {
    'Playing 11': 'playing11',
    Wicket: 'wicket',
    Run: 'run',
    Catch: 'catch',
    Boundary: 'boundary',
    'Consecutive Boundary': 'consecutiveBoundary',
    Six: 'six',
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
    Stumping: 'stumping',
    'Run Out Direct Hit': 'runOutDirectHit',
    'Run Out Not Direct Hit': 'runOutNotDirectHit',
  };

  const formats = ['T20', 'T10', 'ODI', 'TEST'];
  const [data, setData] = useState({});
  const [editedRows, setEditedRows] = useState({}); // Track edit states for each row

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

      // Initialize edit states for each row as false
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
      [type]: true, // Mark this row as edited
    }));
  };

  const handleEdit = (type) => {
    const updatedData = {};

    // Prepare data for API call
    formats.forEach((format) => {
      if (!updatedData[format]) updatedData[format] = {};
      const dataKey = staticKeys[type];
      updatedData[format][dataKey] = data[type][format];
    });

    dispatch(PointsActions.updatePoints(updatedData)); // Dispatch updatePoints action
    toast.success(`${type} points updated successfully`);
    setEditedRows((prevEditedRows) => ({
      ...prevEditedRows,
      [type]: false, // Reset edit state for this row
    }));
  };

  return (
    <Box sx={{ p: 3 }}>
      <div
        style={{
          background: "#ffffff",
          padding: "25px",
          borderRadius: "10px",
          boxShadow: "0 3px 6px rgba(0, 0, 0, 0.16), 0 0px 0px rgba(0, 0, 0, 0.23)",
        }}
      >
        <div style={{ fontSize: "20px", fontWeight: "600", color: "black" }}>Point Distribution</div>

        <TableContainer component={Paper} style={{ marginTop: '20px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Type</strong></TableCell>
                {formats.map((format) => (
                  <TableCell key={format}><strong>{format}</strong></TableCell>
                ))}
                <TableCell><strong>Action</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.keys(staticKeys).map((key) => (
                <TableRow key={key}>
                  <TableCell>{key}</TableCell>
                  {formats.map((format) => (
                    <TableCell key={`${key}-${format}`}>
                      <TextField
                        size="small"
                        value={data[key]?.[format]}
                        onChange={(e) => handleChange(key, format, e.target.value)}
                      />
                    </TableCell>
                  ))}
                  <TableCell>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => handleEdit(key)}
                      disabled={!editedRows[key]} // Enable button only if this row has been edited
                    >
                      Save
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Box>
  );
};

export default PointsDistribution;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button } from '@mui/material';
import RouteHeader from '../../components/common/RouteHeader';
import { DeepSearchSpace } from '../../utils/common-function';
import * as PointsActions from '../../redux/actions/pointsAction';

const PointsDistribution = () => {
    const dispatch = useDispatch();
    const { pointsData } = useSelector(state => state?.pointsReducer);
    const [searchText, setSearchText] = useState('');
    const [editValues, setEditValues] = useState({});

    const filteredData = DeepSearchSpace(pointsData, searchText);

    useEffect(() => {
        dispatch(PointsActions.getPoints());
    }, [dispatch]);

    // Handle input changes
    const handleInputChange = (key, value, type, matchType) => {
        setEditValues((prevState) => ({
            ...prevState,
            [type]: {
                ...prevState[type],
                [matchType]: {
                    ...prevState[type]?.[matchType], // Ensure previous values for matchType are preserved
                    [key]: value
                }
            }
        }));
    };
    

    // Handle update button click for a specific field
    const handleUpdate = (key, type, matchType) => {
        console.log(`Updated ${key} for ${type} - ${matchType}:`, editValues[type]?.[matchType]?.[key]);
    };

    // Render points in the desired format, including match type (T20, ODI, etc.)
    const renderPoints = (points, type) => {
        return Object.keys(points).map((matchType) => (
            <React.Fragment key={matchType}>
                {Object.keys(points[matchType]).map((key) => {
                    const value = points[matchType][key];

                    return (
                        <TableRow key={key}>
                            <TableCell>{matchType}</TableCell>
                            <TableCell>{key}</TableCell>
                            <TableCell>
                                <TextField
                                    value={editValues[type]?.[matchType]?.[key] || value}
                                    onChange={(e) => handleInputChange(key, e.target.value, type, matchType)}
                                    fullWidth
                                    size="small"
                                    variant="outlined"
                                />
                            </TableCell>
                            <TableCell>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => handleUpdate(key, type, matchType)}
                                >
                                    Update
                                </Button>
                            </TableCell>
                        </TableRow>
                    );
                })}
            </React.Fragment>
        ));
    };

    return (
        <>
            <RouteHeader title={`Payment / Request`} />
            <Box sx={{ p: 4 }}>
                <div style={{ background: "#ffffff", padding: "25px", borderRadius: "10px", boxShadow: "0 3px 6px rgba(0, 0, 0, 0.16), 0 0px 0px rgba(0, 0, 0, 0.23)" }}>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell><strong>Match Type</strong></TableCell>
                                    <TableCell><strong>Name</strong></TableCell>
                                    <TableCell><strong>Points</strong></TableCell>
                                    <TableCell><strong>Action</strong></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredData.map((row, index) => (
                                    <React.Fragment key={index}>
                                        {Object.keys(row?.importantFantasyPoints || {}).length > 0 && (
                                            <>
                                                {renderPoints(row?.importantFantasyPoints, 'importantFantasyPoints')}
                                            </>
                                        )}
                                        {Object.keys(row?.battingPoints || {}).length > 0 && (
                                            <>
                                                {renderPoints(row?.battingPoints, 'battingPoints')}
                                            </>
                                        )}
                                        {Object.keys(row?.bowlingPoints || {}).length > 0 && (
                                            <>
                                                {renderPoints(row?.bowlingPoints, 'bowlingPoints')}
                                            </>
                                        )}
                                        {Object.keys(row?.fieldingPoints || {}).length > 0 && (
                                            <>
                                                {renderPoints(row?.fieldingPoints, 'fieldingPoints')}
                                            </>
                                        )}
                                        {row?.additionalPoints && (
                                            <>
                                                {Object.keys(row?.additionalPoints).map((key) => (
                                                    <TableRow key={key}>
                                                        <TableCell>Additional Points</TableCell>
                                                        <TableCell>{key}</TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                value={editValues?.additionalPoints?.[key] || row?.additionalPoints[key]}
                                                                onChange={(e) => handleInputChange(key, e.target.value, 'additionalPoints')}
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                            />
                                                        </TableCell>
                                                        <TableCell>
                                                            <Button
                                                                variant="contained"
                                                                color="primary"
                                                                onClick={() => handleUpdate(key, 'additionalPoints')}
                                                            >
                                                                Update
                                                            </Button>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </>
                                        )}
                                    </React.Fragment>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </Box>
        </>
    );
};

export default PointsDistribution;

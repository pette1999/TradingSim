import React, { useEffect, useState } from "react"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function TableData({ fundPortfolioInfo, setFundPortfolioInfo }) {
  return (
    <>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Stock Ticker</TableCell>
            <TableCell align="right">Company Name</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Average Price&nbsp;($)</TableCell>
            <TableCell align="right">Long Term Holding</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {fundPortfolioInfo.map((row) => (
            <TableRow
              key={row.Ticker}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.Ticker}
              </TableCell>
              <TableCell align="right">{row.CompanyName}</TableCell>
              <TableCell align="right">{row.Quantity}</TableCell>
              <TableCell align="right">{row.AvePrice}</TableCell>
              <TableCell align="right">{row.Long_term_holding.toString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}
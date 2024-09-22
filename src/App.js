import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import { useForm, SubmitHandler } from 'react-hook-form'
import { useEffect, useState } from "react";
import upLogo from './up-arrow.png';
import downLogo from './down-arrow.png';
import rightLogo from './right-arrow.png';
import leftLogo from './left-arrow.png';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

export default function TestGrid() {
  const [input, setInput] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState('')
  const { register, handleSubmit } = useForm()

  const parseInput = (paramInput) => {
    const arrInput = paramInput.split(',', 3)

    if (arrInput.length != 3) {
      console.log('length input should be 3')
      return
    }

    let row = arrInput[0]
    let column = arrInput[1]
    let direction = arrInput[2]

    if (row < 0 || row > 4) {
      console.log('row should be within 0 to 4')
      return
    }
    else if (column < 0 || column > 4) {
      console.log('column should be within 0 to 4')
      return
    }

    populateCell(row, column, direction)
  }

  const populateCell = (row, column, direction) => {
    // 0,0
    // 1,1
    // 4,4
    let index = ((parseInt(row)) * parseInt(5) + parseInt(column))
    setCurrentIndex(index)
    setDirection(direction.toLowerCase())
  }

  const onSubmit = (data) => {
    setInput(data.inputData)
    parseInput(data.inputData)
  }

  const getLogoPath = (ii) => {
    if (ii == currentIndex) {
      switch (direction) {
        case 'north':
          return upLogo
          break
        case 'south':
          return downLogo
          break
        case 'east':
          return rightLogo
          break
        case 'west':
          return leftLogo
          break
        default:
          return 'display: none'
      }
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Input: <input {...register("inputData")} />
        </label>
        <input type="submit" value="submit" />
      </form>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {Array.from(Array(25)).map((_, index) => (
            <Grid key={index} size={{ xs: 2.4, sm: 2.4, md: 2.4 }}>
              <Item>
                <img alt='logo' style={{ width: 100 }} src={getLogoPath(index)} />
              </Item>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}


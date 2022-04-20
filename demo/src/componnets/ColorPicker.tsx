import { Button, Popover } from '@mui/material';
import { MouseEvent, useState } from 'react'
import { ChromePicker, Color, ColorChangeHandler } from "react-color";


interface ColorPickerProps {
  color: Color | undefined,
  onChange?: ColorChangeHandler | undefined,
  onChangeComplete?: ColorChangeHandler | undefined
}
const ColorPicker = (props: ColorPickerProps) => {
  const { color, onChange, onChangeComplete } = props;

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement|null>(null);
  const openPopover = (e: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  }
  const closePopover = () => {
    setAnchorEl(null);
  }

  return (
    <>
      <Button onClick={openPopover}
        sx={{
          width: 40,
          height: 25,
          backgroundColor: color?.toString(),
          "&: hover": {
            backgroundColor: color?.toString(),
            boxShadow: "4px 4px 14px rgb(255 255 255 / 20%)"
          }
        }}
      />
      <Popover open={Boolean(anchorEl)} anchorEl={anchorEl}
        onClose={closePopover}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
      >
        <ChromePicker color={color} onChange={onChange} onChangeComplete={onChangeComplete}/>
      </Popover>
    </>

  )
}

export default ColorPicker;
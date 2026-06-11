import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';


export default function DateComponent({ value , setValue } ) {


  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <DatePicker 
          sx={{
            border: "1px solid #fff", borderRadius: "5px",
                '.MuiSvgIcon-root': {
                    color: "#fff"
                }, 
                '.MuiPickersSectionList-section': {
                color: '#fff',
              }}
            }
          value={value}
          onChange={(newValue) => setValue(newValue)}
         />
      </DemoContainer>
    </LocalizationProvider>
  );
}

import { Fragment, useState } from "react";
import { Box, Paper, Grid, TextField, DialogActions, Button, InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import { Scheduler } from "@aldabil/react-scheduler";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { RESOURCES, EVENTS } from "./data";

const CustomEditor = ({ scheduler }: any) => {
  const event = scheduler.edited;

  const [state, setState] = useState({
    patientType: event?.patientType || "",
    title: event?.title || "",
    treatmentPlan: event?.treatmentPlan || "",
    admin_id: event?.admin_id || "",
    start: event?.start || "",
    end: event?.end || "",
    description: event?.description || ""
  });

  const handleChange = (value: any, name: string) => {
    setState((prev) => {
      return {...prev, [name]: value};
    });
  };

  const handleSubmit = async () => {
    try {
      scheduler.loading(true);
      const added_updated_event = (await new Promise((res) => {
        res({
          event_id: event?.event_id || Math.random(),
          title: state.title,
          start: state.start,
          end: state.end,
          description: state.description,
          patientType: state.patientType,
          treatmentPlan: state.treatmentPlan,
          admin_id: state.admin_id
        });
      }));
      scheduler.onConfirm(added_updated_event, event ? "edit" : "create");
      scheduler.close();
    } finally {
      scheduler.loading(false);
    }
  };
  const minutesHoge = Number(new Date().getMinutes) + 60;

  return (
    <div>
      <div style={{ padding: "1rem" }}>
        <p>Load your custom form/fields</p>
        <FormControl fullWidth>
          <InputLabel id="select-label-patient-type">Patient Type</InputLabel>
          <Select
            labelId="select-label-patient-type"
            id="patient-type-select"
            value={state.patientType}
            label="Patient Type"
            onChange={(e) => handleChange(e.target.value, "patientType")}
          >
            <MenuItem value={"new"}>New</MenuItem>
            <MenuItem value={"existing"}>Existing</MenuItem>
          </Select>
        </FormControl>
        {state.patientType === "existing"
        ?
        <FormControl fullWidth>
          <InputLabel id="select-label-patient-name">Patient Name</InputLabel>
          <Select
            labelId="select-label-patient-name"
            id="patient-name-select"
            value={state.title}
            label="Patient Name"
            onChange={(e) => handleChange(e.target.value, "title")}
          >
            <MenuItem value={"HogeHoge（k12）"}>HogeHoge（k12）</MenuItem>
            <MenuItem value={"FugaFuga（k22）"}>FugaFuga（k22）</MenuItem>
          </Select>
        </FormControl>
        :
        <TextField
          label="Patient Name"
          value={state.title}
          onChange={(e) => handleChange(e.target.value, "title")}
          fullWidth
        />
        }
        <FormControl fullWidth>
          <InputLabel id="select-label-treatment-plan">Treatment Plan</InputLabel>
          <Select
            labelId="select-label-treatment-plan"
            id="treatment-plan-select"
            value={state.treatmentPlan}
            label="Treatment Plan"
            onChange={(e) => handleChange(e.target.value, "treatmentPlan")}
          >
            <MenuItem value={"抜歯"}>抜歯</MenuItem>
            <MenuItem value={"診察"}>診察</MenuItem>
            <MenuItem value={"抜糸"}>抜糸</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="select-label-room">Room</InputLabel>
          <Select
            labelId="select-label-room"
            id="room-select"
            value={state.admin_id}
            label="Room"
            onChange={(e) => handleChange(e.target.value, "admin_id")}
          >
            <MenuItem value={1}>Orange Room</MenuItem>
            <MenuItem value={2}>Yellow Room</MenuItem>
            <MenuItem value={3}>Blue Room</MenuItem>
            <MenuItem value={4}>Green Room</MenuItem>
          </Select>
        </FormControl>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateTimePicker
                    minutesStep={15}
                    renderInput={(params:any) => <TextField {...params} />}
                    value={state.start}
                    onChange={(e:any) => handleChange(new Date(e || ""), "start")}
                  />
                </LocalizationProvider>
            </Grid>
            <Grid item xs={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateTimePicker
                    minutesStep={15}
                    renderInput={(params:any) => <TextField {...params} />}
                    value={state.end}
                    onChange={(e:any) => handleChange(new Date(e || ""), "end")}
                  />
                </LocalizationProvider>
            </Grid>
          </Grid>
        </Box>
        <TextField
          label="Description"
          value={state.description}
          multiline
          rows={5}
          onChange={(e) => handleChange(e.target.value, "description")}
          fullWidth
        />
      </div>
      <DialogActions>
        <Button onClick={scheduler.close}>Cancel</Button>
        <Button onClick={handleSubmit}>Confirm</Button>
      </DialogActions>
    </div>
  );
};

export const Appointment = () => {
  const [mode, setMode] = useState<"default" | "tabs">("default");

  return (
    <Fragment>
      <div style={{ textAlign: "center" }}>
        <span>Resource View Mode: </span>
        <Button
          color={mode === "default" ? "primary" : "inherit"}
          variant={mode === "default" ? "contained" : "text"}
          size="small"
          onClick={() => setMode("default")}
        >
          Default
        </Button>
        <Button
          color={mode === "tabs" ? "primary" : "inherit"}
          variant={mode === "tabs" ? "contained" : "text"}
          size="small"
          onClick={() => setMode("tabs")}
        >
          Tabs
        </Button>
      </div>
      <Scheduler
        customEditor={(scheduler) => <CustomEditor scheduler={scheduler} />}
        events={EVENTS}
        resources={RESOURCES}
        view={"month"}
        day={{
          startHour: 8, 
          endHour: 18, 
          step: 15
        }}
        week={{ 
          weekDays: [0, 1, 2, 3, 4, 5, 6], 
          weekStartOn: 0, 
          startHour: 8, 
          endHour: 18,
          step: 15
        }}
        month={{
          weekDays: [0, 1, 2, 3, 4, 5, 6], 
          weekStartOn: 0,  
          startHour: 8, 
          endHour: 18,
        }}
        resourceFields={{
          idField: "admin_id",
          textField: "title",
          avatarField: "avatar",
          colorField: "color"
        }}
        fields={[
          {
            name: "admin_id",
            type: "select",
            default: RESOURCES[0].admin_id,
            options: RESOURCES.map((res) => {
              return {
                id: res.admin_id,
                text: `${res.title}`,
                value: res.admin_id //Should match "name" property
              };
            }),
            config: { label: "Assignee", required: true }
          }
        ]}
        resourceViewMode={mode}
      />
    </Fragment>
  );
};
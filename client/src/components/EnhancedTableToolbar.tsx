import * as React from 'react';
import { Box, Button, Tooltip, Toolbar, Typography, TextField, InputAdornment } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import ConfirmationModal from './ConfirmationModal'; // Import the ConfirmationModal component
import { EnhancedTableToolbarProps } from '../types';
import SearchIcon from '@mui/icons-material/Search';
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  
  p: 4,
};
const EnhancedTableToolbar = ({
  tabType,
  numSelected,
  description,
  selected,
  rows,
  dynamicKey,
  actionButtons,
  reloadActiveTab,
  handleAlbumSearchChange  
}: EnhancedTableToolbarProps) => {
  const [open, setOpen] = React.useState(false);
  const [selectedIds, setSelectedIds] = React.useState<number[]>([]);
  const [actionType, setSelectedActionType] = React.useState<string>('approve');
  const [albumSearch, setAlbumSearch] = React.useState('');


  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const selectedDynamicValues = rows?.filter(row => selected.includes(row.id)).map(row => row[dynamicKey]);

  React.useEffect(() => {
    setSelectedIds([...selected]);
  }, [numSelected]);

  const apiCallApprove = () => {
    // Perform API call here
    // Upon successful response, switch to the "answer" card
  };

  const approveClick=()=>{
    setSelectedActionType('approve')
    handleOpen()
  }
  const rejectClick=()=>{
    handleOpen()
    setSelectedActionType('reject')
    
  }

  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleAlbumSearchChange(albumSearch);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [albumSearch, handleAlbumSearchChange]);

  
  const onInput = (event) => {
    const searchTerm = event.target.value;
    setAlbumSearch(searchTerm);
  };
  
  return (
    <>
      <Toolbar
        sx={{
          background: 'rgb(255 235 59 / 28%)!important',
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            // bgcolor: theme => theme.palette.primary.main,
          }),
        }}
      >

        <Box flex={'1 1 100%'}>
        <div style={{marginRight:'30px'}}>
        {numSelected > 1 ? (
          <Typography  color="inherit" variant="subtitle1" component="div">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography
            sx={{
              flex: '1 1 100%',
              color: '#585858',
              fontSize: '15px',
              fontWeight: '100',
            }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            {description}
          </Typography>
        )}
</div>
        
</Box>
<Box flex={'1 1 100%'}>
  <div style={{float:"right"}}>

<TextField
          placeholder="Search Album"
          variant="outlined"
          size="small"
          value={albumSearch}
          onInput={onInput}
          InputProps={{
            startAdornment: (
                <InputAdornment position="start">
                    <SearchIcon color="action" />
                </InputAdornment>
            ),
            sx: {
               width:'200px',
              "& .MuiOutlinedInput-root": { 
              "& fieldset": {
                  borderColor: "red", 
              },
          },
          "& .MuiInputBase-input": { paddingRight: "0px !important" ,borderColor: "red", } },
        }}
        /> 


        {numSelected > 1 && actionButtons ? (
          <>
            <Tooltip title="Reject all selected">
              <Button variant="outlined" sx={{ marginRight: '5PX', borderColor: '#ff4ac3', color: '#ff4ac3', marginLeft:'20px' }}
              onClick={rejectClick}>
                <CloseIcon style={{ fontSize: '15px', padding: '0px 2px'}} /> Reject
              </Button>
            </Tooltip>
            <Tooltip title="Approve all selected">
              <Button
                variant="outlined"
                sx={{ color: '#2573ff', borderColor: '#2573ff' }}
                onClick={approveClick}
              >
                <CheckIcon style={{ fontSize: '15px', padding: '0px 2px' }} /> Approve
              </Button>
            </Tooltip>
          </>
        ) : (
          ''
        )}
  </div>

</Box>

      </Toolbar>
      <ConfirmationModal
        tabType={tabType}
        reloadActiveTab={reloadActiveTab} 
        open={open}
        onClose={handleClose}
        numSelected={numSelected}
        actionType={actionType}
        selectedDynamicValues={selectedDynamicValues}
      />
    </>
  );
};

export default EnhancedTableToolbar;
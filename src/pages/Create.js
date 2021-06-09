import React,{useState} from 'react'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import {FormControl, FormControlLabel, FormLabel, makeStyles, RadioGroup, TextField} from '@material-ui/core'// makeStyles to add custom css
import Radio from '@material-ui/core/Radio'
import {useHistory} from 'react-router-dom'


const useStyles = makeStyles({// to use manual css
  btn:{
    marginBottom:20,
    marginTop:20
  },
  field:{
    marginTop:20,
    marginBottom:20,
    display:'block'
  }
})



export default function Create() {
  const classes = useStyles()
  const [title, setTitle] = useState('')
  const [details, setDetails] = useState('')
  const [titleError, setTitleError] = useState(false)
  const [detailsError, setDetailsError] = useState(false)
  const [gender, setGender] = useState('male')
  const history = useHistory()


  const handleSubmit = (e) => {
    e.preventDefault()//to prevent the refreshing of page
    setTitleError(false)
    setDetailsError(false)

    if (title == '') {
      setTitleError(true)
    }
    if (details == '') {
      setDetailsError(true)
    }


    if (title && details){
// Now saving the data after i.e. POST request every time  
      fetch('http://localhost:8000/notes',{
        method: 'POST',
        headers: {'Content-type':'application/json'},//What type of contenet is to be sent
        body:JSON.stringify({title,details,gender})//stringyfy JS object
      }) 
      .then(() => history.push('/') )// After submit we will redirect the page to Notes page i.e. homepage
    }
  }

  return (
    <Container>
      <Typography 
        variant='h6' 
        component='h2'
        color='textSecondary'
        gutterBottom
      >
        Create a new Note
      </Typography>

      <form noValidate autoComplete='off' onSubmit={handleSubmit}>
        <TextField
          className={classes.field}
          label='Note Title'
          variant='outlined'
          color='secondary'
          fullWidth
          required
          onChange = {(e) => setTitle(e.target.value)}
          error={titleError}
        />
        <TextField
          className={classes.field}
          label='Details'
          variant='outlined'
          color='secondary'
          multiline
          rows={4}
          fullWidth
          required
          onChange = {(e) => setDetails(e.target.value)}
          error={detailsError}
        />

        <FormControl className={classes.field} >
          <FormLabel>Gender</FormLabel>
  {/* To manage multiple radio buttons and select the single one  */}
          <RadioGroup value={gender} onChange = {(e) => setGender(e.target.value)}>
            <FormControlLabel label='Male' value='male' control={<Radio/>}/>
            <FormControlLabel label='Female' value='female' control={<Radio/>}/>
            <FormControlLabel label='Transgender' value='transgender' control={<Radio/>}/>
            <FormControlLabel label='Others' value='others' control={<Radio/>}/>
          </RadioGroup>
        </FormControl>

        <Button
          className={classes.btn}
          type ='submit'
          variant='contained'
          color = 'secondary'
          endIcon={<KeyboardArrowRightIcon/>} // For icon we need to install it using npm
        >
          Submit
        </Button>
        <br/>

      </form>

     
    </Container>
  )
}

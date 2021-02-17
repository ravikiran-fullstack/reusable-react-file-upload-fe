import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  btn: {
    marginTop: '15px'
  },
  inputBtn: {
    
  }
}))


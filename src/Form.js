import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import Home from './Home';
import { isEmail, getInfos } from './utils.js';

const styles = theme => ({
  root: {},
  header: {
  },
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  form: theme.mixins.gutters({
    paddingTop: 5,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
    maxWidth: 300
  }),
  item: {
    marginTop: 20
  }
})

class Form extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  state = {
    value: '',
    sending: false,
    error: false,
    labelText: 'Email',
    helperText: '',
    redirect: false
  }

  validate = () => {
    const { value } = this.state;
    if (value && !isEmail(value)) {
      this.setState({
        error: true,
        labelText: 'Wrong Email',
        helperText: 'Enter a valid email address : email@provider.com'
      });
    } else {
      this.setState({
        error: false,
        labelText: 'Email',
        helperText: ''
      });
    }
  }

  subscribe = () => {
    const { value, error } = this.state;
    if (value && !error) {
      this.setState({
        sending: true
      });
    }
  }

  componentDidMount() {
    const { base64Url, publicKey } = this.props.match.params;
    const url = atob(base64Url);
    getInfos(url, publicKey)
      .catch(e => {
        this.setState({
          redirect: e,
        });
      })
      .then(res => res.json())
      .then(res => {
          console.log(res);
      });
  }

  render() {
    const { classes } = this.props;
    const { redirect, sending, error, labelText, helperText } = this.state;
    return (redirect) ? <Home /> : (
      <div className={classes.root}>
        <header className={classes.header}>
        </header>
        <LinearProgress variant="query" style={{ visibility: sending ? 'visible' : 'hidden' }} />
        <div className={classes.wrapper}>
          <Paper className={classes.form}>
            <TextField 
              className={classes.item}
              fullWidth
              autoFocus
              label={labelText}
              placeholder="email@provider.com"
              error={error}
              helperText={
                <span>{helperText}</span>
              }
              onChange={({ target: { value } }) => this.setState({ value })}
              onBlur={this.validate}
              disabled={sending}
            >
            </TextField>
            <Button
              className={classes.item}
              fullWidth
              color="primary"
              variant="contained"
              size="large"
              disabled={sending}
              onClick={this.subscribe}
            >
              Subscribe
            </Button>
          </Paper>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Form);

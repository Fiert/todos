import React, { Component } from 'react';
import {
  withStyles,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Divider,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Grid,
  Button
} from '@material-ui/core';
import { Edit, Delete, Add } from '@material-ui/icons';
import { todoStyles as styles } from './TodoStyles';
import { axios } from '../../mock/axios';

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      taskForm: false,
      title: '',
      description: '',
      id: ''
    };
  }

  componentDidMount() {
    axios.get().then((tasks) => this.setState({ tasks }));
  }

  render() {
    const { tasks, taskForm, id, title, description } = this.state;
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <IconButton onClick={() => this.setState({ taskForm: true })}>
          <Add fontSize={'large'}/>
        </IconButton>
        {tasks.map(({ id, title, description }, k) => (
          <List key={k}>
            <ListItem key={id} dense button style={{ display: 'flex' }}>
              <ListItemText>
                <div className={classes.title}>{title}</div>
                <div className={classes.description}>{description}</div>
              </ListItemText>
              <ListItemSecondaryAction>
                <IconButton edge="end" onClick={() => this.setState({ id, title, description, taskForm: true })}>
                  <Edit/>
                </IconButton>
                <IconButton onClick={() => this.onDeleteTaskClick(id)}>
                  <Delete/>
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <Divider variant={'fullWidth'}/>
          </List>
        ))}
        <Dialog
          open={taskForm}
          onClose={() => this.setState({ taskForm: false, id: '', title: '', description: '' })}
        >
          <DialogTitle>{id ? 'Edit Task' : 'Create Task'}</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  value={title}
                  label={'Title'}
                  variant={'outlined'}
                  onChange={this.onFieldChange('title')}
                  fullWidth={true}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant={'outlined'}
                  label={'Description'}
                  fullWidth={true}
                  value={description}
                  multiline
                  rows="4"
                  onChange={this.onFieldChange('description')}
                />
              </Grid>
            </Grid>
            <Button
              color={'primary'}
              variant={'contained'}
              className={classes.button}
              onClick={() => id ? this.onUpdateTaskClick(id, title, description) : this.onCreateTaskClick(title, description)}
            >
              {id ? 'Edit' : 'Create'}
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  onFieldChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  onCreateTaskClick = async (title, description) => {
    await axios.post({ title, description });
    const tasks = await axios.get();
    this.setState({ tasks, taskForm: false, id: '', title: '', description: '' });
  };

  onDeleteTaskClick = async (id) => {
    await axios.delete(id);
    const tasks = await axios.get();
    this.setState({ tasks });
  };

  onUpdateTaskClick = async (id, title, description) => {
    await axios.put(id, { title, description });
    const tasks = await axios.get();
    this.setState({ tasks, taskForm: false, id: '', title: '', description: '' });
  };
}

export default withStyles(styles)(Todo);

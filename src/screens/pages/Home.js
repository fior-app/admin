import React from 'react'
import { Container, Typography, Card, CardContent, CardActions, Button, makeStyles, Grid } from '@material-ui/core'
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  gridContainer: {
    marginTop: '2rem',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export function Home() {
  const classes = useStyles()

  return (
    <Container>
      <Typography variant="h4">Welcome to the Dashboard</Typography>
      <Typography variant="subtitle1">Manage content of Fior platform</Typography>
      <Grid container spacing={3} className={classes.gridContainer}>
        <Grid item xs={4}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h5" component="h2">Skills</Typography>
              <Typography className={classes.pos} color="textSecondary">Resource</Typography>
              <Typography variant="body2" component="p">
                Used to categorize users, questions and posts
              </Typography>
            </CardContent>
            <CardActions>
              <Link to="/skills" style={{ textDecoration: 'None', color: 'inherit' }}>
                <Button size="small" color="primary">Manage</Button>
              </Link>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
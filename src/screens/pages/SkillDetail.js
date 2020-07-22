import React, { useEffect, useState } from 'react'

import { useAuth } from '../../context/Auth'
import MaterialTable from 'material-table';
import { getSkill, getSkillQuestions, createSkillQuestion, updateSkillQuestion, deleteSkillQuestion } from '../../api/Fior'
import { tableIcons } from '../../util/TableIcons';
import { Container, Typography, IconButton, makeStyles } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  header: {
    display: "flex",
    alignItems: "center",
  },
  headerTitle: {
    marginLeft: "8px",
  },
  questions: {
    marginTop: "1rem",
  }
});

export function SkillDetail({ match: { params: { skillId } } }) {
  const classes = useStyles()

  const [auth] = useAuth()

  // State
  const [skill, setSkill] = useState()
  const [state, setState] = useState({
    columns: [
      { title: 'Question', field: 'question' },
      { title: 'Choice 1', field: 'choice1' },
      { title: 'Choice 2', field: 'choice2' },
      { title: 'Choice 3', field: 'choice3' },
      { title: 'Choice 4', field: 'choice4' },
      { title: 'Answer', field: 'answer', type: 'numeric' },
      { title: 'ID', field: 'id', editable: 'never' },
    ],
    data: [],
  });

  // Effects
  useEffect(() => {
    if (auth.token) {
      getSkill(auth.token, skillId).then((res) => {
        setSkill(res.data)
      })
      getSkillQuestions(auth.token, skillId).then((res) => {
        setState((state) => ({ ...state, data: res.data }))
      })
    }
  }, [auth, skillId])

  return (
    <Container>
      <div className={classes.header}>
        <IconButton aria-label="delete" component={Link} to={`/skills`}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5" className={classes.headerTitle}>{skill && skill.name}</Typography>
      </div>
      <div className={classes.questions}>
        <MaterialTable
          title="Questions"
          icons={tableIcons}
          columns={state.columns}
          data={state.data}
          editable={{
            onRowAdd: (newData) => createSkillQuestion(auth.token, skillId, newData).then((createRes) => {
              if (createRes.status === 200) {
                getSkillQuestions(auth.token, skillId).then((getRes) => {
                  setState((prevState) => {
                    return { ...prevState, data: getRes.data };
                  });
                })
              }
            }),
            onRowUpdate: (newData, oldData) => {
              console.log(newData)
              return updateSkillQuestion(auth.token, skillId, oldData.id, newData).then((editRes) => {
                if (editRes.status === 200) {
                  getSkillQuestions(auth.token, skillId).then((getRes) => {
                    setState((prevState) => {
                      return { ...prevState, data: getRes.data };
                    });
                  })
                }
              })
            },
            onRowDelete: (oldData) => deleteSkillQuestion(auth.token, skillId, oldData.id).then((deleteRes) => {
              if (deleteRes.status === 200) {
                getSkillQuestions(auth.token, skillId).then((getRes) => {
                  setState((prevState) => {
                    return { ...prevState, data: getRes.data };
                  });
                })
              }
            }),
          }}
        />
      </div>
    </Container>
  );
}

import React, { useEffect } from 'react'

import { useAuth } from '../../context/Auth'
import MaterialTable from 'material-table';
import { getSkills, createSkill, deleteSkill } from '../../api/Fior'
import { tableIcons } from '../../util/TableIcons';
import { Container } from '@material-ui/core';

export function Skill() {

  const [auth] = useAuth()

  const [state, setState] = React.useState({
    columns: [
      { title: 'ID', field: 'id', editable: 'never' },
      { title: 'Name', field: 'name' },
    ],
    data: [],
  });

  useEffect(() => {
    if (auth.token) {
      getSkills(auth.token).then((res) => {
        setState((state) => ({ ...state, data: res.data }))
      })
    }
  }, [auth])

  return (
    <Container>
      <MaterialTable
        title="Skills"
        icons={tableIcons}
        columns={state.columns}
        data={state.data}
        editable={{
          onRowAdd: (newData) => createSkill(auth.token, newData.name).then((createRes) => {
            if (createRes.status === 200) {
              getSkills(auth.token).then((getRes) => {
                setState((prevState) => {
                  return { ...prevState, data: getRes.data };
                });
              })
            }
          }),
          onRowDelete: (oldData) => deleteSkill(auth.token, oldData.id).then((deleteRes) => {
            if (deleteRes.status === 200) {
              getSkills(auth.token).then((getRes) => {
                setState((prevState) => {
                  return { ...prevState, data: getRes.data };
                });
              })
            }
          }),
        }}
      />
    </Container>
  );
}

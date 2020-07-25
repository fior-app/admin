import React, { useEffect } from 'react'

import { useAuth } from '../../context/Auth'
import MaterialTable from 'material-table';
import { getAdmins, createAdmin, deleteAdmin } from '../../api/Fior'
import { tableIcons } from '../../util/TableIcons';
import { Container } from '@material-ui/core';

export function Admin() {

  const [auth] = useAuth()

  const [state, setState] = React.useState({
    columns: [
      { title: 'ID', field: 'id', editable: 'never' },
      { title: 'Name', field: 'name', editable: 'never' },
      { title: 'Roles', field: 'roles', editable: 'never' },
      { title: 'Email', field: 'email' },
    ],
    data: [],
  });

  useEffect(() => {
    if (auth.token) {
      getAdmins(auth.token).then((res) => {
        const data = res.data.map((user) => ({ ...user, roles: user.roles.join(", ") }))
        setState((state) => ({ ...state, data }))
      })
    }
  }, [auth])

  return (
    <Container>
      <MaterialTable
        title="Admins"
        icons={tableIcons}
        columns={state.columns}
        data={state.data}
        editable={{
          onRowAdd: (newData) => createAdmin(auth.token, newData.email).then((createRes) => {
            if (createRes.status === 200) {
              getAdmins(auth.token).then((getRes) => {
                setState((prevState) => {
                  return { ...prevState, data: getRes.data };
                });
              })
            }
          }),
          onRowDelete: (oldData) => deleteAdmin(auth.token, oldData.id).then((deleteRes) => {
            if (deleteRes.status === 200) {
              getAdmins(auth.token).then((getRes) => {
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

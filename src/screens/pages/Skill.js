import React, { useEffect, useState } from 'react'

import { useAuth } from '../../context/Auth'
import { Typography } from '@material-ui/core'
import { getSkills } from '../../api/Fior'

export function Skill() {
  const [auth] = useAuth()

  const [skills, setSkills] = useState([])

  useEffect(() => {
    if (auth.token) {
      getSkills(auth.token).then((res) => {
        setSkills(res.data)
      })
    }
  }, [auth])

  return (
    <div>
      <Typography variant="h5">
        Skills
      </Typography>
      {skills.map((skill, index) => (
        <div key={skill.id}>{skill.name}</div>
      ))}
    </div>
  );
}
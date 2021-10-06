import React from 'react'
import Controls  from './controls/Controls'
import { makeStyles } from '@material-ui/styles'
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import clsx from 'clsx';
import Form from './Form';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '1.5rem 0',
  },
  bgWithImage: {
    backgroundImage: 'url(/images/hero-small.png)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    width: '100%',
    boxShadow: '0 3000px rgba(0,0,0, 0.5) inset'
  },

  bgPlain: {
    backgroundColor: theme.palette.common.light,
  },
  container: {
    ...theme.container,
  },
  title: {
    ...theme.fonts.extraBold,
    color: theme.palette.common.delta,
    fontSize: '2.5rem',
    lineHeight: '2.8rem',
    maxWidth: '42rem',
    marginBottom: '1.3rem',
  }
}))

export default function Hero(props) {

  const classes = useStyles();
  const { heroType, labelColor } = props;

  return (
    <>
      <Box className={clsx({
        [classes.root]: true, //always applies
        [classes.bgWithImage]: heroType !== 'plain',
        [classes.bgPlain]: heroType === 'plain',
      })}>
        <Box className={classes.container}>
          {
            (heroType !== 'plain')
              ? <Typography className={classes.title}>Connecting candidates to thier dream jobs</Typography>
              : ''
          }
          <Form>
            <div className={classes.grid}>
              <Controls.FormGroupCustom>
                <Controls.InputLabelCustom color={labelColor} label="what" />
                <Controls.TextFieldCustom placeholder="Job title, skill or company" />
              </Controls.FormGroupCustom>
            </div>
          </Form>
        </Box>
      </Box>
    </>
  )
}

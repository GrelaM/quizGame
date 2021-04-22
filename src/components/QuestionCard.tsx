import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'

import PeopleCatPhoto from '../assets/img/peopleCat2.jpg'

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 300,
    backgroundColor: '#ffd900'
    // backgroundColor: theme.palette.secondary.light
  },
  media: {
    height: 150
  },
  card: {
    padding: 5,
    "&:last-child": {
      paddingBottom: 0
    }
  }
}))

interface QuestionCardProps {
  hints: string[]
}

const QuestionCard = (props: QuestionCardProps) => {
  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={PeopleCatPhoto}
        title="People"
      />
      <CardContent className={classes.card}>
        <Typography style={{textAlign: 'left'}} gutterBottom variant="h5" component="h2">
          Who is this?
        </Typography>
        <Typography variant="body2" color="textPrimary" component="span">
            <ol style={{textAlign: 'left'}}>
                {props.hints.map((el, index) => <li key={index}>{el}</li>)}
            </ol>
        </Typography>
      </CardContent>
    </Card>
  )
}

export default QuestionCard
